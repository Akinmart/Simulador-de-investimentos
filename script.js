function calcularRendimentos() {
    const primeiroAport = Number(document.getElementById('primeiroAport').value);
    const aportMensal = Number(document.getElementById('aportMensal').value);
    const taxaCdiAnual = Number(document.getElementById('taxaCdiAnual').value) / 100;
    const anos = Number(document.getElementById('anos').value);

    if (!primeiroAport || !aportMensal || !taxaCdiAnual || !anos) {
      alert('Por favor, preencha todos os campos com valores a cima de 0!');
      return;
    }

     // Validação dos valores inseridos
     if (!validaEntradas(primeiroAport, aportMensal, taxaCdiAnual, anos)) {
      return;
  }

    // Função para validar entradas
    function validaEntradas(primeiroAport, aportMensal, taxaCdiAnual, anos) {
      if (primeiroAport < 0 || aportMensal < 0 || taxaCdiAnual < 0 || anos <= 0) {
          alert('Por favor, insira valores positivos para todos os campos.');
          return false;
      }
      if (isNaN(primeiroAport) || isNaN(aportMensal) || isNaN(taxaCdiAnual) || isNaN(anos)) {
          alert('Certifique-se de que todos os campos estão preenchidos com números válidos.');
          return false;
      }
      return true;
    }
    
   
    const taxaCdiMensal = taxaCdiAnual / 12;
    let saldoAcumulado = primeiroAport;
    let rendimentoAnual = 0;
    let totalInvestido = primeiroAport;
    let detalhes = `<h5>Detalhamento Anual</h5>`;
    //exibição do detalhamentos
    for (let ano = 1; ano <= anos; ano++) {
      detalhes += `
        <div>
          <div class="collapse-toggle" onclick="toggleCollapse('ano-${ano}')">
            Ano ${ano}
          </div>
          <div id="ano-${ano}" class="collapse">
            <ul class="list-group">`;

      for (let mes = 1; mes <= 12; mes++) {
        const rendimentoMensal = saldoAcumulado * taxaCdiMensal;
        saldoAcumulado += rendimentoMensal + (ano > 1 || mes > 1 ? aportMensal : 0);
        rendimentoAnual += rendimentoMensal;
        totalInvestido += aportMensal;
        detalhes += `
          <li class="list-group-item" style="color:#fff" >
            Mês ${mes}: Rendimento = <strong>R$${rendimentoMensal.toFixed(2)}</strong> | Saldo = <strong>R$${saldoAcumulado.toFixed(2)}</strong>
          </li>`;
          
      }
      detalhes += `</ul></div></div>`;
    }

    const formatoReal = valor => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <div class="alert">
        <p><strong>Total Investido:</strong> ${formatoReal(totalInvestido)}</p>
        <p><strong>Saldo Final:</strong> ${formatoReal(saldoAcumulado)}</p>
        <p><strong>Rendimento Total:</strong> ${formatoReal(rendimentoAnual)}</p>
      </div>
      ${detalhes}`;
  }

  function toggleCollapse(id) {
    const collapseElement = document.getElementById(id);
    collapseElement.classList.toggle('show');
  }

  // Diminuindo o cabeçalho com  scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.padding = '3px 15px';
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.padding = '5px 30px';
        header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    }
});
