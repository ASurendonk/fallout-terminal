import React from 'react';
import './styles.scss';

type LoadingOverlayProps = {
    isLoading: boolean;
}

export const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
    if (!isLoading) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-content">
                <div className="loading-spinner">
                    <div className="spinner-dot"></div>
                    <div className="spinner-dot"></div>
                    <div className="spinner-dot"></div>
                </div>
                <div className="loading-text">LOADING TERMINAL</div>
            </div>
        </div>
    );
}

