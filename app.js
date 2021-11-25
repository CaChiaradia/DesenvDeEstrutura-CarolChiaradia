const express = require("express")
const cors = require("cors")
const app = express();

app.use(express.json());

const mongoose = require("mongoose");
const urldb = "mongodb+srv://carol:123456@conclusaodecurso.vqna6.mongodb.net/ConclusaoDeCurso?retryWrites=true&w=majority"

const tabela = new mongoose.Schema({
    nome:{type:String, required:true},
    email:{type:String, required:true},
    cpf:{type:String, required:true},
    telefone:String,
    idade:{type:String, required:true},
    senha:String,
    datacadastro:{type:Date, default: Date.now}

});

const Cliente = mongoose.model("cliente", tabela);



app.get("/", (req,res)=>{
    Cliente.find((erro, dados)=>{
        if (erro) {
            res.status(400).send({erro:`Ocorreu um erro durante o processamento da sua requisição ${erro}`});
            return
    }
    res.status(200).send({resultado:dados});
    })
});


app.post("/cadastro", (req,res)=>{
    const dados = new Cliente(req.body);
    dados.save().then(()=>{
        res.status(201).send({retorno:"Dados Cadastrados com sucesso"})
    }).catch((erro)=>res.status(400).send({error: `Erro ao tentar cadastrar ${erro}`}));    
});

app.put("/atualizar/:id", (req,res)=>{
    Cliente.findByAndUpdate(req.params.id,res.body,{new:True},(erro, dados)=>{
        if (erro){
            res.status(400).send({erro:`Erro ao tentar atualizar ${error}`});
            return
        }
        res.status(200).send({resultado:dados});
    })

});

app.delete("/apagar/:id", (req,res)=>{
    Cliente.findByIdAndDelete(req.params.id,(erro,dados)=>{
        if (erro){
            res.status(400).send({error:`Erro ao tentar apagar ${erro}`})
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

