import React, {useCallback} from 'react';
import './styles.scss';
import ButtonCutOut from 'assets/images/computer/button.png';
import { useDispatch, useSelector } from "react-redux";
import { getPower, powerOff, powerOn } from "store/mainframeSlice";
import { SoundCode } from "helpers/sounds";

type PowerProps = {
  button?: boolean;
  glow?: boolean;
};

export const Power = ({ button, glow }: PowerProps) => {
  const power = useSelector(getPower);
  const dispatch = useDispatch();

  const onButtonClick = useCallback(() => {
    if (power) {
      window.audioManager.play(SoundCode.tick, 0.1);
      dispatch(powerOff());
    } else {
      window.audioManager.play(SoundCode.tick, 0.5);
      dispatch(powerOn());
    }
  }, [power, dispatch]);

  const onMouseDown = useCallback(() => {
    window.audioManager.play(SoundCode.tick, 0.1);
  }, []);

  return (
    <div className={`power ${button ? 'power-button' : ''}`} onClick={onButtonClick} onMouseDown={onMouseDown}>
      <div className="power-wrapper">
        {button && (
          <img
            className={`power-button ${power ? 'on' : 'off'}`}
            src={ButtonCutOut}
            alt="power button"
          />
        )}
        {glow && !power && (
          <>
            <div className="power-glow white"></div>
            <div className="power-glow color"></div>
          </>
        )}
      </div>
    </div>
  );
}
