// Configurações do Sistema de Controle de Estoque

// Função para carregar a página de configurações
function carregarConfiguracoes() {
    const containerConfig = document.getElementById('config');
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    
    // Criar conteúdo da página de configurações
    containerConfig.innerHTML = `
        <div class="titulo-pagina">
            <i class="fas fa-cog"></i>
            Configurações do Sistema
        </div>
        
        <div class="secoes-config">
            <div class="secao-config">
                <h3><i class="fas fa-boxes"></i> Configurações de Estoque</h3>
                <form id="formularioConfigEstoque">
                    <div class="formulario-config">
                        <div class="formulario-grupo">
                            <label class="formulario-rotulo">
                                <input type="checkbox" id="alertaEstoqueBaixo" 
                                       ${configuracoes.alertaEstoqueBaixo ? 'checked' : ''}>
                                Ativar alertas de estoque baixo
                            </label>
                        </div>
                        
                        <div class="formulario-grupo">
                            <label class="formulario-rotulo" for="quantidadeMinimaPadrao">
                                Quantidade Mínima Padrão
                            </label>
                            <input type="number" class="formulario-input" id="quantidadeMinimaPadrao" 
                                   min="1" value="${configuracoes.quantidadeMinimaPadrao}">
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px;">
                        <h4 style="margin-bottom: 15px; font-size: 16px;">Alertas de Estoque por Produto</h4>
                        <div class="config-alertas" id="alertasProdutos">
                            <!-- Alertas por produto serão carregados por JavaScript -->
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="secao-config">
                <h3><i class="fas fa-tags"></i> Categorias e Subcategorias</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div>
                        <h4 style="margin-bottom: 15px; font-size: 16px;">Categorias</h4>
                        <ul class="lista-config" id="listaCategorias">
                            <!-- Categorias serão carregadas por JavaScript -->
                        </ul>
                        
                        <div style="margin-top: 15px;">
                            <input type="text" class="formulario-input" id="novaCategoria" 
                                   placeholder="Nova categoria" style="margin-bottom: 10px;">
                            <button class="botao secundario" id="adicionarCategoria">
                                <i class="fas fa-plus"></i> Adicionar Categoria
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <h4 style="margin-bottom: 15px; font-size: 16px;">Subcategorias</h4>
                        <ul class="lista-config" id="listaSubcategorias">
                            <!-- Subcategorias serão carregadas por JavaScript -->
                        </ul>
                        
                        <div style="margin-top: 15px;">
                            <input type="text" class="formulario-input" id="novaSubcategoria" 
                                   placeholder="Nova subcategoria" style="margin-bottom: 10px;">
                            <button class="botao secundario" id="adicionarSubcategoria">
                                <i class="fas fa-plus"></i> Adicionar Subcategoria
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="secao-config">
                <h3><i class="fas fa-palette"></i> Cores e Tamanhos Padrão</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div>
                        <h4 style="margin-bottom: 15px; font-size: 16px;">Cores Padrão</h4>
                        <div id="coresPadraoContainer">
                            <!-- Cores serão carregadas por JavaScript -->
                        </div>
                    </div>
                    
                    <div>
                        <h4 style="margin-bottom: 15px; font-size: 16px;">Tamanhos Padrão</h4>
                        <div>
                            <div id="tamanhosCamisasContainer">
                                <!-- Tamanhos de camisas serão carregados por JavaScript -->
                            </div>
                            
                            <div id="tamanhosShortsContainer">
                                <!-- Tamanhos de shorts serão carregados por JavaScript -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="secao-config">
                <h3><i class="fas fa-database"></i> Backup e Restauração</h3>
                <div class="config-backup">
                    <div class="backup-card" id="backupManual">
                        <i class="fas fa-save"></i>
                        <h4>Backup Manual</h4>
                        <p>Crie um backup manual dos dados do sistema em formato JSON.</p>
                        <button class="botao sucesso" id="botaoFazerBackup" style="width: 100%;">
                            <i class="fas fa-file-export"></i> Fazer Backup
                        </button>
                    </div>
                    
                    <div class="backup-card" id="restaurarBackup">
                        <i class="fas fa-upload"></i>
                        <h4>Restaurar Backup</h4>
                        <p>Restaura os dados do sistema a partir de um arquivo JSON.</p>
                        <input type="file" id="arquivoBackup" accept=".json" style="display: none;">
                        <button class="botao" id="botaoRestaurar" style="width: 100%;">
                            <i class="fas fa-file-import"></i> Restaurar
                        </button>
                    </div>
                    
                    <div class="backup-card" id="limparDados">
                        <i class="fas fa-trash-alt"></i>
                        <h4>Limpar Dados</h4>
                        <p>Remove todos os dados do sistema e restaura as configurações padrão.</p>
                        <button class="botao perigo" id="botaoLimparDados" style="width: 100%;">
                            <i class="fas fa-broom"></i> Limpar Tudo
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="secao-config">
                <h3><i class="fas fa-info-circle"></i> Informações do Sistema</h3>
                <div class="info-sistema">
                    <div class="info-item">
                        <div class="rotulo">Versão do Sistema</div>
                        <div class="valor">1.0.0</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="rotulo">Último Backup</div>
                        <div class="valor">${localStorage.getItem('ultimoBackup') || 'Nunca'}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="rotulo">Total de Produtos</div>
                        <div class="valor">${gerenciadorDados.obterDados('produtos').length}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="rotulo">Total de Movimentações</div>
                        <div class="valor">${gerenciadorDados.obterDados('movimentacoes').length}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="rotulo">Armazenamento Local</div>
                        <div class="valor">${(JSON.stringify(localStorage.getItem('estoqueModaMasculina')).length / 1024).toFixed(2)} KB</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
            <button class="botao sucesso" id="salvarConfiguracoes" style="padding: 12px 30px;">
                <i class="fas fa-save"></i> Salvar Todas as Configurações
            </button>
        </div>
    `;
    
    // Carregar dados
    carregarAlertasProdutos();
    carregarCategorias();
    carregarSubcategorias();
    carregarCoresPadrao();
    carregarTamanhosPadrao();
    
    // Configurar eventos usando event delegation
    setTimeout(configurarEventosConfig, 100);
}

