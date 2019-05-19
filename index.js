const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const img = 'https://cdn.discordapp.com/attachments/562850987144904704/579670265533956151/1qsy1r.png';

/**
 * The "Expanding Brain" meme object
 */
class BrainMeme {

  /**
   * Creates a new "Expanding Brain" meme object
   * @param {...string} strings - The strings to be added to the meme. Minimum 2. If there are more than 10, the excess will be removed.
   */
  constructor(...strs) {
    // Set a maximum of strings to 10
    if (strs.length > 11) strs.length = 11

    // If there are too few strings, yell at 'em so
    if (strs.length < 2) throw new RangeError("The minimum number of strings is 2")

    // Set the strings
    this.strings = strs
  }

  /**
   * Removes the strings whose indexes are ≥11
   */
  check() {
    if (this.strings.length > 11) this.strings.length = 11
  }

  /**
   * Adds a string to the meme object.
   * @param {string} strings - The string to add
   * @return {BrainMeme} The meme object
   */
  addString(str) {
    this.strings.push(str)
    this.check()
    return this
  }

  /**
   * Adds multiple strings to the meme object. Like {@link BrainMeme#addString}
   * @param {string[]} strings - The array of strings to add
   * @return {BrainMeme} The meme object
   */
  addStrings(str) {
    this.strings.push(...str)
    this.check()
    return this
  }

  /**
   * Generates the Buffer to be used in other contexts
   * @return {Promise<Buffer>} The buffer of the image
   */
  async build() {
    let y = [0, 195, 376, 565, 753, 918, 1097, 1287, 1497, 1693, 1877];
    let canvas;

    const { body } = await request.get(image);
		const data = await loadImage(body);

    if (this.strings.length == 11) {
      canvas = createCanvas(data.width, data.height);
    } else {
      canvas = createCanvas(data.width, y[this.strings.length -1] - 2)
    }

    const ctx = canvas.getContext('2d');

    ctx.font = "30px Arial";
    this.strings.forEach((text, index) => {
      ctx.fillText(text, 10, y[i] + 20);
    })

    return canvas
  }
}

module.exports = BrainMeme
