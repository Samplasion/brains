const Jimp = require("jimp")
const imgs = [null, null, "https://cdn.discordapp.com/attachments/485136690906660864/512857019753955328/2.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857024191791104/3.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857029019172865/4.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857032995635202/5.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857041317003274/6.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857049651216388/7.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857058014527498/8.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857067850301440/9.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857068697550852/10.jpg"]

/**
 * The "Expanding Brain" meme object
 */
module.exports = class BrainMeme {

  /**
   * Creates a new "Expanding Brain" meme object
   * @param {...string} strings - The strings to be added to the meme
   */
  constructor(...strs) {
    // Cut off the excess
    if (strs.length > 10) strs.length = 10

    // If there are too few strings, yell at 'em so
    if (strs.length < 2) throw new RangeError("The minimum number of strings is 2")

    // Set the strings
    this.strings = strs
  }

  /**
   * Removes the strings whose indexes are ≥11
   * @returns void Nothing - this doesn't return anything
   */
  check() {
    if (this.strings.length > 10) this.strings.length = 10
  }

  /**
   * Addsa string to the meme object.
   * @param {string} strings - The string to add
   * @return BrainMeme The meme object
   */
  addString(str) {
    this.strings.push(str)
    this.check()
    return this
  }

  /**
   * Adds multiple strings to the meme object. Like BrainMeme#addString
   * @param {string[]} strings - The array of strings to add
   * @return BrainMeme The meme object
   */
  addStrings(str) {
    this.strings.push(...str)
    this.check()
    return this
  }

  /**
   * Generates the Buffer to be used in other contexts
   * @return Promise<Buffer> The buffer of the image
   */
  async build() {
    // 176x39 (176x78)
    let y = [24, 147, 272, 391, 544, 703, 868, 1083, 1316, 1505]
    let image = await Jimp.read(imgs[this.strings.length])
    let font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
    this.strings.forEach((s, i) => {
      image.print(font, 0, y[i], {
      	text: s,
      	alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      }, 176, 85);
    })
    let res = await image.getBufferAsync(Jimp.MIME_PNG)
    return res
  }
}
