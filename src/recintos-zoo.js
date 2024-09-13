class RecintosZoo {
    constructor() {
        // Recintos existentes no zoo
        this.recintos = [
            { numero: 1, bioma: "Savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: "Floresta", tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: "Savana e Rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: "Rio", tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: "Savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "LEÃO", quantidade: 1, tamanho: 3 }] }
        ];

        // Tabela de animais aceitos no zoo
        this.animaisAceitos = {
            "LEÃO": { tamanho: 3, biomas: ["Savana"], observacoes: "Carnívoro" },
            "LEOPARDO": { tamanho: 2, biomas: ["Savana"], observacoes: "Carnívoro" },
            "CROCODILO": { tamanho: 3, biomas: ["Rio"], observacoes: "Carnívoro" },
            "MACACO": { tamanho: 1, biomas: ["Savana", "Floresta"], observacoes: "Requer companhia" },
            "GAZELA": { tamanho: 2, biomas: ["Savana"], observacoes: "Herbívoro" },
            "HIPOPÓTAMO": { tamanho: 4, biomas: ["Savana", "Rio"], observacoes: "Herbívoro, tolera outros animais" }
        };
    }

    // Função que verifica se o bioma e espaço são adequados
    verificaRecintoViavel(recinto, animalInfo, quantidade) {
        let espacoOcupado = recinto.animaisExistentes.reduce((total, animal) => total + animal.tamanho * animal.quantidade, 0);
        let espacoNecessario = animalInfo.tamanho * quantidade;
    
        // Verificar se o bioma é adequado e se há espaço suficiente
        return animalInfo.biomas.includes(recinto.bioma) && (recinto.tamanhoTotal - espacoOcupado) >= espacoNecessario;
    }
    analisaRecintos(animal, quantidade) {
        // Validar se a quantidade é positiva; na ordem de prioridade, a quantidade fica em 1º
        if (quantidade <= 0) {
            return {
                erro: "Quantidade inválida",
                recintosViaveis: null
            };
        }
        // Validar se o animal é aceito
        if (!this.animaisAceitos[animal]) {
            return { erro: "Animal inválido" };
        }

        let animalInfo = this.animaisAceitos[animal];
        let recintosViaveis = [];

        // Verificar cada recinto existente
        this.recintos.forEach(recinto => {
            if (this.verificaRecintoViavel(recinto, animalInfo, quantidade)) {
                let espacoOcupado = recinto.animaisExistentes.reduce((total, animal) => total + animal.tamanho * animal.quantidade, 0);
                let espacoLivre = recinto.tamanhoTotal - espacoOcupado - (animalInfo.tamanho * quantidade);
                if (recinto.animaisExistentes.length > 0) espacoLivre -= 1; // Espaço adicional
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
            }
        });

        // Retornar a lista de recintos viáveis ou uma mensagem de erro
        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
}

export { RecintosZoo as RecintosZoo };
