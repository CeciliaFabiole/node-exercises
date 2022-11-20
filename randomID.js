let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

const ID = crypto.randomUUID()
console.log(ID)