// Função para configurar eventos da página de configurações
function configurarEventosConfig() {
    console.log('Configurando eventos de configurações...');
    
    // Configurar eventos usando event delegation
    document.addEventListener('click', function(e) {
        // IGNORAR cliques dentro de modais
        if (e.target.closest('.modal-overlay')) return;
        
        // Adicionar categoria
        if (e.target && e.target.id === 'adicionarCategoria') {
            e.preventDefault();
            const input = document.getElementById('novaCategoria');
            if (!input) return;
            
            const categoria = input.value.trim();
            
            if (!categoria) {
                mostrarNotificacao('Por favor, digite um nome para a categoria.', 'aviso');
                return;
            }
            
            const configuracoes = gerenciadorDados.obterConfiguracoes();
            
            if (configuracoes.categorias.includes(categoria)) {
                mostrarNotificacao('Esta categoria já existe.', 'aviso');
                return;
            }
            
            configuracoes.categorias.push(categoria);
            gerenciadorDados.salvarConfiguracoes(configuracoes);
            
            input.value = '';
            carregarCategorias();
            mostrarNotificacao('Categoria adicionada com sucesso!', 'sucesso');
            return;
        }
        
        // Adicionar subcategoria
        if (e.target && e.target.id === 'adicionarSubcategoria') {
            e.preventDefault();
            const input = document.getElementById('novaSubcategoria');
            if (!input) return;
            
            const subcategoria = input.value.trim();
            
            if (!subcategoria) {
                mostrarNotificacao('Por favor, digite um nome para a subcategoria.', 'aviso');
                return;
            }
            
            const configuracoes = gerenciadorDados.obterConfiguracoes();
            
            if (configuracoes.subcategorias.includes(subcategoria)) {
                mostrarNotificacao('Esta subcategoria já existe.', 'aviso');
                return;
            }
            
            configuracoes.subcategorias.push(subcategoria);
            gerenciadorDados.salvarConfiguracoes(configuracoes);
            
            input.value = '';
            carregarSubcategorias();
            mostrarNotificacao('Subcategoria adicionada com sucesso!', 'sucesso');
            return;
        }
        
        // Botões de remover
        if (e.target.closest('.botao-acao.excluir') || 
            e.target.closest('.remover-cor') ||
            e.target.closest('.remover-tamanho')) {
            
            e.preventDefault();
            e.stopPropagation();
            
            const botao = e.target.closest('.botao-acao.excluir') || 
                         e.target.closest('.remover-cor') ||
                         e.target.closest('.remover-tamanho');
            
            const tipo = botao.getAttribute('data-tipo') || 
                        (botao.classList.contains('remover-cor') ? 'cor' : null) ||
                        (botao.classList.contains('remover-tamanho') ? 
                            (botao.getAttribute('data-tipo') || 
                             (botao.closest('[data-tipo="tamanhoCamisa"]') ? 'tamanhoCamisa' : 
                              botao.closest('[data-tipo="tamanhoShort"]') ? 'tamanhoShort' : null)) : null);
            
            const valor = botao.getAttribute('data-valor') || 
                         botao.getAttribute('data-cor') ||
                         (botao.closest('.tag-tamanho') ? botao.closest('.tag-tamanho').getAttribute('data-valor') : null);
            
            if (tipo && valor) {
                removerItemConfig(tipo, valor);
            }
            return;
        }
        
        // Salvar configurações
        if (e.target && e.target.id === 'salvarConfiguracoes') {
            e.preventDefault();
            salvarConfiguracoes();
            return;
        }
        
        // Backup manual
        if (e.target && e.target.id === 'botaoFazerBackup') {
            e.preventDefault();
            try {
                const nomeArquivo = gerenciadorDados.exportarParaJson();
                localStorage.setItem('ultimoBackup', new Date().toLocaleString('pt-BR'));
                mostrarNotificacao(`Backup salvo como ${nomeArquivo}`, 'sucesso');
                setTimeout(() => carregarConfiguracoes(), 500);
            } catch (error) {
                mostrarNotificacao('Erro ao criar backup: ' + error.message, 'erro');
            }
            return;
        }
        
        // Restaurar backup
        if (e.target && e.target.id === 'botaoRestaurar') {
            e.preventDefault();
            const inputArquivo = document.getElementById('arquivoBackup');
            if (inputArquivo) inputArquivo.click();
            return;
        }
        
        // Limpar dados
        if (e.target && e.target.id === 'botaoLimparDados') {
            e.preventDefault();
            if (!confirm('ATENÇÃO: Esta ação irá remover TODOS os dados do sistema e restaurar as configurações padrão. Tem certeza que deseja continuar?')) {
                return;
            }
            
            localStorage.removeItem('estoqueModaMasculina');
            gerenciadorDados.inicializarDados();
            
            mostrarNotificacao('Dados limpos com sucesso! O sistema foi restaurado às configurações padrão.', 'sucesso');
            
            setTimeout(() => {
                if (typeof carregarDashboard === 'function') carregarDashboard();
                if (typeof carregarProdutos === 'function') carregarProdutos();
                if (typeof carregarEstoque === 'function') carregarEstoque();
                if (typeof carregarGastos === 'function') carregarGastos();
                carregarConfiguracoes();
            }, 500);
            return;
        }
    });
    
    // Input para restaurar backup
    const inputArquivoBackup = document.getElementById('arquivoBackup');
    if (inputArquivoBackup) {
        inputArquivoBackup.addEventListener('change', function(e) {
            const arquivo = e.target.files[0];
            if (!arquivo) return;
            
            if (!arquivo.name.endsWith('.json')) {
                mostrarNotificacao('Por favor, selecione um arquivo JSON.', 'erro');
                e.target.value = '';
                return;
            }
            
            if (!confirm('ATENÇÃO: Restaurar um backup irá substituir todos os dados atuais. Tem certeza que deseja continuar?')) {
                e.target.value = '';
                return;
            }
            
            gerenciadorDados.importarDeJson(arquivo, function(sucesso, mensagem) {
                if (sucesso) {
                    mostrarNotificacao(mensagem, 'sucesso');
                    
                    setTimeout(() => {
                        if (typeof carregarDashboard === 'function') carregarDashboard();
                        if (typeof carregarProdutos === 'function') carregarProdutos();
                        if (typeof carregarEstoque === 'function') carregarEstoque();
                        if (typeof carregarGastos === 'function') carregarGastos();
                        carregarConfiguracoes();
                    }, 500);
                } else {
                    mostrarNotificacao(mensagem, 'erro');
                }
                
                e.target.value = '';
            });
        });
    }
    
    // Eventos de quantidade nos alertas
    const alertasContainer = document.getElementById('alertasProdutos');
    if (alertasContainer) {
        alertasContainer.addEventListener('click', function(e) {
            const botao = e.target.closest('.botao-quantidade');
            if (!botao) return;
            
            const id = parseInt(botao.getAttribute('data-id'));
            const acao = botao.getAttribute('data-acao');
            const input = document.getElementById(`estoqueMinimo-${id}`);
            
            if (!id || !input) return;
            
            let valor = parseInt(input.value) || 1;
            
            if (acao === 'aumentar') {
                valor++;
            } else if (acao === 'diminuir' && valor > 1) {
                valor--;
            }
            
            input.value = valor;
        });
    }
    
    // CORREÇÃO: Adicionar cor (agora separado do event delegation geral)
    const btnAdicionarCor = document.getElementById('adicionarCor');
    if (btnAdicionarCor) {
        btnAdicionarCor.addEventListener('click', function(e) {
            e.preventDefault();
            const input = document.getElementById('novaCor');
            const colorPicker = document.getElementById('novaCorPicker');
            
            if (!input) return;
            
            const cor = input.value.trim();
            
            if (!cor) {
                mostrarNotificacao('Por favor, digite um nome para a cor.', 'aviso');
                return;
            }
            
            const configuracoes = gerenciadorDados.obterConfiguracoes();
            
            // Verificar se cor já existe
            const corExiste = configuracoes.coresPadrao.some(c => {
                if (typeof c === 'object') return c.nome === cor;
                return c === cor;
            });
            
            if (corExiste) {
                mostrarNotificacao('Esta cor já existe.', 'aviso');
                return;
            }
            
            // Adicionar cor com valor hexadecimal
            const corCompleta = {
                nome: cor,
                hex: colorPicker ? colorPicker.value : obterCorHex(cor)
            };
            
            configuracoes.coresPadrao.push(corCompleta);
            gerenciadorDados.salvarConfiguracoes(configuracoes);
            
            input.value = '';
            if (colorPicker) colorPicker.value = '#3498db';
            carregarCoresPadrao();
            mostrarNotificacao('Cor adicionada com sucesso!', 'sucesso');
        });
    }
    
    // CORREÇÃO: Adicionar tamanhos (agora separado do event delegation geral)
    const btnAdicionarTamanhoCamisa = document.getElementById('btnAdicionarTamanhoCamisa');
    if (btnAdicionarTamanhoCamisa) {
        btnAdicionarTamanhoCamisa.addEventListener('click', function(e) {
            e.preventDefault();
            const input = document.getElementById('novoTamanhoCamisa');
            if (!input) return;
            
            const tamanho = input.value.trim().toUpperCase();
            
            if (!tamanho) {
                mostrarNotificacao('Por favor, digite um tamanho.', 'aviso');
                return;
            }
            
            const configuracoes = gerenciadorDados.obterConfiguracoes();
            
            if (configuracoes.tamanhosCamisas.includes(tamanho)) {
                mostrarNotificacao('Este tamanho já existe.', 'aviso');
                return;
            }
            
            configuracoes.tamanhosCamisas.push(tamanho);
            gerenciadorDados.salvarConfiguracoes(configuracoes);
            
            input.value = '';
            carregarTamanhosPadrao();
            mostrarNotificacao('Tamanho adicionado com sucesso!', 'sucesso');
        });
    }
    
    const btnAdicionarTamanhoShort = document.getElementById('btnAdicionarTamanhoShort');
    if (btnAdicionarTamanhoShort) {
        btnAdicionarTamanhoShort.addEventListener('click', function(e) {
            e.preventDefault();
            const input = document.getElementById('novoTamanhoShort');
            if (!input) return;
            
            const tamanho = input.value.trim().toUpperCase();
            
            if (!tamanho) {
                mostrarNotificacao('Por favor, digite um tamanho.', 'aviso');
                return;
            }
            
            const configuracoes = gerenciadorDados.obterConfiguracoes();
            
            if (configuracoes.tamanhosShorts.includes(tamanho)) {
                mostrarNotificacao('Este tamanho já existe.', 'aviso');
                return;
            }
            
            configuracoes.tamanhosShorts.push(tamanho);
            gerenciadorDados.salvarConfiguracoes(configuracoes);
            
            input.value = '';
            carregarTamanhosPadrao();
            mostrarNotificacao('Tamanho adicionado com sucesso!', 'sucesso');
        });
    }
}

