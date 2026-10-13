let series = [];

const listaSeries = document.getElementById("listaSeries")
const status = document.getElementById("status");
const btnBuscar = document.getElementById("btnBuscar");
const btnTodos = document.getElementById("btnTodos");
const btnFiccao = document.getElementById("btnFiccao");
const btnAcao = document.getElementById("btnAcao");
const btnAventura = document.getElementById("btnAventura");
const btn2021 = document.getElementById("btn2021");
const btn2024 = document.getElementById("btn2024");

async function carregarSeries(){
    try{
        status.textContent = "Carregar séries...";
        const resposta = await fetch('series.json');

        //Verifica se houve erro
        if(!resposta.ok){
            throw new Error(
                "Não foi possível carregar a JSON.");
        }

    //Converte a resposta para JSON
    series = await resposta.json();

    status.textContent = `${series.length} série(s) carregada(s).`;
    mostrarSeries(series);

} catch (erro) {
    status.textContent = `Erro: ${erro.message}`;
    }
}

function mostrarSeries(lista){
    listaSeries.innerHTML = "";

if (lista.length === 0) {
    listaSeries.innerHTML = "<p> Nenhuma séria foi encontrada.</p>";
    return;
}
    lista.forEach((serie) => {
        const card=document.createElement("div");
        card.classList.add("card");

        card.innerHTML=`
        <img src="${serie.imagem}" >
        <p><strong>Ano: </strong> ${serie.ano}</p>
        <p><strong>Genero: </strong> ${serie.genero}</p>
        <p><strong>Temporadas: </strong> ${serie.temporadas}</p>
        `;
        listaSeries.appendChild(card);
    });
}

function mostrarTodos() {
    mostrarSeries(series);
    status.textContent = `${series.length} série(s) encontrada(s).`;
}

function filtrarPorGenero(generoDesejado) {
    const resultado = series.filter((serie) => serie.genero === generoDesejado);
    mostrarSeries(resultado);
    status.textContent = `${resultado.length} série(s) com gênero ${generoDesejado.toLowerCase()} encontrada(s).`;
}

function mostrar2021(){
    const ano = series.filter((serie) => serie.ano === 2021);
    mostrarSeries(ano);
    status.textContent =`${ano.length} série(s) com ano 2021 encontrada(s).`
}

function mostrar2024(){
    const ano2 = series.filter((serie) => serie.ano === 2024);
    mostrarSeries(ano2);
    status.textContent =`${ano2.length} série(s) com ano 2024 encontrada(s).`
}

btnBuscar.addEventListener("click", carregarSeries);
btnTodos.addEventListener("click", mostrarTodos);
btnFiccao.addEventListener("click", () => filtrarPorGenero("Ficção"));
btnAcao.addEventListener("click", () => filtrarPorGenero("Ação"));
btnAventura.addEventListener("click", () => filtrarPorGenero("Aventura"));
btn2021.addEventListener("click", mostrar2021 );
btn2024.addEventListener("click", mostrar2024 );