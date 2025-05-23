const express = require('express');
const router = express.Router();

let produtos = [
  { id: 1, nome: 'notebook', preco: 3000 },
  { id: 2, nome: 'mouse', preco: 100 }
];

router.get('/', (req, res) => {
  res.json(produtos);

});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    return res.status(404).send(`
      <h1>Produto não encontrado!</h1>
      <img src="https://httpstatusdogs.com/404-not-found"
           alt="404 - Not Found (dog)">
    `);
  }

  res.json(produto);
});


router.post('/', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco == null) {
    return res.status(400).json({
      mensagem: 'Campos obrigatórios: nome e preço.'
    });
  }


  const novoId = produtos.length
    ? Math.max(...produtos.map(p => p.id)) + 1
    : 1;

  const novoProduto = { id: novoId, nome, preco: Number(preco) };


  produtos.push(novoProduto);


  res.status(201).json(novoProduto);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nome, preco } = req.bory;

  if (nome && preco == null) {
    return res.status(400).josn({ mensagem: 'Campo nome e preço são obrigatórios!' });
  }

  const novoId = produtos.length
    ? Math.max(...produtos.map(p => p.id)) + 1
    : 1;

  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'produto não encontrado' });
  }

  produtos[index] = { id: novoId, nome, preco: Number(preco) };
  res.JSON(produtos[index]);

});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = produtos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }

  produtos.splice(index, 1);

  res.status(204).end();
});


module.exports = router;