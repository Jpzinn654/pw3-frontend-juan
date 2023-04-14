const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//config ejs
app.use(express.static('public'));
app.set('view engine', 'ejs');

//rota de acesso ao início da página
app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/perfumes', (req, res)=>{
    res.render('perfumes/index');
});

//rota axios para conexão com a api
app.get('/listarPerfume', (req, res)=>{
   
    const urlListarPerfume = 'http://localhost:3000/listarPerfume';

    axios.get(urlListarPerfume)
    .then((response)=>{

        console.log(response.data);
        let perfumes = response.data;
        res.render('perfumeS/listarPerfume', {perfumes});

    });
});

app.get('/editarPerfume/:cod_perfume', (req, res)=>{

    let {cod_perfume} = req.params
    
    urlListarPerfumePK = `http://localhost:3000/listarPerfumePK/${cod_perfume}`

    axios.get(urlListarPerfumePK)
    .then((response)=>{

        // console.log(response.data);

        let perfume = response.data;
        res.render('perfumes/editarPerfume', {perfume});
    })
    
})

app.post('/editarPerfume', (req, res)=>{

    let urlEditar = 'http://localhost:3000/alterarPerfume'

    axios.put(urlEditar, req.body)
    .then((response)=>{
        res.redirect('/listarPerfume')
    })
});


app.get('/deletarPerfume/:cod_perfume', (req, res)=>{
    console.log(req.params);
 
     let {cod_perfume} = req.params;
 
     const urlExcluirPerfume = `http://localhost:3000/deletarPerfume/${cod_perfume}`;
 
     axios.delete(urlExcluirPerfume)
     .then((response)=>{
         res.redirect('/listarPerfume');
     });
     
 });

app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});