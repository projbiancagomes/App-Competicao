const comidas = [
    { nome: "Pizza", imagem: "img/pizza.jpeg" },
    { nome: "Hambúrguer", imagem: "img/hamburguer.jpeg" },
    { nome: "Sushi", imagem: "img/sushi.jpeg" },
    { nome: "Pastel", imagem: "img/pastel.jpeg" },
    { nome: "Taco", imagem: "img/taco.jpeg" },
    { nome: "Frango Frito", imagem: "img/frango-frito.jpeg" },
    { nome: "Lasanha", imagem: "img/lasanha.jpg" },
    { nome: "Churrasco", imagem: "img/churrasco.jpeg" }
  ];
  
  let rodadaAtual = [...comidas];
  let proximasRodadas = [];
  let rankingFinal = [];
  let indiceAtual = 0;
  let numeroRodada = 1;
  
  function exibirEscolha() {
    const container = document.getElementById("current-round");
    const rodadaTitulo = document.getElementById("rodada");
    container.innerHTML = ""; 
  
    rodadaTitulo.textContent = `Rodada ${numeroRodada}`;
  
    if (rodadaAtual.length === 1) {
      exibirRankingFinal();
      return;
    }
  
    const escolha1 = rodadaAtual[indiceAtual];
    const escolha2 = rodadaAtual[indiceAtual + 1];
  
    const choice1 = document.createElement("div");
    choice1.className = "choice";
    choice1.innerHTML = `
      <img src="${escolha1.imagem}" alt="${escolha1.nome}">
      <h3>${escolha1.nome}</h3>
    `;
    choice1.onclick = () => escolherVencedor(escolha1);
  
    const choice2 = document.createElement("div");
    choice2.className = "choice";
    choice2.innerHTML = `
      <img src="${escolha2.imagem}" alt="${escolha2.nome}">
      <h3>${escolha2.nome}</h3>
    `;
    choice2.onclick = () => escolherVencedor(escolha2);
  
    container.appendChild(choice1);
    container.appendChild(choice2);
  }
  
  function escolherVencedor(vencedor) {
    proximasRodadas.push(vencedor);
  
    if (indiceAtual % 2 === 0) {
      rankingFinal.push([]);
    }
    rankingFinal[rankingFinal.length - 1].push({
      vencedor,
      perdedor: rodadaAtual[indiceAtual + 1] === vencedor
        ? rodadaAtual[indiceAtual]
        : rodadaAtual[indiceAtual + 1]
    });
  
    indiceAtual += 2;
  
    if (indiceAtual >= rodadaAtual.length) {
      rodadaAtual = [...proximasRodadas];
      proximasRodadas = [];
      indiceAtual = 0;
      numeroRodada++;
    }
  
    exibirEscolha();
  }
  
  function exibirRankingFinal() {
    const container = document.getElementById("ranking-tree");
    const roundContainer = document.getElementById("current-round");
    const rodadaTitulo = document.getElementById("rodada");
  
    roundContainer.style.display = "none"; 
    rodadaTitulo.style.display = "none"; 
    container.style.display = "block"; 
    container.innerHTML = "<h2>Ranking Final</h2>";
  
    rankingFinal.reverse().forEach((rodada, index) => {
      const roundDiv = document.createElement("div");
      roundDiv.className = "round";
  
      const titulo = document.createElement("h3");
      titulo.textContent = obterNomeRodada(index + 1);
      roundDiv.appendChild(titulo);
  
      rodada.forEach((confronto) => {
        const matchDiv = document.createElement("div");
        matchDiv.className = "match";
        matchDiv.innerHTML = `
          <div class="competitor">
            <img src="${confronto.vencedor.imagem}" alt="${confronto.vencedor.nome}">
            <h4>${confronto.vencedor.nome}</h4>
          </div>
          <span>VS</span>
          <div class="competitor">
            <img src="${confronto.perdedor.imagem}" alt="${confronto.perdedor.nome}">
            <h4>${confronto.perdedor.nome}</h4>
          </div>
        `;
        roundDiv.appendChild(matchDiv);
      });
  
      container.appendChild(roundDiv);
    });
  
    const winnerDiv = document.createElement("div");
    winnerDiv.className = "final-match";
    winnerDiv.innerHTML = `
      <h2>🏆 Grande Campeão</h2>
      <img src="${rodadaAtual[0].imagem}" alt="${rodadaAtual[0].nome}">
      <h3>${rodadaAtual[0].nome}</h3>
    `;
    container.appendChild(winnerDiv);
  }
  
  function obterNomeRodada(posicao) {
    const nomes = ["Rodada 1", "Rodada 2", "Rodada 3", "Rodada 4"];
    return nomes[posicao - 1] || `Rodada ${posicao}`;
  }
  
  exibirEscolha();
  