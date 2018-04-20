class YellJs {
  hearers = {}

  // yell through a speaker
  // words will be pass to the hearers
  yell(speaker, words) {
    if (this.hearers[speaker]) {
      this.hearers[speaker].forEach((speech) => {
        speech(words);
      });
    }
  }

  // hear through a speaker
  // speech is a callback to execute when is yelled from this speaker
  hear(speaker, speech) {
    if (this.hearers[speaker]) {
      this.hearers[speaker].push(speech);
    } else {
      this.hearers[speaker] = [speech];
    }
    return speaker;
  }

  // stops hearing the speaker
  mute(speaker, speech) {
    if (this.hearers[speaker]) {
      this.hearers[speaker] = this.hearers[speaker].filter(sp => sp !== speech);
    }
  }
}

const yellInstance = new YellJs();

const yell = (...args) => {
  yellInstance.yell(...args);
};
const mute = (...args) => {
  yellInstance.mute(...args);
};
const hear = (...args) => {
  yellInstance.hear(...args);
};

module.exports = { yell, mute, hear };