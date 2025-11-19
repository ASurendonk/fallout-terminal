import React from 'react';
import './styles.scss';

import { useSelector } from "react-redux";
import {getLight, getPower} from "store/mainframeSlice";
import ComputerOffScreen from "assets/images/computer/screen.png";

type SystemProps = {
  children: React.ReactNode;
}

export const Screen = ({children}: SystemProps) => {
  const power = useSelector(getPower);
  const light = useSelector(getLight);

  return (
    <div className="system">
      <div className="system-screen">
        <div className="system-content">
          {children}
        </div>
      </div>

      {/*<div className="vignette" />*/}
      {/*<div className="glare" />*/}
      {/*<div className="shadow" />*/}
      <img
        className={`system-artifacts ${power ? "on" : "off"}`}
        src={ComputerOffScreen}
        alt=""
        style={{ filter: `brightness(${light <= 0.1 ? 0 : light})` }}
      />
      {power ? (
        <>
          <div className="pixelation"/>
          <div className="rolling-glitch"/>
        </>
      ) : null}
    </div>
  );
}
