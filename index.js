import express from "express";
import hbs from "hbs"
import bodyParser from 'body-parser';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as fn from "./utils/function.js";

const app = express();

hbs.registerPartials(join(dirname(fileURLToPath(import.meta.url)), "/views/partials"));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000);

app.get("/", (req, res) => {
    res.render("login");
})

app.post("/", async (req, res) => {
    try {
        const resultado = await fn.login(req.body)
        if (resultado.isOK) {
            res.render("msge", {msge: "Has ingresado correctamente"});    
        } else {
            res.render("msge", {msge: resultado.msge});
        }
    } catch (e) {
        res.render("msge", {msge: e});
    }
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", async (req, res) => {
    try {
        const resultado = await fn.register(req.body)
        if (resultado.isOK) {
            res.render("msge", {msge: "Te has registrado correctamente"});  
        } else {
            res.render("msge", {msge: resultado.msge});
        }
    } catch (e) {
        res.render("msge", {msge: e});
    }
})

app.get("/usuarios", async (req, res) => {
    try {
        const resultado = await fn.usuarios()
        res.render("usuarios", {resultado});
    } catch (e) {
        res.render("msge", {msge: e});
    }
})

app.get("*", (req, res) => {
    res.redirect("/");
})

