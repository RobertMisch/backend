// const knex = require('knex');

// const knexConfig = require('../knexfile.js');

// module.exports = knex(knexConfig.production);
const dbEngine = processenv.DB || 'development';
const config = require('../knexfile')[dbEngine];

module.exports = require('knex')(config);