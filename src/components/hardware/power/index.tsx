import React, {useCallback} from 'react';
import './styles.scss';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {SystemActions} from 'redux/actions';
import ButtonCutOut from 'assets/images/button-full.png';
import {playAudio, tick} from 'helpers/sounds';

export const Power = () => {
    const power = useAppSelector(state => state.power);
    const dispatch = useAppDispatch();

    const onButtonClick = useCallback(() => {
        if (power) {
            playAudio(tick, 0.1);
        } else {
            playAudio(tick, 0.5);
        }
        dispatch(SystemActions.setPower(!power));
    }, [power, dispatch]);

    const onMouseDown = useCallback(() => {
        playAudio(tick, 0.1);
    }, []);

    return (
        <div className="power" onClick={onButtonClick} onMouseDown={onMouseDown}>
            <div className="power-button-background">
                <div className={`power-button ${power ? 'on' : 'off'}`}>
                    <div className="light" />
                    {/*<div className="glass-scratches" />*/}
                    <img className="button-rim" src={ButtonCutOut} alt="" />
                </div>
            </div>
        </div>
    );
}
