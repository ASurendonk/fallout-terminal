import React from 'react';
import './styles.scss';
import {TextLoader} from "components/software/elements/textLoader";

type LoadingOverlayProps = {
  isLoading: boolean;
}

export const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <TextLoader lg />
      </div>
    </div>
  );
}

