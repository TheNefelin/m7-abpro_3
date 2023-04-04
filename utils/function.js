import PostreSQL from "./classPostgre.js"

export async function login(obj) {
    const sql = new PostreSQL();

    if (!obj.correo || !obj.clave) {
        return {isOK : false, msge: "Debe llenar todos los campos"}
    };

    const res = await sql.pgLogin(obj);
    
    if (parseInt(res[0].count) > 0) {
        return {isOk: true, msge: "Has ingresado correctamente"};
    } else {
        return {isOk: false, msge: "Usuario o contraseña incorrecta"};
    }
};

export async function register(obj) {
    const sql = new PostreSQL();
    
    if (!obj.correo || !obj.clave) {
        return {isOK : false, msge: "Debe llenar todos los campos"}
    };

    const res = await sql.pgRegister(obj);

console.log(res)

    if ("email" in res[0]) {
        return {isOK : true, msge: "Usuario registrado correctamente"}
    } else {
        return {isOK : false, msge: "El usuario ya existe"}
    }
};