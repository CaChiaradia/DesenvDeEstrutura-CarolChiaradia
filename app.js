const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const settings = require("./config/settings");
const Cliente = require("./model/cliente");
const autentica = require("./middleware/autentica");
const bcrypt = require("bcrypt");
const confCors ={
    origin:"*",
    opitionSucessStatus:200
}

app.use(express.json());

mongoose.connect(settings.dbpath,{useNewUrlParser:true, useUnifiedTopology:true});

app.post("/login",(req,res)=>{
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    
    Cliente.findOne({usuario:usuario},(err,dados)=>{
        if(!dados)return res.status(404).send({output:"Usuario não existe"});
        bcrypt.compare(senha,dados.senha, (err,dt)=>{
            if(!dt)return res.status(400).send({output:"Senha incorreta"});
            const token = creatToken(dados._id, dados._usuario, dados._nome, dados._email)
            res.status(200).send({output:"Usuario Logado", token:token});
        })
    })

})


app.get("/",cors(confCors),(req,res)=>{

    Cliente.find((erro, dados)=>{
        if (erro) {
            res.status(400).send({output:`Ocorreu um erro durante o processamento da sua requisição ${erro}`});
            return
    }
    res.status(200).send({output:'Clintes Cadastrados', resultado:dados});
    })
});


app.post("/cadastro",cors(confCors),(req,res)=>{

    const dados = new Cliente(req.body);
    dados.save().then((dt)=>{
        res.status(201).send({output:"Dados Cadastrados com sucesso", payload:dt})
    }).catch((erro)=>res.status(400).send({output:`Erro ao tentar cadastrar ${erro}`}));   

});

app.put("/atualizar/:id",cors(confCors),autentica,(req,res)=>{

    Cliente.findByAndUpdate(req.params.id,req.body,{new:True},(erro, dados)=>{
        if (erro){
            res.status(400).send({output:"Dados Atualizados", payload:dados});
            return
        }
        res.status(200).send({resultado:dados});
    })

});

app.delete("/apagar/:id",cors(confCors), (req,res)=>{

    Cliente.findByIdAndDelete(req.params.id,(erro,dados)=>{
        if (erro){
            res.status(400).send({output:`Erro ao tentar apagar ${erro}`})
            return
        }
        res.status(204).send({resultado:"Cliente apagado"});
    })

});

app.use((req,res)=>{
    res.type("application/json");
    res.status(404).send('404 - Not Found');    

});


const creatToken = (id, usuario, nome, email)=>{
    return jwt.sign({id:id, usuario:usuario,nome:nome, email:email},settings.jwt_key,{expiresIn:settings.jwt_expires})
}


app.listen(3000,()=>console.log(`Servidor online na porta 3000. Pata encerrar tecle CTRL+C`))

