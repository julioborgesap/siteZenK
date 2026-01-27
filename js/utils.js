// Utilitários para o Sistema de Controle de Estoque

// Dados iniciais para o sistema (caso não exista no LocalStorage)
const dadosIniciais = {
    produtos: [
        {
            id: 1,
            sku: "CMT-PER-GPV",
            nome: "Camiseta Peruana",
            categoria: "Camisetas",
            subcategoria: "Gola Polo V",
            preco: 97.80,
            custo: 51.75,
            estoqueMinimo: 10,
            cores: [
                { nome: "Branco", estoque: 15, tamanhos: { P: 5, M: 5, G: 3, GG: 2 } },
                { nome: "Preto", estoque: 12, tamanhos: { P: 4, M: 4, G: 2, GG: 2 } }
            ],
            componentesCusto: [
                { nome: "Tecido", custo: 29.00 },
                { nome: "Bordado", custo: 4.00 },
                { nome: "Gola V + Punho", custo: 8.50 },
                { nome: "Etiqueta (silk TAMANHO)", custo: 1.25 },
                { nome: "Etiqueta (papel couchê 300g)", custo: 4.50 },
                { nome: "Linha", custo: 1.00 },
                { nome: "Costureira", custo: 3.50 },
                { nome: "Papel seda + cera", custo: 0.00 }
            ]
        },
        {
            id: 2,
            sku: "CMT-PER-ML",
            nome: "Camiseta Peruana",
            categoria: "Camisetas",
            subcategoria: "Manga Longa",
            preco: 94.90,
            custo: 57.25,
            estoqueMinimo: 10,
            cores: [
                { nome: "Azul Marinho", estoque: 15, tamanhos: { P: 5, M: 5, G: 3, GG: 2 } },
                { nome: "Safari", estoque: 12, tamanhos: { P: 4, M: 4, G: 2, GG: 2 } }
            ],
            componentesCusto: [
                { nome: "Tecido", custo: 38.50 },
                { nome: "Bordado", custo: 4.00 },
                { nome: "Ribana (gola normal)", custo: 4.50 },
                { nome: "Etiqueta (silk TAMANHO)", custo: 1.25 },
                { nome: "Etiqueta (papel couchê 300g)", custo: 4.50 },
                { nome: "Linha", custo: 1.00 },
                { nome: "Costureira", custo: 3.50 },
                { nome: "Papel seda + cera", custo: 0.00 }
            ]
        },
        {
            id: 3,
            sku: "CMT-ALG-BAS",
            nome: "Camiseta 100% Algodão",
            categoria: "Camisetas",
            subcategoria: "100% Algodão",
            preco: 59.90,
            custo: 29.25,
            estoqueMinimo: 10,
            cores: [
                { nome: "Rosa BB", estoque: 20, tamanhos: { P: 6, M: 6, G: 5, GG: 3 } },
                { nome: "Vinho", estoque: 18, tamanhos: { P: 5, M: 5, G: 5, GG: 3 } },
                { nome: "Verde Musgo", estoque: 20, tamanhos: { P: 6, M: 6, G: 5, GG: 3 } },
                { nome: "Caramelo", estoque: 18, tamanhos: { P: 5, M: 5, G: 5, GG: 3 } }
            ],
            componentesCusto: [
                { nome: "Tecido", custo: 11.00 },
                { nome: "Bordado", custo: 4.00 },
                { nome: "Ribana (gola normal)", custo: 4.00 },
                { nome: "Etiqueta (silk TAMANHO)", custo: 1.25 },
                { nome: "Etiqueta (papel couchê 300g)", custo: 4.50 },
                { nome: "Linha", custo: 1.00 },
                { nome: "Costureira", custo: 3.50 },
                { nome: "Papel de seda + adesivo", custo: 0.00 }
            ]
        },
        {
            id: 4,
            sku: "SHT-ALF-ZIP",
            nome: "Short Alfaiataria",
            categoria: "Shorts",
            subcategoria: "Alfaiataria",
            preco: 137.70,
            custo: 66.50,
            estoqueMinimo: 5,
            cores: [
                { nome: "Preto", estoque: 10, tamanhos: { "40": 3, "42": 4, "44": 2, "46": 1 } },
                { nome: "Azul Marinho", estoque: 15, tamanhos: { "40": 5, "42": 5, "44": 3, "46": 2 } },
                { nome: "Cru", estoque: 10, tamanhos: { "40": 3, "42": 4, "44": 2, "46": 1 } },
                { nome: "Off White", estoque: 15, tamanhos: { "40": 5, "42": 5, "44": 3, "46": 2 } }
            ],
            componentesCusto: [
                { nome: "Tecido", custo: 30.00 },
                { nome: "Botão", custo: 1.50 },
                { nome: "Zíper", custo: 2.50 },
                { nome: "Linha", custo: 1.00 },
                { nome: "Etiqueta (tamanho)", custo: 1.50 },
                { nome: "Etiqueta ZK (couro)", custo: 1.00 },
                { nome: "Etiqueta (papel couchê 300g)", custo: 4.50 },
                { nome: "Costureira", custo: 20.00 },
                { nome: "Papel de seda + cera", custo: 0.00 },
                { nome: "Frete (depende do peso)", custo: 4.50 }
            ]
        },
        {
            id: 5,
            sku: "SHT-CNF-LIN",
            nome: "Short Confort Linho",
            categoria: "Shorts",
            subcategoria: "Confort",
            preco: 147.90,
            custo: 74.50,
            estoqueMinimo: 5,
            cores: [
                { nome: "Verde Militar", estoque: 22, tamanhos: { "40": 7, "42": 8, "44": 5, "46": 2 } },
                { nome: "Camurça (marrom clarin)", estoque: 18, tamanhos: { "40": 6, "42": 6, "44": 4, "46": 2 } },
                { nome: "Branco", estoque: 22, tamanhos: { "40": 7, "42": 8, "44": 5, "46": 2 } },
                { nome: "Preto", estoque: 18, tamanhos: { "40": 6, "42": 6, "44": 4, "46": 2 } }
            ],
            componentesCusto: [
                { nome: "Tecido", custo: 40.00 },
                { nome: "Elástico", custo: 2.00 },
                { nome: "Linha", custo: 1.00 },
                { nome: "Etiqueta (tamanho)", custo: 1.50 },
                { nome: "Etiqueta ZK (couro)", custo: 1.00 },
                { nome: "Etiqueta (papel couchê 300g)", custo: 4.50 },
                { nome: "Costureira", custo: 20.00 },
                { nome: "Papel de seda + cera", custo: 0.00 },
                { nome: "Frete (depende do peso)", custo: 4.50 }
            ]
        },
        {
            id: 6,
            sku: "CMS-CAN-PV",
            nome: "Camisa Canelada PV",
            categoria: "Camisas",
            subcategoria: "Canelada PV",
            preco: 94.49,
            custo: 40.10,
            estoqueMinimo: 7,
            cores: [
                { nome: "Branco", estoque: 12, tamanhos: { P: 3, M: 4, G: 3, GG: 2 } }
            ],
            componentesCusto: [
                { nome: "Tecido", custo: 12.10 },
                { nome: "Botão", custo: 3.50 },
                { nome: "Linha", custo: 1.00 },
                { nome: "Etiqueta (tamanho)", custo: 1.50 },
                { nome: "Etiqueta ZK (couro)", custo: 1.00 },
                { nome: "Etiqueta (papel couchê 300g)", custo: 4.50 },  
                { nome: "Costureira", custo: 16.50 },
                { nome: "Papel de seda + cera", custo: 0.00 },
            ]
        },
        {
            id: 7,
            sku: "RGT-CAN-PA",
            nome: "Regata Canelada PA",
            categoria: "Regatas",
            subcategoria: "Canelada PA",
            preco: 64.80,
            custo: 16.00,
            estoqueMinimo: 4,
            cores: [
                { nome: "Branco", estoque: 25, tamanhos: { P: 2, M: 1, G: 5, GG: 4 } }
            ],
            componentesCusto: [
                { nome: "Tecido", custo: 5.50 },
                { nome: "Linha", custo: 1.00 },
                { nome: "Etiqueta (tamanho)", custo: 1.50 },
                { nome: "Etiqueta ZK (couro)", custo: 1.00 },
                { nome: "Etiqueta (papel couchê 300g)", custo: 4.50 },
                { nome: "Costureira", custo: 3.50 },
                { nome: "Papel de seda + cera", custo: 0.00 }
            ]
        }
    ],

    movimentacoes: [

    ],

    gastos: [
        
    ],

    configuracoes: {
        alertaEstoqueBaixo: true,
        quantidadeMinimaPadrao: 5,
        // ATUALIZAR: Cores agora são objetos com nome e hex
        coresPadrao: [
            { nome: "Preto", hex: "#000000" },
            { nome: "Branco", hex: "#ffffff" },
            { nome: "Azul Marinho", hex: "#0000b6" },
            { nome: "Safari", hex: "#d8c7a9" },
            { nome: "Cru", hex: "#C2B280" },
            { nome: "Off White", hex: "#F5F5F5" },
            { nome: "Verde Militar", hex: "#78866B" },
            { nome: "Camurça (marrom clarin)", hex: "#B7A690" }
        ],
        tamanhosCamisas: ["P", "M", "G", "GG"],
        tamanhosShorts: ["38", "40", "42", "44", "46", "48"],
        categorias: ["Camisetas", "Camisas", "Shorts", "Regatas"],
        subcategorias: ["Gola Polo V", "Manga Longa", "100% Algodão", "Alfaiataria", "Confort", "Linho", "Canelada PV", "Canelada PA"],
        motivosSaida: ["Venda", "Perda (rasgado/manchado)", "Presente", "Troca", "Devolução", "Teste"]
    },

    proximoIdProduto: 8,
    proximoIdMovimentacao: 1,
    proximoIdGasto: 1
};

