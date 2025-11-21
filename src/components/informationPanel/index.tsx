import React, {useState} from 'react';
import './styles.scss';

export const InformationPanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`information-panel-wrapper ${open ? 'open' : ''}`} onClick={() => open ? setOpen(false) : null}>
      <div className="information-panel-button" onClick={() => setOpen(true)}>?</div>

      <div className={`information-panel ${open ? 'open' : ''}`} onClick={(event) => event.stopPropagation()}>
        <div className="information-panel-content">
          <div className="information-panel-button" onClick={() => setOpen(false)}>X</div>

          <div className="information-panel-title">
            Fallout Terminal
            <br/>
            - by <a href="https://au.linkedin.com/in/adam-surendonk" target="_blank">Adam Surendonk</a>
            <br/>
            <br/>
            Welcome vault dweller!
            <br/>
            <br/>
            This website is a re-creation of the in-game terminal of the Fallout series of games. Specifically, the
            terminal image is a screenshot I took in Fallout 4.
            <br/>
            <br/>
            It is created using React.
            <br/>
            <br/>
            I have re-created the hacking mini-game in order to log in. I have also built more features not present in
            the game version of terminals to make it a bit more engaging.
            <br/>
            <br/>
            If you have any feedback or other information:
            <br/>
            <a href="mailto:">adam.surendonk@gmail.com</a>
            <br/>
            <br/>
            I hope you enjoy it!
          </div>
          <div className="information-panel-tooltip">
            Password: adam
          </div>
        </div>
      </div>
    </div>
  );
}
