const express = require('express');
const app = express();

app.use(express.json());

const produtosRouter = require('./routes/produtos');

app.use('/produtos', produtosRouter);


const produtosbooks = require('./routes/livros');

app.use('/livros', produtosbooks);


    if (!produtosRouter) {
        return res.status(404).send(`
      <h1>Produto não encontrado!</h1>
      <img src="https://http.cat/404.jpg" alt="404 Not Found">">
        `);
    }

    app.listen(3000, () => {
    console.log('servidor rodando com sucesso na porta 3000');
});