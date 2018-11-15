const BrainMeme = require("./index.js")
const fs = require('fs');

new BrainMeme("hi", "hello").build().then(buffer => {
  var wstream = fs.createWriteStream('./img.png');
  wstream.write(buffer)
  wstream.end()
})
