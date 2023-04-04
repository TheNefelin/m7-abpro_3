
import pkg from 'pg';
const { Pool } = pkg;

export default class PostreSQL {
    #sql;
    constructor() {}
    pgLogin(obj) {
        this.#sql = "SELECT COUNT(*) FROM usuario WHERE email = $1 AND password = $2"
        return getData(this.#sql, [obj.correo, obj.clave]);
    }
    pgRegister(obj) {
        this.#sql = "INSERT INTO usuario (email, password) VALUES ($1, $2) RETURNING email"
        return getData(this.#sql, [obj.correo, obj.clave]);
    }
    pgUsuarios() {
        this.#sql = "SELECT email FROM usuario"
        return getData(this.#sql, []);
    }
};

const pool = new Pool({
    user: "postgres",
    password: "!nfra48x",
    database: "softlife",
    host: "localhost"
});

async function getData(sql, values) {
    try {
        const res = await pool.query(sql, values);
        return res.rows;
    } catch (e) {
        return [{isOK: false, msge: e.detail}];
    };
};