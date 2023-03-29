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

app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});