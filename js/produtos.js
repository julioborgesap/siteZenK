// Gestão de Produtos do Sistema de Controle de Estoque

// Variáveis globais
let produtosCarregados = [];
let produtoEditando = null;

// Função para carregar a página de produtos
function carregarProdutos() {
    const containerProdutos = document.getElementById('produtos');
    
    // Carregar produtos do armazenamento
    produtosCarregados = gerenciadorDados.obterDados('produtos');
    
    // Criar conteúdo da página de produtos
    containerProdutos.innerHTML = `
        <div class="titulo-pagina">
            <i class="fas fa-tshirt"></i>
            Gestão de Produtos
        </div>
        
        <div class="cabecalho-pagina-produtos">
            <div class="filtros-produtos">
                <div class="filtros-container">
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo">Filtrar por Categoria</label>
                        <select class="formulario-select" id="filtroCategoria">
                            <option value="">Todas as categorias</option>
                        </select>
                    </div>
                    
                    <div class="formulario-grupo">
                        <label class="formulario-rotulo">Filtrar por Estoque</label>
                        <select class="formulario-select" id="filtroEstoque">
                            <option value="">Todos</option>
                            <option value="baixo">Estoque Baixo</option>
                            <option value="medio">Estoque Médio</option>
                            <option value="normal">Estoque Normal</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <button class="botao sucesso" id="botaoAdicionarProduto">
                <i class="fas fa-plus"></i>
                Adicionar Produto
            </button>
        </div>
        
        <div class="tabela-container">
            <table class="tabela-produtos">
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Subcategoria</th>
                        <th>Estoque</th>
                        <th>Preço</th>
                        <th>Custo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabelaProdutosBody">
                    <!-- Produtos serão carregados por JavaScript -->
                </tbody>
            </table>
        </div>
        
        <!-- Modal para adicionar/editar produto -->
        <div class="modal-overlay" id="modalProduto">
            <div class="modal-produto">
                <!-- Conteúdo do modal será carregado dinamicamente -->
            </div>
        </div>
    `;
    
    // Carregar categorias no filtro
    carregarCategoriasFiltro();
    
    // Carregar produtos na tabela
    carregarTabelaProdutos();
    
    // Configurar eventos
    configurarEventosProdutos();
}

// Função para carregar categorias no filtro
function carregarCategoriasFiltro() {
    const selectCategoria = document.getElementById('filtroCategoria');
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    
    // Limpar opções existentes (exceto a primeira)
    while (selectCategoria.options.length > 1) {
        selectCategoria.remove(1);
    }
    
    // Adicionar categorias
    configuracoes.categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        selectCategoria.appendChild(option);
    });
    
    // Configurar evento de filtro
    selectCategoria.addEventListener('change', filtrarProdutos);
    document.getElementById('filtroEstoque').addEventListener('change', filtrarProdutos);
}

