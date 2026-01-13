// Controle de Gastos de Produção do Sistema

// Variáveis globais
let gastosCarregados = [];

// Função para carregar a página de gastos
function carregarGastos() {
    const containerGastos = document.getElementById('gastos');
    
    // Carregar gastos do armazenamento
    gastosCarregados = gerenciadorDados.obterDados('gastos');
    
    // Criar conteúdo da página de gastos
    containerGastos.innerHTML = `
        <div class="titulo-pagina">
            <i class="fas fa-money-bill-wave"></i>
            Gastos de Produção
        </div>
        
        <div class="formulario-adicionar-gasto">
            <h3 style="margin-bottom: 20px;">Adicionar Novo Gasto</h3>
            <form id="formularioGasto">
                <div class="formulario-gasto-linha">
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="categoriaGasto">Categoria *</label>
                        <select class="formulario-select" id="categoriaGasto" required>
                            <option value="">Selecione uma categoria</option>
                            <option value="Tecido">Tecido</option>
                            <option value="Botão">Botão</option>
                            <option value="Zíper">Zíper</option>
                            <option value="Elástico">Elástico</option>
                            <option value="Bordado">Bordado</option>
                            <option value="Ribana">Ribana</option>
                            <option value="Linha">Linha</option>
                            <option value="Etiqueta">Etiqueta</option>
                            <option value="Papel">Papel e Adesivo</option>
                            <option value="Costureira">Costureira</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>
                    
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="produtoGasto">Produto</label>
                        <select class="formulario-select" id="produtoGasto">
                            <option value="">Selecione um produto (opcional)</option>
                        </select>
                    </div>
                    
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="dataGasto">Data *</label>
                        <input type="date" class="formulario-input" id="dataGasto" 
                               value="${obterDataAtual()}" required>
                    </div>
                </div>
                
                <div class="formulario-gasto-linha">
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="valorGasto">Valor (R$) *</label>
                        <input type="number" class="formulario-input" id="valorGasto" 
                               step="0.01" min="0.01" required>
                    </div>
                    
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="quantidadeGasto">Quantidade</label>
                        <input type="number" class="formulario-input" id="quantidadeGasto" 
                               step="0.01" min="0">
                    </div>
                    
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="unidadeGasto">Unidade</label>
                        <input type="text" class="formulario-input" id="unidadeGasto" 
                               placeholder="Ex: metros, unidades, horas">
                    </div>
                </div>
                
                <div class="formulario-gasto-linha">
                    <div class="formulario-grupo" style="grid-column: 1 / -1;">
                        <label class="formulario-rotulo" for="fornecedorGasto">Fornecedor</label>
                        <input type="text" class="formulario-input" id="fornecedorGasto" 
                               placeholder="Nome do fornecedor">
                    </div>
                </div>
                
                <div class="formulario-gasto-linha">
                    <div class="formulario-grupo" style="grid-column: 1 / -1;">
                        <label class="formulario-rotulo" for="observacaoGasto">Observação</label>
                        <textarea class="formulario-input" id="observacaoGasto" rows="3"></textarea>
                    </div>
                </div>
                
                <button type="submit" class="botao sucesso">
                    <i class="fas fa-plus"></i>
                    Adicionar Gasto
                </button>
            </form>
        </div>
        
        <div class="filtros-gastos">
            <div class="filtros-gastos-container">
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="filtroCategoriaGasto">Categoria</label>
                    <select class="formulario-select" id="filtroCategoriaGasto">
                        <option value="">Todas as categorias</option>
                    </select>
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="filtroDataInicioGasto">Data Início</label>
                    <input type="date" class="formulario-input" id="filtroDataInicioGasto" 
                           value="${obterPrimeiroDiaMes()}">
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="filtroDataFimGasto">Data Fim</label>
                    <input type="date" class="formulario-input" id="filtroDataFimGasto" 
                           value="${obterDataAtual()}">
                </div>
                
                <div class="formulario-grupo">
                    <button class="botao" id="aplicarFiltroGastos" style="margin-top: 25px;">
                        <i class="fas fa-filter"></i>
                        Aplicar Filtro
                    </button>
                </div>
            </div>
        </div>
        
        <div class="estatisticas-gastos">
            <div class="grafico-gastos-container">
                <h3>Distribuição de Gastos por Categoria</h3>
                <div class="grafico-gastos-canvas">
                    <canvas id="graficoGastos"></canvas>
                </div>
            </div>
            
            <div class="categoria-gasto">
                <h3><i class="fas fa-chart-pie"></i> Resumo por Categoria</h3>
                <ul class="lista-gastos" id="resumoCategorias">
                    <!-- Resumo será carregado por JavaScript -->
                </ul>
            </div>
        </div>
        
        <div class="tabela-gastos-container">
            <table class="tabela-gastos">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Categoria</th>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                        <th>Unidade</th>
                        <th>Fornecedor</th>
                        <th>Observação</th>
                    </tr>
                </thead>
                <tbody id="tabelaGastosBody">
                    <!-- Gastos serão carregadas por JavaScript -->
                </tbody>
            </table>
        </div>
    `;
    
    // Carregar dados
    carregarProdutosGasto();
    carregarCategoriasFiltroGastos();
    carregarTabelaGastos();
    carregarResumoCategorias();
    carregarGraficoGastos();
    
    // Configurar eventos
    configurarEventosGastos();
}

