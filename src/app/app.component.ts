import { Component, Input } from '@angular/core';

/**
 *  TODO: Add readme
 *  TODO: [Deploy](https://alligator.io/angular/deploying-angular-app-github-pages/)
 */

class Translation {
  original: string;
  translation: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  translatedSentence: string = 'Translate me';
  userInput: string = '';
  vowels = ['a', 'e', 'i', 'o', 'u'];
  translatedHistory: Translation[] = [];

  /**
   * Handles the input from the form and sets the translated value
   * @param {string} input Form input value
   */
  translate(input: string): void {

    if ( ! input.length ) {
      return;
    }

    input = input.toLowerCase();

    // prepares an array to handle the translation process
    const translatedWords: string[] = [];

    // start by splitting the sentence by spaces
    const splitSentence = input.split(' ');

    // for each word get the vowel position and then translate it
    for ( let word of splitSentence ) {
      const vowelPosition = this.getVowelPosition(word);
      translatedWords.push(this.convertToPigLatin(word, vowelPosition));
    }

    // join the words back into a sentence with spaces
    const translation = translatedWords.join(' ');

    // update the variable used in the template
    this.translatedSentence = translation;
    // add this translation to the history
    this.updateHistory(input, translation);
    // clear the input field
    this.userInput = '';
  }

  /**
   * loops over each character and checks if it's a vowel, then returns the position
   * @param  {string} word A segment from the users input
   * @return {number}      The index position of the first vowel matched
   */
  getVowelPosition(word: string): number {

    const position = word.split('').findIndex( character => this.vowels.includes(character) );

    // if there are no vowels then return position as 0
    return position === -1 ? 0 : position;

  }

  /**
   * Moves the initial consonents to the end of the word and then supplies the appropriate suffix
   * @param  {string} word     A segment from the users input
   * @param  {number} position The position of the vowel in the word
   * @return {string}          The translated word
   */
  convertToPigLatin(word: string, position: number): string {
    const initial = word.slice(0, position);
    const base = word.slice(position);
    const suffix = position > 0 ? 'ay' : 'way';

    return base + initial + suffix;
  }

  /**
   * Keep a history of the last 10 translations
   * @param {string} original    The original word that was translated
   * @param {string} translation The translated value
   */
  updateHistory(original: string, translation: string):void {

    // max history of 10
    if ( this.translatedHistory.length >= 10 ) {
      this.translatedHistory.splice(0, 1);
    }

    this.translatedHistory.push({ original, translation });
  }

}