// Função para carregar produtos na tabela
function carregarTabelaProdutos() {
    const tbody = document.getElementById('tabelaProdutosBody');
    
    if (produtosCarregados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="mensagem-vazia">
                    <i class="fas fa-box-open"></i>
                    <p>Nenhum produto cadastrado. Clique em "Adicionar Produto" para começar.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    produtosCarregados.forEach(produto => {
        // Calcular estoque total
        let estoqueTotal = 0;
        if (produto.cores && produto.cores.length > 0) {
            produto.cores.forEach(cor => {
                estoqueTotal += cor.estoque || 0;
            });
        }
        
        // Determinar classe de estoque
        let classeEstoque = '';
        if (estoqueTotal < produto.estoqueMinimo) {
            classeEstoque = 'estoque-baixo';
        } else if (estoqueTotal < produto.estoqueMinimo * 2) {
            classeEstoque = 'estoque-medio';
        }
        
        html += `
            <tr class="${classeEstoque}">
                <td>${produto.sku}</td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>${produto.subcategoria}</td>
                <td>${estoqueTotal}</td>
                <td>${formatarMoeda(produto.preco)}</td>
                <td>${formatarMoeda(produto.custo)}</td>
                <td>
                    <div class="acoes-celula">
                        <button class="botao-acao visualizar" data-id="${produto.id}" title="Visualizar">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="botao-acao editar" data-id="${produto.id}" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="botao-acao excluir" data-id="${produto.id}" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

function aplicarOrdenacaoTabela() {
    const tbody = document.getElementById('tabelaProdutosBody');
    if (!tbody) return;
    
    const rows = Array.from(tbody.querySelectorAll('tr'));
    if (rows.length <= 1) return; // Não ordenar se só tiver linha de mensagem
    
    // Ordenar por SKU (ou pode ser por ID se quiser mais recente primeiro)
    const sortedRows = rows.sort((a, b) => {
        const skuA = a.cells[0]?.textContent || '';
        const skuB = b.cells[0]?.textContent || '';
        return skuA.localeCompare(skuB);
    });
    
    // Reinserir na ordem
    sortedRows.forEach(row => tbody.appendChild(row));
}

// Função para configurar eventos da página de produtos
function configurarEventosProdutos() {
    // Botão para adicionar produto
    document.getElementById('botaoAdicionarProduto').addEventListener('click', () => {
        abrirModalProduto();
    });
    
    // Eventos de clique nos botões de ação
    document.getElementById('tabelaProdutosBody').addEventListener('click', function(e) {
        const botao = e.target.closest('.botao-acao');
        if (!botao) return;
        
        const id = parseInt(botao.getAttribute('data-id'));
        const acao = botao.classList.contains('visualizar') ? 'visualizar' :
                    botao.classList.contains('editar') ? 'editar' :
                    botao.classList.contains('excluir') ? 'excluir' : null;
        
        if (!acao || !id) return;
        
        if (acao === 'visualizar') {
            visualizarProduto(id);
        } else if (acao === 'editar') {
            editarProduto(id);
        } else if (acao === 'excluir') {
            excluirProduto(id);
        }
    });
}

// Função para filtrar produtos
function filtrarProdutos() {
    const filtroCategoria = document.getElementById('filtroCategoria').value;
    const filtroEstoque = document.getElementById('filtroEstoque').value;
    
    let produtosFiltrados = [...produtosCarregados];
    
    // Aplicar filtro de categoria
    if (filtroCategoria) {
        produtosFiltrados = produtosFiltrados.filter(produto => 
            produto.categoria === filtroCategoria
        );
    }
    
    // Aplicar filtro de estoque
    if (filtroEstoque) {
        produtosFiltrados = produtosFiltrados.filter(produto => {
            // Calcular estoque total
            let estoqueTotal = 0;
            if (produto.cores && produto.cores.length > 0) {
                produto.cores.forEach(cor => {
                    estoqueTotal += cor.estoque || 0;
                });
            }
            
            if (filtroEstoque === 'baixo') {
                return estoqueTotal < produto.estoqueMinimo;
            } else if (filtroEstoque === 'medio') {
                return estoqueTotal >= produto.estoqueMinimo && estoqueTotal < produto.estoqueMinimo * 2;
            } else if (filtroEstoque === 'normal') {
                return estoqueTotal >= produto.estoqueMinimo * 2;
            }
            
            return true;
        });
    }
    
    // Atualizar tabela com produtos filtrados
    const tbody = document.getElementById('tabelaProdutosBody');
    
    if (produtosFiltrados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="mensagem-vazia">
                    <i class="fas fa-search"></i>
                    <p>Nenhum produto encontrado com os filtros aplicados.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    produtosFiltrados.forEach(produto => {
        // Calcular estoque total
        let estoqueTotal = 0;
        if (produto.cores && produto.cores.length > 0) {
            produto.cores.forEach(cor => {
                estoqueTotal += cor.estoque || 0;
            });
        }
        
        // Determinar classe de estoque
        let classeEstoque = '';
        if (estoqueTotal < produto.estoqueMinimo) {
            classeEstoque = 'estoque-baixo';
        } else if (estoqueTotal < produto.estoqueMinimo * 2) {
            classeEstoque = 'estoque-medio';
        }
        
        html += `
            <tr class="${classeEstoque}">
                <td>${produto.sku}</td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>${produto.subcategoria}</td>
                <td>${estoqueTotal}</td>
                <td>${formatarMoeda(produto.preco)}</td>
                <td>${formatarMoeda(produto.custo)}</td>
                <td>
                    <div class="acoes-celula">
                        <button class="botao-acao visualizar" data-id="${produto.id}" title="Visualizar">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="botao-acao editar" data-id="${produto.id}" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="botao-acao excluir" data-id="${produto.id}" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// CORREÇÃO COMPLETA: Função para abrir modal de produto
function abrirModalProduto(produto = null) {
    console.log('Abrir modal produto:', produto ? 'Editar' : 'Novo');
    
    produtoEditando = produto;
    const modal = document.getElementById('modalProduto');
    const modalConteudo = document.querySelector('.modal-produto');
    
    if (!modal || !modalConteudo) {
        console.error('Modal não encontrado no DOM');
        mostrarNotificacao('Erro ao abrir formulário de produto', 'erro');
        return;
    }
    
    // CORREÇÃO: Mostrar modal IMEDIATAMENTE
    modal.classList.add('ativo');
    document.body.style.overflow = 'hidden';
    
    // Configurações
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    const modo = produto ? 'Editar' : 'Adicionar';
    
    // Gerar HTML básico primeiro (para mostrar o modal)
    modalConteudo.innerHTML = `
        <div class="modal-cabecalho">
            <h3>${modo} Produto</h3>
            <button class="botao-fechar-modal" id="fecharModalProduto">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="modal-corpo">
            <p>Carregando formulário...</p>
        </div>
        
        <div class="modal-rodape">
            <button type="button" class="botao secundario" id="cancelarProduto">
                Cancelar
            </button>
            <button type="button" class="botao sucesso" id="salvarProduto">
                <i class="fas fa-save"></i>
                ${modo === 'Editar' ? 'Atualizar' : 'Salvar'} Produto
            </button>
        </div>
    `;
    
    // Configurar eventos básicos de fechar
    configurarEventosBasicosModal();
    
    // Carregar conteúdo completo após breve delay (para não travar a UI)
    setTimeout(() => {
        carregarConteudoCompletoModal(produto, configuracoes, modo);
    }, 50);
}

// Nova função: Configurar eventos básicos do modal
function configurarEventosBasicosModal() {
    const modal = document.getElementById('modalProduto');
    const btnFechar = document.getElementById('fecharModalProduto');
    const btnCancelar = document.getElementById('cancelarProduto');
    
    const fecharModal = function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.remove('ativo');
        document.body.style.overflow = '';
        produtoEditando = null;
    };
    
    if (btnFechar) btnFechar.addEventListener('click', fecharModal);
    if (btnCancelar) btnCancelar.addEventListener('click', fecharModal);
    
    // Fechar ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            fecharModal(e);
        }
    });
}

