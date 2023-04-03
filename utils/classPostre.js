
import pkg from 'pg';
const { Pool } = pkg;

export default class PostresSQL {
    constructor() {}
    login() {
        return get()
    }
};

const pool = new Pool({
    user: "postgres",
    password: "123456",
    database: "softlife;",
    host: "localhost"
});

async function get(sql, values) {
    try {
        const res = await pool.query(sql, values);
        return res.rows;
    } catch (e) {
        console.log(e)
        return [];
    };
};