// Classe utilitária para gerenciamento de dados no LocalStorage
class GerenciadorDados {
    constructor() {
        this.inicializarDados();
    }

    // Inicializa os dados no LocalStorage se não existirem
    inicializarDados() {
        if (!localStorage.getItem('estoqueModaMasculina')) {
            localStorage.setItem('estoqueModaMasculina', JSON.stringify(dadosIniciais));
            console.log("Dados iniciais carregados no LocalStorage.");
        }
    }

    // Obtém todos os dados do sistema
    obterTodosDados() {
        const dados = localStorage.getItem('estoqueModaMasculina');
        return dados ? JSON.parse(dados) : null;
    }

    // Salva todos os dados no LocalStorage
    salvarTodosDados(dados) {
        localStorage.setItem('estoqueModaMasculina', JSON.stringify(dados));
    }

    // Obtém um array específico de dados (produtos, movimentacoes, etc)
    obterDados(tipo) {
        const dados = this.obterTodosDados();
        return dados ? dados[tipo] : [];
    }

    // Salva um array específico de dados
    salvarDados(tipo, novosDados) {
        const dados = this.obterTodosDados();
        if (dados) {
            dados[tipo] = novosDados;
            this.salvarTodosDados(dados);
        }
    }

    // Obtém as configurações do sistema
    obterConfiguracoes() {
        const dados = this.obterTodosDados();
        return dados ? dados.configuracoes : dadosIniciais.configuracoes;
    }

