
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {name:'none'},
        {name: 'apples'},
        {name: 'bananas'},
        {name: 'cherries'},
        {name: 'soup'},
        {name: 'tea'},
        {name: 'chips'}
      ]);
    });
};
