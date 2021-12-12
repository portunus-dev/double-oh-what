const fs = require('fs')
var path = require('path');

const { getKey } = require('./randomkeygen.com')

if (require.main === module) {
  const str = [
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
  // generate `count` number of keys of random strength
  const [count = 500000] = process.argv.slice(2)
  const fpath = path.join(__dirname, 'data', `keys_${count}.txt`)
  const timeLabel = `${count} keys of random strength saved to ${fpath}`
  console.time(timeLabel)
  try {
    fs.unlinkSync(fpath)
  } catch (e) {}
  const pipe = fs.createWriteStream(fpath)
  for (let i = 0; i < parseInt(count); i++) {
    const key = getKey(str[Math.floor(Math.random() * str.length)])
    pipe.write(`${key}\n`)
  }
  pipe.end()
  console.timeEnd(timeLabel)
}