// Função para remover item de configuração
function removerItemConfig(tipo, valor) {
    if (!confirm(`Tem certeza que deseja remover "${valor}"?`)) {
        return;
    }
    
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    let removido = false;
    let mensagemErro = '';
    
    switch(tipo) {
        case 'categoria':
            const produtosCat = gerenciadorDados.obterDados('produtos');
            const categoriaUsada = produtosCat.some(p => p.categoria === valor);
            
            if (categoriaUsada) {
                mensagemErro = 'Não é possível remover esta categoria pois está sendo usada por um ou mais produtos.';
            } else {
                configuracoes.categorias = configuracoes.categorias.filter(c => c !== valor);
                removido = true;
            }
            break;
            
        case 'subcategoria':
            const produtosSub = gerenciadorDados.obterDados('produtos');
            const subcategoriaUsada = produtosSub.some(p => p.subcategoria === valor);
            
            if (subcategoriaUsada) {
                mensagemErro = 'Não é possível remover esta subcategoria pois está sendo usada por um ou mais produtos.';
            } else {
                configuracoes.subcategorias = configuracoes.subcategorias.filter(s => s !== valor);
                removido = true;
            }
            break;
            
        case 'cor':
            const produtosCor = gerenciadorDados.obterDados('produtos');
            const corUsada = produtosCor.some(p => 
                p.cores && p.cores.some(c => {
                    if (typeof c === 'object' && c.nome === valor) return true;
                    if (c === valor) return true;
                    return false;
                })
            );
            
            if (corUsada) {
                mensagemErro = 'Não é possível remover esta cor pois está sendo usada por um ou mais produtos.';
            } else {
                configuracoes.coresPadrao = configuracoes.coresPadrao.filter(c => {
                    if (typeof c === 'object') return c.nome !== valor;
                    return c !== valor;
                });
                removido = true;
            }
            break;
            
        case 'tamanhoCamisa':
        case 'tamanhoShort':
            const arrayTamanhos = tipo === 'tamanhoCamisa' ? 
                configuracoes.tamanhosCamisas : configuracoes.tamanhosShorts;
            
            const produtosTam = gerenciadorDados.obterDados('produtos');
            const tamanhoUsado = produtosTam.some(p => {
                if (!p.cores) return false;
                return p.cores.some(c => 
                    c.tamanhos && Object.keys(c.tamanhos).includes(valor)
                );
            });
            
            if (tamanhoUsado) {
                mensagemErro = 'Não é possível remover este tamanho pois está sendo usado por um ou mais produtos.';
            } else {
                if (tipo === 'tamanhoCamisa') {
                    configuracoes.tamanhosCamisas = arrayTamanhos.filter(t => t !== valor);
                } else {
                    configuracoes.tamanhosShorts = arrayTamanhos.filter(t => t !== valor);
                }
                removido = true;
            }
            break;
    }
    
    if (mensagemErro) {
        mostrarNotificacao(mensagemErro, 'erro');
        return;
    }
    
    if (removido) {
        gerenciadorDados.salvarConfiguracoes(configuracoes);
        
        switch(tipo) {
            case 'categoria':
                carregarCategorias();
                break;
            case 'subcategoria':
                carregarSubcategorias();
                break;
            case 'cor':
                carregarCoresPadrao();
                break;
            case 'tamanhoCamisa':
            case 'tamanhoShort':
                carregarTamanhosPadrao();
                break;
        }
        
        mostrarNotificacao('Item removido com sucesso!', 'sucesso');
    }
}

