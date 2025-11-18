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
import slot from 'assets/sounds/key_alternate.mp3';

export enum SoundCode {
    key_1 = "key_1",
    key_2 = "key_2",
    key_3 = "key_3",
    tick = "tick",
    error = "error",
    shutter = "shutter",
    shutter_medium = "shutter_medium",
    beep_strange = "beep_strange",
    beep_low = "beep_low",
    beep_high = "beep_high",
    slot = "slot",
}

export const sounds = [
    { name: SoundCode.key_1, url: key_1 },
    { name: SoundCode.key_2, url: key_2 },
    { name: SoundCode.key_3, url: key_3 },
    { name: SoundCode.tick, url: tick },
    { name: SoundCode.error, url: error },
    { name: SoundCode.shutter, url: shutter },
    { name: SoundCode.shutter_medium, url: shutter_medium },
    { name: SoundCode.beep_strange, url: beep_strange },
    { name: SoundCode.beep_low, url: beep_low },
    { name: SoundCode.beep_high, url: beep_high },
    { name: SoundCode.slot, url: slot },
];

declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
        audioManager: AudioManager;
    }
}

interface SoundFile {
    name: SoundCode;
    url: string;
}

export class AudioManager {
    private audioContext: AudioContext;
    readonly buffers: { [key: string]: AudioBuffer };

    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.buffers = {};
    }

    // Method to load sound files
    async loadSounds(soundFiles: SoundFile[]): Promise<void> {
        const promises = soundFiles.map(async (soundFile) => {
            const response = await fetch(soundFile.url);
            const arrayBuffer = await response.arrayBuffer();
            this.buffers[soundFile.name] = await this.audioContext.decodeAudioData(arrayBuffer);
        });
        await Promise.all(promises);
    }

    play(soundName: string, volume: number = 1): void {
        const audioBuffer = this.buffers[soundName];
        if (audioBuffer) {
            const source = this.audioContext.createBufferSource();
            source.buffer = audioBuffer;
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = volume;
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            source.start(0);
        }
    }

    playRandomKey(volume: number = 0.03): void {
        const soundKeys = [SoundCode.key_1, SoundCode.key_2, SoundCode.key_3];
        const randomIndex = Math.floor(Math.random() * soundKeys.length);
        const key = soundKeys[randomIndex];
        window.audioManager.play(key, volume);
    }
}
