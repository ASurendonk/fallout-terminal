import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './styles.scss';
import {Button, Title} from 'components/software/elements';
import GoogleMapReact from 'google-map-react';
import {SYSTEMS} from 'types';
import {navigate} from 'helpers';

const center = {
    lat: 59.95,
    lng: 30.33
};

export const Map = () => {
    const [endLoad, setEndLoad] = useState(false);

    const onScreenClick = useCallback(() => {
        setEndLoad(true);
    }, []);
    //a8cb7c57e4b0340b

    return (
        <div className="map screen" onClick={onScreenClick}>
            <Title />
            <Button label="BACK" onClick={() => navigate(SYSTEMS.HOME)} />
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCPPXnglaEOZn9gtW6TKdCS4uTt9yvFqwk' }}
                defaultCenter={center}
                defaultZoom={11}
                options={{ zoomControl: false, fullscreenControl: false }}
            />
        </div>
    );
}