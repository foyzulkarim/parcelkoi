// const cypto = require('crypto');
// const base64url = require('base64url');

// const header = {
//     "alg": "HS256",
//     "typ": "JWT"
// };
// const headerB64 = base64url(JSON.stringify(header));

// const payload = { foo: 'bar' };
// const payloadB64 = base64url(JSON.stringify(payload));

// const secret = 'my secret';
// let content = `${headerB64}.${payloadB64}`;
// let signature = cypto.createHmac('sha256', secret).update(content).digest('hex');
// let token = `${content}.${signature}`;
// console.log(token);

var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar', role: 'admin', username: 'foyzul', exp: Math.floor(Date.now() / 1000) + 3600 }, 'secret');
console.log(token);
var decoded = jwt.verify(token, 'secret');
console.log(decoded) // bar