    // Salva as configurações do sistema
    salvarConfiguracoes(novasConfiguracoes) {
        const dados = this.obterTodosDados();
        if (dados) {
            dados.configuracoes = novasConfiguracoes;
            this.salvarTodosDados(dados);
        }
    }

    // Obtém o próximo ID para um tipo de dado
    obterProximoId(tipo) {
        const dados = this.obterTodosDados();
        if (!dados) return 1;

        const mapeamento = {
            'produto': 'proximoIdProduto',
            'movimentacao': 'proximoIdMovimentacao',
            'gasto': 'proximoIdGasto',
            'produtos': 'proximoIdProduto',
            'movimentacoes': 'proximoIdMovimentacao',
            'gastos': 'proximoIdGasto'
        };

        const chaveId = mapeamento[tipo];
        if (!chaveId) {
            console.error(`Tipo '${tipo}' não mapeado para obterProximoId`);
            return 1;
        }

        // Garantir que o ID atual existe
        const idAtual = dados[chaveId];
        if (idAtual === undefined || idAtual === null) {
            // Se não existe, criar com base nos dados existentes
            const tipoDados = tipo.replace(/s$/, ''); // Remove 's' do final
            const arrayDados = dados[tipo + 's'] || dados[tipo];
            const maxId = arrayDados && arrayDados.length > 0 ?
                Math.max(...arrayDados.map(item => item.id || 0)) : 0;
            dados[chaveId] = maxId + 1;
        }

        const proximoId = dados[chaveId] || 1;

        // Atualizar para o próximo
        dados[chaveId] = proximoId + 1;
        this.salvarTodosDados(dados);

        return proximoId;
    }


    // Adiciona um novo produto
    adicionarProduto(produto) {
        // Validar produto antes de adicionar
        const erros = validarProduto(produto);
        if (erros.length > 0) {
            throw new Error(`Erros de validação: ${erros.join(', ')}`);
        }

        const produtos = this.obterDados('produtos');
        produto.id = this.obterProximoId('produto');

        // Garantir que todas as cores tenham estrutura correta
        if (produto.cores) {
            produto.cores.forEach(cor => {
                if (!cor.tamanhos) {
                    // Determinar tamanhos padrão baseado na categoria
                    const config = this.obterConfiguracoes();
                    const tamanhosPadrao = produto.categoria === 'Shorts' ?
                        config.tamanhosShorts : config.tamanhosCamisas;

                    cor.tamanhos = {};
                    tamanhosPadrao.forEach(t => {
                        cor.tamanhos[t] = 0;
                    });
                }
            });
        }

        produtos.push(produto);
        this.salvarDados('produtos', produtos);

        // Notificar sistema sobre atualização
        setTimeout(() => notificarAtualizacao(EventosSistema.PRODUTO_ATUALIZADO, produto), 100);

        return produto;
    }

    // Atualiza um produto existente
    atualizarProduto(produtoAtualizado) {
        // Validar produto antes de atualizar
        const erros = validarProduto(produtoAtualizado);
        if (erros.length > 0) {
            throw new Error(`Erros de validação: ${erros.join(', ')}`);
        }

        const produtos = this.obterDados('produtos');
        const index = produtos.findIndex(p => p.id === produtoAtualizado.id);

        if (index !== -1) {
            produtos[index] = produtoAtualizado;
            this.salvarDados('produtos', produtos);

            // Notificar sistema sobre atualização
            setTimeout(() => notificarAtualizacao(EventosSistema.PRODUTO_ATUALIZADO, produtoAtualizado), 100);

            return true;
        }

        return false;
    }

    // Remove um produto
    removerProduto(id) {
        const produtos = this.obterDados('produtos');
        const novosProdutos = produtos.filter(p => p.id !== id);
        this.salvarDados('produtos', novosProdutos);
        return true;
    }

