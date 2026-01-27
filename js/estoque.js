// Controle de Estoque do Sistema

// Variáveis globais
let movimentacoesCarregadas = [];
let periodoFiltro = 'mes';

// Função para carregar a página de controle de estoque
function carregarEstoque() {
    const containerEstoque = document.getElementById('estoque');
    
    // Carregar movimentações do armazenamento
    movimentacoesCarregadas = gerenciadorDados.obterDados('movimentacoes');
    
    // Criar conteúdo da página de estoque
    containerEstoque.innerHTML = `
        <div class="titulo-pagina">
            <i class="fas fa-boxes"></i>
            Controle de Estoque
        </div>
        
        <div class="controles-estoque">
            <div class="controle-card">
                <h3>Entrada no Estoque</h3>
                <form id="formularioEntrada" class="formulario-controle">
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="produtoEntrada">Produto *</label>
                        <select class="formulario-select" id="produtoEntrada" required>
                            <option value="">Selecione um produto</option>
                        </select>
                    </div>
        
                    <!-- NOVA SEÇÃO: Detalhes da entrada -->
                    <div id="detalhesEstoqueEntrada" style="margin: 15px 0; padding: 15px; background-color: #f0f8ff; border-radius: 8px; border: 1px solid #cce7ff;">
                        <!-- Conteúdo será carregado dinamicamente -->
                        <p style="color: #666; font-style: italic;">Selecione um produto para especificar cor e tamanho da entrada</p>
                    </div>
        
                    <!-- CAMPOS ANTIGOS (manter como fallback) -->
                    <div class="formulario-grupo">
                        <!-- <label class="formulario-rotulo" for="quantidadeEntrada">Quantidade *</label>  ANTIGOOOO-->
                        <input type="number" class="formulario-input" id="quantidadeEntrada" 
                        min="1" required style="display: none;"> <!-- Esconder o antigo -->
                    </div>
        
                    <div class="formulario-grupo">
                        <!-- <label class="formulario-rotulo" for="custoEntrada">Custso Unitário (R$)</label> ANTIGOOOO-->
                        <input type="number" class="formulario-input" id="custoEntrada" 
                            step="0.01" min="0">
                    </div>
        
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="observacaoEntrada">Observação</label>
                        <textarea class="formulario-input" id="observacaoEntrada" rows="3"></textarea>
                    </div>
        
                    <button type="submit" class="botao sucesso">
                        <i class="fas fa-sign-in-alt"></i>
                            Registrar Entrada
                    </button>
                </form> 
            </div>
            
            <div class="controle-card">
                <h3>Saída do Estoque</h3>
                <form id="formularioSaida" class="formulario-controle">
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="produtoSaida">Produto *</label>
                        <select class="formulario-select" id="produtoSaida" required>
                            <option value="">Selecione um produto</option>
                        </select>
                    </div>

                    <!-- NOVA SEÇÃO: Detalhes do estoque disponível -->
                    <div id="detalhesEstoqueSaida" style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 8px; border: 1px solid #ddd;">
                        <!-- Conteúdo será carregado dinamicamente quando selecionar produto -->
                    </div>
                    
                    
                    
                    <div class="motivo-saida-container">
                        <label class="formulario-rotulo">Motivo da Saída *</label>
                        <div class="motivo-opcoes" id="motivoSaida">
                            <!-- Opções de motivo serão carregadas por JavaScript -->
                        </div>
                    </div>
                    
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="numeroPedido">Número do Pedido</label>
                        <input type="text" class="formulario-input" id="numeroPedido">
                    </div>
                    
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="observacaoSaida">Observação</label>
                        <textarea class="formulario-input" id="observacaoSaida" rows="3"></textarea>
                    </div>
                    
                    <button type="submit" class="botao perigo">
                        <i class="fas fa-sign-out-alt"></i>
                        Registrar Saída
                    </button>
                </form>
            </div>
        </div>
        
        <div class="filtros-periodo">
            <div class="filtros-periodo-container">
                <div class="grupo-periodo">
                    <label class="formulario-rotulo">Período</label>
                    <div class="botoes-periodo-rapido">
                        <button class="botao-periodo ${periodoFiltro === 'hoje' ? 'ativo' : ''}" data-periodo="hoje">Hoje</button>
                        <button class="botao-periodo ${periodoFiltro === 'semana' ? 'ativo' : ''}" data-periodo="semana">Esta Semana</button>
                        <button class="botao-periodo ${periodoFiltro === 'mes' ? 'ativo' : ''}" data-periodo="mes">Este Mês</button>
                        <button class="botao-periodo ${periodoFiltro === 'todos' ? 'ativo' : ''}" data-periodo="todos">Todos</button>
                    </div>
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="dataInicio">Data Início</label>
                    <input type="date" class="formulario-input" id="dataInicio" value="${obterPrimeiroDiaMes()}">
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="dataFim">Data Fim</label>
                    <input type="date" class="formulario-input" id="dataFim" value="${obterDataAtual()}">
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="filtroTipo">Tipo de Movimentação</label>
                    <select class="formulario-select" id="filtroTipo">
                        <option value="">Todos</option>
                        <option value="entrada">Entradas</option>
                        <option value="saida">Saídas</option>
                    </select>
                </div>
                
                <button class="botao" id="aplicarFiltro">
                    <i class="fas fa-filter"></i>
                    Aplicar Filtro
                </button>
            </div>
        </div>
        
        <div class="resumo-movimentacoes">
            <!-- Resumo será carregado por JavaScript -->
        </div>
        
        <div class="tabela-movimentacoes">
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Produto</th>
                        <th>Tipo</th>
                        <th>Quantidade</th>
                        <th>Motivo</th>
                        <th>Pedido</th>
                        <th>Observação</th>
                        <th>Custo Unitário</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="tabelaMovimentacoesBody">
                    <!-- Movimentações serão carregadas por JavaScript -->
                </tbody>
            </table>
        </div>
    `;
    
    // Carregar dados
    carregarProdutosSelect();
    carregarMotivosSaida();
    carregarResumoMovimentacoes();
    carregarTabelaMovimentacoes();
    
    // Configurar eventos
    configurarEventosEstoque();
    
    // Esconder campo de quantidade antigo 
    //esconderCampoQuantidadeAntigo();
    
    // Ajustar interface removendo elementos duplicados
    ajustarInterfaceRemoverDuplicados();

}

