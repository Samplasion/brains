# brains
An API that generates the ["Expanding Brain"](https://knowyourmeme.com/memes/expanding-brain) meme image

# API

```js
// Import
const BrainMeme = require('brain-api');

// OPTIONAL for saving the Buffer onto the hard drive
const fs = require('fs');

// Set the strings
let strings = ["whom", "whom", "whom'st", "whom'st'd"]

// Create a new instance of the meme
// (here we use destructuring)
let meme = new BrainMeme(...strings)

// Add a new string to it
meme.addString("whom'st'd've")

// Generate the Buffer from the
// image (it's a PNG buffer)
meme.build().then(buffer => {
  var wstream = fs.createWriteStream('./meme.png');
  wstream.write(buffer)
  wstream.end()
})
```

# Contributing

(I'm looking for a better template (10-images) if you can provide me one, contact me: **Samplasion™*#7901*** on Discord)