    // Adiciona uma nova movimentação
    // MODIFICAÇÃO: Atualizar a função adicionarMovimentacao para suportar cor/tamanho
    // ATUALIZAÇÃO: Melhorar a função adicionarMovimentacao para garantir atualização
    adicionarMovimentacao(movimentacao) {
        const movimentacoes = this.obterDados('movimentacoes');

        // Garantir timestamp preciso para ordenação
        const agora = new Date();
        movimentacao.timestamp = agora.getTime();
        movimentacao.dataISO = agora.toISOString();
        movimentacao.dataHora = agora.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Se for saída, calcular valor total
        if (movimentacao.tipo === 'saida') {
            const produtos = this.obterDados('produtos');
            const produto = produtos.find(p => p.id === movimentacao.produtoId);

            if (produto) {
                // Usar preço personalizado se fornecido, senão preço padrão
                const precoUnitario = movimentacao.precoUnitario || produto.preco;
                movimentacao.valorTotal = movimentacao.quantidade * precoUnitario;
                movimentacao.precoUnitario = precoUnitario;
            }
        }

        movimentacao.id = this.obterProximoId('movimentacao');
        movimentacoes.push(movimentacao);
        this.salvarDados('movimentacoes', movimentacoes);

        // ATUALIZAÇÃO CRÍTICA: SEMPRE atualizar o estoque do produto
        // Se tiver informações de cor/tamanho, usar atualização detalhada
        if (movimentacao.cor && movimentacao.tamanho) {
            console.log('Atualizando estoque detalhado:', movimentacao);
            const sucesso = this.atualizarEstoqueDetalhado(
                movimentacao.produtoId,
                movimentacao.cor,
                movimentacao.tamanho,
                movimentacao.tipo,
                movimentacao.quantidade
            );

            if (!sucesso) {
                console.error('Falha ao atualizar estoque detalhado!');
            }
        } else {
            // Atualização simplificada (sem cor/tamanho específico)
            console.log('Atualizando estoque genérico:', movimentacao);
            const sucesso = this.atualizarEstoqueProduto(
                movimentacao.produtoId,
                movimentacao.tipo,
                movimentacao.quantidade
            );

            if (!sucesso) {
                console.error('Falha ao atualizar estoque do produto!');
            }
        }

        // Notificar sistema sobre atualização de estoque
        setTimeout(() => notificarAtualizacao(EventosSistema.ESTOQUE_ATUALIZADO, movimentacao), 100);

        return movimentacao;
    }

    // Atualiza o estoque de um produto com base na movimentação
    // ATUALIZAÇÃO: Corrigir a função atualizarEstoqueProduto
    atualizarEstoqueProduto(produtoId, tipo, quantidade) {
        const produtos = this.obterDados('produtos');
        const produtoIndex = produtos.findIndex(p => p.id === produtoId);

        if (produtoIndex === -1) return false;

        const produto = produtos[produtoIndex];

        // ATUALIZAÇÃO: Calcular estoque total de forma mais precisa
        if (produto.cores && produto.cores.length > 0) {
            // Para entrada/saída genérica, distribuímos pela primeira cor
            // Mas o ideal é especificar qual cor/tamanho
            console.warn('ATENÇÃO: Movimentação genérica sem especificar cor/tamanho!');

            // Podemos somar a quantidade ao estoque total das cores
            if (tipo === 'entrada') {
                // Adiciona à primeira cor por padrão
                produto.cores[0].estoque = (produto.cores[0].estoque || 0) + quantidade;
            } else if (tipo === 'saida') {
                // Remove da primeira cor, mas verificando se há estoque
                const estoqueAtual = produto.cores[0].estoque || 0;
                if (estoqueAtual >= quantidade) {
                    produto.cores[0].estoque = estoqueAtual - quantidade;
                } else {
                    // Se não tiver na primeira cor, tenta em outras cores
                    console.error('Estoque insuficiente na primeira cor, tentando outras...');
                    let quantidadeRestante = quantidade;

                    for (const cor of produto.cores) {
                        if (cor.estoque >= quantidadeRestante) {
                            cor.estoque -= quantidadeRestante;
                            quantidadeRestante = 0;
                            break;
                        } else {
                            quantidadeRestante -= cor.estoque;
                            cor.estoque = 0;
                        }
                    }

                    if (quantidadeRestante > 0) {
                        console.error('Estoque total insuficiente!');
                        return false;
                    }
                }
            }
        } else {
            // Se não tiver estrutura de cores, usar estoqueTotal
            if (!produto.estoqueTotal) produto.estoqueTotal = 0;

            if (tipo === 'entrada') {
                produto.estoqueTotal += quantidade;
            } else if (tipo === 'saida') {
                if (produto.estoqueTotal >= quantidade) {
                    produto.estoqueTotal -= quantidade;
                } else {
                    console.error('Estoque insuficiente!');
                    return false;
                }
            }
        }

        this.salvarDados('produtos', produtos);

        // DEBUG: Verificar se realmente atualizou
        console.log(`Produto ${produto.nome} atualizado. Novo estoque total:`,
            produto.cores ? produto.cores.reduce((sum, cor) => sum + (cor.estoque || 0), 0) : produto.estoqueTotal);

        return true;
    }