// NOVO: Função para atualizar interface de ENTRADA com seleção detalhada
// MODIFICAÇÃO: Atualizar a função atualizarInterfaceEntrada para remover botão duplicado
function atualizarInterfaceEntrada(produtoId) {
    const produtos = gerenciadorDados.obterDados('produtos');
    const produto = produtos.find(p => p.id === produtoId);
    const containerDetalhes = document.getElementById('detalhesEstoqueEntrada');
    
    if (!containerDetalhes || !produto) return;
    
    // Obter configurações para tamanhos padrão
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    const tamanhos = produto.categoria === 'Shorts' ? 
        configuracoes.tamanhosShorts : configuracoes.tamanhosCamisas;
    
    // Obter cores existentes do produto
    const coresProduto = produto.cores ? produto.cores.map(c => c.nome) : [];
    
    let html = `
        <div class="estoque-entrada-card">
            <h4>Especificar Entrada</h4>
            <p><strong>Produto:</strong> ${produto.nome} (${produto.sku})</p>
            
            <div class="selecao-detalhada-entrada">
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="corEntrada">Cor *</label>
                        <select class="formulario-select" id="corEntrada" required>
                            <option value="">Selecione ou adicione uma cor</option>
    `;
    
    // Adicionar cores existentes do produto apenas uma vez
    if (coresProduto.length > 0) {
        coresProduto.forEach(cor => {
            html += `<option value="${cor}">${cor}</option>`;
        });
    }
    
    // Adicionar cores padrão do sistema que NÃO existem no produto
    configuracoes.coresPadrao.forEach(cor => {
        const nomeCor = typeof cor === 'object' ? cor.nome : cor;
        if (!coresProduto.includes(nomeCor)) {
            html += `<option value="${nomeCor}">${nomeCor} (nova)</option>`;
        }
    });
    
    // Adicionar opção para nova cor personalizada
    html += `
                        </select>
                        <div id="novaCorContainer" style="display: none; margin-top: 10px;">
                            <input type="text" class="formulario-input" id="novaCorInput" 
                                   placeholder="Digite o nome da nova cor">
                        </div>
                    </div>
                    
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="tamanhoEntrada">Tamanho *</label>
                        <select class="formulario-select" id="tamanhoEntrada" required>
                            <option value="">Selecione um tamanho</option>
    `;
    
    // Opções de tamanhos
    tamanhos.forEach(tamanho => {
        html += `<option value="${tamanho}">${tamanho}</option>`;
    });
    
    html += `
                        </select>
                    </div>
                    
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="quantidadeEntradaDetalhada">Quantidade *</label>
                        <input type="number" class="formulario-input" id="quantidadeEntradaDetalhada" 
                               min="1" value="1" required>
                    </div>
                    
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo" for="custoEntradaDetalhada">Custo Unitário (R$)</label>
                        <input type="number" class="formulario-input" id="custoEntradaDetalhada" 
                               step="0.01" min="0" value="${produto.custo}">
                    </div>
            </div>
        </div>
    `;
    
    containerDetalhes.innerHTML = html;
    
    // Configurar evento para nova cor
    const selectCor = document.getElementById('corEntrada');
    const novaCorContainer = document.getElementById('novaCorContainer');
    
    if (selectCor) {
        selectCor.addEventListener('change', function() {
            if (this.value === 'nova_cor') {
                novaCorContainer.style.display = 'block';
                document.getElementById('novaCorInput').required = true;
            } else {
                novaCorContainer.style.display = 'none';
                document.getElementById('novaCorInput').required = false;
            }
        });
    }
}

// 3. NOVA FUNÇÃO: registrarEntradaDetalhada()
function registrarEntradaDetalhada(produtoId) {
    // Determinar a cor selecionada
    let corSelecionada = document.getElementById('corEntrada').value;
    
    if (corSelecionada === 'nova_cor') {
        const novaCor = document.getElementById('novaCorInput').value.trim();
        if (!novaCor) {
            mostrarNotificacao('Por favor, digite o nome da nova cor.', 'aviso');
            return;
        }
        corSelecionada = novaCor;
    }
    
    if (!corSelecionada) {
        mostrarNotificacao('Por favor, selecione ou digite uma cor.', 'aviso');
        return;
    }
    
    const tamanho = document.getElementById('tamanhoEntrada').value;
    const quantidade = parseInt(document.getElementById('quantidadeEntradaDetalhada').value);
    const custoUnitario = parseFloat(document.getElementById('custoEntradaDetalhada').value) || 0;
    
    if (!tamanho) {
        mostrarNotificacao('Por favor, selecione um tamanho.', 'aviso');
        return;
    }
    
    if (!quantidade || quantidade < 1) {
        mostrarNotificacao('A quantidade deve ser maior que zero.', 'erro');
        return;
    }
    
    // Criar objeto de entrada
    const entrada = {
        produtoId: produtoId,
        tipo: 'entrada',
        quantidade: quantidade,
        data: obterDataAtual(),
        motivo: 'compra',
        custoUnitario: custoUnitario,
        observacao: document.getElementById('observacaoEntrada').value,
        cor: corSelecionada,
        tamanho: tamanho
    };
    
    // Adicionar movimentação
    try {
        gerenciadorDados.adicionarMovimentacao(entrada);
        mostrarNotificacao('Entrada registrada com sucesso!', 'sucesso');
        
        // Limpar formulários
        document.getElementById('formularioEntrada').reset();
        document.getElementById('detalhesEstoqueEntrada').innerHTML = '';
        
        // Atualizar interface
        carregarTabelaMovimentacoes();
        carregarResumoMovimentacoes();
        
        // Atualizar outras páginas
        if (typeof carregarDashboard === 'function') carregarDashboard();
        if (typeof carregarProdutos === 'function') carregarProdutos();
        
        // Notificar atualização
        notificarAtualizacao(EventosSistema.ESTOQUE_ATUALIZADO, { tipo: 'entrada' });
        
    } catch (error) {
        mostrarNotificacao('Erro ao registrar entrada: ' + error.message, 'erro');
    }
}

