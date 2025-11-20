import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import {Boot, NetworkMap} from 'components/software';
import { Login } from 'components/software';
import { Home } from 'components/software';
import { Bios } from 'components/software';
import { Hack } from 'components/software';
import  useDebouncedEffect  from  'use-debounced-effect';
import { Screen } from 'components/software/screen';
import { CalculateScale } from 'helpers';
import './styles.scss';
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Log } from "components/software/systems/internal/mail/log";
import { Entries } from "components/software/systems/internal/mail";
import { SystemContext } from "components/software/elements/context/context";
import { Repair } from "components/software/systems/internal/repair";
import { Maintenance } from "components/software/systems/internal/maintenance";
import {Lights} from "components/software/systems/internal/maintenance/lights";
import {Programs} from "components/software/systems/internal/programs";
import {NetworkSearch} from "components/software/systems/internal/programs/networkSearch";

// 20 lines
// 54 characters
// 1080 total
// █

export const MainFrame = () => {
  const [system, setSystem] = useState<React.ReactNode | undefined>();
  const [scale, setScale] = useState(0);
  const ref = useRef<any>();
  const { power, system: systemName, color } = useSelector((state: RootState) => state.mainframe);
  const [cursor, setCursor] = useState<string>();

  const scaleMainframe = useCallback(() => {
    const mf = ref.current;
    const calculatedScale = CalculateScale(mf.clientHeight, mf.clientWidth);
    setScale(calculatedScale);
  }, []);

  useEffect(() => {
    scaleMainframe();
    window.addEventListener('resize', scaleMainframe);
  }, [scaleMainframe]);

  const renderSystem = useCallback(() => {
    switch(systemName) {
      case 'bios': return <Bios />;
      case 'boot': return <Boot />;
      case 'login': return <Login />;
      case 'hack': return <Hack />;
      case 'home': return <Home />;
      case 'entries': return <Entries />;
      case 'log': return <Log />;
      case 'repair': return <Repair />;
      case 'maintenance': return <Maintenance />;
      case 'lights': return <Lights />;
      case 'programs': return <Programs />;
      case 'network_map': return <NetworkMap />;
      case 'network_search': return <NetworkSearch />;
      default: return null;
    }
  }, [systemName]);

  useEffect(() => {
    setTimeout(() => {
      if (power) {
        setSystem(renderSystem());
      } else {
        setSystem(undefined);
      }
    }, 100);
  }, [power, systemName, renderSystem]);

  useDebouncedEffect(() => {
    if (power && color) {
      setCursor(makeCursor(`rgb(${color.red},${color.green},${color.blue})`));
    }
  }, 150, [color, power]);

  return (
    <div ref={ref} className="mainframe">
      <div className={`mainframe-content ${power ? "on" : "off"}`} style={{ transform: `translate(-50%, -50%) scale(${scale})`, cursor }}>
        <SystemContext>
          <Screen>
            {system}
          </Screen>
        </SystemContext>
      </div>
    </div>
  );
}

function makeCursor(color: string) {

  const cursor = document.createElement('canvas');
  const ctx = cursor.getContext('2d');

  if (!ctx) {
    return;
  }

  cursor.width = 22;
  cursor.height = 22;

  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(22, 11);
  ctx.lineTo(11, 22);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();

  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.stroke();

  return 'url(' + cursor.toDataURL() + '), auto';
}
