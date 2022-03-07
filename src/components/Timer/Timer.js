import React from "react";
import "./Timer.css";

const Timer = ({ left, type, secs }) => {
  return (
    <div>
      {!secs ? (
        <div className="timer">
          <h1> {left}</h1>
          <p>{type}</p>
        </div>
      ) : (
        <div className="timer">
          <h1 className="secs"> {left}</h1>
          <p>{type}</p>
        </div>
      )}
    </div>
  );
};

export default Timer;
