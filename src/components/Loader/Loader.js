import React, { useEffect, useRef } from "react";
import "./Loader.css";

const Loader = ({ showRef }) => {
  const countRef = useRef(null);
  const waterRef = useRef(null);
  const loaderRef = useRef(null);
  const boxRef = useRef(null);

  var intervalRef = useRef();

  useEffect(() => {
    loaderRef.current.classList.add("show");
    showRef.current.classList.remove("show");
    var percent = countRef.current.innerText;
    intervalRef.current = setInterval(function () {
      percent++;
      countRef.current.innerHTML = percent;
      waterRef.current.style.transform =
        "translate(0" + "," + (100 - percent) + "%)";
      if (percent > 100) {
        countRef.current.classList.add("scale");
        boxRef.current.classList.add("scale");
        loaderRef.current.classList.remove("show");
        showRef.current.classList.add("show");
      }
    }, 30);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [showRef]);

  return (
    <div className="loader" ref={loaderRef}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        style={{ display: "none" }}
      >
        <symbol id="wave">
          <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
          <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
          <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
          <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
        </symbol>
      </svg>
      <div className="box" ref={boxRef}>
        <div className="percent">
          <div className="percentNum" id="count" ref={countRef}>
            0
          </div>
          <div className="percentB">%</div>
        </div>
        <div id="water" className="water" ref={waterRef}>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
            <use xlinkHref="#wave"></use>
          </svg>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
            <use xlinkHref="#wave"></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;
