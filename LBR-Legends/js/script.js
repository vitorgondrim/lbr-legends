/* ==========================================================================
   script.js - Funções Globais e Específicas das Páginas
   --------------------------------------------------------------------------
   Este arquivo JavaScript contém funcionalidades para diversas páginas,
   incluindo uma contagem regressiva para eventos e a renderização dinâmica
   da tabela de classificação.
   ========================================================================== */

// Aguarda o carregamento completo do conteúdo HTML antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    /* ========================================================= */
    /* 1. Funcionalidade de Contagem Regressiva                  */
    /* ========================================================= */

    // Define a data e hora alvo para a contagem regressiva.
    // Importante: Ajuste esta data para o seu evento.
    // Formato: 'Mês Dia, Ano Hora:Minuto:Segundo GMT-0300' (GMT-0300 para o fuso horário de Brasília)
    const eventDate = new Date('July 05, 2025 12:00:00 GMT-0300').getTime();

    // Seleciona os elementos HTML onde a contagem regressiva será exibida.
    // Verifica se os elementos existem antes de tentar acessá-los.
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    /**
     * Atualiza a contagem regressiva a cada segundo.
     * Calcula o tempo restante e exibe-o nos elementos HTML.
     */
    function updateCountdown() {
        // Obtém a data e hora atuais
        const now = new Date().getTime();
        // Calcula a distância de tempo entre a data do evento e a data atual
        const distance = eventDate - now;

        // Calcula os dias, horas, minutos e segundos restantes
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Atualiza o conteúdo dos elementos span, formatando com dois dígitos (ex: 05, 12)
        // Garante que os números não sejam negativos se o evento já passou.
        if (daysSpan) daysSpan.textContent = String(Math.max(0, days)).padStart(2, '0');
        if (hoursSpan) hoursSpan.textContent = String(Math.max(0, hours)).padStart(2, '0');
        if (minutesSpan) minutesSpan.textContent = String(Math.max(0, minutes)).padStart(2, '0');
        if (secondsSpan) secondsSpan.textContent = String(Math.max(0, seconds)).padStart(2, '0');

        // Se a contagem regressiva terminou (distância < 0), zera o contador e para o intervalo
        if (distance < 0) {
            clearInterval(countdownInterval); // Para a atualização da contagem
            // Opcional: Você pode adicionar ou alterar o conteúdo HTML aqui
            // para exibir uma mensagem como "EVENTO AO VIVO!" quando a contagem terminar.
            // Exemplo:
            // if (document.querySelector('.count-box')) {
            //    document.querySelector('.count-box').innerHTML = "<p class='countdown-finished'>EVENTO AO VIVO!</p>";
            // }
        }
    }

    // Define um intervalo para chamar a função `updateCountdown` a cada 1 segundo (1000 ms)
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Chama a função `updateCountdown` uma vez imediatamente.
    // Isso evita um atraso de 1 segundo na exibição inicial da contagem.
    updateCountdown();


    /* ========================================================= */
    /* 2. Renderização da Tabela de Classificação                */
    /* ========================================================= */

    // Simulação de dados da tabela ao longo de várias rodadas.
    // Cada array interno representa uma rodada com dados dos times.
    const historicalData = [
        // Rodada 1 (Índice 0): Dados da sua primeira rodada jogada
        [
            { nome: 'Time A', vitorias: 3, derrotas: 1 },
            { nome: 'Time B', vitorias: 2, derrotas: 2 },
            { nome: 'Time C', vitorias: 3, derrotas: 1 },
            { nome: 'Time D', vitorias: 2, derrotas: 2 },
            { nome: 'Time E', vitorias: 1, derrotas: 3 },
            { nome: 'Time F', vitorias: 1, derrotas: 3 },
            { nome: 'Time G', vitorias: 2, derrotas: 2 },
            { nome: 'Time H', vitorias: 1, derrotas: 3 },
            { nome: 'Time I', vitorias: 0, derrotas: 4 },
            { nome: 'Time J', vitorias: 0, derrotas: 4 },
            { nome: 'Time K', vitorias: 1, derrotas: 3 },
            { nome: 'Time L', vitorias: 0, derrotas: 4 },
        ],
        // Rodada 2 (Índice 1): Dados da sua segunda rodada jogada
        [
            { nome: 'Time A', vitorias: 4, derrotas: 1 },
            { nome: 'Time C', vitorias: 4, derrotas: 1 },
            { nome: 'Time B', vitorias: 3, derrotas: 2 },
            { nome: 'Time D', vitorias: 2, derrotas: 3 },
            { nome: 'Time E', vitorias: 2, derrotas: 3 },
            { nome: 'Time G', vitorias: 2, derrotas: 3 },
            { nome: 'Time F', vitorias: 2, derrotas: 3 },
            { nome: 'Time I', vitorias: 1, derrotas: 4 },
            { nome: 'Time H', vitorias: 1, derrotas: 4 },
            { nome: 'Time K', vitorias: 1, derrotas: 4 },
            { nome: 'Time J', vitorias: 1, derrotas: 4 },
            { nome: 'Time L', vitorias: 0, derrotas: 5 },
        ]
        // Adicione mais rodadas aqui (ex: Rodada 3, Rodada 4, etc.)
    ];

    // Extrai todos os nomes de times únicos das rodadas reais
    const uniqueTeamNames = Array.from(new Set(historicalData.flatMap(round => round.map(team => team.nome))));

    // Gera a Rodada 0: Estado inicial da tabela (TUDO ZERADO)
    const initialRoundData = uniqueTeamNames.map(teamName => ({ nome: teamName, vitorias: 0, derrotas: 0 }));

    // Preenche a lista completa de dados históricos, começando com a Rodada 0 gerada
    const fullHistoricalData = [initialRoundData, ...historicalData];


    // Data de início das partidas para decidir qual rodada exibir inicialmente
    // Apenas a data, sem hora, para comparação de "dia"
    const firstMatchDate = new Date('July 05, 2025 00:00:00 GMT-0300').getTime();

    // Define qual rodada será exibida inicialmente.
    // Se a data atual for anterior à data da primeira partida, exibe a "Rodada 0" (tudo zerado).
    // Caso contrário, exibe a última rodada disponível nos dados históricos.
    let currentRoundIndex;
    if (new Date().getTime() < firstMatchDate) {
        currentRoundIndex = 0; // Exibe a Rodada 0 (zerada)
    } else {
        // Exibe a última rodada com dados reais
        currentRoundIndex = fullHistoricalData.length - 1;
    }

    // Seleciona os containers onde as linhas da tabela serão inseridas
    const rankingBodyLeft = document.getElementById('ranking-body-left');
    const rankingBodyRight = document.getElementById('ranking-body-right');
    const tableSubtitle = document.querySelector('.table-subtitle'); // Seleciona o elemento do subtítulo

    /**
     * Renderiza a tabela de classificação com base nos dados fornecidos.
     * Calcula pontos, ordena os times e exibe a mudança de posição.
     * @param {Array<Object>} roundData - Os dados dos times para a rodada atual.
     * @param {Array<Object>} [previousRoundData=[]] - Os dados dos times da rodada anterior (opcional, para calcular mudança de posição).
     */
    function renderTable(roundData, previousRoundData = []) {
        // Recalcula os pontos para cada time: 2 por vitória, 1 por derrota.
        const computedData = roundData.map(team => ({
            ...team, // Copia todas as propriedades do time
            pontos: (team.vitorias * 2) + (team.derrotas * 1) // Pontuação atualizada
        }));

        // Ordena os times pelo número de pontos (do maior para o menor).
        // Se os pontos forem iguais, ordena por nome para garantir uma ordem consistente.
        computedData.sort((a, b) => {
            if (b.pontos === a.pontos) {
                return a.nome.localeCompare(b.nome);
            }
            return b.pontos - a.pontos;
        });

        // Limpa o conteúdo atual das tabelas para evitar duplicação
        if (rankingBodyLeft) rankingBodyLeft.innerHTML = '';
        if (rankingBodyRight) rankingBodyRight.innerHTML = '';

        // Atualiza o subtítulo da tabela com base na rodada atual
        if (tableSubtitle) {
            // Se for a rodada inicial (índice 0) E ainda estiver antes da data da primeira partida
            if (currentRoundIndex === 0 && new Date().getTime() < firstMatchDate) {
                tableSubtitle.textContent = `PRÉ-TEMPORADA`;
            } else {
                // Para rodadas com dados reais, o número da rodada começa a partir de 1.
                // fullHistoricalData.length - 1 representa o número total de "rodadas" reais (excluindo a Rodada 0).
                tableSubtitle.textContent = `RODADA ${currentRoundIndex}/${fullHistoricalData.length - 1}`;
            }
        }

        // Mapeia os rankings da rodada anterior para acesso rápido
        const previousRanks = new Map();
        if (currentRoundIndex > 0) {
            const sortedPreviousData = previousRoundData
                .map(t => ({
                    nome: t.nome,
                    pontos: (t.vitorias * 2) + (t.derrotas * 1)
                }))
                .sort((a, b) => {
                    if (b.pontos === a.pontos) {
                        return a.nome.localeCompare(b.nome);
                    }
                    return b.pontos - a.pontos;
                });
            sortedPreviousData.forEach((team, i) => {
                previousRanks.set(team.nome, i + 1);
            });
        }


        // Itera sobre os dados dos times para criar e adicionar as linhas da tabela
        computedData.forEach((team, index) => {
            const teamRank = index + 1; // Posição atual do time na classificação

            // Lógica para calcular a mudança de posição e definir o indicador.
            // A mudança de posição só é calculada se não for a rodada inicial (índice 0).
            let positionChange = 0;
            let indicatorClass = 'neutral';
            let indicatorSymbol = '—'; // Padrão: traço para sem mudança ou rodada inicial

            if (currentRoundIndex > 0) { // Só calcula mudança se não for a rodada inicial (Pré-Temporada)
                const prevRank = previousRanks.get(team.nome);

                if (prevRank !== undefined) { // Garante que o time existia na rodada anterior
                    positionChange = prevRank - teamRank;
                }

                if (positionChange > 0) { // Subiu posições
                    indicatorClass = 'up';
                    indicatorSymbol = '▲';
                } else if (positionChange < 0) { // Desceu posições
                    indicatorClass = 'down';
                    indicatorSymbol = '▼';
                }
            }

            // Cria um novo elemento <div> para a linha da tabela
            const row = document.createElement('div');
            row.classList.add('ranking-row'); // Adiciona a classe CSS para estilização

            // Preenche o HTML interno da linha com os dados do time e o indicador
            row.innerHTML = `
                <span class="ranking-cell num-cell">
                    ${teamRank.toString().padStart(2, '0')}
                    <span class="rank-indicator ${indicatorClass}">${indicatorSymbol}</span>
                </span>
                <span class="ranking-cell team-name-cell">${team.nome}</span>
                <span class="ranking-cell stat-cell">${String(team.vitorias).padStart(2, '0')}</span>
                <span class="ranking-cell stat-cell">${String(team.derrotas).padStart(2, '0')}</span>
                <span class="ranking-cell stat-cell">${String(team.pontos).padStart(2, '0')}</span>
            `;

            // Adiciona a linha à coluna esquerda ou direita, dividindo os times
            if (index < 6) {
                if (rankingBodyLeft) rankingBodyLeft.appendChild(row);
            } else {
                if (rankingBodyRight) rankingBodyRight.appendChild(row);
            }
        });
    }

    /**
     * Atualiza a exibição da tabela com base na rodada atual.
     * Seleciona os dados da rodada atual e anterior e chama `renderTable`.
     */
    function updateRoundDisplay() {
        const currentRoundData = fullHistoricalData[currentRoundIndex];
        // Para a rodada 0, não há dados anteriores para comparação, então previousRoundData é vazio.
        const previousRoundData = currentRoundIndex > 0 ? fullHistoricalData[currentRoundIndex - 1] : [];
        renderTable(currentRoundData, previousRoundData);
    }

    // Chama a função para renderizar a tabela na carga inicial da página
    updateRoundDisplay();

});