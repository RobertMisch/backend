
exports.up = function (knex) {
    return knex.schema
        .createTable("users", users => {
            users.increments();

            users.string("username", 255).unique().notNullable();
            users.string("password", 255).notNullable()
        })
        .createTable("potlucks", potlucks => {
            potlucks.increments();

            potlucks.
                integer("owner_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            potlucks.string("name", 255).unique().notNullable();
            potlucks.string("where", 255).notNullable();
            potlucks.string("date", 255).notNullable();
            potlucks.string("category", 255).notNullable();
        })
        .createTable("items", users => {
            users.increments();

            users.string("name", 255).unique().notNullable();
        })
        .createTable("potluck_items", potluck_items => {
            potluck_items.increments();
            potluck_items
                .integer("potluck_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("potlucks")
                .onUpdate("CASCADE")
                .onDelete("RESTRICT");
            potluck_items
                .integer("item_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("items")
                .onUpdate("CASCADE")
                .onDelete("RESTRICT");

            potluck_items.boolean("being_brought").defaultTo(false)
        })
        .createTable("user_attending", user_attending => {
            user_attending.increments();
            user_attending
                .integer("attendee_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            user_attending
                .integer("potluck_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("potlucks")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            user_attending
                .integer("bringing_item_id")
                .unsigned()
                .references("id")
                .inTable("potluck_items")
                .onUpdate("CASCADE")
                .onDelete("RESTRICT")
                .defaultTo(1);
        })
};

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists("user_attending")
    .dropTableIfExists("potluck_items")
    .dropTableIfExists("items")
    .dropTableIfExists("potlucks")
    .dropTableIfExists("users")
};
