import React, {ReactNode} from 'react';
import './styles.scss';

type TextProps = {
  children?: ReactNode;
}

export const Text = ({ children }: TextProps) => {
  return (
    <div className="text">
      {children}
    </div>
  );
}
