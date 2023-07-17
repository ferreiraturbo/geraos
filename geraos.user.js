// ==UserScript==
// @name         Gera_OS
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  try to take over the world!
// @author       You
// @match        https://erp.turbonettelecom.com.br/attendance
// @downloadURL  https://raw.githubusercontent.com/ferreiraturbo/geraos/master/geraos.user.js
// @updateURL    https://raw.githubusercontent.com/ferreiraturbo/geraos/master/geraos.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=turbonettelecom.com.br
// @grant        none
// ==/UserScript==

(function() {
'use strict';
    // Estilos CSS para o formulário
    var styles = `
    textarea {
        color: white;
        resize: none;
        outline: none;
        width: 95%;
        min-height: 100px;
        max-height: 100px;
    }

    .form-group textarea {
        resize: none
        width: 100%;
        outline: none;
        border-color: #4b4b55;
        background-color: #4f504f;
        padding: 8px;
        border: 1px solid #4f504f;
        border-radius: 3px;
        resize: vertical;
        font-family: Arial, sans-serif; 
        font-size: 14px; 
        line-height: 1.4; 
    }

    .form-group textarea:focus {
        outline: none;
        border-color: #4b4b55; /* Cor da borda ao receber foco */
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;
    }

    .modal-content {
        margin: 3rem auto;
        max-width: 700px;
        background: white;
        border-radius: 1rem;
    }

    .modal-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center; 
    }

    :root {
    --color-1: #6366f1;
    --color-1-hover: #4338ca;
    --color-2: #06b6d4;
    --color-2-hover: #0891b2;
    --text-color: #312e81;
    --status-btn-bg: #f8fafc;
    --status-btn-bg-hover: #f1f5f9;
  }

 .container {
    width: 600px;
    max-height: 450px;
    min-height: 300px;
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    margin: 0;
}

  .form-input {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: .5rem;
    box-shadow: inset 0px 1px 2px rgba(0, 0, 0, .1);
    padding: 1rem;
    box-sizing: border-box;
    color: var(--text-color);
    transition: ease-in-out .3s all;
    font-size:16px;
  }

  .form-input::placeholder {
    color: #cbd5e1;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--color-1);
  }

  .btn:focus-within,
  .form-input:focus-within {
    box-shadow: #f8fafc 0px 0px 0px 2px, #c7d2fe 0px 0px 0px 6px, #0000 0px 1px 2px 0px;
  }

  textarea.form-input {
    min-height: 150px;
    margin-top:10px;
    font-size:16px;
  }

  .btn {
    border: 0;
    background: var(--color-1);
    padding: 1rem;
    border-radius: 25px;
    color: white;
    cursor: pointer;
  }

  #prev {
    background-color:  var(--color-2);
  }

  .btn[disabled] {
    opacity: .5;
    pointer-events: none;
  }

  .btn:hover {
    background: var(--color-1-hover);
    transition: ease-in-out .3s all;
  }

  .btn-submit {
    background-color: #43163d;
  }

  .btn-submit:hover {
    background-color: var(--color-2-hover);
  }

  .pagination {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination .btn {
    width: 100%;
    text-align: center;
    margin: 0 6px;
  }

  .tab-status {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  .tab-status span {
    appearance: none;
    background: var(--status-btn-bg);
    border: none;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    margin-right: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab-status span.active {
    background-color: var(--color-2);
    color: white;
  }


  #atendimento > div > div.smartline > input {
     width: 15px;
     height: 15px;
  }

  #atendimento > div > div.callline > input {
     width: 15px;
     height: 15px;
  }

  #atendimento > div > div.smartline {
      margin-bottom: 6px;
  }

 #atendimento > div > div > label  {
      font-size:14px;
  }

  .tabpanel > h2 {
    margin-bottom: 15px;
  }

  .hidden {
    display: none;
  }


  #remoto > input {
     width: 15px;
     height: 15px;
     margin-bottom: 5px;
  }

  #remoto > label {
    font-size:14px;
    margin-bottom: 5px;
  }

  #cidade > div > select {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto;
    font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
    font-size: 18px;
    color: #60666d;
  }

  div.alarmes{
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-content: center;
  height: 100px;
  align-items: center;
  justify-content: baseline;
}

.form-control {
  font-family: system-ui, sans-serif;
  font-size: 12px;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}

.form-control + .form-control {
  margin-top: 1em;
}

.form-control--disabled {
  color: var(--form-control-disabled);
  cursor: not-allowed;
}

input[type="checkbox"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--form-background);
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

input[type="checkbox"]:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}

input[type="checkbox"]:disabled {
  --form-control-color: var(--form-control-disabled);

  color: var(--form-control-disabled);
  cursor: not-allowed;
}

.buttongr {
  appearance: none;
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3B3B3B;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  font-weight: 16px;
  line-height: normal;
  margin: 7px;
  min-width: 0;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100px;
  will-change: transform;
}

.buttongr:disabled {
  pointer-events: none;
}

.buttongr:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.buttongr:active {
  box-shadow: none;
  transform: translateY(0);
}

.exitbutton {
  display: flex;
  justify-content: end;
  width: 100%;
  margin-bottom: 20px;
}

.closeform {
  content: 'X';
  color: #000;
  font-size: 30px;
}

`;
    var barraitem;
    var button;
    var isFormOpen = true;

    function relatoPadrao() {
            setTimeout(function() {
                var setabutton = document.querySelector('button[title="Abrir"]');
                setabutton.click();
            }, 3000)

            setTimeout(function() {
                var relato = document.querySelector('#solicitationRoutingMotiveId-option-0');
                relato.click();
            }, 4000);
    }


    function verificarOverlay() {
        return document.querySelector('.modal-overlay') !== null;
    }


    // Função para verificar se a barra está presente
    function verificarBarra() {
        var barraitem = document.querySelector("#react-portal > div > div > header.MuiPaper-root.MuiAppBar-root.jss38.MuiAppBar-positionStatic.MuiAppBar-colorTransparent.MuiPaper-elevation4 > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-9.MuiGrid-grid-md-9.MuiGrid-grid-lg-10 > div > div.MuiGrid-root.jss37.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-5.MuiGrid-grid-md-5.MuiGrid-grid-lg-3")
        var buttonetiqueta = document.querySelector("body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogActions-root.MuiDialogActions-spacing > button");

        if (barraitem) {
            barraitem.style.flexDirection = "row-reverse";
            barraitem.style.justifyContent = "flex-start";
            // A barra está presente, então podemos adicionar o botão
            adicionarBotao(barraitem);
        } else {
            // A barra ainda não está presente, então aguardamos um pouco e verificamos novamente
            setTimeout(verificarBarra, 500);
        }
    }

    // Função para adicionar o botão à barra
    function adicionarBotao(barraitem) {
        // Cria o botão
        button = document.createElement('button');
        button.innerHTML = 'GERA OS';
        // Adiciona uma classe CSS ao botão para estilização opcional
        button.classList.add('buttongr');
        // Adiciona o botão à barra horizontal
        barraitem.appendChild(button);

        var styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);

        button.addEventListener('click', function() {

            if (verificarOverlay()) {
                var formexist = document.querySelector('.modal-overlay');

                if (isFormOpen) {
                    formexist.classList.add('hidden'); // Oculta o formulário
                    isFormOpen = false; // Define o estado do formulário como minimizado
                } else {
                    formexist.classList.remove('hidden'); // Exibe o formulário novamente
                    isFormOpen = true; // Define o estado do formulário como aberto
                }

            } else {
                openModal();
            }
        });

    }

    // Inicia a veificação da barra
    verificarBarra();


    // Função para abrir o modal de formulário
    function openModal() {

        // Cria o overlay do modal
        var overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        // Cria o conteúdo do modal
        var modal = document.createElement('div');
        modal.className = 'modal-content';

        const container = document.createElement("div");
        container.className = "container";

        const exitcontainer = document.createElement("div");
        exitcontainer.className = "exitbutton";

        const exit = document.createElement("a");
        exit.className = "closeform";
        exit.innerHTML = "X";
        exit.setAttribute('href', "#");
        exitcontainer.appendChild(exit);

        container.appendChild(exitcontainer);

        const tabStatus = document.createElement("div");
        tabStatus.className = "tab-status";
        container.appendChild(tabStatus);

        for (let i = 1; i <= 11; i++) {
            const span = document.createElement("span");
            span.className = "tab";
            if (i === 1) {
                span.classList.add("active");
            }
            span.textContent = i;
            tabStatus.appendChild(span);
        }

        const form = document.createElement("form");
        form.action = "#";
        container.appendChild(form);

        const tabList = document.createElement("div");
        tabList.setAttribute("role", "tab-list");
        form.appendChild(tabList);

        const solicitante = document.createElement("div");
        solicitante.setAttribute("role", "tabpanel");
        solicitante.id = "solicitante";
        solicitante.className = "tabpanel";
        tabList.appendChild(solicitante);

        const h3Solicitante = document.createElement("h2");
        h3Solicitante.textContent = "Quem é o solicitante?";
        solicitante.appendChild(h3Solicitante);

        const inputSolicitante = document.createElement("input");
        inputSolicitante.type = "text";
        inputSolicitante.name = "solicitante";
        inputSolicitante.className = "form-input";
        solicitante.appendChild(inputSolicitante);

        const contato = document.createElement("div");
        contato.setAttribute("role", "tabpanel");
        contato.id = "contato";
        contato.className = "tabpanel hidden";
        tabList.appendChild(contato);

        const h3Contato = document.createElement("h2");
        h3Contato.textContent = "Contato do solicitante";
        contato.appendChild(h3Contato);

        const inputContato = document.createElement("input");
        inputContato.type = "text";
        inputContato.name = "contato";
        inputContato.className = "form-input";
        inputContato.placeholder = "( )_________"
        contato.appendChild(inputContato);

        const endereco = document.createElement("div");
        endereco.setAttribute("role", "tabpanel");
        endereco.id = "endereco";
        endereco.className = "tabpanel hidden";
        tabList.appendChild(endereco);

        const h3Endereco = document.createElement("h2");
        h3Endereco.textContent = "Qual o endereço?";
        endereco.appendChild(h3Endereco);

        const inputEndereco = document.createElement("input");
        inputEndereco.type = "text";
        inputEndereco.name = "endereco";
        inputEndereco.className = "form-input";
        endereco.appendChild(inputEndereco);

        const cidade= document.createElement("div");
        cidade.setAttribute("role", "tabpanel");
        cidade.id= "cidade";
        cidade.className= "tabpanel hidden";
        tabList.appendChild(cidade);

        const h3Cidade= document.createElement("h2");
        h3Cidade.textContent= "Qual Cidade?";
        cidade.appendChild(h3Cidade);

        const divCidade = document.createElement('div');
        divCidade.className = 'cidades';

        const selectElement = document.createElement('select');
        selectElement.className = "form-input";
        const cidades = [
            'Selecione uma cidade', 'Cajobi', 'Monte Verde Paulista', 'Severinia', 'Monte Azul', 'Paraiso',
            'Palmares', 'Novais', 'Tabapuã', 'Embauba', 'Olimpia', 'Guaraci', 'Altair',
            'Suinana', 'Ribeiro dos Santos', 'Onda Verde', 'Bebedouro', 'Pirangi',
            'Vista Alegre do alto', 'Taiaçu', 'Taiuva', 'Taquaral', 'Barretos', 'Colômbia',
            'Laranjeiras'
        ];

        cidades.forEach(function(cidade) {
            const optionElement = document.createElement('option');
            optionElement.value = cidade;
            optionElement.textContent = cidade;
            selectElement.appendChild(optionElement);
        });

        divCidade.appendChild(selectElement);
        cidade.appendChild(divCidade)

        const atendimento= document.createElement("div");
        atendimento.setAttribute("role", "tabpanel");
        atendimento.id= "atendimento";
        atendimento.className= "tabpanel hidden";
        tabList.appendChild(atendimento);

        const h3Atendimento= document.createElement("h2");
        h3Atendimento.textContent= "O atendimento foi por onde?";
        atendimento.appendChild(h3Atendimento);

        const separador= document.createElement("div");
        separador.className= "separador";

        const linhasmart= document.createElement("div")
        linhasmart.className = "smartline"
        const inputSmart= document.createElement("input");
        inputSmart.type= "radio";
        inputSmart.value="SMART"
        inputSmart.name="atendimento"
        inputSmart.className="form-input"
        linhasmart.appendChild(inputSmart);

        const labelSmart=document.createElement('label')
        labelSmart.htmlFor="SMART"
        labelSmart.textContent="SMART"
        linhasmart.appendChild(labelSmart)
        separador.appendChild(linhasmart)
    
        const linhaligacao= document.createElement("div")
        linhaligacao.className = "callline"
        const inputLigacao=document.createElement('input')
        inputLigacao.type="radio"
        inputLigacao.value="TELEFONE"
        inputLigacao.name="atendimento"
        inputLigacao.className="form-input"
        linhaligacao.appendChild(inputLigacao)

        const labelLigacao=document.createElement('label')
        labelLigacao.htmlFor="telefone"
        labelLigacao.textContent="TELEFONE"
        linhaligacao.appendChild(labelLigacao)
        separador.appendChild(linhaligacao)
        atendimento.appendChild(separador)
        atendimento.innerHTML+="<br>"

        const relato=document.createElement('div')
        relato.setAttribute('role','tabpanel')
        relato.id='relato'
        relato.className='tabpanel hidden'
        tabList.appendChild(relato)

        const h3Relato=document.createElement('h2')
        h3Relato.textContent='Do que o solicitante está reclamando?'
        relato.appendChild(h3Relato)

        const textareaRelato=document.createElement('textarea')
        textareaRelato.name='relato'
        textareaRelato.className='form-input'
        relato.appendChild(textareaRelato)

        const procedimento=document.createElement('div')
        procedimento.setAttribute('role','tabpanel')
        procedimento.id='procedimento'
        procedimento.className='tabpanel hidden'
        tabList.appendChild(procedimento)

        const h3Procedimento=document.createElement('h2')
        h3Procedimento.textContent='O que você fez pra ajudar?'
        procedimento.appendChild(h3Procedimento)

        const textareaProcedimento=document.createElement('textarea')
        textareaProcedimento.name='procedimento'
        textareaProcedimento.className='form-input'
        procedimento.appendChild(textareaProcedimento)

        const solucao=document.createElement('div')
        solucao.setAttribute('role','tabpanel')
        solucao.id='solucao'
        solucao.className='tabpanel hidden'
        tabList.appendChild(solucao)

        const h3Solucao=document.createElement('h2')
        h3Solucao.textContent='Tem alguma sugestão de solução?'
        solucao.appendChild(h3Solucao)

        const textareaSolucao=document.createElement('textarea')
        textareaSolucao.name='solucao'
        textareaSolucao.className='form-input'
        solucao.appendChild(textareaSolucao)

        const historico=document.createElement('div')
        historico.setAttribute('role','tabpanel')
        historico.id='historico'
        historico.className='tabpanel hidden'
        tabList.appendChild(historico)

        const h3Historico=document.createElement('h2')
        h3Historico.textContent='Quais Alarmes constam na ONU?'
        historico.appendChild(h3Historico)

        const divAlarmes = document.createElement('div');
        divAlarmes.className = 'alarmes';

        // Array de alarmes
        const alarmes = [
            'DYING_GASP', 'LINK_LOSS', 'LOF', 'LOAM', 'SUF', 'DOWN', 'PLOAM', 'RDI'
        ];

        // Criando os elementos <label> e <input> para cada alarme
        alarmes.forEach(function(alarme) {
            const labelElement = document.createElement('label');
            labelElement.className = 'form-control';

            const inputElement = document.createElement('input');
            inputElement.type = 'checkbox';
            inputElement.value = alarme;
            inputElement.name = 'checkbox';

            const textNode = document.createTextNode(alarme);

            labelElement.appendChild(inputElement);
            labelElement.appendChild(textNode);

            divAlarmes.appendChild(labelElement);
        });
        historico.appendChild(divAlarmes);


        const sinal=document.createElement('div')
        sinal.setAttribute('role','tabpanel')
        sinal.id='sinal'
        sinal.className='tabpanel hidden'
        tabList.appendChild(sinal)

        const h3Sinal=document.createElement('h2')
        h3Sinal.textContent='Qual sinal da ONU?'
        sinal.appendChild(h3Sinal)

        const textareaSinal=document.createElement('input')
        textareaSinal.name='occupation'
        textareaSinal.className='form-input'
        sinal.appendChild(textareaSinal)

        const remoto=document.createElement('div')
        remoto.setAttribute('role','tabpanel')
        remoto.id='remoto'
        remoto.className='tabpanel hidden'
        tabList.appendChild(remoto)

        const h3Remoto=document.createElement('h2')
        h3Remoto.textContent='O remoto está ativo?'
        remoto.appendChild(h3Remoto)

        const inputSim= document.createElement("input");
        inputSim.type= "radio";
        inputSim.value="SIM"
        inputSim.name="remoto"
        inputSim.className="form-input"
        remoto.appendChild(inputSim)

        const labelSim=document.createElement('label')
        labelSim.htmlFor="SIM"
        labelSim.textContent="SIM"
        remoto.appendChild(labelSim)

        remoto.innerHTML+="<br>"

        const inputNao=document.createElement('input')
        inputNao.type="radio"
        inputNao.value="NAO"
        inputNao.name="remoto"
        inputNao.className="form-input"
        remoto.appendChild(inputNao)

        const labelNao=document.createElement('label')
        labelNao.htmlFor="nao"
        labelNao.textContent="NAO"
        remoto.appendChild(labelNao)

        remoto.innerHTML+="<br>"

        const pagination = document.createElement("div");
        pagination.className = "pagination";
        form.appendChild(pagination);

        const prev = document.createElement("a");
        prev.className = "btn hidden";
        prev.id = "prev";
        prev.textContent = "Voltar";
        pagination.appendChild(prev);

        const next = document.createElement("a");
        next.className = "btn";
        next.id = "next";
        next.textContent = "Continuar";
        pagination.appendChild(next);

        const submit = document.createElement("button");
        submit.className = "btn btn-submit hidden";
        submit.id = "submit";
        submit.textContent = "Gerar OS";
        pagination.appendChild(submit);

        modal.appendChild(container);
        // Adiciona o modal à overlay
        overlay.appendChild(modal);
        // Adiciona o overlay ao corpo da página
        document.body.appendChild(overlay);

        const previousButton = document.querySelector('#prev')
        const nextButton = document.querySelector('#next')
        const submitButton = document.querySelector('#submit')
        const tabTargets = document.querySelectorAll('.tab')
        const tabPanels = document.querySelectorAll('.tabpanel')
        const isEmpty = (str) => !str.trim().length
        let currentStep = 0


        validateEntry()


        nextButton.addEventListener('click', (event) => {
            event.preventDefault()


            tabPanels[currentStep].classList.add('hidden')
            tabTargets[currentStep].classList.remove('active')

            tabPanels[currentStep + 1].classList.remove('hidden')
            tabTargets[currentStep + 1].classList.add('active')
            currentStep += 1

            validateEntry()
            updateStatusDisplay()
        })


        previousButton.addEventListener('click', (event) => {
            event.preventDefault()


            tabPanels[currentStep].classList.add('hidden')
            tabTargets[currentStep].classList.remove('active')


            tabPanels[currentStep - 1].classList.remove('hidden')
            tabTargets[currentStep - 1].classList.add('active')
            currentStep -= 1

            nextButton.removeAttribute('disabled')
            updateStatusDisplay()
        })

        function toggleFormulario() {
            if (isFormOpen) {
                overlay.classList.add('hidden'); // Oculta o formulário
                isFormOpen = false; // Define o estado do formulário como minimizado
            } else {
                overlay.classList.remove('hidden'); // Exibe o formulário novamente
                isFormOpen = true; // Define o estado do formulário como aberto
            }
        }

        function updateStatusDisplay() {

            if (currentStep === tabTargets.length - 1) {
                nextButton.classList.add('hidden')
                previousButton.classList.remove('hidden')
                submitButton.classList.remove('hidden')
                validateEntry()


            } else if (currentStep == 0) {
                nextButton.classList.remove('hidden')
                previousButton.classList.add('hidden')
                submitButton.classList.add('hidden')

            } else {
                nextButton.classList.remove('hidden')
                previousButton.classList.remove('hidden')
                submitButton.classList.add('hidden')
            }
        }

        function validateEntry() {

            let input = tabPanels[currentStep].querySelector('.form-input')
            let check = document.querySelectorAll('input[name="checkbox"]:checked');

            nextButton.setAttribute('disabled', true)
            submitButton.setAttribute('disabled', true)

            setButtonPermissions(input)

        }
        //regra quebrada por enquanto
        function setButtonPermissions(input) {

                nextButton.removeAttribute('disabled')
                submitButton.removeAttribute('disabled')
        }


        // Evento de clique no botão de envio
        submit.addEventListener('click', function(e) {

           e.preventDefault();


            var nomesolicitante = document.querySelector("#solicitante > input").value;
            var contatosolicitante = document.querySelector("#contato > input").value;
            var enderecosolicitante = document.querySelector("#endereco > input").value;
            var cidadesolicitante = document.querySelector('#cidade > div > select').value;
            var atendimenresposta = document.querySelector('input[name="atendimento"]:checked');
            var atendimentosolicitante = atendimenresposta ? atendimenresposta.value : "Não coloquei por onde foi o atendimento";
            var relatosolicitante = document.querySelector("#relato > textarea").value;
            var procedimentosolicitante = document.querySelector("#procedimento > textarea").value;
            var solucaosolicitante = document.querySelector("#solucao > textarea").value;

            var alarmes = document.querySelectorAll('input[name="checkbox"]:checked');
            var alarmessolicitante = alarmes.length > 0 ? "" : "Nenhum";
            alarmes.forEach((checkbox, index) => {
                alarmessolicitante += checkbox.value;
                if (index < alarmes.length - 1) {
                    alarmessolicitante += ", ";
                }
            });

            var sinalsolicitante = document.querySelector("#sinal > input").value;
            var remotoresult = document.querySelector('input[name="remoto"]:checked');
            var remotosolicitante = remotoresult ? remotoresult.value : "Não verifiquei o remoto";



            var elements = document.querySelectorAll("div > div.dx-quill-container.ql-container > div.ql-editor.dx-htmleditor-content");
            // Itera sobre os elementos e aplica innerHTML em cada um deles
            elements.forEach(function(element) {
                element.innerHTML = "<b>SOLICITANTE:</b> " + nomesolicitante + "<b>RELATO DO CLIENTE: </b>"+ relatosolicitante +"<b>PROCEDIMENTO INTERNO REALIZADO: </b>"+ procedimentosolicitante +"<b>POSSÍVEL SOLUÇÃO:</b>"+ solucaosolicitante +"<b>SINAL DA FIBRA: </b>"+ sinalsolicitante +"<b>ALARMES: </b>"+ alarmessolicitante +"<b>ACESSO REMOTO: </b>"+ remotosolicitante +"<b>ATENDIMENTO VIA:</b>"+ atendimentosolicitante +"<b>CONTATO: </b> "+ contatosolicitante +"<b>ENDEREÇO:</b>"+ enderecosolicitante +"<b>CIDADE:</b>"+ cidadesolicitante +"";
            });

            document.body.removeChild(overlay);
        });

        var exitb = document.querySelector("body > div.modal-overlay > div > div > div.exitbutton > a");
        exitb.addEventListener('click', function(e) {
            e.preventDefault();

             toggleFormulario()

        });

        isFormOpen = true;
}

   relatoPadrao()


})();
