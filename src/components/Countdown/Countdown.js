import React, { useEffect, useState } from "react";
import Timer from "../Timer/Timer";
import "./Countdown.css";

const CountdownTime = ({ handleToggleVideo, mode }) => {
  const [date, setDate] = useState("");
  const [hijriYear, setHijriYear] = useState("");
  const [endRamadan, setEndRamadan] = useState("");
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const getRamadanDate = () => {
      //Fetch Hijri Year
      fetch("https://api.aladhan.com/v1/gToH")
        .then((res) => res.json())
        .then((data) => {
          const hijriYear = data.data.hijri.date.split("-")[2];
          setHijriYear(hijriYear);
          //Fetch Ramadan Date
          fetch(`https://api.aladhan.com/v1/hToGCalendar/9/${hijriYear}`)
            .then((res) => res.json())
            .then((data) => {
              const [day, month, year] = data.data[0].gregorian.date.split("-");
              const [last_day, last_month, last_year] =
                data.data[data.data.length - 1].gregorian.date.split("-");

              let latest = new Date(year, month - 1, day - 1);
              //   latest.setTime(
              //     latest.getTime() + latest.getTimezoneOffset() * 60 * 1000
              //   );
              console.log(latest);
              setDate(latest);
              let end = new Date(last_year, last_month - 1, last_day - 1);
              //   end.setTime(end.getTime() + end.getTimezoneOffset() * 60 * 1000);
              console.log(end);
              setEndRamadan(end);
            });
        });
    };
    getRamadanDate();
  }, []);

  const calculateTimeLeft = () => {
    const difference = +date - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}
      </span>
    );
  });
  return (
    <div className="container">
      <>
        {timerComponents.length ? (
          <>
            <div className="header">
              <h1 className="header__primary">RAMADAN</h1>
              <p className="header__text">The Muslim Month of Fasting</p>
              <span className="title">COUNTDOWN TO RAMADAN DATE</span>
              <p className="note">
                “The tentative date is
                <span className="span">
                  {weekday[date.getDay()]}
                  {", "}
                  {[
                    date.getDate(),
                    date.getMonth() + 1,
                    date.getFullYear(),
                  ].join("/")}{" "}
                </span>
                but the actual date of commencement of{" "}
                <span>Ramadan {hijriYear} A.H </span>
                is subject to the sighting of the moon.”
              </p>
            </div>
            <div className="timers">
              <Timer type="days" left={timeLeft.days} />
              <Timer type="hours" left={timeLeft.hours} />
              <Timer type="mins" left={timeLeft.minutes} />
              <Timer type="secs" left={timeLeft.seconds} secs />
            </div>
            <button id="myBtn" onClick={handleToggleVideo}>
              {mode}
            </button>
          </>
        ) : new Date() <= endRamadan ? (
          <div className="thanks">
            <h1>Ramadan Ongoing... </h1>
            <p className="thanks_text"> Barokallohu Feekum!</p>
          </div>
        ) : (
          <div className="thanks">
            <h1>Ramadan Has Ended </h1>
            <p className="thanks_text"> Barokallohu Feekum!</p>
          </div>
        )}
      </>
    </div>
  );
};

export default CountdownTime;
