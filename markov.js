/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    for (let i = 0; i < this.words.length; i++) {
    if (this.words[i] in chains) {
        let values = chains[this.words[i]]
        values.push(this.words[i+1]) 
        chains[this.words[i]] = values
      } else {
        if (this.words[i+1] == undefined) {
          chains[this.words[i]] = [null]
        } else {
          chains[this.words[i]] = [this.words[i+1]]
        }
      }
    }
    this.chains = chains;
  }



  /** return random text from chains */
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */
  makeText(numWords = 100) {
    let keys = []
    for (let k in this.chains) {
      keys.push(k)
    }
    let key = MarkovMachine.choice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains[key]);
    }

    return out.join(" ");
  }

}

module.exports = {
  MarkovMachine
};