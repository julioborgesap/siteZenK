// Dashboard do Sistema de Controle de Estoque

    // Função para carregar o dashboard
    // Modificar a função carregarDashboard() para incluir alertas detalhados
    function carregarDashboard() {
        const containerDashboard = document.getElementById('dashboard');
    
        // Criar conteúdo do dashboard
        containerDashboard.innerHTML = `
            <div class="titulo-pagina">
                <i class="fas fa-chart-line"></i>
                Dashboard - Visão Geral
            </div>
        
            <div class="resumo-dashboard">
                <!-- Cartões de resumo serão carregados por JavaScript -->
            </div>
        
            <!-- NOVA SEÇÃO: Alertas Detalhados de Estoque -->
            <div class="produtos-baixo-estoque" id="alertasDetalhados" style="margin-bottom: 30px;">
                <h3>
                    <i class="fas fa-exclamation-circle"></i>
                    Alertas Detalhados de Estoque
                </h3>
                <div id="containerAlertasDetalhados">
                    <!-- Alertas detalhados serão carregados por JavaScript -->
                </div>
            </div>
        
            <div class="graficos-dashboard">
                <div class="grafico-container">
                    <h3>Estoque por Categoria</h3>
                    <div class="grafico-canvas">
                        <canvas id="graficoCategorias"></canvas>
                    </div>
                </div>
            
                <div class="grafico-container">
                    <h3>Vendas do Mês</h3>
                    <div class="grafico-canvas">
                        <canvas id="graficoVendas"></canvas>
                    </div>
                </div>
            </div>
        
            <div class="produtos-baixo-estoque">
                <h3>
                    <i class="fas fa-exclamation-triangle"></i>
                    Produtos com Estoque Baixo (Total)
                </h3>
                <ul class="lista-baixo-estoque" id="listaBaixoEstoque">
                    <!-- Produtos com estoque baixo serão carregados por JavaScript -->
                </ul>
            </div>
        `;
    
        // Carregar dados do dashboard
        carregarResumoDashboard();
        carregarProdutosEstoqueBaixo();
        carregarAlertasDetalhados(); // NOVA FUNÇÃO
        carregarGraficos();
    }

    // NOVA FUNÇÃO: Carregar alertas detalhados
    function carregarAlertasDetalhados() {
        const container = document.getElementById('containerAlertasDetalhados');

        
    
        try {
            // VERIFICAR se a função existe
            if (typeof gerenciadorDados.obterAlertaEstoqueDetalhado !== 'function') {
                container.innerHTML = `
                    <div class="mensagem-vazia">
                        <i class="fas fa-info-circle"></i>
                        <p>Função de alertas detalhados não disponível.</p>
                    </div>
                `;
                return;
            }
    
            const alertasDetalhados = gerenciadorDados.obterAlertaEstoqueDetalhado();
        
            if (alertasDetalhados.length === 0) {
                container.innerHTML = `
                    <div class="mensagem-vazia">
                        <i class="fas fa-check-circle"></i>
                        <p>Nenhum alerta detalhado no momento.</p>
                    </div>
                `;
                return;
            }
        
            // Agrupar alertas por produto
            const alertasPorProduto = {};
        
            alertasDetalhados.forEach(alerta => {
                if (!alertasPorProduto[alerta.produtoId]) {
                    alertasPorProduto[alerta.produtoId] = {
                        produtoNome: alerta.produtoNome,
                        sku: alerta.sku,
                        alertas: []
                    };
                }
                        alertasPorProduto[alerta.produtoId].alertas.push(alerta);
            });
        
            let html = '';
        
            Object.values(alertasPorProduto).forEach(produto => {
                html += `
                    <div class="alerta-produto" style="margin-bottom: 20px; padding: 15px; background-color: #fff8e1; border-radius: 8px; border-left: 4px solid #ff9800;">
                        <h4 style="margin-bottom: 10px; color: #333;">
                            <i class="fas fa-box"></i>
                            ${produto.produtoNome} (${produto.sku})
                        </h4>
                `;
            
                produto.alertas.forEach(alerta => {
                    const icone = alerta.nivel === 'ESGOTADO' ? 'fa-times-circle' :
                                alerta.nivel === 'CRÍTICO' ? 'fa-exclamation-circle' : 'fa-exclamation-triangle';
                
                    const cor = alerta.nivel === 'ESGOTADO' ? '#f44336' :
                            alerta.nivel === 'CRÍTICO' ? '#ff9800' : '#ffc107';
                
                    html += `
                        <div class="alerta-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; padding: 8px; background-color: white; border-radius: 5px;">
                            <i class="fas ${icone}" style="color: ${cor};"></i>
                            <div style="flex: 1;">
                                <strong style="color: #333;">${alerta.tipo === 'cor' ? 'Cor' : 'Tamanho'}:</strong>
                                <span style="color: #666;">${alerta.tipo === 'cor' ? alerta.cor : `Tamanho ${alerta.tamanho} (${alerta.cor})`}</span>
                                <div style="font-size: 12px; color: #999;">
                                    Estoque: <strong style="color: ${cor};">${alerta.estoqueAtual} unidades</strong> 
                                    • Nível: <strong style="color: ${cor};">${alerta.nivel}</strong>
                                </div>
                            </div>
                        </div>
                    `;
                });
            
                html += `</div>`;
            });
        
            container.innerHTML = html;
        
        } catch (error) {
            console.error('Erro ao carregar alertas detalhados:', error);
            container.innerHTML = `
                <div class="mensagem-vazia">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Erro ao carregar alertas detalhados.</p>
                </div>
            `;
        }
    }

