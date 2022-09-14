const express = require('express');
const res = require('express/lib/response');

const app = express();

app.get("/", (req, res) => {
    res.send("Introdução a API")
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")
})