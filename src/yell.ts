/*eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }]*/

type Callback = (...args: any[]) => void;
type silenceFunction = () => void;

export default class Yell {
  hearers: Record<string, Callback[]> = {}

  // yell through a speaker
  // words will be pass to the hearers
  yell = (speaker: string, ...words: any[]): void => {
    if (this.hearers[speaker]) {
      this.hearers[speaker].forEach((speech) => {
        speech(...words);
      });
    }
  }

  // hear through a speaker
  // speech is a callback that gets executed when the speaker key is yelled
  // returns a silence function to mute this exact hear action
  hear = (speaker: string, speech: Callback): silenceFunction => {
    if (!speech || typeof speech !== 'function') {
      throw new Error("speech(callback) was not passed to yell's hear method.");
    }
    if (this.hearers[speaker]) {
      this.hearers[speaker].push(speech);
    } else {
      this.hearers[speaker] = [speech];
    }

    return () => this.mute(speaker, speech);
  }

  // stops hearing the speaker
  mute = (speaker: string, speech: Callback): void => {
    if (this.hearers[speaker]) {
      this.hearers[speaker] = this.hearers[speaker].filter(sp => sp !== speech);
    }
  }
}

const yellInstance = new Yell();

export const { yell, mute, hear } = yellInstance;