// Função para carregar alertas por produto
function carregarAlertasProdutos() {
    const container = document.getElementById('alertasProdutos');
    const produtos = gerenciadorDados.obterDados('produtos');
    
    if (produtos.length === 0) {
        container.innerHTML = `
            <div class="mensagem-vazia" style="padding: 10px;">
                <p>Nenhum produto cadastrado.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    produtos.forEach(produto => {
        html += `
            <div class="alerta-config">
                <h4>
                    <i class="fas fa-tshirt"></i>
                    ${produto.nome} (${produto.sku})
                </h4>
                <p>Estoque mínimo atual: ${produto.estoqueMinimo} unidades</p>
                <div class="controle-quantidade">
                    <button class="botao-quantidade" data-id="${produto.id}" data-acao="diminuir">-</button>
                    <input type="number" class="input-quantidade" id="estoqueMinimo-${produto.id}" 
                           value="${produto.estoqueMinimo}" min="1">
                    <button class="botao-quantidade" data-id="${produto.id}" data-acao="aumentar">+</button>
                    <span style="margin-left: 10px; font-size: 14px;">unidades</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Função para carregar categorias
function carregarCategorias() {
    const lista = document.getElementById('listaCategorias');
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    
    if (configuracoes.categorias.length === 0) {
        lista.innerHTML = `
            <div class="mensagem-vazia" style="padding: 10px;">
                <p>Nenhuma categoria cadastrada.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    configuracoes.categorias.forEach((categoria, index) => {
        html += `
            <li class="item-config">
                <div class="info-config">
                    <div class="icone-config categoria">
                        <i class="fas fa-tag"></i>
                    </div>
                    <div class="detalhes-config">
                        <h4>${categoria}</h4>
                        <p>Categoria ${index + 1}</p>
                    </div>
                </div>
                <div class="acoes-config">
                    <button class="botao-acao excluir" data-tipo="categoria" data-valor="${categoria}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `;
    });
    
    lista.innerHTML = html;
}

// Função para carregar subcategorias
function carregarSubcategorias() {
    const lista = document.getElementById('listaSubcategorias');
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    
    if (configuracoes.subcategorias.length === 0) {
        lista.innerHTML = `
            <div class="mensagem-vazia" style="padding: 10px;">
                <p>Nenhuma subcategoria cadastrada.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    configuracoes.subcategorias.forEach((subcategoria, index) => {
        html += `
            <li class="item-config">
                <div class="info-config">
                    <div class="icone-config produto">
                        <i class="fas fa-layer-group"></i>
                    </div>
                    <div class="detalhes-config">
                        <h4>${subcategoria}</h4>
                        <p>Subcategoria ${index + 1}</p>
                    </div>
                </div>
                <div class="acoes-config">
                    <button class="botao-acao excluir" data-tipo="subcategoria" data-valor="${subcategoria}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `;
    });
    
    lista.innerHTML = html;
}