// Função para carregar os cartões de resumo
function carregarResumoDashboard() {
    const resumoContainer = document.querySelector('.resumo-dashboard');
    
    // Obter dados para os cartões de resumo
    const produtos = gerenciadorDados.obterDados('produtos');
    const produtosEstoqueBaixo = gerenciadorDados.obterProdutosEstoqueBaixo();
    const valorTotalEstoque = gerenciadorDados.calcularValorTotalEstoque();
    
    // CORREÇÃO: Calcular vendas do mês corretamente
    const estatisticasVendas = calcularVendasDoMes(); // NOVA FUNÇÃO
    
    // Calcular quantidade total de produtos
    let quantidadeTotalProdutos = 0;
    produtos.forEach(produto => {
        if (produto.cores && produto.cores.length > 0) {
            produto.cores.forEach(cor => {
                quantidadeTotalProdutos += cor.estoque || 0;
            });
        }
    });
    
    // HTML dos cartões de resumo
    resumoContainer.innerHTML = `
        <div class="resumo-card">
            <div class="resumo-icone azul">
                <i class="fas fa-boxes"></i>
            </div>
            <div class="resumo-conteudo">
                <h3>Total em Estoque</h3>
                <div class="valor">${quantidadeTotalProdutos}</div>
                <div class="variacao positivo">
                    <i class="fas fa-arrow-up"></i>
                    <span>12% em relação ao mês passado</span>
                </div>
            </div>
        </div>
        
        <div class="resumo-card">
            <div class="resumo-icone verde">
                <i class="fas fa-money-bill-wave"></i>
            </div>
            <div class="resumo-conteudo">
                <h3>Valor do Estoque</h3>
                <div class="valor">${formatarMoeda(valorTotalEstoque)}</div>
                <div class="variacao positivo">
                    <i class="fas fa-arrow-up"></i>
                    <span>8% em relação ao mês passado</span>
                </div>
            </div>
        </div>
        
        <div class="resumo-card">
            <div class="resumo-icone laranja">
                <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="resumo-conteudo">
                <h3>Vendas do Mês</h3>
                <div class="valor">${estatisticasVendas.quantidade}</div>
                <div class="valor-grande">${formatarMoeda(estatisticasVendas.valor)}</div> <!-- CORREÇÃO: valor-grande -->
                <div class="variacao ${estatisticasVendas.variacaoTipo}">
                    <i class="fas ${estatisticasVendas.variacaoIcone}"></i>
                    <span>${estatisticasVendas.variacaoTexto}</span>
                </div>
            </div>
        </div>
        
        <div class="resumo-card">
            <div class="resumo-icone vermelho">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="resumo-conteudo">
                <h3>Produtos com Estoque Baixo</h3>
                <div class="valor">${produtosEstoqueBaixo.length}</div>
                <div class="variacao ${produtosEstoqueBaixo.length > 0 ? 'negativo' : 'positivo'}">
                    <i class="fas ${produtosEstoqueBaixo.length > 0 ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
                    <span>${produtosEstoqueBaixo.length > 0 ? 'Atenção necessária' : 'Estoque em dia'}</span>
                </div>
            </div>
        </div>
    `;
}

