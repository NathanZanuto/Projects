/*
Banco myWallet - um futuro possível!
*/

const readline = require('node:readline/promises'); 
// Importação necessária para o readline nativo funcionar
const { stdin: input, stdout: output } = require('node:process');

// lista com todos os beneficiarios cadastrados
const lista_beneficiarios = [];

// Molde/Protótipo para as contas
const modeloConta = {
    titular: undefined,
    saldo: undefined,
    conta: undefined,

    depositarDinheiro(valor) {
        this.saldo += valor;
    },
    sacarDinheiro(valor) {
        this.saldo -= valor;
    },
    consultarSaldo() {
        return this.saldo;
    }
};

// funcao para cadastro de um novo beneficiario do banco
function novoBeneficiario(nome, saldoInicial, tipoConta) {
    // Criamos um NOVO objeto baseado no modelo, para evitar clonagem
    const novaConta = Object.create(modeloConta);
    
    novaConta.titular = nome;
    novaConta.saldo = saldoInicial;
    novaConta.conta = tipoConta;

    lista_beneficiarios.push(novaConta);
    return "Novo beneficiário cadastrado!";
}

// function para iniciar o sistema da carteira digital
async function iniciarSistema() {
    //Agora passamos input e output para o terminal saber de onde ler
    const rl = readline.createInterface({ input, output });
    let name, saldo, tipoConta;
    let option = "0";

    console.log(`
            Seja bem-vindo ao Banco myWallet`);

    // Mudamos para string para bater com o retorno do teclado
    while (option !== '6') {
        console.log(`
            SELECIONE A SUA OPERAÇÃO
            1- Cadastrar conta
            2- Depositar
            3- Sacar
            4- Consultar saldo
            5- Consultar beneficiários
            6- Finalizar sessão
        `);

        // prompt alterado para rl.question nativo
        option = await rl.question(`
            Digite o número da operação:`);

        // Cases alterados para strings ('1', '2'...)
        switch (option) {
            case '1':
                name = await rl.question("Titular da conta: ");
                saldo = Number(await rl.question("Saldo inicial: "));
                tipoConta = await rl.question("Tipo de conta [CC(Conta Corrente) ou P(Poupança)]: ");

                novoBeneficiario(name, saldo, tipoConta);
                console.log("\n✅ Novo beneficiário cadastrado!");
                break;

            case '2':
                let titularConta = await rl.question("Titular da conta: ");
                // Convertendo o valor digitado para número
                let deposito = Number(await rl.question("Valor de depósito: "));

                const contaEncontrada = lista_beneficiarios.find(conta => conta.titular.toLowerCase() === titularConta.toLowerCase());

                console.log(
                    contaEncontrada ?
                    (contaEncontrada.depositarDinheiro(deposito), `\n✅ Depósito efetuado! Novo saldo: R$ ${contaEncontrada.consultarSaldo()}`)
                    : "\n❌ Titular inexistente!"
                );
                break;
            
            case '3':
                let titular = await rl.question("Titular da conta: ");
                // Convertendo o valor digitado para número
                let saque = Number(await rl.question("Valor de depósito: "));

                const contaLocalizada = lista_beneficiarios.find(conta => conta.titular.toLowerCase() === titular.toLowerCase());

                console.log(
                    contaLocalizada ?
                    (contaLocalizada.sacarDinheiro(saque), `\n✅ Saque efetuado! Novo saldo: R$ ${contaLocalizada.consultarSaldo()}`)
                    : "\n❌ Titular inexistente!"
                );
                break;

            case '4':
                let beneficiario = await rl.question("Titular da conta: ");

                const contaBeneficiario = lista_beneficiarios.find(conta => conta.titular.toLowerCase() === beneficiario.toLowerCase());

                console.log(
                    contaBeneficiario ?
                    `Saldo atualizado: ${contaBeneficiario.consultarSaldo()}`
                    : "\n❌ Titular inexistente!"
                );
                break;
            
            case '5':
                const senha = await rl.question("Senha de autorização de consulta: ");
                if(senha.toLowerCase()=='admin'){
                    console.log("\n--- BENEFICIÁRIOS CADASTRADOS ---")
                    lista_beneficiarios.forEach(c => console.log(`- ${c.titular} (${c.conta}): R$ ${c.saldo}`))
                }else{
                    console.log("Senha incorreta!❌")
                }

                break;

            case '6':
                console.log("\nO Banco myWallet agradece a sua preferência!");
                break;
                
            default:
                if(option !== '6') console.log("\n⚠️ Opção inválida!");
                break;
        }
    }

    rl.close();
}

// Executa o sistema
iniciarSistema();
