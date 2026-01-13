// Aplicação principal do Sistema de Controle de Estoque

document.addEventListener('DOMContentLoaded', function () {
    // Elementos da interface
    const menuLateral = document.getElementById('menuLateral');
    const botaoMenuHamburguer = document.getElementById('botaoMenuHamburguer');
    const itensMenu = document.querySelectorAll('.menu-item');
    const paginasConteudo = document.querySelectorAll('.pagina-conteudo');
    const conteudoPrincipal = document.getElementById('conteudoPrincipal');
    const botaoExportarExcel = document.getElementById('botaoExportarExcel');
    const botaoExportarJson = document.getElementById('botaoExportarJson');
    const rodapeAlerta = document.getElementById('rodapeAlerta');
    const textoAlerta = document.getElementById('textoAlerta');

    // Página atual
    let paginaAtual = 'dashboard';

    // Sistema de sincronização entre páginas
    function configurarSincronizacao() {
        console.log('Configurando sistema de sincronização...');

        // Quando um produto é atualizado
        document.addEventListener('produto-atualizado', function (e) {
            console.log('Evento recebido: produto-atualizado', e.detail);

            // Atualizar todas as páginas que dependem de produtos
            if (paginaAtual === 'dashboard' && typeof carregarDashboard === 'function') {
                setTimeout(() => carregarDashboard(), 100);
            }
            if (paginaAtual === 'produtos' && typeof carregarProdutos === 'function') {
                setTimeout(() => carregarProdutos(), 100);
            }
            if (paginaAtual === 'estoque' && typeof carregarEstoque === 'function') {
                setTimeout(() => carregarEstoque(), 100);
            }

            // Atualizar alertas
            setTimeout(verificarAlertasEstoque, 500);
        });

        // Quando estoque é atualizado (entrada/saída)
        document.addEventListener('estoque-atualizado', function (e) {
            console.log('Evento recebido: estoque-atualizado', e.detail);

            // Atualizar todas as páginas que dependem de estoque
            if (paginaAtual === 'dashboard' && typeof carregarDashboard === 'function') {
                setTimeout(() => carregarDashboard(), 100);
            }
            if (paginaAtual === 'produtos' && typeof carregarProdutos === 'function') {
                setTimeout(() => carregarProdutos(), 100);
            }
            if (paginaAtual === 'estoque' && typeof carregarEstoque === 'function') {
                setTimeout(() => carregarEstoque(), 100);
            }

            // Atualizar alertas
            setTimeout(verificarAlertasEstoque, 500);
        });

        // Quando gasto é adicionado
        document.addEventListener('gasto-adicionado', function (e) {
            console.log('Evento recebido: gasto-adicionado', e.detail);

            if (paginaAtual === 'dashboard' && typeof carregarDashboard === 'function') {
                setTimeout(() => carregarDashboard(), 100);
            }
            if (paginaAtual === 'gastos' && typeof carregarGastos === 'function') {
                setTimeout(() => carregarGastos(), 100);
            }
        });

        // Quando configurações são atualizadas
        document.addEventListener('config-atualizada', function (e) {
            console.log('Evento recebido: config-atualizada', e.detail);

            // Atualizar todas as páginas
            if (paginaAtual === 'dashboard' && typeof carregarDashboard === 'function') {
                setTimeout(() => carregarDashboard(), 100);
            }
            if (paginaAtual === 'produtos' && typeof carregarProdutos === 'function') {
                setTimeout(() => carregarProdutos(), 100);
            }
            if (paginaAtual === 'estoque' && typeof carregarEstoque === 'function') {
                setTimeout(() => carregarEstoque(), 100);
            }
            if (paginaAtual === 'gastos' && typeof carregarGastos === 'function') {
                setTimeout(() => carregarGastos(), 100);
            }
            if (paginaAtual === 'config' && typeof carregarConfiguracoes === 'function') {
                setTimeout(() => carregarConfiguracoes(), 100);
            }
        });
    }

    // CORREÇÃO: Função para limpar event listeners antigos (SEM INTERFERIR NO MENU HAMBÚRGUER)
    function limparEventListeners() {
        console.log('Limpando event listeners antigos...');

        // REMOVIDO: A clonagem do botão do hambúrguer que estava removendo o event listener
        // Agora apenas limpamos listeners específicos que causam memory leaks

        // Limpar listeners dos botões de exportação (esses podem ser recolocados)
        const elementosParaLimpar = [
            'botaoExportarExcel',
            'botaoExportarJson'
        ];

        elementosParaLimpar.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                const novoElemento = elemento.cloneNode(true);
                elemento.parentNode.replaceChild(novoElemento, elemento);
            }
        });

        console.log('Event listeners antigos limpos (exceto menu hambúrguer).');
    }

    // Inicializar a aplicação
    function inicializarApp() {
        // Configurar eventos do menu
        configurarMenu();

        // Configurar sistema de sincronização
        configurarSincronizacao();

        // CARREGA A PÁGINA INICIAL
        carregarPagina('dashboard');

        // Configurar eventos de exportação APENAS UMA VEZ
        configurarExportacao();

        // Verificar alertas de estoque baixo
        verificarAlertasEstoque();

        // Atualizar alertas periodicamente
        setInterval(verificarAlertasEstoque, 60000);
    }

    // Configurar o menu de navegação
    function configurarMenu() {
        console.log('Configurando menu de navegação...');

        // Adicionar evento de clique para cada item do menu
        itensMenu.forEach(item => {
            item.addEventListener('click', function () {
                const pagina = this.getAttribute('data-pagina');
                console.log(`Clicou no menu: ${pagina}`);

                // Atualizar item ativo no menu
                itensMenu.forEach(i => i.classList.remove('ativo'));
                this.classList.add('ativo');

                // Carregar a página selecionada
                carregarPagina(pagina);

                // Fechar menu lateral em dispositivos móveis
                if (window.innerWidth <= 1024) {
                    menuLateral.classList.remove('ativo');
                }
            });
        });

        // CORREÇÃO: Configurar botão do menu hambúrguer (AGORA FUNCIONA!)
        if (botaoMenuHamburguer) {
            botaoMenuHamburguer.addEventListener('click', function () {
                console.log('Menu hambúrguer clicado!');
                menuLateral.classList.toggle('ativo');
            });
        } else {
            console.error('Botão do menu hambúrguer não encontrado!');
        }

        // Fechar menu ao clicar fora (apenas em dispositivos móveis)
        document.addEventListener('click', function (event) {
            if (window.innerWidth <= 1024) {
                const isMenuClick = menuLateral.contains(event.target);
                const isHamburgerClick = botaoMenuHamburguer.contains(event.target);

                if (!isMenuClick && !isHamburgerClick && menuLateral.classList.contains('ativo')) {
                    menuLateral.classList.remove('ativo');
                }
            }
        });
    }

    // Configurar eventos de exportação
    function configurarExportacao() {
        // Exportar para Excel
        if (botaoExportarExcel) {
            botaoExportarExcel.addEventListener('click', function () {
                // Verificar se XLSX está disponível
                if (typeof XLSX === 'undefined') {
                    mostrarNotificacao('Biblioteca de exportação não carregada. Por favor, recarregue a página.', 'erro');
                    return;
                }

                // Verificar se a função existe
                if (typeof gerenciadorDados.exportarParaExcel !== 'function') {
                    mostrarNotificacao('Função de exportação não disponível.', 'erro');
                    return;
                }

                try {
                    const nomeArquivo = gerenciadorDados.exportarParaExcel();
                    mostrarNotificacao(`Dados exportados para ${nomeArquivo}`, 'sucesso');
                } catch (error) {
                    console.error('Erro detalhado:', error);
                    mostrarNotificacao('Erro ao exportar para Excel: ' + error.message, 'erro');
                }
            });
        }

        // Exportar para JSON (backup)
        if (botaoExportarJson) {
            botaoExportarJson.addEventListener('click', function () {
                try {
                    const nomeArquivo = gerenciadorDados.exportarParaJson();
                    mostrarNotificacao(`Backup salvo como ${nomeArquivo}`, 'sucesso');
                } catch (error) {
                    mostrarNotificacao('Erro ao exportar backup: ' + error.message, 'erro');
                }
            });
        }

        // NOVO: Importar de JSON (importação completa)
        const botaoImportarJson = document.getElementById('botaoImportarJson');
        const inputImportarJson = document.getElementById('inputImportarJson');

        if (botaoImportarJson && inputImportarJson) {
            // Quando clicar no botão de importar
            botaoImportarJson.addEventListener('click', function () {
                inputImportarJson.click(); // Abre a janela para selecionar arquivo
            });

            // Quando selecionar um arquivo
            inputImportarJson.addEventListener('change', function (event) {
                const arquivo = event.target.files[0];
                if (!arquivo) return;

                // Verificar se é um arquivo JSON
                if (!arquivo.name.toLowerCase().endsWith('.json')) {
                    mostrarNotificacao('Por favor, selecione um arquivo JSON válido.', 'erro');
                    return;
                }

                // Confirmar com o usuário (importação substituirá TODOS os dados atuais)
                if (confirm('ATENÇÃO: Isso substituirá TODOS os dados atuais do sistema. Tem certeza que deseja continuar?')) {
                    // Usar a função já existente no GerenciadorDados
                    gerenciadorDados.importarDeJson(arquivo, function (sucesso, mensagem) {
                        if (sucesso) {
                            mostrarNotificacao(mensagem, 'sucesso');

                            // Atualizar todas as páginas para refletir os novos dados
                            setTimeout(() => {
                                // Disparar evento de configuração atualizada para atualizar tudo
                                const evento = new CustomEvent('config-atualizada', {
                                    detail: { tipo: 'importacao-completa' }
                                });
                                document.dispatchEvent(evento);

                                // Recarregar a página atual
                                if (paginaAtual === 'dashboard' && typeof carregarDashboard === 'function') {
                                    carregarDashboard();
                                } else if (paginaAtual === 'produtos' && typeof carregarProdutos === 'function') {
                                    carregarProdutos();
                                } else if (paginaAtual === 'estoque' && typeof carregarEstoque === 'function') {
                                    carregarEstoque();
                                } else if (paginaAtual === 'gastos' && typeof carregarGastos === 'function') {
                                    carregarGastos();
                                } else if (paginaAtual === 'config' && typeof carregarConfiguracoes === 'function') {
                                    carregarConfiguracoes();
                                }

                                // Atualizar alertas
                                verificarAlertasEstoque();
                            }, 500);
                        } else {
                            mostrarNotificacao(mensagem, 'erro');
                        }

                        // Limpar o input para permitir nova seleção
                        inputImportarJson.value = '';
                    });
                } else {
                    // Limpar o input se o usuário cancelar
                    inputImportarJson.value = '';
                }
            });
        } else {
            console.warn('Elementos de importação JSON não encontrados');
        }
    }

    // Carregar uma página específica
    function carregarPagina(pagina) {
        // FECHAR qualquer modal aberto antes de trocar de página
        const modais = document.querySelectorAll('.modal-overlay.ativo');
        modais.forEach(modal => {
            modal.classList.remove('ativo');
        });
        document.body.style.overflow = ''; // Restaurar scroll

        // Fechar menu lateral em dispositivos móveis
        if (window.innerWidth <= 1024 && menuLateral.classList.contains('ativo')) {
            menuLateral.classList.remove('ativo');
        }

        // Verificar se a página já está carregada
        if (pagina === paginaAtual) return;

        // Atualizar página atual
        paginaAtual = pagina;

        // Ocultar todas as páginas
        paginasConteudo.forEach(pagina => {
            pagina.classList.add('oculto');
        });

        // Mostrar a página selecionada
        const paginaSelecionada = document.getElementById(pagina);
        if (paginaSelecionada) {
            paginaSelecionada.classList.remove('oculto');

            // Carregar o conteúdo específico da página
            carregarConteudoPagina(pagina);

            // Adicionar classe para animação
            paginaSelecionada.style.animation = 'aparecer 0.5s ease';
        }
    }

    // Carregar conteúdo específico de cada página
    function carregarConteudoPagina(pagina) {
        console.log(`Carregando página: ${pagina}`);

        switch (pagina) {
            case 'dashboard':
                if (typeof carregarDashboard === 'function') {
                    carregarDashboard();
                }
                break;

            case 'produtos':
                if (typeof carregarProdutos === 'function') {
                    carregarProdutos();
                }
                break;

            case 'estoque':
                if (typeof carregarEstoque === 'function') {
                    carregarEstoque();
                }
                break;

            case 'gastos':
                if (typeof carregarGastos === 'function') {
                    carregarGastos();
                }
                break;

            case 'config':
                if (typeof carregarConfiguracoes === 'function') {
                    carregarConfiguracoes();
                }
                break;

            default:
                console.log(`Página ${pagina} não reconhecida.`);
        }
    }

    // Verificar alertas de estoque baixo
    function verificarAlertasEstoque() {
        // Verificar se as funções existem
        if (typeof gerenciadorDados.obterProdutosEstoqueBaixo !== 'function' ||
            typeof gerenciadorDados.obterAlertaEstoqueDetalhado !== 'function') {
            console.warn('Funções de alerta não disponíveis');
            if (textoAlerta) textoAlerta.textContent = 'Sistema de alertas não disponível';
            return;
        }

        // Verificar produtos com estoque baixo total
        const produtosEstoqueBaixo = gerenciadorDados.obterProdutosEstoqueBaixo();

        // Verificar alertas detalhados por cor/tamanho
        const alertasDetalhados = gerenciadorDados.obterAlertaEstoqueDetalhado();

        // Filtrar apenas alertas críticos
        const alertasCriticos = alertasDetalhados.filter(alerta =>
            alerta.nivel === 'CRÍTICO' || alerta.nivel === 'ESGOTADO'
        );

        // Calcular total de alertas
        const totalAlertas = produtosEstoqueBaixo.length + alertasCriticos.length;

        if (totalAlertas > 0 && textoAlerta && rodapeAlerta) {
            // Atualizar rodapé com alerta
            textoAlerta.textContent = `${totalAlertas} alerta(s) de estoque`;
            rodapeAlerta.style.display = 'flex';
            rodapeAlerta.classList.add('alerta-ativo');
        } else if (textoAlerta && rodapeAlerta) {
            // Sem alertas
            textoAlerta.textContent = 'Nenhum alerta no momento';
            rodapeAlerta.classList.remove('alerta-ativo');
        }

        // Salvar alertas para mostrar na dashboard
        sessionStorage.setItem('alertasEstoqueDetalhado', JSON.stringify(alertasDetalhados));
    }

    // Inicializar a aplicação quando o DOM estiver carregado
    console.log('Inicializando aplicação...');
    inicializarApp();
});