// NOVA FUNÇÃO: Calcular vendas do mês corretamente
function calcularVendasDoMes() {
    const produtos = gerenciadorDados.obterDados('produtos');
    const movimentacoes = gerenciadorDados.obterDados('movimentacoes');
    
    // Data atual e primeiro dia do mês
    const hoje = obterDataAtual();
    const primeiroDiaMes = obterPrimeiroDiaMes();
    
    // Filtrar movimentações do mês atual
    const movimentacoesMes = movimentacoes.filter(mov => {
        return mov.data >= primeiroDiaMes && mov.data <= hoje;
    });
    
    // Filtrar apenas vendas (saídas com motivo 'venda')
    const vendasMes = movimentacoesMes.filter(mov => mov.tipo === 'saida' && mov.motivo === 'venda');
    
    // Calcular quantidade total e valor total das vendas
    let quantidadeVendas = 0;
    let valorTotalVendas = 0;
    
    vendasMes.forEach(venda => {
        quantidadeVendas += venda.quantidade;
        
        // CORREÇÃO: Usar totalVenda se disponível
        if (venda.totalVenda) {
            valorTotalVendas += venda.totalVenda;
        } else if (venda.precoUnitario) {
            valorTotalVendas += venda.quantidade * venda.precoUnitario;
        } else {
            // Fallback: usar preço do produto
            const produto = produtos.find(p => p.id === venda.produtoId);
            if (produto) {
                valorTotalVendas += venda.quantidade * produto.preco;
            }
        }
    });
    
    // Calcular vendas do mês anterior para comparação
    const mesAnterior = new Date(hoje);
    mesAnterior.setMonth(mesAnterior.getMonth() - 1);
    const primeiroDiaMesAnterior = new Date(mesAnterior.getFullYear(), mesAnterior.getMonth(), 1)
        .toISOString().split('T')[0];
    const ultimoDiaMesAnterior = new Date(mesAnterior.getFullYear(), mesAnterior.getMonth() + 1, 0)
        .toISOString().split('T')[0];
    
    const vendasMesAnterior = movimentacoes.filter(mov => 
        mov.tipo === 'saida' && 
        mov.motivo === 'venda' &&
        mov.data >= primeiroDiaMesAnterior && 
        mov.data <= ultimoDiaMesAnterior
    );
    
    let valorVendasMesAnterior = 0;
    vendasMesAnterior.forEach(venda => {
        if (venda.totalVenda) {
            valorVendasMesAnterior += venda.totalVenda;
        } else if (venda.precoUnitario) {
            valorVendasMesAnterior += venda.quantidade * venda.precoUnitario;
        } else {
            const produto = produtos.find(p => p.id === venda.produtoId);
            if (produto) {
                valorVendasMesAnterior += venda.quantidade * produto.preco;
            }
        }
    });
    
    // Calcular variação percentual
    let variacaoPercentual = 0;
    let variacaoTipo = 'neutro';
    let variacaoIcone = 'fas fa-minus';
    let variacaoTexto = 'Sem comparação';
    
    if (valorVendasMesAnterior > 0 && valorTotalVendas > 0) {
        variacaoPercentual = ((valorTotalVendas - valorVendasMesAnterior) / valorVendasMesAnterior) * 100;
        variacaoTipo = variacaoPercentual >= 0 ? 'positivo' : 'negativo';
        variacaoIcone = variacaoPercentual >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
        variacaoTexto = `${Math.abs(variacaoPercentual).toFixed(1)}% em relação ao mês passado`;
    } else if (valorTotalVendas > 0 && valorVendasMesAnterior === 0) {
        variacaoPercentual = 100;
        variacaoTipo = 'positivo';
        variacaoIcone = 'fas fa-arrow-up';
        variacaoTexto = 'Primeiras vendas do mês!';
    } else if (valorTotalVendas === 0 && valorVendasMesAnterior > 0) {
        variacaoPercentual = -100;
        variacaoTipo = 'negativo';
        variacaoIcone = 'fas fa-arrow-down';
        variacaoTexto = '100% menor que mês anterior';
    }
    
    return {
        quantidade: quantidadeVendas,
        valor: valorTotalVendas,
        variacaoTipo: variacaoTipo,
        variacaoIcone: variacaoIcone,
        variacaoTexto: variacaoTexto
    };
}

// Função auxiliar para obter primeiro dia do mês
function obterPrimeiroDiaMes() {
    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    return primeiroDia.toISOString().split('T')[0];
}

