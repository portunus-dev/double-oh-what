const fs = require('fs')
var path = require('path');

const { getKey } = require('./randomkeygen.com')

const STR = [
  'decent_pw',
  'strong_pw',
  'ft_knox_pw',
  'ci_key',
  '160_wpa',
  '504_wpa',
  '64_wep',
  '128_wep',
  '152_wep',
  '256_wep',
]

async function gen(strength, count = 1_000_000, parent = path.join(__dirname, 'data')) {
  try {
    fs.unlinkSync(fpath)
  } catch (e) {}
  const fpath = path.join(parent, `${strength}_${count}.txt`)
  const pipe = fs.createWriteStream(fpath)
  for (let i = 0; i < count; i++) {
    const key = getKey(strength)
    pipe.write(`${key}\n`)
  }
  pipe.end()
  return fpath
}

if (require.main === module) {
  // generate `count` number of keys per strength level
  const [count = 1_000_000] = process.argv.slice(2)
  const parent = path.join(__dirname, 'data')
  const timeLabel = `${count} keys per strength saved to ${parent}`
  console.time(timeLabel)
  Promise
    .all(STR.map(strength => gen(strength, count, parent)))
    .then(() => console.timeEnd(timeLabel))
}