// Nova função: Carregar conteúdo completo do modal
function carregarConteudoCompletoModal(produto, configuracoes, modo) {
    const modalCorpo = document.querySelector('.modal-corpo');
    
    if (!modalCorpo) return;
    
    // Gerar HTML completo do formulário
    modalCorpo.innerHTML = `
        <form id="formularioProduto">
            <div class="formulario-modal">
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="sku">SKU *</label>
                    <input type="text" class="formulario-input" id="sku" 
                           value="${produto ? produto.sku : ''}" required>
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="nome">Nome do Produto *</label>
                    <input type="text" class="formulario-input" id="nome" 
                           value="${produto ? produto.nome : ''}" required>
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="categoria">Categoria *</label>
                    <select class="formulario-select" id="categoria" required>
                        <option value="">Selecione uma categoria</option>
                        ${configuracoes.categorias.map(cat => 
                            `<option value="${cat}" ${produto && produto.categoria === cat ? 'selected' : ''}>
                                ${cat}
                            </option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="subcategoria">Subcategoria *</label>
                    <select class="formulario-select" id="subcategoria" required>
                        <option value="">Selecione uma subcategoria</option>
                        ${configuracoes.subcategorias.map(sub => 
                            `<option value="${sub}" ${produto && produto.subcategoria === sub ? 'selected' : ''}>
                                ${sub}
                            </option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="preco">Preço de Venda (R$) *</label>
                    <input type="number" class="formulario-input" id="preco" 
                           step="0.01" min="0" value="${produto ? produto.preco : ''}" required>
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="custo">Custo Unitário (R$) *</label>
                    <input type="number" class="formulario-input" id="custo" 
                           step="0.01" min="0" value="${produto ? produto.custo : ''}" required>
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo" for="estoqueMinimo">Estoque Mínimo *</label>
                    <input type="number" class="formulario-input" id="estoqueMinimo" 
                           min="1" value="${produto ? produto.estoqueMinimo : 10}" required>
                </div>
                
                <div class="formulario-grupo grupo-completo">
                    <label class="formulario-rotulo">Cores e Tamanhos</label>
                    <div class="estoque-variacoes">
                        <div class="variacoes-titulo">Configurar variações de estoque</div>
                        <div id="containerVariacoes">
                            <!-- Variações serão carregadas dinamicamente -->
                        </div>
                        <button type="button" class="botao secundario" id="adicionarVariacao" style="margin-top: 15px;">
                            <i class="fas fa-plus"></i> Adicionar Cor/Tamanho
                        </button>
                    </div>
                </div>
                
                <div class="formulario-grupo grupo-completo">
                    <label class="formulario-rotulo">Componentes de Custo</label>
                    <div id="containerComponentesCusto">
                        <!-- Componentes de custo serão carregados dinamicamente -->
                    </div>
                    <button type="button" class="botao secundario" id="adicionarComponente" style="margin-top: 15px;">
                        <i class="fas fa-plus"></i> Adicionar Componente de Custo
                    </button>
                </div>
            </div>
        </form>
    `;
    
    // Carregar dados dinâmicos
    if (produto && produto.cores) {
        carregarVariacoesProduto(produto.cores);
    } else {
        adicionarVariacao(); // Adicionar uma variação inicial
    }
    
    if (produto && produto.componentesCusto) {
        carregarComponentesCusto(produto.componentesCusto);
    } else {
        adicionarComponenteCusto(); // Adicionar componente inicial
    }
    
    // Configurar eventos do formulário
    configurarEventosFormularioProduto();
}

// Nova função: Configurar eventos do formulário
function configurarEventosFormularioProduto() {
    // Adicionar variação
    const btnAdicionarVariacao = document.getElementById('adicionarVariacao');
    if (btnAdicionarVariacao) {
        btnAdicionarVariacao.addEventListener('click', function(e) {
            e.preventDefault();
            adicionarVariacao();
        });
    }
    
    // Adicionar componente
    const btnAdicionarComponente = document.getElementById('adicionarComponente');
    if (btnAdicionarComponente) {
        btnAdicionarComponente.addEventListener('click', function(e) {
            e.preventDefault();
            adicionarComponenteCusto();
        });
    }
    
    // Salvar produto
    const btnSalvarProduto = document.getElementById('salvarProduto');
    if (btnSalvarProduto) {
        btnSalvarProduto.addEventListener('click', function(e) {
            e.preventDefault();
            salvarProduto();
        });
    }
    
    // Event delegation para botões de remover
    const containerVariacoes = document.getElementById('containerVariacoes');
    if (containerVariacoes) {
        containerVariacoes.addEventListener('click', function(e) {
            const btnRemover = e.target.closest('.botao-remover-variacao');
            if (btnRemover) {
                e.preventDefault();
                const elemento = btnRemover.closest('.variacao-item');
                if (elemento) {
                    elemento.remove();
                    reordenarVariacoes();
                }
            }
        });
    }
    
    const containerComponentes = document.getElementById('containerComponentesCusto');
    if (containerComponentes) {
        containerComponentes.addEventListener('click', function(e) {
            const btnRemover = e.target.closest('.botao-remover-variacao');
            if (btnRemover) {
                e.preventDefault();
                const elemento = btnRemover.closest('.variacao-item');
                if (elemento) {
                    elemento.remove();
                }
            }
        });
    }
}

// Função para adicionar uma variação (cor/tamanho)
function adicionarVariacao(variacao = null) {
    const container = document.getElementById('containerVariacoes');
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    
    // Determinar tamanhos baseado na categoria selecionada
    let tamanhos = configuracoes.tamanhosCamisas;
    const categoria = document.getElementById('categoria');
    
    if (categoria && categoria.value === 'Shorts') {
        tamanhos = configuracoes.tamanhosShorts;
    }
    
    // Gerar HTML para a variação
    const idVariacao = Date.now(); // ID único simples
    
    const html = `
        <div class="variacao-item" id="variacao-${idVariacao}">
            <div class="variacao-cabecalho">
                <div class="variacao-nome">Variação ${container.children.length + 1}</div>
                <button type="button" class="botao-remover-variacao" data-id="${idVariacao}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="variacao-campos">
                <div class="formulario-grupo">
                    <label class="formulario-rotulo">Cor</label>
                    <select class="formulario-select variacao-cor">
                        <option value="">Selecione uma cor</option>
                        ${configuracoes.coresPadrao.map(cor => {
                            const nomeCor = typeof cor === 'object' ? cor.nome : cor;
                            const selecionado = variacao && variacao.nome === nomeCor ? 'selected' : '';
                            return `<option value="${nomeCor}" ${selecionado}>${nomeCor}</option>`;
                        }).join('')}
                    </select>
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo">Estoque</label>
                    <input type="number" class="formulario-input variacao-estoque" 
                           min="0" value="${variacao ? variacao.estoque : 0}">
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo">Distribuição por Tamanho</label>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; margin-top: 5px;">
                        ${tamanhos.map(tamanho => `
                            <div>
                                <label style="font-size: 12px;">${tamanho}</label>
                                <input type="number" class="formulario-input" 
                                       style="padding: 5px; font-size: 12px;"
                                       value="${variacao && variacao.tamanhos && variacao.tamanhos[tamanho] ? variacao.tamanhos[tamanho] : 0}">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', html);
}

// NOVA FUNÇÃO: Reordenar variações
function reordenarVariacoes() {
    const itensVariacao = document.querySelectorAll('.variacao-item[id^="variacao-"]');
    itensVariacao.forEach((item, index) => {
        const nomeElemento = item.querySelector('.variacao-nome');
        if (nomeElemento) {
            nomeElemento.textContent = `Variação ${index + 1}`;
        }
    });
}

// Função para carregar variações de produto
function carregarVariacoesProduto(variacoes) {
    const container = document.getElementById('containerVariacoes');
    container.innerHTML = '';
    
    variacoes.forEach(variacao => {
        adicionarVariacao(variacao);
    });
}

// Função para adicionar componente de custo
function adicionarComponenteCusto(componente = null) {
    const container = document.getElementById('containerComponentesCusto');
    
    // Gerar HTML para o componente
    const idComponente = Date.now(); // ID único simples
    
    const html = `
        <div class="variacao-item" id="componente-${idComponente}" style="margin-bottom: 15px;">
            <div class="variacao-cabecalho">
                <div class="variacao-nome">Componente de Custo ${container.children.length + 1}</div>
                <button type="button" class="botao-remover-variacao" data-id="${idComponente}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="variacao-campos">
                <div class="formulario-grupo">
                    <label class="formulario-rotulo">Nome do Componente</label>
                    <input type="text" class="formulario-input componente-nome" 
                           value="${componente ? componente.nome : ''}" placeholder="Ex: Tecido, Botão, etc.">
                </div>
                
                <div class="formulario-grupo">
                    <label class="formulario-rotulo">Custo (R$)</label>
                    <input type="number" class="formulario-input componente-custo" 
                           step="0.01" min="0" value="${componente ? componente.custo : ''}">
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', html);
}

// Função para carregar componentes de custo
function carregarComponentesCusto(componentes) {
    const container = document.getElementById('containerComponentesCusto');
    container.innerHTML = '';
    
    componentes.forEach(componente => {
        adicionarComponenteCusto(componente);
    });
}

// Função para salvar produto
function salvarProduto() {
    console.log('Salvando produto...');
    
    // Validar formulário
    const formulario = document.getElementById('formularioProduto');
    if (!formulario) {
        mostrarNotificacao('Formulário não encontrado', 'erro');
        return;
    }
    
    if (!formulario.checkValidity()) {
        mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'aviso');
        formulario.reportValidity();
        return;
    }
    
    try {
        // Coletar dados do formulário
        const dadosProduto = {
            sku: document.getElementById('sku').value.trim(),
            nome: document.getElementById('nome').value.trim(),
            categoria: document.getElementById('categoria').value,
            subcategoria: document.getElementById('subcategoria').value,
            preco: parseFloat(document.getElementById('preco').value),
            custo: parseFloat(document.getElementById('custo').value),
            estoqueMinimo: parseInt(document.getElementById('estoqueMinimo').value)
        };

        // Validar dados básicos
        if (!dadosProduto.sku || !dadosProduto.nome) {
            throw new Error('SKU e Nome são obrigatórios');
        }
        
        if (dadosProduto.preco <= 0 || dadosProduto.custo < 0) {
            throw new Error('Preço deve ser maior que zero e custo não pode ser negativo');
        }

        // Coletar variações (cores/tamanhos)
        const variacoes = [];
        const itensVariacao = document.querySelectorAll('.variacao-item[id^="variacao-"]');
        
        if (itensVariacao.length === 0) {
            throw new Error('É necessário pelo menos uma variação de cor/tamanho');
        }
        
        itensVariacao.forEach(item => {
            const cor = item.querySelector('.variacao-cor')?.value;
            const estoque = parseInt(item.querySelector('.variacao-estoque')?.value) || 0;
            
            if (!cor) {
                throw new Error('Todas as variações devem ter uma cor selecionada');
            }
            
            // Coletar distribuição por tamanho
            const tamanhos = {};
            const configuracoes = gerenciadorDados.obterConfiguracoes();
            let listaTamanhos = configuracoes.tamanhosCamisas;
            if (dadosProduto.categoria === 'Shorts') {
                listaTamanhos = configuracoes.tamanhosShorts;
            }
            
            // Buscar inputs de tamanho
            const inputsTamanho = item.querySelectorAll('.variacao-campos input[type="number"]:not(.variacao-estoque)');
            
            listaTamanhos.forEach((tamanho, index) => {
                const input = inputsTamanho[index];
                if (input) {
                    tamanhos[tamanho] = parseInt(input.value) || 0;
                } else {
                    tamanhos[tamanho] = 0;
                }
            });
            
            // Calcular estoque total da variação
            const estoqueTotalVariacao = Object.values(tamanhos).reduce((a, b) => a + b, 0);
            
            // Se estoque do campo principal for diferente, usar o maior
            const estoqueFinal = Math.max(estoque, estoqueTotalVariacao);
            
            variacoes.push({
                nome: cor,
                estoque: estoqueFinal,
                tamanhos: tamanhos
            });
        });
        
        dadosProduto.cores = variacoes;
        
        // Coletar componentes de custo
        const componentes = [];
        const itensComponente = document.querySelectorAll('.variacao-item[id^="componente-"]');
        
        itensComponente.forEach(item => {
            const nome = item.querySelector('.componente-nome')?.value?.trim();
            const custo = parseFloat(item.querySelector('.componente-custo')?.value) || 0;
            
            if (nome && custo > 0) {
                componentes.push({
                    nome: nome,
                    custo: custo
                });
            }
        });
        
        dadosProduto.componentesCusto = componentes;
        
        // Salvar produto
        let resultado;
        if (produtoEditando) {
            // Atualizar produto existente
            dadosProduto.id = produtoEditando.id;
            resultado = gerenciadorDados.atualizarProduto(dadosProduto);
            if (resultado) {
                mostrarNotificacao('Produto atualizado com sucesso!', 'sucesso');
            } else {
                throw new Error('Falha ao atualizar produto');
            }
        } else {
            // Adicionar novo produto
            resultado = gerenciadorDados.adicionarProduto(dadosProduto);
            if (resultado) {
                mostrarNotificacao('Produto adicionado com sucesso!', 'sucesso');
            } else {
                throw new Error('Falha ao adicionar produto');
            }
        }
        
        // Fechar modal
        fecharModalProduto();
        
        // Recarregar produtos
        produtosCarregados = gerenciadorDados.obterDados('produtos');
        carregarTabelaProdutos();
        
        // Disparar evento para atualizar estoque
        notificarAtualizacao(EventosSistema.PRODUTO_ATUALIZADO, dadosProduto);
        
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        mostrarNotificacao(error.message, 'erro');
    }
}

// Função para fechar modal de produto
function fecharModalProduto() {
    const modal = document.getElementById('modalProduto');
    if (modal) {
        modal.classList.remove('ativo');
        document.body.style.overflow = ''; // Restaurar scroll
    }
    produtoEditando = null;
}

// Função para visualizar produto
function visualizarProduto(id) {
    const produto = produtosCarregados.find(p => p.id === id);
    if (!produto) return;
    
    // Calcular estoque total
    let estoqueTotal = 0;
    if (produto.cores && produto.cores.length > 0) {
        produto.cores.forEach(cor => {
            estoqueTotal += cor.estoque || 0;
        });
    }
    
    // Criar modal de visualização
    const modal = document.getElementById('modalProduto');
    const modalConteudo = document.querySelector('.modal-produto');
    
    modalConteudo.innerHTML = `
        <div class="modal-cabecalho">
            <h3>Detalhes do Produto</h3>
            <button class="botao-fechar-modal" id="fecharModalProduto">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="modal-corpo">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <h4 style="margin-bottom: 10px; color: #2c3e50;">Informações Básicas</h4>
                    <p><strong>SKU:</strong> ${produto.sku}</p>
                    <p><strong>Nome:</strong> ${produto.nome}</p>
                    <p><strong>Categoria:</strong> ${produto.categoria}</p>
                    <p><strong>Subcategoria:</strong> ${produto.subcategoria}</p>
                </div>
                
                <div>
                    <h4 style="margin-bottom: 10px; color: #2c3e50;">Informações Financeiras</h4>
                    <p><strong>Preço de Venda:</strong> ${formatarMoeda(produto.preco)}</p>
                    <p><strong>Custo Unitário:</strong> ${formatarMoeda(produto.custo)}</p>
                    <p><strong>Margem de Lucro:</strong> ${((produto.preco - produto.custo) / produto.custo * 100).toFixed(2)}%</p>
                    <p><strong>Estoque Mínimo:</strong> ${produto.estoqueMinimo}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px; color: #2c3e50;">Estoque por Cor e Tamanho</h4>
                ${produto.cores && produto.cores.length > 0 ? 
                    `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                        ${produto.cores.map(cor => `
                            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px;">
                                <p style="font-weight: 600; margin-bottom: 10px;">Cor: ${cor.nome}</p>
                                <p style="margin-bottom: 5px;">Estoque Total: ${cor.estoque}</p>
                                <div style="font-size: 13px;">
                                    ${Object.entries(cor.tamanhos || {}).map(([tamanho, quantidade]) => 
                                        `<p style="margin-bottom: 2px;">Tamanho ${tamanho}: ${quantidade}</p>`
                                    ).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>` :
                    '<p>Nenhuma variação de cor/tamanho cadastrada.</p>'
                }
            </div>
            
            <div>
                <h4 style="margin-bottom: 10px; color: #2c3e50;">Componentes de Custo</h4>
                ${produto.componentesCusto && produto.componentesCusto.length > 0 ? 
                    `<table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background-color: #f1f1f1;">
                                <th style="padding: 10px; text-align: left;">Componente</th>
                                <th style="padding: 10px; text-align: left;">Custo (R$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${produto.componentesCusto.map(componente => `
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${componente.nome}</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formatarMoeda(componente.custo)}</td>
                                </tr>
                            `).join('')}
                            <tr style="font-weight: 600;">
                                <td style="padding: 10px;">TOTAL</td>
                                <td style="padding: 10px;">${formatarMoeda(produto.componentesCusto.reduce((total, c) => total + c.custo, 0))}</td>
                            </tr>
                        </tbody>
                    </table>` :
                    '<p>Nenhum componente de custo cadastrado.</p>'
                }
            </div>
        </div>
        
        <div class="modal-rodape">
            <button type="button" class="botao" id="fecharVisualizacao">
                Fechar
            </button>
        </div>
    `;
    
    // Mostrar modal
    modal.classList.add('ativo');
    document.body.style.overflow = 'hidden';
    
    // Configurar evento para fechar modal
    const fechar = function(e) {
        e.preventDefault();
        modal.classList.remove('ativo');
        document.body.style.overflow = '';
    };
    
    document.getElementById('fecharModalProduto').addEventListener('click', fechar);
    document.getElementById('fecharVisualizacao').addEventListener('click', fechar);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            fechar(e);
        }
    });
}

// Função para editar produto
function editarProduto(id) {
    const produto = produtosCarregados.find(p => p.id === id);
    if (!produto) return;
    
    abrirModalProduto(produto);
}

// Função para excluir produto
function excluirProduto(id) {
    const produto = produtosCarregados.find(p => p.id === id);
    if (!produto) return;
    
    // Confirmar exclusão
    if (confirm(`Tem certeza que deseja excluir o produto "${produto.nome}" (SKU: ${produto.sku})?`)) {
        gerenciadorDados.removerProduto(id);
        mostrarNotificacao('Produto excluído com sucesso!', 'sucesso');
        
        // Atualizar tabela de produtos
        carregarProdutos();
        
        // Disparar evento para atualizar estoque
        notificarAtualizacao(EventosSistema.PRODUTO_ATUALIZADO, { id: id, action: 'delete' });
    }
}

// Exportar funções para uso global
window.carregarProdutos = carregarProdutos;