// Função para carregar cores padrão
function carregarCoresPadrao() {
    const container = document.getElementById('coresPadraoContainer');
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    
    if (!container) return;
    
    let html = `
        <div style="margin-bottom: 20px;">
            <h5 style="margin-bottom: 10px; font-size: 14px; color: #2c3e50;">Cores Cadastradas</h5>
            <div id="listaCores" style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
    `;
    
    if (configuracoes.coresPadrao && configuracoes.coresPadrao.length > 0) {
        configuracoes.coresPadrao.forEach(cor => {
            const nomeCor = typeof cor === 'object' ? cor.nome : cor;
            const hexCor = typeof cor === 'object' && cor.hex ? cor.hex : obterCorHex(nomeCor);
            
            html += `
                <div class="tag-cor" data-tipo="cor" data-valor="${nomeCor}"
                     style="display: flex; align-items: center; gap: 5px; background-color: ${hexCor}; 
                            padding: 8px 12px; border-radius: 20px; font-size: 14px; border: 1px solid #ddd;
                            color: ${getContrastColor(hexCor)};">
                    <div style="width: 15px; height: 15px; border-radius: 50%; background-color: ${hexCor}; 
                                border: 1px solid #fff; box-shadow: 0 0 2px rgba(0,0,0,0.3);"></div>
                    <span>${nomeCor}</span>
                    <button class="remover-cor" data-cor="${nomeCor}" 
                            style="background: none; border: none; color: ${getContrastColor(hexCor)}; 
                                   cursor: pointer; font-size: 12px; padding: 0; width: 16px; height: 16px;
                                   opacity: 0.7; transition: opacity 0.2s;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
    } else {
        html += `<div style="color: #999; font-style: italic;">Nenhuma cor cadastrada</div>`;
    }
    
    html += `
            </div>
            
            <h5 style="margin-bottom: 10px; font-size: 14px; color: #2c3e50;">Adicionar Nova Cor</h5>
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <label style="font-size: 13px; color: #555;">Cor:</label>
                    <input type="color" id="novaCorPicker" value="#3498db" 
                           style="width: 40px; height: 40px; border: none; border-radius: 4px; cursor: pointer;">
                </div>
                
                <div style="flex: 1; min-width: 200px;">
                    <input type="text" class="formulario-input" id="novaCor" 
                           placeholder="Nome da cor (ex: Vermelho Vinho)" 
                           style="width: 100%; padding: 8px 12px;">
                </div>
                
                <button class="botao secundario" id="adicionarCor">
                    <i class="fas fa-plus"></i> Adicionar Cor
                </button>
            </div>
            
            <div style="margin-top: 10px; font-size: 12px; color: #666;">
                <p>Dica: Clique no quadrado colorido para escolher uma cor da paleta.</p>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Função auxiliar para determinar cor de texto com contraste
function getContrastColor(hexcolor) {
    hexcolor = hexcolor.replace('#', '');
    
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Função para carregar tamanhos padrão
function carregarTamanhosPadrao() {
    const containerCamisas = document.getElementById('tamanhosCamisasContainer');
    const containerShorts = document.getElementById('tamanhosShortsContainer');
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    
    if (!containerCamisas || !containerShorts) return;
    
    // Tamanhos para camisas, camisetas, regatas
    let htmlCamisas = `
        <div style="margin-bottom: 20px;">
            <h5 style="margin-bottom: 10px; font-size: 14px; color: #2c3e50;">Camisas, Camisetas, Regatas</h5>
            <div id="listaTamanhosCamisas" style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
    `;
    
    if (configuracoes.tamanhosCamisas && configuracoes.tamanhosCamisas.length > 0) {
        configuracoes.tamanhosCamisas.forEach(tamanho => {
            htmlCamisas += `
                <div class="tag-tamanho" data-tipo="tamanhoCamisa" data-valor="${tamanho}"
                     style="display: flex; align-items: center; gap: 5px; background-color: #e3f2fd; 
                            padding: 8px 12px; border-radius: 20px; font-size: 14px; border: 1px solid #bbdefb;">
                    <span>${tamanho}</span>
                    <button class="remover-tamanho" data-tipo="tamanhoCamisa" data-valor="${tamanho}" 
                            style="background: none; border: none; color: #1976d2; cursor: pointer; 
                                   font-size: 12px; padding: 0; width: 16px; height: 16px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
    } else {
        htmlCamisas += `<div style="color: #999; font-style: italic;">Nenhum tamanho cadastrado</div>`;
    }
    
    htmlCamisas += `
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <input type="text" class="formulario-input" id="novoTamanhoCamisa" 
                       placeholder="Novo tamanho (ex: P, M, G, GG)" style="flex: 1; padding: 8px 12px;">
                <button class="botao secundario" id="btnAdicionarTamanhoCamisa">
                    <i class="fas fa-plus"></i> Adicionar
                </button>
            </div>
        </div>
    `;
    
    // Tamanhos para shorts, calças
    let htmlShorts = `
        <div style="margin-bottom: 20px;">
            <h5 style="margin-bottom: 10px; font-size: 14px; color: #2c3e50;">Shorts, Calças</h5>
            <div id="listaTamanhosShorts" style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
    `;
    
    if (configuracoes.tamanhosShorts && configuracoes.tamanhosShorts.length > 0) {
        configuracoes.tamanhosShorts.forEach(tamanho => {
            htmlShorts += `
                <div class="tag-tamanho" data-tipo="tamanhoShort" data-valor="${tamanho}"
                     style="display: flex; align-items: center; gap: 5px; background-color: #e8f5e9; 
                            padding: 8px 12px; border-radius: 20px; font-size: 14px; border: 1px solid #c8e6c9;">
                    <span>${tamanho}</span>
                    <button class="remover-tamanho" data-tipo="tamanhoShort" data-valor="${tamanho}" 
                            style="background: none; border: none; color: #388e3c; cursor: pointer; 
                                   font-size: 12px; padding: 0; width: 16px; height: 16px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
    } else {
        htmlShorts += `<div style="color: #999; font-style: italic;">Nenhum tamanho cadastrado</div>`;
    }
    
    htmlShorts += `
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <input type="text" class="formulario-input" id="novoTamanhoShort" 
                       placeholder="Novo tamanho (ex: 40, 42, 44, 46)" style="flex: 1; padding: 8px 12px;">
                <button class="botao secundario" id="btnAdicionarTamanhoShort">
                    <i class="fas fa-plus"></i> Adicionar
                </button>
            </div>
        </div>
    `;
    
    containerCamisas.innerHTML = htmlCamisas;
    containerShorts.innerHTML = htmlShorts;
}

// Função para salvar configurações
function salvarConfiguracoes() {
    const configuracoes = gerenciadorDados.obterConfiguracoes();
    
    // Atualizar configurações de estoque
    const checkAlerta = document.getElementById('alertaEstoqueBaixo');
    const inputQuantidade = document.getElementById('quantidadeMinimaPadrao');
    
    if (checkAlerta) {
        configuracoes.alertaEstoqueBaixo = checkAlerta.checked;
    }
    
    if (inputQuantidade) {
        configuracoes.quantidadeMinimaPadrao = parseInt(inputQuantidade.value) || 5;
    }
    
    // Atualizar estoque mínimo dos produtos
    const produtos = gerenciadorDados.obterDados('produtos');
    let produtosAtualizados = false;
    
    produtos.forEach(produto => {
        const input = document.getElementById(`estoqueMinimo-${produto.id}`);
        if (input) {
            const novoEstoqueMinimo = parseInt(input.value) || produto.estoqueMinimo;
            
            if (novoEstoqueMinimo !== produto.estoqueMinimo) {
                produto.estoqueMinimo = novoEstoqueMinimo;
                produtosAtualizados = true;
            }
        }
    });
    
    // Salvar configurações
    gerenciadorDados.salvarConfiguracoes(configuracoes);
    
    // Salvar produtos atualizados se necessário
    if (produtosAtualizados) {
        gerenciadorDados.salvarDados('produtos', produtos);
    }
    
    mostrarNotificacao('Configurações salvas com sucesso!', 'sucesso');
    
    // Atualizar alertas no rodapé
    if (typeof verificarAlertasEstoque === 'function') {
        setTimeout(verificarAlertasEstoque, 100);
    }
    
    // Notificar atualização
    notificarAtualizacao(EventosSistema.CONFIG_ATUALIZADA, configuracoes);
}

// Exportar funções para uso global
window.carregarConfiguracoes = carregarConfiguracoes;