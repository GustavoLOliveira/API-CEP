// var consultaCep = fetch("https://viacep.com.br/ws/01001000/json/")
// .then(resposta => resposta.json())
// .then(r => {  
//     if(r.erro){
//         throw Error("Esse cep não existe!")
//     }else{
//         console.log(r)
//     }
//     })
// .catch(erro => console.log(erro))
// .finally(mensagem => console.log("Processamento concluido")); 
// fetch metodo assincrono com necessidade de uma url de API como parametro
//then = então
// arrow function de resposta.json() converte para json
//Finaly() = finalmente, mostrando que o processamento terminou
// console.log(consultaCep);

async function buscaEndereco(cep){
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try{
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCepConvertida = await consultaCep.json();
        if(consultaCepConvertida.erro){
            throw Error('CEP invalido!');
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var bairro = document.getElementById('bairro');
        var estado = document.getElementById('estado');

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        estado.value = consultaCepConvertida.uf;
        bairro.value = consultaCepConvertida.bairro;
        console.log(consultaCepConvertida);
        return;
    }catch(erro){
        mensagemErro.innerHTML = `<p>CEP Invalido, tente novamente! </p>`;
        console.log(erro);
    }
}

// let ceps = ['01001000', '01001001'];
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));

// Promise.all(conjuntoCeps).then(respostas => console.log(respostas))

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