// Função para carregar produtos no select de gastos
function carregarProdutosGasto() {
    const selectProduto = document.getElementById('produtoGasto');
    
    // Limpar opções existentes (exceto a primeira)
    while (selectProduto.options.length > 1) {
        selectProduto.remove(1);
    }
    
    // Obter produtos
    const produtos = gerenciadorDados.obterDados('produtos');
    
    // Adicionar produtos ao select
    produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto.id;
        option.textContent = `${produto.nome} (${produto.sku})`;
        selectProduto.appendChild(option);
    });
}

// Função para carregar categorias no filtro de gastos
function carregarCategoriasFiltroGastos() {
    const selectCategoria = document.getElementById('filtroCategoriaGasto');
    
    // Limpar opções existentes (exceto a primeira)
    while (selectCategoria.options.length > 1) {
        selectCategoria.remove(1);
    }
    
    // Categorias de gastos
    const categorias = [
        'Tecido', 'Botão', 'Zíper', 'Elástico', 'Bordado', 'Ribana',
        'Linha', 'Etiqueta', 'Papel', 'Costureira', 'Outros'
    ];
    
    // Adicionar categorias
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        selectCategoria.appendChild(option);
    });
}

// Função para configurar eventos da página de gastos
function configurarEventosGastos() {
    // Formulário de gasto
    document.getElementById('formularioGasto').addEventListener('submit', function(e) {
        e.preventDefault();
        adicionarGasto();
    });
    
    // Filtro de gastos
    document.getElementById('aplicarFiltroGastos').addEventListener('click', function() {
        carregarTabelaGastos();
        carregarResumoCategorias();
        carregarGraficoGastos();
    });
}

// Função para adicionar gasto
function adicionarGasto() {
    const formulario = document.getElementById('formularioGasto');
    
    if (!formulario) {
        mostrarNotificacao('Formulário de gastos não encontrado.', 'erro');
        return;
    }
    
    // Validação básica
    if (!formulario.checkValidity()) {
        mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'aviso');
        formulario.reportValidity();
        return;
    }
    
    try {
        // Coletar dados CORRETAMENTE
        const produtoSelect = document.getElementById('produtoGasto');
        let produtoNome = null;
        let produtoId = null;
        
        if (produtoSelect && produtoSelect.value) {
            produtoId = produtoSelect.value;
            const option = produtoSelect.options[produtoSelect.selectedIndex];
            produtoNome = option.textContent;
        }
        
        const gasto = {
            categoria: document.getElementById('categoriaGasto').value,
            produto: produtoNome,
            produtoId: produtoId,
            data: document.getElementById('dataGasto').value,
            valor: parseFloat(document.getElementById('valorGasto').value),
            quantidade: document.getElementById('quantidadeGasto').value ? 
                       parseFloat(document.getElementById('quantidadeGasto').value) : null,
            unidade: document.getElementById('unidadeGasto').value || null,
            fornecedor: document.getElementById('fornecedorGasto').value || null,
            observacao: document.getElementById('observacaoGasto').value || null
        };
        
        // Validar
        if (gasto.valor <= 0) {
            throw new Error('O valor deve ser maior que zero');
        }
        
        console.log('Adicionando gasto:', gasto);
        
        // Adicionar gasto
        const gastoAdicionado = gerenciadorDados.adicionarGasto(gasto);
        
        if (!gastoAdicionado) {
            throw new Error('Falha ao adicionar gasto');
        }
        
        mostrarNotificacao('Gasto adicionado com sucesso!', 'sucesso');
        
        // 1. Atualizar variável global
        gastosCarregados = gerenciadorDados.obterDados('gastos');
        
        // 2. Limpar formulário
        formulario.reset();
        document.getElementById('dataGasto').value = obterDataAtual();
        
        // 3. Recarregar TUDO
        carregarTabelaGastos();
        carregarResumoCategorias();
        carregarGraficoGastos();
        
        // 4. Recarregar selects
        setTimeout(() => {
            carregarProdutosGasto();
            carregarCategoriasFiltroGastos();
        }, 50);
        
        // 5. Disparar evento para atualizar dashboard
        notificarAtualizacao(EventosSistema.GASTO_ADICIONADO, gasto);
        
    } catch (error) {
        console.error('Erro ao adicionar gasto:', error);
        mostrarNotificacao(error.message, 'erro');
    }
}