    // Adiciona um novo gasto
    adicionarGasto(gasto) {
        console.log('=== ADICIONAR GASTO (utils.js) ===');

        // 1. Obter dados atuais
        const gastos = this.obterDados('gastos');
        console.log('Gastos antes de adicionar:', gastos.length);

        // 2. Garantir que temos um ID
        if (!gasto.id) {
            gasto.id = this.obterProximoId('gasto');
            console.log('ID gerado:', gasto.id);
        }

        // 3. Garantir que temos campos de data/hora
        if (!gasto.timestamp) {
            gasto.timestamp = new Date().getTime();
        }
        if (!gasto.dataISO) {
            gasto.dataISO = new Date().toISOString();
        }
        if (!gasto.dataHora) {
            gasto.dataHora = new Date().toLocaleString('pt-BR');
        }

        // 4. Converter valor para número se necessário
        if (typeof gasto.valor === 'string') {
            gasto.valor = parseFloat(gasto.valor);
        }

        // 5. Adicionar ao array
        gastos.push(gasto);
        console.log('Gasto a ser adicionado:', gasto);
        console.log('Gastos após adicionar (no array):', gastos.length);

        // 6. Salvar no LocalStorage
        this.salvarDados('gastos', gastos);
        console.log('Dados salvos no LocalStorage');

        // 7. Verificar se realmente salvou
        const dadosVerificados = this.obterDados('gastos');
        console.log('Verificação - Gastos no LocalStorage:', dadosVerificados.length);
        console.log('Último gasto salvo:', dadosVerificados[dadosVerificados.length - 1]);
        console.log('=== FIM ADICIONAR GASTO ===');

        return gasto;
    }

    // Exporta dados para Excel
    exportarParaExcel() {
        const dados = this.obterTodosDados();

        // Criar uma pasta de trabalho
        const wb = XLSX.utils.book_new();

        // Preparar dados de produtos com estoque detalhado
        const produtosFormatados = dados.produtos.map(produto => {
            // Calcular estoque total
            let estoqueTotal = 0;
            let detalhesEstoque = '';

            if (produto.cores && produto.cores.length > 0) {
                produto.cores.forEach(cor => {
                    estoqueTotal += cor.estoque || 0;

                    // Adicionar detalhes por cor
                    detalhesEstoque += `${cor.nome}: ${cor.estoque || 0} unidades\n`;

                    // Adicionar detalhes por tamanho se existirem
                    if (cor.tamanhos && typeof cor.tamanhos === 'object') {
                        Object.entries(cor.tamanhos).forEach(([tamanho, quantidade]) => {
                            detalhesEstoque += `  Tamanho ${tamanho}: ${quantidade || 0}\n`;
                        });
                    }
                });
            }

            return {
                'ID': produto.id,
                'SKU': produto.sku,
                'Nome': produto.nome,
                'Categoria': produto.categoria,
                'Subcategoria': produto.subcategoria,
                'Preço': produto.preco,
                'Custo': produto.custo,
                'Estoque Mínimo': produto.estoqueMinimo,
                'Estoque Total': estoqueTotal,
                'Estoque Detalhado': detalhesEstoque.trim(),
                'Status Estoque': estoqueTotal < produto.estoqueMinimo ? 'BAIXO' :
                    estoqueTotal < produto.estoqueMinimo * 2 ? 'MÉDIO' : 'NORMAL'
            };
        });

        // Adicionar planilha de produtos
        const wsProdutos = XLSX.utils.json_to_sheet(produtosFormatados);
        XLSX.utils.book_append_sheet(wb, wsProdutos, "Produtos");

        // Ajustar largura das colunas
        const colWidths = [
            { wch: 5 },   // ID
            { wch: 12 },  // SKU
            { wch: 25 },  // Nome
            { wch: 15 },  // Categoria
            { wch: 15 },  // Subcategoria
            { wch: 10 },  // Preço
            { wch: 10 },  // Custo
            { wch: 15 },  // Estoque Mínimo
            { wch: 15 },  // Estoque Total
            { wch: 40 },  // Estoque Detalhado
            { wch: 15 }   // Status Estoque
        ];
        wsProdutos['!cols'] = colWidths;

        // Adicionar planilha de movimentações
        const wsMovimentacoes = XLSX.utils.json_to_sheet(dados.movimentacoes);
        XLSX.utils.book_append_sheet(wb, wsMovimentacoes, "Movimentações");

        // Adicionar planilha de gastos
        const wsGastos = XLSX.utils.json_to_sheet(dados.gastos);
        XLSX.utils.book_append_sheet(wb, wsGastos, "Gastos");

        // Gerar arquivo Excel
        const nomeArquivo = `estoque_moda_masculina_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, nomeArquivo);

        return nomeArquivo;
    }

    // Exporta dados para JSON (backup)
    exportarParaJson() {
        const dados = this.obterTodosDados();
        const dadosString = JSON.stringify(dados, null, 2);
        const blob = new Blob([dadosString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `backup_estoque_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        return link.download;
    }


    // Importa dados de um arquivo JSON
    importarDeJson(arquivoJson, callback) {
        const reader = new FileReader();

        reader.onload = function (event) {
            try {
                const dadosImportados = JSON.parse(event.target.result);

                // VALIDAÇÃO IMPORTANTE: Verificar se o arquivo tem a estrutura correta
                if (!dadosImportados.produtos || !Array.isArray(dadosImportados.produtos)) {
                    throw new Error("Arquivo JSON não contém estrutura de dados válida");
                }

                // Substituir TODOS os dados no LocalStorage
                localStorage.setItem('estoqueModaMasculina', JSON.stringify(dadosImportados));

                if (callback) callback(true, "Dados importados com sucesso!");
            } catch (error) {
                console.error("Erro na importação:", error);
                if (callback) callback(false, "Erro ao importar dados: " + error.message);
            }
        };

        reader.onerror = function () {
            if (callback) callback(false, "Erro ao ler o arquivo");
        };

        reader.readAsText(arquivoJson);
    }

