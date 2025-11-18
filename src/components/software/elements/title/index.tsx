import React from 'react';
import './styles.scss';
import { useSelector } from "react-redux";
import { RootState } from "store/index";

type TitleProps = {
    loggedIn?: boolean;
}

export const Title = ({ loggedIn }: TitleProps) => {
    const title = useSelector((state: RootState) => state.mainframe.title);

    if (loggedIn) {
        return (
            <div className="title">
                <div className="line">{title}</div>
            </div>
        );
    }

    return (
        <div className="title">
            <div className="line spacer">{title}</div>
        </div>
    );
}
