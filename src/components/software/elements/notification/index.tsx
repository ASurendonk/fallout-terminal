import React from 'react';
import './styles.scss';
import { useSelector } from "react-redux";
import { getNotification } from "store/mainframeSlice.ts";
import { Sequencer } from "components/sequencer";

export const Notification = () => {

    const notification = useSelector(getNotification);

    return (
        <div className="notification">
            <Sequencer line key={notification} reserveSpace>{notification}</Sequencer>
        </div>
    );
}