    // Obtém produtos com estoque baixo por cor/tamanho específico
    obterAlertaEstoqueDetalhado() {
        const produtos = this.obterDados('produtos');
        const alertas = [];

        for (const produto of produtos) {
            if (produto.cores && produto.cores.length > 0) {
                for (const cor of produto.cores) {
                    // Verificar estoque da cor
                    const estoqueCor = cor.estoque || 0;

                    if (estoqueCor < 5) { // Alerta se cor tiver menos de 5 unidades
                        alertas.push({
                            tipo: 'cor',
                            produtoId: produto.id,
                            produtoNome: produto.nome,
                            sku: produto.sku,
                            cor: cor.nome,
                            estoqueAtual: estoqueCor,
                            nivel: estoqueCor <= 2 ? 'CRÍTICO' : 'BAIXO',
                            mensagem: `Cor "${cor.nome}" do produto ${produto.nome} (${produto.sku}) está com apenas ${estoqueCor} unidades`
                        });
                    }

                    // Verificar estoque por tamanho
                    if (cor.tamanhos && typeof cor.tamanhos === 'object') {
                        Object.entries(cor.tamanhos).forEach(([tamanho, quantidade]) => {
                            const qtd = quantidade || 0;

                            if (qtd < 3) { // Alerta se tamanho tiver menos de 3 unidades
                                alertas.push({
                                    tipo: 'tamanho',
                                    produtoId: produto.id,
                                    produtoNome: produto.nome,
                                    sku: produto.sku,
                                    cor: cor.nome,
                                    tamanho: tamanho,
                                    estoqueAtual: qtd,
                                    nivel: qtd === 0 ? 'ESGOTADO' : qtd <= 1 ? 'CRÍTICO' : 'BAIXO',
                                    mensagem: `Tamanho ${tamanho} da cor "${cor.nome}" (${produto.nome}) está com apenas ${qtd} unidades`
                                });
                            }
                        });
                    }
                }
            }
        }

        return alertas;
    }

    // Atualiza o estoque detalhado por cor/tamanho
    // VERIFIQUE se esta função está funcionando corretamente:
    atualizarEstoqueDetalhado(produtoId, corNome, tamanho, tipo, quantidade) {
        console.log('=== ATUALIZAR ESTOQUE DETALHADO ===');

        const produtos = this.obterDados('produtos');
        const produtoIndex = produtos.findIndex(p => p.id === produtoId);

        if (produtoIndex === -1) {
            console.error('Produto não encontrado');
            return false;
        }

        const produto = produtos[produtoIndex];

        // Garantir que temos estrutura de cores
        if (!produto.cores) produto.cores = [];

        // Encontrar ou criar cor
        let corIndex = produto.cores.findIndex(c => c.nome === corNome);
        if (corIndex === -1) {
            produto.cores.push({
                nome: corNome,
                estoque: 0,
                tamanhos: {}
            });
            corIndex = produto.cores.length - 1;
        }

        const cor = produto.cores[corIndex];

        // Garantir estruturas
        if (cor.estoque === undefined) cor.estoque = 0;
        if (!cor.tamanhos) cor.tamanhos = {};
        if (cor.tamanhos[tamanho] === undefined) cor.tamanhos[tamanho] = 0;

        const qtd = Number(quantidade);
        const estoqueAntes = cor.tamanhos[tamanho];

        // Verificar estoque para saída
        if (tipo === 'saida' && estoqueAntes < qtd) {
            console.error('Estoque insuficiente');
            return false;
        }

        // Atualizar
        if (tipo === 'entrada') {
            cor.tamanhos[tamanho] += qtd;
            cor.estoque += qtd;
        } else if (tipo === 'saida') {
            cor.tamanhos[tamanho] -= qtd;
            cor.estoque -= qtd;

            // Garantir não negativo
            if (cor.tamanhos[tamanho] < 0) cor.tamanhos[tamanho] = 0;
            if (cor.estoque < 0) cor.estoque = 0;
        }

        console.log(`Atualizado: ${produto.nome} - ${corNome} - ${tamanho}`);
        console.log(`Estoque antes: ${estoqueAntes}, depois: ${cor.tamanhos[tamanho]}`);

        // Salvar
        this.salvarDados('produtos', produtos);

        // DEBUG: Verificar se salvou
        const produtosVerificados = this.obterDados('produtos');
        const produtoVerificado = produtosVerificados.find(p => p.id === produtoId);
        console.log('Verificação após salvar:', produtoVerificado);

        return true;
    }

    // Obtém produtos com estoque baixo (total)
    obterProdutosEstoqueBaixo() {
        const produtos = this.obterDados('produtos');
        const produtosComEstoqueBaixo = [];

        for (const produto of produtos) {
            let estoqueTotal = 0;
            let coresComEstoqueBaixo = [];

            // Calcula o estoque total do produto e verifica cores específicas
            if (produto.cores && produto.cores.length > 0) {
                for (const cor of produto.cores) {
                    estoqueTotal += cor.estoque || 0;

                    // Verifica se a cor específica está com estoque baixo
                    if (cor.estoque < 5) {
                        coresComEstoqueBaixo.push({
                            cor: cor.nome,
                            estoque: cor.estoque,
                            nivel: cor.estoque <= 2 ? 'CRÍTICO' : 'BAIXO'
                        });
                    }
                }
            }

            // Verifica se o estoque total está abaixo do mínimo
            if (estoqueTotal < produto.estoqueMinimo) {
                produtosComEstoqueBaixo.push({
                    ...produto,
                    estoqueTotal: estoqueTotal,
                    coresComEstoqueBaixo: coresComEstoqueBaixo,
                    alertasDetalhados: coresComEstoqueBaixo.length > 0
                });
            }
        }

        return produtosComEstoqueBaixo;
    }

