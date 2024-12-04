function calcularRendimentos() {
    const primeiroAport = Number(document.getElementById('primeiroAport').value);
    const aportMensal = Number(document.getElementById('aportMensal').value);
    const taxaCdiAnual = Number(document.getElementById('taxaCdiAnual').value) / 100;
    const anos = Number(document.getElementById('anos').value);

    if (!primeiroAport || !aportMensal || !taxaCdiAnual || !anos) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const taxaCdiMensal = taxaCdiAnual / 12;
    let saldoAcumulado = primeiroAport;
    let rendimentoAnual = 0;
    let totalInvestido = primeiroAport;
    let detalhes = `<h5>Detalhamento Anual</h5>`;

    for (let ano = 1; ano <= anos; ano++) {
      detalhes += `
        <div>
          <div class="collapse-toggle" onclick="toggleCollapse('ano-${ano}')">
            Ano ${ano}
          </div>
          <div id="ano-${ano}" class="collapse">
            <ul class="list-group">
      `;
      for (let mes = 1; mes <= 12; mes++) {
        const rendimentoMensal = saldoAcumulado * taxaCdiMensal;
        saldoAcumulado += rendimentoMensal + (ano > 1 || mes > 1 ? aportMensal : 0);
        rendimentoAnual += rendimentoMensal;
        totalInvestido += aportMensal;
        detalhes += `
          <li class="list-group-item">
            Mês ${mes}: Rendimento = <strong>R$${rendimentoMensal.toFixed(2)}</strong> | Saldo = <strong>R$${saldoAcumulado.toFixed(2)}</strong>
          </li>
        `;
      }
      detalhes += `
            </ul>
          </div>
        </div>
      `;
    }

    const formatoReal = valor => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <div class="alert">
        <p><strong>Total Investido:</strong> ${formatoReal(totalInvestido)}</p>
        <p><strong>Saldo Final:</strong> ${formatoReal(saldoAcumulado)}</p>
        <p><strong>Rendimento Total:</strong> ${formatoReal(rendimentoAnual)}</p>
      </div>
      ${detalhes}
    `;
  }

  function toggleCollapse(id) {
    const collapseElement = document.getElementById(id);
    collapseElement.classList.toggle('show');
  }