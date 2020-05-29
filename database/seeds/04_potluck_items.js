
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('potluck_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('potluck_items').insert([
        {potluck_id: 1, item_id:1, being_brought_by:"test"},
        {potluck_id: 1, item_id:2, being_brought_by:"test"},
        {potluck_id: 1, item_id:3, being_brought_by:"test"},

        {potluck_id: 2, item_id:1, being_brought_by:"test"},
        {potluck_id: 2, item_id:4, being_brought_by:"test"},
        {potluck_id: 2, item_id:5, being_brought_by:"test"},

        {potluck_id: 3, item_id:1, being_brought_by:"test"},
        {potluck_id: 3, item_id:5, being_brought_by:"test"},
        {potluck_id: 3, item_id:6, being_brought_by:"test"},
      ]);
    });
};
