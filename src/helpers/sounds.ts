import key_1 from 'assets/sounds/key_1.mp3';
import key_2 from 'assets/sounds/key_2.mp3';
import key_3 from 'assets/sounds/key_3.mp3';
import error from 'assets/sounds/error.mp3';
import shutter from 'assets/sounds/shutter.mp3';
import shutter_medium from 'assets/sounds/shutter_medium.mp3';
import tick from 'assets/sounds/tick_1.mp3';
import beep_strange from 'assets/sounds/beep_strange.mp3';
import beep_low from 'assets/sounds/beep_low.mp3';
import beep_high from 'assets/sounds/beep_high.mp3';
import terminal_on from 'assets/sounds/terminal_on.wav';
import terminal_off from 'assets/sounds/terminal_off.wav';
export { key_1, key_2, key_3, tick, error, shutter, shutter_medium, beep_strange, beep_low, beep_high, terminal_on, terminal_off };

export const key_codes = [
    'KeyA', 'KeyB', 'KeyC', 'KeyD', 'KeyE', 'KeyF', 'KeyG', 'KeyH', 'KeyI', 'KeyJ', 'KeyK', 'KeyL', 'KeyM', 'KeyN',
    'KeyO', 'KeyP', 'KeyQ', 'KeyR', 'KeyS', 'KeyT', 'KeyU', 'KeyV', 'KeyW', 'KeyX', 'KeyY', 'KeyZ',
    'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Space', 'Backspace'
];

export function playRandomAudio(soundArray: any[], volume: number = 1) {
    let randomKey = Math.floor(Math.random() * soundArray.length);
    soundArray.forEach((sound, i) => {
        if(randomKey === i) {
            let audio = new Audio(sound);
            if(volume) audio.volume = volume;
            else audio.volume = 0.5;
            audio.play();
        }
    });
}

const audio_key_1 = new Audio(key_1);
const audio_key_2 = new Audio(key_2);
const audio_key_3 = new Audio(key_3);
export function playRandomKey(volume: number = 0.03) {
    if(audio_key_1 && audio_key_2 && audio_key_3) {
        let keys = [ key_1, key_2, key_3 ];
        playRandomAudio(keys, volume);
    }
}

export function playAudio(sound: any, volume: number = 1) {
    let audio = new Audio(sound);
    if(volume) audio.volume = volume;
    else audio.volume = 0.5;
    audio.play();
}
