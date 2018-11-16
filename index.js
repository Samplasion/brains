const Jimp = require("jimp")
const imgs = [null, null, "https://cdn.discordapp.com/attachments/485136690906660864/512857019753955328/2.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857024191791104/3.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857029019172865/4.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857032995635202/5.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857041317003274/6.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857049651216388/7.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857058014527498/8.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857067850301440/9.jpg", "https://cdn.discordapp.com/attachments/485136690906660864/512857068697550852/10.jpg"]

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
    this.check()
    return this
  }

  /**
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
    let res = await image.getBufferAsync(Jimp.MIME_JPEG)
    return res
  }
}
