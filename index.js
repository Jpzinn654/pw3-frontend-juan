const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* INICIO DAS CONFIGURAÇÕES DO EJS:  */
app.use(express.static('public'));
app.set('view engine', 'ejs');
/* FIM DAS CONFIGURAÇÕES DO EJS:  */

/* INICIO DAS ROTAS DE ACESSO AS PÁGINAS EJS*/
app.get('/', (req, res) => {
    res.render('index');
});
/* FIM DAS ROTAS DE ACESSO AS PÁGINAS EJS*/

/* INICIO DAS ROTAS DE CATEGORIA */

/*CADASTRO*/
app.get('/categoria', (req, res) => {
    res.render('categoria/index');
});

/*LISTAGEM*/
app.get('/listagemCategorias', (req, res) => {

    /* CONFIGURAÇÃO DA REQUISIÇÃO BACK END VIA AXIOS*/

    /* ROTA DO BACK END */
    const urlListarCategoria = 'http://localhost:3000/listarCategoria';

    /*
     CHAMADA DO AXIOS PARA A ROTA DO BACK END 
     PARAMETROS DO VERBO:
     1 - ROTA
     2 - .then DE TRATAMENTO DA RESPOSTA
     */
    axios.get(urlListarCategoria)
        .then((response) => {

            console.log(response.data);
            let categorias = response.data;
            res.render('categoria/listagemCategoria', { categorias });

        });
});

/*EDITAR*/
app.get('/editarCategoria/:cod_categoria', (req, res) => {

    let { cod_categoria } = req.params;

    urlListarCategoriaPK = `http://localhost:3000/listarCategoriaPK/${cod_categoria}`;

    // console.log("COD_CATEGORIA: " + cod_categoria); 

    axios.get(urlListarCategoriaPK)
        .then((response) => {
            let categoria = response.data;
            //console.log(categoria.data);
            res.render('categoria/editarCategoria.ejs', { categoria });

        });

});

app.post('/editarCategoria', (req, res) => {

    // console.log(req.body);
    // res.send('DADO ALTERADO');

    let urlEditar = 'http://localhost:3000/alterarCategoria';

    axios.put(urlEditar, req.body)
        .then((response) => {
            res.redirect('/listagemCategorias');
        });

});

app.get('/excluirCategoria/:cod_categoria', (req, res) => {
    console.log(req.params);

    let { cod_categoria } = req.params;

    const urlExcluirCAtegoria = `http://localhost:3000/excluirCategoria/${cod_categoria}`;

    axios.delete(urlExcluirCAtegoria)
        .then((response) => {
            res.redirect('/listagemCategorias');
        });

});


/* FIM DAS ROTAS DE CATEGORIA */

/*INICIO DAS ROTAS DE LIVROS*/

app.get('/livro', (req, res) => {

    const urlListarCategoria = 'http://localhost:3000/listarCategoria';
    axios.get(urlListarCategoria)
        .then((response) => {
            console.log(response.data);
            let categorias = response.data;
            //res.send(categorias.data);
            res.render('livro/index', { categorias });
        });

});

/*LISTAGEM DE LIVROS*/

app.get('/listagemLivro', (req, res) => {
    const urlListarLivro = 'http://localhost:3000/listarLivro';
    axios.get(urlListarLivro)
        .then((response) => {
            console.log(response.data);
            let livros = response.data;
            //res.send(categorias.data);
            res.render('livro/listagemLivro', { livros });
        });
});

/* EDITAR LIVRO */
app.get('/editarLivro/:cod_livro', (req, res) => {

    let { cod_livro } = req.params;

    urlListarLivroPK = `http://localhost:3000/listarLivroCodigo/${cod_livro}`;

    // console.log("COD_CATEGORIA: " + cod_categoria); 

    axios.get(urlListarLivroPK)
        .then((response) => {
            let livro = response.data;
            //console.log(categoria.data);

            const urlListarLivro = 'http://localhost:3000/listarCategoria';

            axios.get(urlListarLivro)
                .then((response) => {
                    let categoria = response.data;
                    res.render('livro/editarLivro.ejs', { livro, categoria });
                });
        });

});





// app.post('/editarLIvro', (req, res) => {

//     // console.log(req.body);
//     // res.send('DADO ALTERADO');

//     let urlEditarLivro = 'http://localhost:3000/editarLivro';

//     axios.put(urlEditarLivro, req.body)
//         .then((response) => {
//             res.redirect('/listagemCategorias');
//         });

// });

app.listen(3001, () => {
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});