// NOVO: Função para verificar estoque específico por cor/tamanho
function verificarEstoqueDisponivel(produtoId) {
    const produtos = gerenciadorDados.obterDados('produtos');
    const produto = produtos.find(p => p.id === produtoId);
    
    if (!produto || !produto.cores) return null;
    
    // Estrutura para armazenar estoque disponível
    const estoqueDisponivel = {
        produto: produto,
        cores: []
    };
    
    produto.cores.forEach(cor => {
        const corInfo = {
            nome: cor.nome,
            estoqueTotal: cor.estoque || 0,
            tamanhos: {}
        };
        
        // Adicionar estoque por tamanho
        if (cor.tamanhos && typeof cor.tamanhos === 'object') {
            Object.entries(cor.tamanhos).forEach(([tamanho, quantidade]) => {
                corInfo.tamanhos[tamanho] = quantidade || 0;
            });
        }
        
        estoqueDisponivel.cores.push(corInfo);
    });
    
    return estoqueDisponivel;
}

// NOVO: Função para atualizar a interface de saída com estoque
// NOVO: Função para atualizar a interface de saída com campo de preço
function atualizarInterfaceSaida(produtoId) {
    const estoqueInfo = verificarEstoqueDisponivel(produtoId);
    const containerDetalhes = document.getElementById('detalhesEstoqueSaida');
    
    if (!containerDetalhes) return;
    
    if (!estoqueInfo) {
        containerDetalhes.innerHTML = `
            <div class="mensagem-vazia">
                <p>Produto não encontrado ou sem estoque disponível.</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="estoque-disponivel-card">
            <h4>Estoque Disponível</h4>
            <p><strong>Produto:</strong> ${estoqueInfo.produto.nome} (${estoqueInfo.produto.sku})</p>
            <p><strong>Estoque Total:</strong> ${estoqueInfo.cores.reduce((total, cor) => total + cor.estoqueTotal, 0)} unidades</p>
            
            <div class="detalhes-cores-tamanhos">
                <h5>Disponibilidade por Cor/Tamanho:</h5>
    `;
    
    estoqueInfo.cores.forEach(cor => {
        if (cor.estoqueTotal > 0) {
            html += `
                <div class="cor-disponivel">
                    <div class="cor-titulo">
                        <span class="cor-indicador" style="background-color: ${obterCorHex(cor.nome)}"></span>
                        <strong>${cor.nome}:</strong> ${cor.estoqueTotal} unidades
                    </div>
            `;
            
            // Adicionar tamanhos se houver
            if (Object.keys(cor.tamanhos).length > 0) {
                html += `<div class="tamanhos-disponiveis">`;
                Object.entries(cor.tamanhos).forEach(([tamanho, quantidade]) => {
                    if (quantidade > 0) {
                        html += `<span class="tag-tamanho-disponivel">${tamanho}: ${quantidade}</span>`;
                    }
                });
                html += `</div>`;
            }
            
            html += `</div>`;
        }
    });
    
    html += `
            </div>
        </div>
        
        <div class="selecao-detalhada">
            <h5>Selecionar Item para Venda:</h5>
            <form id="formularioDetalhadoSaida">
    `;
    
    // Adicionar seleção de cor
    html += `
        <div class="formulario-grupo">
            <label class="formulario-rotulo" for="corSaida">Cor *</label>
            <select class="formulario-select" id="corSaida" required>
                <option value="">Selecione uma cor</option>
    `;
    
    estoqueInfo.cores.forEach(cor => {
        if (cor.estoqueTotal > 0) {
            html += `<option value="${cor.nome}">${cor.nome} (${cor.estoqueTotal} unidades)</option>`;
        }
    });
    
    html += `
            </select>
        </div>
        
        <div class="formulario-grupo">
            <label class="formulario-rotulo" for="tamanhoSaida">Tamanho *</label>
            <select class="formulario-select" id="tamanhoSaida" required>
                <option value="">Selecione um tamanho</option>
            </select>
        </div>
        
        <div class="formulario-grupo">
            <label class="formulario-rotulo" for="quantidadeDetalhada">Quantidade *</label>
            <input type="number" class="formulario-input" id="quantidadeDetalhada" 
                   min="1" value="1" required>
        </div>
        
        <div class="formulario-grupo">
            <label class="formulario-rotulo" for="precoVendaDetalhada">Preço de Venda (R$) *</label>
            <input type="number" class="formulario-input" id="precoVendaDetalhada" 
                   step="0.01" min="0" value="${estoqueInfo.produto.preco}" required>
            <small>Preço sugerido: ${formatarMoeda(estoqueInfo.produto.preco)}</small>
        </div>
        
        <button type="button" class="botao sucesso" id="adicionarItemSaida">
            <i class="fas fa-plus"></i>
            Adicionar à Venda
        </button>
    </form>
    `;
    
    html += `
            <div id="itensSelecionadosSaida" style="margin-top: 20px;">
                <h5>Itens para Venda:</h5>
                <div id="listaItensSaida"></div>
            </div>
        </div>
    `;
    
    containerDetalhes.innerHTML = html;
    
    // Configurar evento para mudança de cor
    const selectCor = document.getElementById('corSaida');
    const selectTamanho = document.getElementById('tamanhoSaida');
    
    if (selectCor) {
        selectCor.addEventListener('change', function() {
            const corSelecionada = this.value;
            const corInfo = estoqueInfo.cores.find(c => c.nome === corSelecionada);
            
            // Limpar e popular tamanhos
            selectTamanho.innerHTML = '<option value="">Selecione um tamanho</option>';
            
            if (corInfo && corInfo.tamanhos) {
                Object.entries(corInfo.tamanhos).forEach(([tamanho, quantidade]) => {
                    if (quantidade > 0) {
                        const option = document.createElement('option');
                        option.value = tamanho;
                        option.textContent = `${tamanho} (${quantidade} unidades)`;
                        selectTamanho.appendChild(option);
                    }
                });
            }
        });
    }
    
    // Configurar evento para adicionar item
    const btnAdicionar = document.getElementById('adicionarItemSaida');
    if (btnAdicionar) {
        btnAdicionar.addEventListener('click', function() {
            adicionarItemVenda(estoqueInfo.produto.id);
        });
    }
}

// NOVO: Função para adicionar item à venda
let itensVenda = [];

// MODIFICAÇÃO: Atualizar função adicionarItemVenda para incluir preço personalizado
function adicionarItemVenda(produtoId) {
    const cor = document.getElementById('corSaida').value;
    const tamanho = document.getElementById('tamanhoSaida').value;
    const quantidade = parseInt(document.getElementById('quantidadeDetalhada').value);
    const precoVenda = parseFloat(document.getElementById('precoVendaDetalhada').value);
    
    if (!cor || !tamanho || !quantidade || quantidade < 1) {
        mostrarNotificacao('Por favor, selecione cor, tamanho e quantidade válidos.', 'aviso');
        return;
    }
    
    if (!precoVenda || precoVenda < 0) {
        mostrarNotificacao('Por favor, informe um preço de venda válido.', 'aviso');
        return;
    }
    
    // Verificar estoque disponível
    const estoqueInfo = verificarEstoqueDisponivel(produtoId);
    const corInfo = estoqueInfo.cores.find(c => c.nome === cor);
    
    if (!corInfo || (corInfo.tamanhos[tamanho] || 0) < quantidade) {
        mostrarNotificacao(`Estoque insuficiente! Disponível: ${corInfo ? corInfo.tamanhos[tamanho] || 0 : 0} unidades`, 'erro');
        return;
    }
    
    // Adicionar ao array de itens
    const item = {
        produtoId: produtoId,
        produtoNome: estoqueInfo.produto.nome,
        sku: estoqueInfo.produto.sku,
        cor: cor,
        tamanho: tamanho,
        quantidade: quantidade,
        precoUnitario: precoVenda, // Usar preço informado pelo usuário
        precoOriginal: estoqueInfo.produto.preco, // Guardar preço original para referência
        total: quantidade * precoVenda
    };
    
    itensVenda.push(item);
    atualizarListaItensVenda();
    
    // Limpar formulário
    document.getElementById('quantidadeDetalhada').value = 1;
    document.getElementById('precoVendaDetalhada').value = estoqueInfo.produto.preco;
    
    mostrarNotificacao('Item adicionado à venda!', 'sucesso');
}

// NOVO: Função para atualizar lista de itens da venda
// MODIFICAÇÃO: Atualizar função atualizarListaItensVenda para remover botões de finalizar
function atualizarListaItensVenda() {
    const container = document.getElementById('listaItensSaida');
    if (!container) return;
    
    if (itensVenda.length === 0) {
        container.innerHTML = '<p class="mensagem-vazia">Nenhum item adicionado.</p>';
        return;
    }
    
    let html = '<table class="tabela-itens-venda">';
    html += `
        <thead>
            <tr>
                <th>Produto</th>
                <th>Cor</th>
                <th>Tamanho</th>
                <th>Quantidade</th>
                <th>Preço Unit.</th>
                <th>Total</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    let totalVenda = 0;
    
    itensVenda.forEach((item, index) => {
        html += `
            <tr>
                <td>${item.produtoNome}</td>
                <td>${item.cor}</td>
                <td>${item.tamanho}</td>
                <td>${item.quantidade}</td>
                <td>
                    ${formatarMoeda(item.precoUnitario)}
                    ${item.precoUnitario !== item.precoOriginal ? 
                        `<br><small>Original: ${formatarMoeda(item.precoOriginal)}</small>` : ''}
                </td>
                <td>${formatarMoeda(item.total)}</td>
                <td>
                    <button class="botao-acao excluir" onclick="removerItemVenda(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        totalVenda += item.total;
    });
    
    html += `
        </tbody>
        <tfoot>
            <tr>
                <td colspan="5" style="text-align: right; font-weight: 600;">Total da Venda:</td>
                <td colspan="2" style="font-weight: 600;">${formatarMoeda(totalVenda)}</td>
            </tr>
        </tfoot>
    </table>
    `;
    
    container.innerHTML = html;
}

