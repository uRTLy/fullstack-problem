const postgressConfiguration = {
  host: 'fizzy-cherry.db.elephantsql.com',
  port: 5432,
  user: 'cxpeayqi',
  password: 'BQiHhSBTytESf-ClAFKDzea1b_8p0OhA'
};


const options = {
  promiseLib: require('bluebird')
};

const connectionString = 'postgres://cxpeayqi:BQiHhSBTytESf-ClAFKDzea1b_8p0OhA@fizzy-cherry.db.elephantsql.com:5432/cxpeayqi'

const postgress = require('pg-promise')(options);
const db = postgress(connectionString);

const path = require('path');

const QueryFile = require('pg-promise').QueryFile;

const sql = (file) => {
  const filePath = path.join(__dirname, file);
  return new QueryFile(filePath, { minify: true });
};

module.exports = {
  db,
  sql
};
