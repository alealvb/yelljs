type SilenceFunction<TSpeaker, TCallback> = () => void;

export default class Yell {
  hearers: Map<PropertyKey, CallableFunction[]> = new Map();

  // yell through a speaker
  // words will be pass to the hearers
  yell = (speaker: string, ...words: unknown[]): void => {
    const funcArray = this.hearers.get(speaker);
    if (!funcArray) return;

    funcArray.forEach((speech) => {
      speech(...words);
    });
  };

  // hear through a speaker
  // speech is a callback that gets executed when the speaker key is yelled
  // returns a silence function to mute this exact hear action
  hear = <TSpeaker extends string, TCallback extends CallableFunction>(
    speaker: TSpeaker,
    speech: TCallback
  ): SilenceFunction<TSpeaker, TCallback> => {
    if (!speech || typeof speech !== "function") {
      throw new Error("speech(callback) was not passed to yell's hear method.");
    }

    this.#getHearerArray(speaker).push(speech);

    return () => this.mute(speaker, speech);
  };

  // stops hearing the speaker
  mute = (speaker: string, speech: CallableFunction): void => {
    const funcArray = this.#getHearerArray(speaker);
    this.hearers.set(
      speaker,
      funcArray.filter((sp) => sp !== speech)
    );
  };

  #getHearerArray = (speaker: string): CallableFunction[] => {
    const funcArray = this.hearers.get(speaker);
    if (!funcArray) {
      const arr: CallableFunction[] = [];
      this.hearers.set(speaker, arr);
      return arr;
    }
    return funcArray;
  };
}

const yellInstance = new Yell();

export const { yell, mute, hear } = yellInstance;
