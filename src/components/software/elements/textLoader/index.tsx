import React, {useEffect, useState} from 'react';
import './styles.scss';

const FRAMES = ['-', '\\', '|', '/'];
// const FRAMES = ['♥', '♦', '♣', '♠'];

type TextLoaderProps = {
  lg?: boolean;
}

export const TextLoader = ({ lg }: TextLoaderProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % FRAMES.length);
    }, 200);
    setIndex(id);
    return () => {
      clearInterval(id);
    }
  }, []);

  return (
    <div className={`loader ${lg && 'loader-lg'}`}>
      {FRAMES[index] ?? '-'}
    </div>
  );
}

