const postgressConfiguration = {
  host: 'ec2-184-73-222-90.compute-1.amazonaws.com',
  port: 5432,
  user: 'd79uavi9v5d3em',
  password: 'Pk-2apTdPsOnSWU9p18KfYCGjS'
};

const options = {
  promiseLib: require('bluebird');
};

const postgress = require('pg-promise')(options);
const db = postgress(postgressConfiguration);


// const query = (sql, params, cb) => {
//   db.connect()
// };


module.exports = {
  getAllCities,
  addCity,
  editCity,
  deleteCity
};