// NOVO: Função para remover item da venda
window.removerItemVenda = function(index) {
    itensVenda.splice(index, 1);
    atualizarListaItensVenda();
    mostrarNotificacao('Item removido da venda.', 'info');
};

// NOVO: Função para finalizar venda
// MODIFICAÇÃO: Atualizar função finalizarVenda para usar preço personalizado
function finalizarVenda() {
    if (itensVenda.length === 0) {
        mostrarNotificacao('Nenhum item para vender.', 'aviso');
        return;
    }
    
    // Verificar motivo da saída
    const motivoSelecionado = document.querySelector('input[name="motivoSaida"]:checked');
    
    // Verificar estoque novamente antes de finalizar
    let estoqueSuficiente = true;
    let mensagemErro = '';
    
    for (const item of itensVenda) {
        const estoqueInfo = verificarEstoqueDisponivel(item.produtoId);
        const corInfo = estoqueInfo.cores.find(c => c.nome === item.cor);
        
        if (!corInfo || (corInfo.tamanhos[item.tamanho] || 0) < item.quantidade) {
            estoqueSuficiente = false;
            mensagemErro = `Estoque insuficiente para ${item.produtoNome} - ${item.cor} - ${item.tamanho}`;
            break;
        }
    }
    
    if (!estoqueSuficiente) {
        mostrarNotificacao(mensagemErro, 'erro');
        return;
    }
    
    // Registrar cada item da venda
    const numeroPedido = document.getElementById('numeroPedido').value || `PED-${Date.now()}`;
    const observacao = document.getElementById('observacaoSaida').value;
    
    try {
        let valorTotalVenda = 0;
        
        itensVenda.forEach(item => {
        // Registrar movimentação para cada item
        const saida = {
            produtoId: item.produtoId,
            tipo: 'saida',
            quantidade: item.quantidade,
            data: obterDataAtual(),
            motivo: 'venda',
            numeroPedido: numeroPedido,
            observacao: observacao || `Venda: ${item.produtoNome} - ${item.cor} - ${item.tamanho}`,
            precoUnitario: item.precoUnitario, // Preço unitário da venda
            precoOriginal: item.precoOriginal, // Preço original do produto
            cor: item.cor,
            tamanho: item.tamanho,
            totalVenda: item.total // CORREÇÃO: Salvar o total da venda
        };

            // Registrar movimentação (já atualiza estoque automaticamente)
            gerenciadorDados.adicionarMovimentacao(saida);
            
            valorTotalVenda += item.total;
        });
        
        mostrarNotificacao(`Venda registrada com sucesso! Total: ${formatarMoeda(valorTotalVenda)}`, 'sucesso');
        
        // Limpar formulário
        document.getElementById('formularioSaida').reset();
        document.querySelectorAll('.motivo-opcao').forEach(o => o.classList.remove('selecionado'));
        itensVenda = [];
        
        // Atualizar interface
        const containerDetalhes = document.getElementById('detalhesEstoqueSaida');
        if (containerDetalhes) {
            containerDetalhes.innerHTML = '';
        }
        
        // Atualizar tabela e resumo
        carregarTabelaMovimentacoes();
        carregarResumoMovimentacoes();
        
        // Atualizar outras páginas
        notificarAtualizacao(EventosSistema.ESTOQUE_ATUALIZADO, { 
            tipo: 'venda', 
            itens: itensVenda,
            totalVenda: valorTotalVenda 
        });
        
    } catch (error) {
        mostrarNotificacao('Erro ao registrar venda: ' + error.message, 'erro');
    }
}