// Função para carregar tabela de gastos COM DATA E HORA
function carregarTabelaGastos() {
    const tbody = document.getElementById('tabelaGastosBody');
    
    if (!tbody) {
        console.error('Tabela de gastos não encontrada');
        return;
    }
    
    // DEBUG
    console.log('Carregando tabela de gastos. Total:', gastosCarregados.length);
    
    // Aplicar filtros
    const gastosFiltrados = filtrarGastos();
    
    if (gastosFiltrados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="mensagem-vazia">
                    <i class="fas fa-receipt"></i>
                    <p>Nenhum gasto encontrado no período selecionado.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // CORREÇÃO: Usar função utilitária para ordenação correta
    const gastosOrdenados = ordenarPorDataMaisRecente(gastosFiltrados);
    
    let html = '';
    
    gastosOrdenados.forEach(gasto => {
        // Formatar data com hora
        let dataExibicao = formatarData(gasto.data);
        let horaExibicao = '';
        
        if (gasto.dataHora) {
            try {
                const dataObj = new Date(gasto.dataHora);
                if (!isNaN(dataObj)) {
                    const hora = dataObj.getHours().toString().padStart(2, '0');
                    const minuto = dataObj.getMinutes().toString().padStart(2, '0');
                    horaExibicao = `${hora}:${minuto}`;
                }
            } catch (e) {
                console.warn('Erro ao formatar dataHora:', e);
            }
        } else if (gasto.dataISO) {
            try {
                const dataObj = new Date(gasto.dataISO);
                if (!isNaN(dataObj)) {
                    const hora = dataObj.getHours().toString().padStart(2, '0');
                    const minuto = dataObj.getMinutes().toString().padStart(2, '0');
                    horaExibicao = `${hora}:${minuto}`;
                }
            } catch (e) {
                console.warn('Erro ao formatar dataISO:', e);
            }
        }
        
        const dataCompleta = horaExibicao ? `${dataExibicao} ${horaExibicao}` : dataExibicao;
        
        html += `
            <tr>
                <td>${dataCompleta}</td> <!-- DATA COM HORA -->
                <td>${gasto.categoria}</td>
                <td>${gasto.produto || '-'}</td>
                <td>${formatarMoeda(gasto.valor)}</td>
                <td>${gasto.quantidade || '-'}</td>
                <td>${gasto.unidade || '-'}</td>
                <td>${gasto.fornecedor || '-'}</td>
                <td>${gasto.observacao || '-'}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Função para filtrar gastos considerando data/hora
function filtrarGastos() {
    const categoria = document.getElementById('filtroCategoriaGasto');
    const dataInicio = document.getElementById('filtroDataInicioGasto');
    const dataFim = document.getElementById('filtroDataFimGasto');
    
    // DEBUG: Verificar elementos
    console.log('Elemento filtroCategoriaGasto:', categoria);
    console.log('Elemento filtroDataInicioGasto:', dataInicio);
    console.log('Elemento filtroDataFimGasto:', dataFim);
    
    // CORREÇÃO: Verificar se elementos existem
    if (!categoria || !dataInicio || !dataFim) {
        console.error('Elementos de filtro não encontrados!');
        return gastosCarregados; // Retornar tudo
    }
    
    const categoriaValor = categoria.value;
    const dataInicioValor = dataInicio.value;
    const dataFimValor = dataFim.value;
    
    let gastosFiltrados = [...gastosCarregados];
    
    console.log('Filtros aplicados:', {
        categoria: categoriaValor,
        dataInicio: dataInicioValor,
        dataFim: dataFimValor
    });
    
    // Aplicar filtro por categoria
    if (categoriaValor) {
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.categoria === categoriaValor);
        console.log('Após filtro categoria:', gastosFiltrados.length);
    }
    
    // Aplicar filtro por data
    if (dataInicioValor) {
        const inicio = new Date(dataInicioValor);
        gastosFiltrados = gastosFiltrados.filter(gasto => {
            const dataGasto = gasto.dataISO ? new Date(gasto.dataISO) : new Date(gasto.data);
            return dataGasto >= inicio;
        });
        console.log('Após filtro data início:', gastosFiltrados.length);
    }
    
    if (dataFimValor) {
        const fim = new Date(dataFimValor);
        fim.setHours(23, 59, 59, 999);
        gastosFiltrados = gastosFiltrados.filter(gasto => {
            const dataGasto = gasto.dataISO ? new Date(gasto.dataISO) : new Date(gasto.data);
            return dataGasto <= fim;
        });
        console.log('Após filtro data fim:', gastosFiltrados.length);
    }
    
    console.log('Total filtrado:', gastosFiltrados.length);
    return gastosFiltrados;
}

// Função para carregar resumo por categoria
function carregarResumoCategorias() {
    const container = document.getElementById('resumoCategorias');
    const gastosFiltrados = filtrarGastos();
    
    if (gastosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="mensagem-vazia" style="padding: 20px;">
                <i class="fas fa-chart-pie"></i>
                <p>Nenhum gasto para exibir no resumo.</p>
            </div>
        `;
        return;
    }
    
    // Agrupar por categoria
    const gastosPorCategoria = {};
    let totalGeral = 0;
    
    gastosFiltrados.forEach(gasto => {
        if (!gastosPorCategoria[gasto.categoria]) {
            gastosPorCategoria[gasto.categoria] = 0;
        }
        
        gastosPorCategoria[gasto.categoria] += gasto.valor;
        totalGeral += gasto.valor;
    });
    
    // Ordenar categorias por valor (maior primeiro)
    const categoriasOrdenadas = Object.entries(gastosPorCategoria)
        .sort((a, b) => b[1] - a[1]);
    
    let html = '';
    
    categoriasOrdenadas.forEach(([categoria, valor]) => {
        const percentual = totalGeral > 0 ? (valor / totalGeral * 100).toFixed(1) : 0;
        
        html += `
            <li class="item-gasto">
                <div class="info-gasto">
                    <div class="nome-gasto">${categoria}</div>
                    <div class="detalhe-gasto">${percentual}% do total</div>
                </div>
                <div class="valor-gasto">${formatarMoeda(valor)}</div>
            </li>
        `;
    });
    
    // Adicionar total
    html += `
        <div class="total-categoria">
            <span>Total Geral</span>
            <span class="valor">${formatarMoeda(totalGeral)}</span>
        </div>
    `;
    
    container.innerHTML = html;
}

// Função para carregar gráfico de gastos
function carregarGraficoGastos() {
    const canvas = document.getElementById('graficoGastos');
    if (!canvas) {
        console.error('Canvas do gráfico não encontrado!');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const gastosFiltrados = filtrarGastos();
    
    console.log('Carregando gráfico com:', gastosFiltrados.length, 'gastos');
    
    if (gastosFiltrados.length === 0) {
        // Limpar canvas se não houver dados
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Mostrar mensagem no canvas
        ctx.fillStyle = '#999';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Nenhum gasto para exibir', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    // Agrupar por categoria
    const gastosPorCategoria = {};
    
    gastosFiltrados.forEach(gasto => {
        if (!gastosPorCategoria[gasto.categoria]) {
            gastosPorCategoria[gasto.categoria] = 0;
        }
        
        gastosPorCategoria[gasto.categoria] += gasto.valor;
    });
    
    // Preparar dados para o gráfico
    const labels = Object.keys(gastosPorCategoria);
    const dados = Object.values(gastosPorCategoria);
    
    // Cores para o gráfico
    const cores = [
        '#3498db', '#9b59b6', '#1abc9c', '#f39c12', '#e74c3c',
        '#34495e', '#16a085', '#8e44ad', '#2c3e50', '#d35400',
        '#7f8c8d'
    ];
    
    // Destruir gráfico anterior se existir
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    // Criar gráfico de pizza
    canvas.chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: dados,
                backgroundColor: cores.slice(0, labels.length),
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                            return `${label}: ${formatarMoeda(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Função de DEBUG para verificar dados
function verificarDadosGastos() {
    console.log('=== VERIFICAÇÃO DE DADOS GASTOS ===');
    
    // Verificar LocalStorage diretamente
    const dadosRaw = localStorage.getItem('estoqueModaMasculina');
    console.log('LocalStorage existe?', dadosRaw ? 'SIM' : 'NÃO');
    
    if (dadosRaw) {
        try {
            const dados = JSON.parse(dadosRaw);
            console.log('Dados completos no LocalStorage:', dados);
            console.log('Gastos no LocalStorage:', dados.gastos);
            console.log('Quantidade de gastos:', dados.gastos ? dados.gastos.length : 0);
            
            if (dados.gastos && dados.gastos.length > 0) {
                console.log('Último gasto salvo:', dados.gastos[dados.gastos.length - 1]);
            }
        } catch (e) {
            console.error('Erro ao parsear LocalStorage:', e);
        }
    }
    
    // Verificar via gerenciadorDados
    const gastosGerenciador = gerenciadorDados.obterDados('gastos');
    console.log('Gastos via gerenciadorDados:', gastosGerenciador);
    console.log('Quantidade via gerenciador:', gastosGerenciador.length);
    
    // Verificar variável global
    console.log('Variável gastosCarregados:', gastosCarregados);
    console.log('Quantidade na variável:', gastosCarregados.length);
    
    console.log('=== FIM VERIFICAÇÃO ===');
}

// Exportar funções para uso global
window.carregarGastos = carregarGastos;