    // Calcula o valor total do estoque
    calcularValorTotalEstoque() {
        const produtos = this.obterDados('produtos');
        let valorTotal = 0;

        for (const produto of produtos) {
            let estoqueTotal = 0;

            // Calcula o estoque total do produto
            if (produto.cores && produto.cores.length > 0) {
                for (const cor of produto.cores) {
                    estoqueTotal += cor.estoque || 0;
                }
            }

            // Adiciona o valor do estoque deste produto
            valorTotal += estoqueTotal * produto.custo;
        }

        return valorTotal;
    }

    // Obtém estatísticas de vendas do mês atual
    obterEstatisticasVendasMes() {
        const movimentacoes = this.obterDados('movimentacoes');
        const dataAtual = new Date();
        const mesAtual = dataAtual.getMonth();
        const anoAtual = dataAtual.getFullYear();

        let quantidadeVendas = 0;
        let valorVendas = 0;

        for (const mov of movimentacoes) {
            // Somente considerar como venda se o motivo for 'venda'
            if (mov.tipo === 'saida' && mov.motivo === 'venda') {
                const dataMov = new Date(mov.data);

                if (dataMov.getMonth() === mesAtual && dataMov.getFullYear() === anoAtual) {
                    quantidadeVendas += mov.quantidade;

                    const produtos = this.obterDados('produtos');
                    const produto = produtos.find(p => p.id === mov.produtoId);

                    if (produto) {
                        valorVendas += mov.quantidade * produto.preco;
                    }
                }
            }
        }

        return {
            quantidade: quantidadeVendas,
            valor: valorVendas
        };
    }
}

// Criar instância global do gerenciador de dados
const gerenciadorDados = new GerenciadorDados();

// Sistema de eventos para sincronização
const EventosSistema = {
    PRODUTO_ATUALIZADO: 'produto-atualizado',
    ESTOQUE_ATUALIZADO: 'estoque-atualizado',
    GASTO_ADICIONADO: 'gasto-adicionado',
    CONFIG_ATUALIZADA: 'config-atualizada'
};

function notificarAtualizacao(evento, dados = {}) {
    const customEvent = new CustomEvent(evento, { detail: dados });
    document.dispatchEvent(customEvent);
}

// Função para ordenar por data mais recente (mais recente primeiro)
// CORREÇÃO: Agora ordena corretamente do mais recente para o mais antigo
function ordenarPorDataMaisRecente(items) {
    return items.sort((a, b) => {
        // Prioridade 1: timestamp numérico (se disponível)
        const timestampA = a.timestamp || (a.dataISO ? new Date(a.dataISO).getTime() : 0);
        const timestampB = b.timestamp || (b.dataISO ? new Date(b.dataISO).getTime() : 0);

        if (timestampA && timestampB) {
            // Ordem DECRESCENTE: mais recente primeiro
            return timestampB - timestampA;
        }

        // Prioridade 2: dataISO
        if (a.dataISO && b.dataISO) {
            // Ordem DECRESCENTE: mais recente primeiro
            return new Date(b.dataISO).getTime() - new Date(a.dataISO).getTime();
        }

        // Prioridade 3: data string
        try {
            const dataA = a.data ? new Date(a.data + 'T12:00:00').getTime() : 0;
            const dataB = b.data ? new Date(b.data + 'T12:00:00').getTime() : 0;

            // Ordem DECRESCENTE: mais recente primeiro
            return dataB - dataA;
        } catch (e) {
            return 0;
        }
    });
}

// Função para validar produto
function validarProduto(produto) {
    const erros = [];
    if (!produto.sku || produto.sku.trim() === '') erros.push('SKU é obrigatório');
    if (!produto.nome || produto.nome.trim() === '') erros.push('Nome é obrigatório');
    if (produto.preco <= 0) erros.push('Preço deve ser maior que zero');
    if (produto.custo < 0) erros.push('Custo não pode ser negativo');
    if (produto.estoqueMinimo < 1) erros.push('Estoque mínimo deve ser pelo menos 1');

    // Validar variações de cor/tamanho
    if (!produto.cores || produto.cores.length === 0) {
        erros.push('É necessário pelo menos uma variação de cor/tamanho');
    } else {
        produto.cores.forEach((cor, index) => {
            if (!cor.nome || cor.nome.trim() === '') {
                erros.push(`Variação ${index + 1}: Nome da cor é obrigatório`);
            }
            if (cor.estoque === undefined || cor.estoque === null) {
                erros.push(`Variação ${index + 1}: Estoque é obrigatório`);
            }
        });
    }

    return erros;
}

// Logger para debug
const Logger = {
    log: (mensagem, dados) => console.log(`[${new Date().toLocaleTimeString()}] ${mensagem}`, dados),
    error: (mensagem, erro) => console.error(`[${new Date().toLocaleTimeString()}] ERRO: ${mensagem}`, erro),
    warn: (mensagem) => console.warn(`[${new Date().toLocaleTimeString()}] AVISO: ${mensagem}`)
};