// NOVO: Função para cancelar venda
function cancelarVenda() {
    if (confirm('Tem certeza que deseja cancelar esta venda? Todos os itens serão removidos.')) {
        itensVenda = [];
        atualizarListaItensVenda();
        mostrarNotificacao('Venda cancelada.', 'info');
    }
}

// Função para carregar produtos nos selects
// MODIFICAÇÃO: Atualizar carregarProdutosSelect para incluir eventos
function carregarProdutosSelect() {
    const selectEntrada = document.getElementById('produtoEntrada');
    const selectSaida = document.getElementById('produtoSaida');
    
    // Limpar opções existentes
    while (selectEntrada.options.length > 1) selectEntrada.remove(1);
    while (selectSaida.options.length > 1) selectSaida.remove(1);
    
    // Obter produtos
    const produtos = gerenciadorDados.obterDados('produtos');
    
    // Adicionar produtos aos selects
    produtos.forEach(produto => {
        const optionEntrada = document.createElement('option');
        optionEntrada.value = produto.id;
        optionEntrada.textContent = `${produto.nome} (${produto.sku})`;
        selectEntrada.appendChild(optionEntrada.cloneNode(true));
        selectSaida.appendChild(optionEntrada.cloneNode(true));
    });
    
    // Evento para entrada: carregar detalhes quando selecionar produto
    selectEntrada.addEventListener('change', function() {
        const produtoId = parseInt(this.value);
        if (!produtoId) {
            const container = document.getElementById('detalhesEstoqueEntrada');
            if (container) container.innerHTML = '';
            return;
        }
        
        // Carregar custo padrão
        const produtos = gerenciadorDados.obterDados('produtos');
        const produto = produtos.find(p => p.id === produtoId);
        if (produto) {
            document.getElementById('custoEntrada').value = produto.custo.toFixed(2);
        }
        
        // Atualizar interface com seleção detalhada
        atualizarInterfaceEntrada(produtoId);
    });
    
    // Evento para saída (já existente, manter)
    selectSaida.addEventListener('change', function() {
        const produtoId = parseInt(this.value);
        if (!produtoId) return;
        
        // Atualizar interface com estoque disponível
        atualizarInterfaceSaida(produtoId);
    });
}

