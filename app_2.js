const express = require('express');
const res = require('express/lib/response');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post('/movie', (req, res) => {
    const movie = req.body

    console.log(movie);
    movies.push(movie);
    res.send('Filme adicionado a lista!');
});

app.put('/movie/:id', (req, res, next) => {
    try {
        // get id from :id, parse it to an int
        let id = parseInt(req.params.id, 10) || false

        if (!id) {
            let err = new Error('Invalid movie id')
            err.status = 422
            throw err
        }

        let index = movies.findIndex(v => v.id == id)
        if (index === -1) {
            let err = new Error('Filme não encontrado')
            err.status = 404
            throw err
        }

        let errors = {}

        if (!req.body.id) {
            errors.id = 'Id é um campo obrigatório'
        } else if (isNaN(req.body.id)) {
            errors.id = 'Id inválido! Precisa ser um número'
        }

        if (!req.body.titulo) {
            errors.titulo = 'titulo é um campo obrigatório'
        } else if (req.body.titulo.length <= 1) {
            errors.titulo = 'O título é muito CURTO! Precisa ter no mínimo 2 caracteres'
        } else if (req.body.titulo.length >= 101) {
            errors.titulo = 'O título é muito LONGO! Precisa ter no máximo 100 caracteres'
        }

        if (!req.body.diretor) {
            errors.diretor = 'diretor é um campo obrigatório'
        } else if (req.body.diretor.length <= 1) {
            errors.diretor = 'O nome do diretor é muito CURTO! Precisa ter no mínimo 2 caracteres'
        } else if (req.body.diretor.length >= 255) {
            errors.diretor = 'O nome do diretor é muito LONGO! Precisa ter no máximo 254 caracteres'
        }

        if (!req.body.lancamento) {
            errors.lancamento = 'lancamento é um campo obrigatório'
        }

        movies[index] = {
            id: req.body.id,
            titulo: req.body.titulo,
            diretor: req.body.diretor,
            lancamento: req.body.lancamento
        }

        res.send('Filme alterado!');

    } catch (err) {
        next(err)
    }
})

app.get('/movie/:id', (req, res) => {
    const id = req.params.id

    for (let movie of movies) {
        if (movie.id === id) {
            res.json(movie)
            return
        }
    }
    res.status(404).send('movie not found!')
})

app.delete('/movie/:id', (req, res) => {
    const id = req.params.id

    movies = movies.filter(movie => {
        if (movie.id !== id) {
            return true;
        }
        return false;
    });
    res.send("FIlme foi apagado!");
});

app.listen(8080, () => console.log('Servidor iniciado na porta 8080'));