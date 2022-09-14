const express = require('express');
const res = require('express/lib/response');

const app = express();
const port = 8080;

app.use(express.json());

let movies = [{
        id: "1",
        titulo: "Inception",
        diretor: "Christopher Nolan",
        lancamento: "16/07/2010",
    },
    {
        id: "2",
        titulo: "The Irishman",
        diretor: "Martin Scorsese",
        lancamento: "27/09/2019",
    },
];

app.get("/movie", (req, res) => {
    res.json(movies);
});

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));