// Função para carregar produtos com estoque baixo
function carregarProdutosEstoqueBaixo() {
    const listaContainer = document.getElementById('listaBaixoEstoque');
    const produtosEstoqueBaixo = gerenciadorDados.obterProdutosEstoqueBaixo();
    
    if (produtosEstoqueBaixo.length === 0) {
        listaContainer.innerHTML = `
            <div class="mensagem-vazia">
                <i class="fas fa-check-circle"></i>
                <p>Nenhum produto com estoque baixo no momento.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    produtosEstoqueBaixo.forEach(produto => {
        // Determinar ícone baseado na categoria
        let iconeClasse = 'fas fa-tshirt'; // Padrão
        let iconeCor = 'camisa'; // Padrão
        
        if (produto.categoria === 'Camisetas') {
            iconeClasse = 'fas fa-tshirt';
            iconeCor = 'camiseta';
        } else if (produto.categoria === 'Shorts') {
            iconeClasse = 'fas fa-shopping-bag';
            iconeCor = 'short';
        } else if (produto.categoria === 'Camisas') {
            iconeClasse = 'fas fa-shirt';
            iconeCor = 'camisa';
        } else if (produto.categoria === 'Regatas') {
            iconeClasse = 'fas fa-vest';
            iconeCor = 'regata';
        }
        
        html += `
            <li class="item-baixo-estoque">
                <div class="info-produto">
                    <div class="icone-produto ${iconeCor}">
                        <i class="${iconeClasse}"></i>
                    </div>
                    <div class="detalhes-produto">
                        <h4>${produto.nome}</h4>
                        <p>${produto.categoria} - ${produto.subcategoria}</p>
                        <p>SKU: ${produto.sku}</p>
                    </div>
                </div>
                <div class="quantidade-produto">
                    <div class="quantidade">${produto.estoqueTotal}</div>
                    <div class="minimo">Mínimo: ${produto.estoqueMinimo}</div>
                </div>
            </li>
        `;
    });
    
    listaContainer.innerHTML = html;
}

// Função para carregar gráficos do dashboard
function carregarGraficos() {
    // Aguardar um momento para garantir que o DOM esteja pronto
    setTimeout(() => {
        criarGraficoCategorias();
        criarGraficoVendas();
    }, 100);
}

// Função para criar gráfico de estoque por categoria
function criarGraficoCategorias() {
    const canvas = document.getElementById('graficoCategorias');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Obter dados das categorias
    const produtos = gerenciadorDados.obterDados('produtos');
    
    // Agrupar por categoria
    const categorias = {};
    
    produtos.forEach(produto => {
        if (!categorias[produto.categoria]) {
            categorias[produto.categoria] = 0;
        }
        
        // Calcular estoque total do produto
        let estoqueProduto = 0;
        if (produto.cores && produto.cores.length > 0) {
            produto.cores.forEach(cor => {
                estoqueProduto += cor.estoque || 0;
            });
        }
        
        categorias[produto.categoria] += estoqueProduto;
    });
    
    // Preparar dados para o gráfico
    const labels = Object.keys(categorias);
    const dados = Object.values(categorias);
    
    // Cores para o gráfico
    const cores = [
        '#3498db', // Azul
        '#9b59b6', // Roxo
        '#1abc9c', // Turquesa
        '#f39c12', // Laranja
        '#e74c3c', // Vermelho
        '#34495e'  // Azul escuro
    ];
    
    // Criar gráfico de barras
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantidade em Estoque',
                data: dados,
                backgroundColor: cores.slice(0, labels.length),
                borderColor: '#2c3e50',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Estoque: ${context.parsed.y} unidades`;
                        }
                    }
                }
            }
        }
    });
}

// Função para criar gráfico de vendas
function criarGraficoVendas() {
    const canvas = document.getElementById('graficoVendas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // CORREÇÃO: Usar dados reais em vez de simulados
    const movimentacoes = gerenciadorDados.obterDados('movimentacoes');
    const produtos = gerenciadorDados.obterDados('produtos');
    
    // Obter vendas do mês atual
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const anoAtual = dataAtual.getFullYear();
    
    // Inicializar array para 30 dias
    const vendasPorDia = Array(30).fill(0);
    const diasDoMes = Array.from({length: 30}, (_, i) => i + 1);
    
    // Preencher com dados reais
    movimentacoes.forEach(mov => {
        if (mov.tipo === 'saida' && mov.motivo === 'venda') {
            const dataMov = new Date(mov.data);
            
            if (dataMov.getMonth() === mesAtual && dataMov.getFullYear() === anoAtual) {
                const dia = dataMov.getDate() - 1; // Índice 0-based
                if (dia >= 0 && dia < 30) {
                    // Encontrar o produto para obter preço
                    const produto = produtos.find(p => p.id === mov.produtoId);
                    if (produto) {
                        // Usar preço da movimentação se disponível, senão usar preço do produto
                        const preco = mov.precoUnitario || produto.preco || 0;
                        vendasPorDia[dia] += mov.quantidade * preco;
                    }
                }
            }
        }
    });
    
    // Configurar labels dos dias
    const labels = diasDoMes.map(dia => {
        const hoje = new Date();
        hoje.setDate(dia);
        const diaSemana = hoje.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
        return `${dia}\n${diaSemana}`;
    });
    
    // Destruir gráfico anterior se existir
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    // Criar gráfico de linha com dados reais
    canvas.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Vendas Diárias (R$)',
                data: vendasPorDia,
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: '#3498db',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3498db',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(2).replace('.', ',');
                        }
                    },
                    title: {
                        display: true,
                        text: 'Valor (R$)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Dia do Mês'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Vendas: R$ ${context.parsed.y.toFixed(2).replace('.', ',')}`;
                        }
                    }
                }
            }
        }
    });
}

// Exportar funções para uso global
window.carregarDashboard = carregarDashboard;