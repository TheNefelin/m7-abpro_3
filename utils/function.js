
export async function login(obj) {
    if (!obj.correo) {
        return {isActive : false}
    } 

    if (!obj.clave) {
        return {isActive : false}
    } 


};