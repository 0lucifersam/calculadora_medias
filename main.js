/* Obtém o formulário da página, usando o ID "form-activity" */
const form = document.getElementById('form-activity');

/* Define as imagens que serão exibidas para indicar se a atividade foi aprovada ou reprovada */
const imgApprov = '<img src="./imagens/aprovado.png" alt="Emoji Festejando" />';
const imgFailed = '<img src="./imagens/reprovado.png" alt="Emoji Triste" />';

/* Arrays para armazenar os nomes das atividades e as notas correspondentes */
const activities = [];
const notes = [];

/* Elementos HTML que serão exibidos no resultado final para indicar aprovação ou reprovação */
const spanApprov = '<span class="result approved">Aprovado</span>';
const spanReprov = '<span class="result failed">Reprovado</span>';

/* Solicita ao usuário que insira a nota mínima para aprovação e armazena o valor como número decimal */
const minNote = parseFloat(prompt("Digite a nota mínima: "));

/* Variável que armazena todas as linhas da tabela que serão adicionadas dinamicamente */
let linhas = '';

/* Adiciona um ouvinte de evento para o formulário. Quando o formulário é enviado, ele impede o comportamento padrão (recarregar a página) */
form.addEventListener('submit', function (e) {
    e.preventDefault();

    addsLine(); // Chama a função que adiciona uma nova linha à tabela
    updTable(); // Atualiza a tabela na página com as novas informações
    actFinalAverage(); // Atualiza a média final
});

/* Obtém os valores dos campos de nome da atividade e nota da atividade */
function addsLine() {
    const inputNameActivity = document.getElementById('name-activity');
    const inputNoteActivity = document.getElementById('note-activity');

    /* Verifica se a atividade já foi adicionada. Caso tenha sido, exibe um alerta */
    if (activities.includes(inputNameActivity.value)) {
        alert(`A atividade: ${inputNameActivity.value} já foi inserida!`);
    } else {

        activities.push(inputNameActivity.value);
        notes.push(parseFloat(inputNoteActivity.value));

        /* Adiciona valores ao nome, nota e média mínima */
        let linha = '<tr>';
        linha += `<td>${inputNameActivity.value}</td>`;
        linha += `<td>${inputNoteActivity.value}</td>`;
        linha += `<td>${inputNoteActivity.value >= minNote ? imgApprov : imgFailed}</td>`;
        linha += `</tr>`;

        linhas += linha;
    }


    /* Limpa os campos de entrada do formulário após adicionar a atividade */
    inputNameActivity.value = '';
    inputNoteActivity.value = '';
}

function updTable() {
    const tableBody = document.querySelector('tbody'); /* Obtém o corpo da tabela (elemento <tbody>) */
    tableBody.innerHTML = linhas; /* Atualiza o conteúdo do corpo da tabela com as novas linhas geradas */

}


/* Calcula a média final chamando a função "calcFinalMed" */
function actFinalAverage() {
    const finalMed = calcFinalMed();

    document.getElementById('final-med-value').innerHTML = finalMed.toFixed(2);
    document.getElementById('final-med-result').innerHTML = finalMed >= minNote ? spanApprov : spanReprov;
}

function calcFinalMed() {
    let addsNotes = 0; /* Variável para armazenar a soma das notas */

    for (let i = 0; i < notes.length; i++) {
        addsNotes += notes[i];
    }

    return addsNotes / notes.length;
}