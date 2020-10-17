const j2s = require('joi-to-swagger');
const joi = require('joi');
const yargs = require('yargs');

const args = yargs.argv;
//console.log(args);
//const s = require('./schema1');
const s = require(args['a']);
//console.log(s);

const { swagger } = j2s(s, null);

console.log(JSON.stringify(swagger));