// Função para carregar motivos de saída
function carregarMotivosSaida() {
    const container = document.getElementById('motivoSaida');
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    
    let html = '';
    
    configuracoes.motivosSaida.forEach(motivo => {
        const motivoFormatado = motivo.charAt(0).toUpperCase() + motivo.slice(1);
        
        html += `
            <label class="motivo-opcao">
                <input type="radio" name="motivoSaida" value="${motivo}" required>
                <span>${motivoFormatado}</span>
            </label>
        `;
    });
    
    container.innerHTML = html;
    
    // Adicionar evento para seleção visual
    const opcoes = document.querySelectorAll('.motivo-opcao');
    opcoes.forEach(opcao => {
        opcao.addEventListener('click', function() {
            // Desmarcar todas as opções
            opcoes.forEach(o => o.classList.remove('selecionado'));
            
            // Marcar esta opção
            this.classList.add('selecionado');
            
            // Marcar o radio button
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
}

// Função para configurar eventos da página de estoque
function configurarEventosEstoque() {
    // Formulário de entrada
    document.getElementById('formularioEntrada').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados básicos
        const produtoId = parseInt(document.getElementById('produtoEntrada').value);
        if (!produtoId) {
            mostrarNotificacao('Selecione um produto primeiro.', 'aviso');
            return;
        }
        
        registrarEntradaDetalhada(produtoId);
    });
    
    // Formulário de saída
    document.getElementById('formularioSaida').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Verificar se há itens na venda
        if (itensVenda.length > 0) {
            finalizarVenda();
        } else {
            // Usar sistema antigo (apenas para saídas não-venda)
            const motivoSelecionado = document.querySelector('input[name="motivoSaida"]:checked');
            if (motivoSelecionado && motivoSelecionado.value !== 'venda') {
                registrarSaida();
            } else {
                mostrarNotificacao('Para vendas, adicione os itens usando a interface acima.', 'aviso');
            }
        }
    });

    // MODIFICAÇÃO: Adicionar evento para carregar detalhes do produto selecionado
    const selectSaida = document.getElementById('produtoSaida');
    if (selectSaida) {
        selectSaida.addEventListener('change', function() {
            const produtoId = parseInt(this.value);
            if (!produtoId) return;
            
            // Atualizar interface com detalhes do estoque
            atualizarInterfaceSaida(produtoId);
        });
    }
    
    // Botões de período rápido
    document.querySelectorAll('.botao-periodo').forEach(botao => {
        botao.addEventListener('click', function() {
            // Atualizar botão ativo
            document.querySelectorAll('.botao-periodo').forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');
            
            // Definir período
            periodoFiltro = this.getAttribute('data-periodo');
            
            // Aplicar filtro
            aplicarFiltroPeriodo();
        });
    });
    
    // Botão aplicar filtro
    document.getElementById('aplicarFiltro').addEventListener('click', aplicarFiltroPeriodo);
}

// Para garantir que o campo de quantidade antigo não seja usado:
function esconderCampoQuantidadeAntigo() {
    const campoAntigo = document.getElementById('quantidadeSaida');
    if (campoAntigo) {
        campoAntigo.style.display = 'none';
        campoAntigo.disabled = true;
    }
}

// Função para registrar entrada no estoque
// MODIFICAÇÃO: Atualizar função registrarEntrada para usar cor/tamanho
function registrarEntrada() {
    const formulario = document.getElementById('formularioEntrada');
    if (!formulario.checkValidity()) {
        mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'aviso');
        return;
    }
    
    // Coletar dados básicos
    const produtoId = parseInt(document.getElementById('produtoEntrada').value);
    const cor = document.getElementById('corEntrada') ? document.getElementById('corEntrada').value : null;
    const tamanho = document.getElementById('tamanhoEntrada') ? document.getElementById('tamanhoEntrada').value : null;
    const quantidade = document.getElementById('quantidadeEntradaDetalhada') ? 
        parseInt(document.getElementById('quantidadeEntradaDetalhada').value) : 
        parseInt(document.getElementById('quantidadeEntrada').value);
    
    if (!cor || !tamanho) {
        mostrarNotificacao('Para entrada, é necessário especificar cor e tamanho.', 'aviso');
        return;
    }
    
    // Criar objeto de entrada
    const entrada = {
        produtoId: produtoId,
        tipo: 'entrada',
        quantidade: quantidade,
        data: obterDataAtual(),
        motivo: 'compra',
        custoUnitario: document.getElementById('custoEntradaDetalhada') ? 
            parseFloat(document.getElementById('custoEntradaDetalhada').value) || 0 :
            parseFloat(document.getElementById('custoEntrada').value) || 0,
        observacao: document.getElementById('observacaoEntrada').value,
        cor: cor,
        tamanho: tamanho
    };
    
    // Validar
    if (entrada.quantidade <= 0) {
        mostrarNotificacao('A quantidade deve ser maior que zero.', 'erro');
        return;
    }
    
    // Adicionar movimentação
    try {
        gerenciadorDados.adicionarMovimentacao(entrada);
        mostrarNotificacao('Entrada registrada com sucesso!', 'sucesso');
        
        // Limpar formulário
        formulario.reset();
        const detalhesEntrada = document.getElementById('detalhesEstoqueEntrada');
        if (detalhesEntrada) detalhesEntrada.innerHTML = '';
        
        // Atualizar interface
        carregarTabelaMovimentacoes();
        carregarResumoMovimentacoes();
        
        // Atualizar outras páginas
        if (typeof carregarDashboard === 'function') carregarDashboard();
        if (typeof carregarProdutos === 'function') carregarProdutos();
        
    } catch (error) {
        mostrarNotificacao('Erro ao registrar entrada: ' + error.message, 'erro');
    }
}

