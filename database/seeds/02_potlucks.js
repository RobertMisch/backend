
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('potlucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('potlucks').insert([
        {owner_id: 1, name:"alex's potluck", where:"down the block", date:"1/12",category:"test"},
        {owner_id: 2, name:"barry's potluck", where:"up the block", date:"2/12",category:"test"},
        {owner_id: 3, name:"cynthia's potluck", where:"the block over", date:"1/21",category:"test"}
      ]);
    });
};
