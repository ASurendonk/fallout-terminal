import React from "react";
import './styles.scss';

type LineProps = {
    draw?: boolean;
}

export const Line = ({ draw }: LineProps) => {
    if (draw) {
        return <hr className="ft-line" />;
    }

    return (
        <div style={{ height: '1em' }} />
    );
}
