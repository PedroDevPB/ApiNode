const express = require('express');
const router = express.Router();

let livros = [
    { id: 1, titulo: 'é assim que acaba', autor: 'collen roover', preco: 30, },

    { id: 2, titulo: '1984', autor: 'xi jin ping', preco: 40, },

    { id: 3, titulo: 'o mentiroso', autor: 'tua mae', preco: 20, }
];

router.get('/', (req, res) => {
    res.json(livros);
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(p => p.id === id);

    if (!livro) {

        return res.status(404).send(`<h1>Produto não encontrado!</h1>`);
    }

    res.json(livro)
});

router.post('/', (req, res) => {
    const {titulo,autor ,preco } = req.body;

    if (titulo && autor && preco == null) {
        return res.status(400).json({
            mensagem: 'Campos obrigatórios: Título, nome do autor e preço.'
        });
    }

    const novoId = livros.length
        ? Math.max(...livros.map(p => p.id)) + 1
        : 1;

    const novoLivro = { id: novoId, titulo, autor, preco: Number(preco) };

    livros.push(novoLivro);

    res.status(201).json(novoLivro);
});

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { titulo, autor, preco } = req.body;

    if(titulo && autor && preco == null){
        return res.status(400).json({mensagem:'campos obrigatorios: titulo, autor e preço'});
    }

    const novoId = livros.length
        ? Math.max(...livros.map(p => p.id)) + 1
        : 1;
    const index = livros.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    livros[index] = {id:novoId, titulo, autor, preco: Number(preco) };
    res.json(livros[index]);

});

router

module.exports = router;