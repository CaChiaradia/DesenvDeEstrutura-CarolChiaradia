const express = require("express")
const cors = require("cors")
const app = express();

app.use(express.json());

mongoose.connect(urldb,{useNewUrlParser:true, useUnifiedTopology:true});

const mongoose = require("mongoose");
const urldb = "mongodb+srv://carol:123456@conclusaodecurso.vqna6.mongodb.net/ConclusaoDeCurso?retryWrites=true&w=majority"

const tabela = new mongoose.Schema({
    nome:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    cpf:{type:String, required:true, unique:true},
    telefone:String,
    idade:{type:String, min:16, max:120},
    senha:String,
    usuario:{type:String, unique:true},
    datacadastro:{type:Date, default:Date.now}

});

const Cliente = mongoose.model("cadastrocliente", tabela);



app.get("/", (req,res)=>{

    Cliente.find((erro, dados)=>{
        if (erro) {
            res.status(400).send({output:`Ocorreu um erro durante o processamento da sua requisição ${erro}`});
            return
    }
    res.status(200).send({output:'Clintes Cadastrados', resultado:dados});
    })
});


app.post("/cadastro",(req,res)=>{

    const dados = new Cliente(req.body);
    dados.save().then((dt)=>{
        res.status(201).send({output:"Dados Cadastrados com sucesso", payload:dt})
    }).catch((erro)=>res.status(400).send({output:`Erro ao tentar cadastrar ${erro}`}));   

});

app.put("/atualizar/:id", (req,res)=>{

    Cliente.findByAndUpdate(req.params.id,req.body,{new:True},(erro, dados)=>{
        if (erro){
            res.status(400).send({output:"Dados Atualizados", payload:dados});
            return
        }
        res.status(200).send({resultado:dados});
    })

});

app.delete("/apagar/:id", (req,res)=>{

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

app.listen(3000,()=>console.log(`Servidor online na porta 3000. Pata encerrar tecle CTRL+C`))

