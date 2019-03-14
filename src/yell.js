class Yell {
  hearers = {}

  // yell through a speaker
  // words will be pass to the hearers
  yell = (speaker, ...words) => {
    if (this.hearers[speaker]) {
      this.hearers[speaker].forEach((speech) => {
        speech(...words);
      });
    }
  }

  // hear through a speaker
  // speech is a callback to execute when is yelled from this speaker
  hear = (speaker, speech) => {    
    if (!speech) {
      throw new Error("speech(callback) was not passed to yell's hear method.");
    }
    if (this.hearers[speaker]) {
      this.hearers[speaker].push(speech);
    } else {
      this.hearers[speaker] = [speech];
    }
  }

  // stops hearing the speaker
  mute = (speaker, speech) => {
    if (this.hearers[speaker]) {
      this.hearers[speaker] = this.hearers[speaker].filter(sp => sp !== speech);
    }
  }
}

const yellInstance = new Yell();

export const { yell, mute, hear } = yellInstance;
