
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_attending').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_attending').insert([
        {attendee_id: 1, potluck_id:1, bringing_item_id:1},
        {attendee_id: 2, potluck_id:2, bringing_item_id:4},
        {attendee_id: 3, potluck_id:3, bringing_item_id:7},

        {attendee_id: 2, potluck_id:1, bringing_item_id:2},
        {attendee_id: 3, potluck_id:1, bringing_item_id:3},

        {attendee_id: 1, potluck_id:2, bringing_item_id:5},
        {attendee_id: 3, potluck_id:2, bringing_item_id:6},

        {attendee_id: 1, potluck_id:3, bringing_item_id:8},
        {attendee_id: 2, potluck_id:3, bringing_item_id:9},
      ]);
    });
};
