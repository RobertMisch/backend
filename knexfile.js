const pgConnection = process.env.DATABASE_URL || {
    host:'localhost',
      post:5432,
      database: 'potlucks-3',
      user:     'postgres',
      password: process.env.DB_PASSWORD,             
};
module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./database/potluck-3.db3",
        },
        useNullAsDefault: true,
        pool: {
            afterCreate: (conn, done) => {
                conn.run("PRAGMA foreign_keys = ON", done);
            }
        },
        migrations: {
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
    },
    testing: {
        client: "sqlite3",
        connection: {
            filename: ":memory:",
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
    },
    production: {
        client: 'pg',
        connection: pgConnection,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
    }
};