// Função para registrar saída do estoque
function registrarSaida() {
    const formulario = document.getElementById('formularioSaida');
    if (!formulario.checkValidity()) {
        mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'aviso');
        return;
    }
    
    // Verificar motivo selecionado
    const motivoSelecionado = document.querySelector('input[name="motivoSaida"]:checked');
    if (!motivoSelecionado) {
        mostrarNotificacao('Por favor, selecione um motivo para a saída.', 'aviso');
        return;
    }
    
    // Coletar dados do formulário
    const saida = {
        produtoId: parseInt(document.getElementById('produtoSaida').value),
        tipo: 'saida',
        quantidade: parseInt(document.getElementById('quantidadeSaida').value),
        data: obterDataAtual(),
        motivo: motivoSelecionado.value,
        numeroPedido: document.getElementById('numeroPedido').value || null,
        observacao: document.getElementById('observacaoSaida').value
    };
    
    // Validar quantidade
    if (saida.quantidade <= 0) {
        mostrarNotificacao('A quantidade deve ser maior que zero.', 'erro');
        return;
    }
    
    // Verificar se há estoque suficiente
    const produtos = gerenciadorDados.obterDados('produtos');
    const produto = produtos.find(p => p.id === saida.produtoId);
    
    if (produto) {
        let estoqueTotal = 0;
        if (produto.cores && produto.cores.length > 0) {
            produto.cores.forEach(cor => {
                estoqueTotal += cor.estoque || 0;
            });
        }
        
        if (saida.quantidade > estoqueTotal) {
            mostrarNotificacao(`Estoque insuficiente! Disponível: ${estoqueTotal} unidades.`, 'erro');
            return;
        }
    }
    
    // Adicionar movimentação
    try {
        gerenciadorDados.adicionarMovimentacao(saida);
        mostrarNotificacao('Saída registrada com sucesso!', 'sucesso');
        
        // Limpar formulário
        formulario.reset();
        document.querySelectorAll('.motivo-opcao').forEach(o => o.classList.remove('selecionado'));
        
        // Atualizar tabela
        carregarTabelaMovimentacoes();
        carregarResumoMovimentacoes();
        
        // Atualizar dashboard
        if (typeof carregarDashboard === 'function') {
            carregarDashboard();
        }
        
        // Atualizar página de produtos
        if (typeof carregarProdutos === 'function') {
            carregarProdutos();
        }
    } catch (error) {
        mostrarNotificacao('Erro ao registrar saída: ' + error.message, 'erro');
    }
}