// Função para formatar valores monetários
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Função para formatar datas para exibição
function formatarData(dataString) {
    if (!dataString) return '';

    try {
        // Se já estiver no formato correto, apenas converter
        const data = new Date(dataString);

        // CORREÇÃO: Ajustar para o fuso horário local
        const dataAjustada = new Date(data.getTime() + data.getTimezoneOffset() * 60000);

        // Formatar como DD/MM/YYYY
        const dia = String(dataAjustada.getDate()).padStart(2, '0');
        const mes = String(dataAjustada.getMonth() + 1).padStart(2, '0');
        const ano = dataAjustada.getFullYear();

        return `${dia}/${mes}/${ano}`;
    } catch (error) {
        console.error('Erro ao formatar data:', error, dataString);
        return dataString;
    }
}

// NOVA FUNÇÃO: Converter data para armazenamento
function formatarDataParaArmazenamento(dataString) {
    if (!dataString) return obterDataAtual();

    try {
        // Se já estiver no formato YYYY-MM-DD, retornar
        if (/^\d{4}-\d{2}-\d{2}$/.test(dataString)) {
            return dataString;
        }

        // Tentar converter de DD/MM/YYYY para YYYY-MM-DD
        const partes = dataString.split('/');
        if (partes.length === 3) {
            const [dia, mes, ano] = partes;
            return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
        }

        return obterDataAtual();
    } catch (error) {
        console.error('Erro ao formatar data para armazenamento:', error);
        return obterDataAtual();
    }
}

// Função para obter a data atual no formato YYYY-MM-DD
function obterDataAtual() {
    const data = new Date();

    // CORREÇÃO: Usar métodos locais para evitar problemas de fuso horário
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    // Formato YYYY-MM-DD (padrão para input date)
    return `${ano}-${mes}-${dia}`;
}

// Função para obter o primeiro dia do mês atual
function obterPrimeiroDiaMes() {
    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    return `${ano}-${mes}-01`;
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Cria um elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;

    // Estilos da notificação
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        min-width: 300px;
        max-width: 500px;
    `;

    // Cor de fundo baseada no tipo
    if (tipo === 'sucesso') {
        notificacao.style.backgroundColor = '#27ae60';
    } else if (tipo === 'erro') {
        notificacao.style.backgroundColor = '#e74c3c';
    } else if (tipo === 'aviso') {
        notificacao.style.backgroundColor = '#f39c12';
    } else {
        notificacao.style.backgroundColor = '#3498db';
    }

    // Adiciona ao documento
    document.body.appendChild(notificacao);

    // Remove após 5 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.parentNode.removeChild(notificacao);
            }
        }, 300);
    }, 5000);

    // Adiciona animação CSS se ainda não existir
    if (!document.querySelector('#estilos-notificacao')) {
        const estilos = document.createElement('style');
        estilos.id = 'estilos-notificacao';
        estilos.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(estilos);
    }
}

// Função para validar SKU
function validarSKU(sku) {
    // SKU deve ter pelo menos 3 caracteres
    return sku && sku.length >= 3;
}

// Função para validar e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para gerar um SKU automático
function gerarSKUAutomatico(categoria = '', subcategoria = '', sequencia = 0) {
    // Garantir que os parâmetros são strings
    const cat = String(categoria || 'GEN');
    const sub = String(subcategoria || 'GEN');

    const prefixoCategoria = cat.substring(0, 3).toUpperCase();
    const prefixoSubcategoria = sub.substring(0, 3).toUpperCase();
    const sequenciaFormatada = String(sequencia).padStart(3, '0');

    return `${prefixoCategoria}-${prefixoSubcategoria}-${sequenciaFormatada}`;
}

// Função auxiliar para parse seguro de números
function parseFloatSafe(valor) {
    if (valor === null || valor === undefined || valor === '') {
        return 0;
    }

    // Substituir vírgula por ponto para números brasileiros
    const valorString = String(valor).replace(',', '.');
    const resultado = parseFloat(valorString);

    // Verificar se é um número válido
    return isNaN(resultado) ? 0 : resultado;
}

// Função para obter cor em formato hexadecimal (atualizada)
function obterCorHex(nomeCor) {
    const cores = {
        'Preto': '#000000',
        'Branco': '#ffffff',
        'Azul Marinho': '#0000b6',
        'Safari': '#d8c7a9',
        'Cru': '#C2B280',
        'Off White': '#F5F5F5',
        'Verde Militar': '#78866B',
        'Camurça (marrom clarin)': '#B7A690'
    };

    // Se for objeto com propriedade hex, usar ela
    if (typeof nomeCor === 'object' && nomeCor.hex) {
        return nomeCor.hex;
    }

    // Se for string, buscar no mapa
    const nome = typeof nomeCor === 'object' ? nomeCor.nome : nomeCor;

    // Se não encontrar, gerar uma cor baseada no hash do nome
    if (!cores[nome]) {
        // Gerar cor consistente baseada no nome
        let hash = 0;
        for (let i = 0; i < nome.length; i++) {
            hash = nome.charCodeAt(i) + ((hash << 5) - hash);
        }

        // Converter hash para cor hexadecimal
        const cor = '#' + (hash & 0x00FFFFFF).toString(16).toUpperCase().padStart(6, '0');
        return cor;
    }

    return cores[nome] || '#cccccc';
}