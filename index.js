const Jimp = require("jimp")

module.exports = class BrainMeme {
  constructor(...strs) {
    if (strs.length > 10) strs.length = 10
    if (strs.length < 2) throw new Error("The minimum number of strings is 2")
    this.strings = strs
  }

  check() {
    if (this.strings.length > 10) this.strings.length = 10
  }

  addString(str) {
    this.strings.push(str)
    check()
  }

  async build() {
    // 176x39 (176x78)
    let y = [24, 147, 272, 391, 544, 703, 868, 1083, 1316, 1505]
    let image = await Jimp.read(`./templates/${this.strings.length}.jpg`)
    let font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE)
    this.strings.forEach((s, i) => {
      image.print(font, 0, y[i], {
      	text: s,
      	alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
      }, 176, 85);
    })
    let res = await image.getBufferAsync(Jimp.MIME_JPEG)
    return res
  }
}