// Função para carregar tabela de movimentações
// MODIFICAÇÃO: Atualizar função carregarTabelaMovimentacoes para mostrar preço de venda
function carregarTabelaMovimentacoes() {
    const tbody = document.getElementById('tabelaMovimentacoesBody');
    
    // Aplicar filtros
    const movimentacoesFiltradas = filtrarMovimentacoes();
    
    if (movimentacoesFiltradas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="mensagem-vazia">
                    <i class="fas fa-exchange-alt"></i>
                    <p>Nenhuma movimentação encontrada no período selecionado.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // Obter produtos para referência
    const produtos = gerenciadorDados.obterDados('produtos');
    
    let html = '';
    
    // Ordenar por data (mais recente primeiro)
    movimentacoesFiltradas.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    movimentacoesFiltradas.forEach(mov => {
        // Encontrar produto
        const produto = produtos.find(p => p.id === mov.produtoId);
        const nomeProduto = produto ? produto.nome : `Produto ID: ${mov.produtoId}`;
        
        // Calcular total - usar preço de venda para saídas, custo para entradas
        let total = 0;
        let precoUnitario = 0;
        
        if (mov.tipo === 'entrada') {
            precoUnitario = mov.custoUnitario || 0;
            total = mov.quantidade * precoUnitario;
        } else if (mov.tipo === 'saida') {
            precoUnitario = mov.precoUnitario || (produto ? produto.preco : 0);
            total = mov.totalVenda || (mov.quantidade * precoUnitario);
        }
        
        html += `
            <tr>
                <td>${formatarData(mov.data)}</td>
                <td>${nomeProduto}${mov.cor ? `<br><small>${mov.cor} - ${mov.tamanho || ''}</small>` : ''}</td>
                <td>
                    <span class="${mov.tipo === 'entrada' ? 'tipo-entrada' : 'tipo-saida'}">
                        ${mov.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                    </span>
                </td>
                <td>${mov.quantidade}</td>
                <td>${mov.motivo ? mov.motivo.charAt(0).toUpperCase() + mov.motivo.slice(1) : ''}</td>
                <td>${mov.numeroPedido || '-'}</td>
                <td>${mov.observacao || '-'}</td>
                <td>
                    ${mov.tipo === 'entrada' ? 
                        (precoUnitario ? formatarMoeda(precoUnitario) : '-') :
                        (precoUnitario ? formatarMoeda(precoUnitario) : '-')}
                </td>
                <td>${total > 0 ? formatarMoeda(total) : '-'}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// MODIFICAÇÃO: Atualizar função carregarResumoMovimentacoes para usar preço de venda real
// MODIFICAÇÃO: Corrigir cálculo do valor total das vendas
function carregarResumoMovimentacoes() {
    const container = document.querySelector('.resumo-movimentacoes');
    const movimentacoesFiltradas = filtrarMovimentacoes();
    
    // Calcular totais
    let totalEntradas = 0;
    let totalSaidas = 0;
    let valorEntradas = 0;
    let valorSaidas = 0;
    
    movimentacoesFiltradas.forEach(mov => {
        if (mov.tipo === 'entrada') {
            totalEntradas += mov.quantidade;
            valorEntradas += mov.quantidade * (mov.custoUnitario || 0);
        } else if (mov.tipo === 'saida') {
            totalSaidas += mov.quantidade;
            
            // CORREÇÃO: Usar totalVenda se disponível, caso contrário calcular
            if (mov.totalVenda) {
                // Se temos o total da venda registrado
                valorSaidas += mov.totalVenda;
            } else if (mov.precoUnitario) {
                // Se temos preço unitário da venda
                valorSaidas += mov.quantidade * mov.precoUnitario;
            } else {
                // Fallback: usar preço do produto
                const produtos = gerenciadorDados.obterDados('produtos');
                const produto = produtos.find(p => p.id === mov.produtoId);
                if (produto) {
                    valorSaidas += mov.quantidade * produto.preco;
                }
            }
        }
    });
    
    const saldoQuantidade = totalEntradas - totalSaidas;
    const saldoValor = valorSaidas - valorEntradas; // Lucro/prejuízo
    
    container.innerHTML = `
        <div class="resumo-mov-card entrada">
            <h4>Entradas</h4>
            <div class="valor">${totalEntradas}</div>
            <p>${formatarMoeda(valorEntradas)}</p>
            <small>Custo total</small>
        </div>
        
        <div class="resumo-mov-card saida">
            <h4>Saídas</h4>
            <div class="valor">${totalSaidas}</div>
            <p>${formatarMoeda(valorSaidas)}</p>
            <small>Valor total das vendas</small>
        </div>
        
        <div class="resumo-mov-card saldo">
            <h4>Saldo (Quantidade)</h4>
            <div class="valor">${saldoQuantidade}</div>
            <p>Estoque atual</p>
        </div>
        
        <div class="resumo-mov-card ${saldoValor >= 0 ? 'saida' : 'prejuizo'}">
            <h4>Lucro/Prejuízo</h4>
            <div class="valor">${formatarMoeda(saldoValor)}</div>
            <p>Vendas - Custos</p>
        </div>
    `;
}

// Função para filtrar movimentações
function filtrarMovimentacoes() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const filtroTipo = document.getElementById('filtroTipo').value;
    
    let movimentacoesFiltradas = [...movimentacoesCarregadas];
    
    // Aplicar filtro por tipo
    if (filtroTipo) {
        movimentacoesFiltradas = movimentacoesFiltradas.filter(mov => mov.tipo === filtroTipo);
    }
    
    // Aplicar filtro por data
    if (dataInicio) {
        const inicio = new Date(dataInicio);
        movimentacoesFiltradas = movimentacoesFiltradas.filter(mov => {
            const dataMov = new Date(mov.data);
            return dataMov >= inicio;
        });
    }
    
    if (dataFim) {
        const fim = new Date(dataFim);
        // Ajustar para o final do dia
        fim.setHours(23, 59, 59, 999);
        movimentacoesFiltradas = movimentacoesFiltradas.filter(mov => {
            const dataMov = new Date(mov.data);
            return dataMov <= fim;
        });
    }
    
    return movimentacoesFiltradas;
}

// Função para aplicar filtro de período rápido
function aplicarFiltroPeriodo() {
    const hoje = new Date();
    let dataInicio, dataFim;
    
    switch(periodoFiltro) {
        case 'hoje':
            dataInicio = obterDataAtual();
            dataFim = obterDataAtual();
            break;
            
        case 'semana':
            // Primeiro dia da semana (domingo)
            const domingo = new Date(hoje);
            domingo.setDate(hoje.getDate() - hoje.getDay());
            dataInicio = domingo.toISOString().split('T')[0];
            dataFim = obterDataAtual();
            break;
            
        case 'mes':
            dataInicio = obterPrimeiroDiaMes();
            dataFim = obterDataAtual();
            break;
            
        case 'todos':
            // Não definir datas para mostrar todos
            dataInicio = '';
            dataFim = '';
            break;
    }
    
    // Atualizar campos de data
    if (dataInicio) document.getElementById('dataInicio').value = dataInicio;
    if (dataFim) document.getElementById('dataFim').value = dataFim;
    
    // Aplicar filtro
    carregarTabelaMovimentacoes();
    carregarResumoMovimentacoes();
}

// NOVO: Adicionar função de verificação/debug
function verificarSincronizacaoEstoque() {
    console.log('=== VERIFICAÇÃO DE SINCRONIZAÇÃO ===');
    
    // Obter todos os produtos
    const produtos = gerenciadorDados.obterDados('produtos');
    
    console.log('Total de produtos:', produtos.length);
    
    // Verificar estoque de cada produto
    produtos.forEach(produto => {
        let estoqueTotal = 0;
        if (produto.cores && produto.cores.length > 0) {
            estoqueTotal = produto.cores.reduce((total, cor) => total + (cor.estoque || 0), 0);
        }
        
        console.log(`Produto: ${produto.nome} (ID: ${produto.id})`);
        console.log(`- Estoque total: ${estoqueTotal}`);
        console.log(`- Estoque mínimo: ${produto.estoqueMinimo}`);
        console.log(`- Status: ${estoqueTotal < produto.estoqueMinimo ? 'BAIXO' : 'OK'}`);
        
        // Detalhes por cor/tamanho
        if (produto.cores) {
            produto.cores.forEach(cor => {
                console.log(`  Cor ${cor.nome}: ${cor.estoque || 0} unidades`);
                if (cor.tamanhos) {
                    Object.entries(cor.tamanhos).forEach(([tamanho, qtd]) => {
                        console.log(`    Tamanho ${tamanho}: ${qtd}`);
                    });
                }
            });
        }
    });
    
    // Obter todas as movimentações
    const movimentacoes = gerenciadorDados.obterDados('movimentacoes');
    console.log('Total de movimentações:', movimentacoes.length);
    
    // Verificar últimas movimentações
    const ultimasMov = movimentacoes.slice(-5);
    console.log('Últimas 5 movimentações:', ultimasMov);
    
    console.log('=== FIM VERIFICAÇÃO ===');
}
// Chamar esta função para debug quando necessário

// NOVO: Função para ajustar interface removendo elementos duplicados
function ajustarInterfaceRemoverDuplicados() {
    // 1. Remover botão "Finalizar Venda" da lista de itens
    const containerItens = document.getElementById('listaItensSaida');
    if (containerItens) {
        const htmlAtual = containerItens.innerHTML;
        // Remover botões de finalizar/cancelar venda da lista
        const novoHtml = htmlAtual.replace(
            /<div style="margin-top: 15px; text-align: center;">[\s\S]*?<\/div>/g,
            ''
        );
        if (novoHtml !== htmlAtual) {
            containerItens.innerHTML = novoHtml;
        }
    }
    
    // 2. Esconder campos duplicados na entrada
    const quantidadeAntiga = document.getElementById('quantidadeEntrada');
    const custoAntigo = document.getElementById('custoEntrada');
    
    if (quantidadeAntiga) {
        quantidadeAntiga.style.display = 'none';
        quantidadeAntiga.disabled = true;
        quantidadeAntiga.removeAttribute('required');
    }
    
    if (custoAntigo) {
        custoAntigo.style.display = 'none';
        custoAntigo.disabled = true;
    }
}


// Exportar funções para uso global
window.carregarEstoque = carregarEstoque;