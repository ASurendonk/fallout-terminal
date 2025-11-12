import React from 'react';
import './styles.scss';
import {useAppSelector} from 'redux/hooks';

export const Title = () => {
    const { title } = useAppSelector(state => state);

    return (
        <div className="title">
            <div className="line spacer">{title}</div>
        </div>
    );
}
