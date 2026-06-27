const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "powerlifting_coach",
    user: "postgres",
    password: "Yashu@9389730548"
});

module.exports = pool;