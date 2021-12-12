/**
 * Ported from https://github.com/circlecell/randomkeygen.com/blob/871a208597511722f7e3c7944a2a8bfbfe866868/js/index.js
 *
 * All credit goes to the original author.
 */
 const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
 const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
 const numbers = '1234567890'
 const special = '`~!@#$%^&*()-=_+[]{}|;\':",./<>?'
 const hex = '123456789ABCDEF'

 function keyGen(
   length,
   useLowerCase = true,
   useUpperCase = true,
   useNumbers = true,
   useSpecial = true,
   useHex = false
 ) {
   let chars = ''
   let key = ''

   if (useLowerCase) chars += lowerCase
   if (useUpperCase) chars += upperCase
   if (useNumbers) chars += numbers
   if (useSpecial) chars += special
   if (useHex) chars += hex

   for (let i = 0; i < length; i++) {
     key += chars[Math.floor(Math.random() * chars.length)]
   }

   return key
 }

 function getKey(strength) {
   switch (strength) {
   case 'decent_pw':
     return keyGen(10, true, true, true, false, false)
   case 'strong_pw':
     return keyGen(15, true, true, true, true, false)
   case 'ft_knox_pw':
     return keyGen(30, true, true, true, true, false)
   case 'ci_key':
     return keyGen(32, true, true, true, false, false)
   case '160_wpa':
     return keyGen(20, true, true, true, true, false)
   case '504_wpa':
     return keyGen(63, true, true, true, true, false)
   case '64_wep':
     return keyGen(5, false, false, false, false, true)
   case '128_wep':
     return keyGen(13, false, false, false, false, true)
   case '152_wep':
     return keyGen(16, false, false, false, false, true)
   case '256_wep':
     return keyGen(29, false, false, false, false, true)
   default:
     throw Error(`No such strength "${strength}"`)
   }
 }

 module.exports = { getKey }
