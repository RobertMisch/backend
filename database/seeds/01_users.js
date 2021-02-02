
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'alex', password:'apple'},
        {username: 'barry', password:'banana'},
        {username: 'cynthia', password:'cherry'}
      ]);
    });
};
