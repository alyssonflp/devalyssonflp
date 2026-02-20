/**
 * TERMINAL ENGINE - Alysson OS
 * Focado em: Redimensionamento Manual e Escalonamento de Fonte
 * Alvo: #main-terminal
 */

const TerminalEngine = {
    init() {
        // Seleciona o terminal pelo ID que você confirmou
        this.terminal = document.getElementById('main-terminal');
        
        if (!this.terminal) {
            console.error("TerminalEngine: #main-terminal não encontrado.");
            return;
        }

        this.aplicarEstilosIniciais();
        this.iniciarObservador();
    },

    aplicarEstilosIniciais() {
        // Habilita o redimensionamento nativo do navegador (puxador no canto)
        this.terminal.style.resize = 'both';
        this.terminal.style.overflow = 'auto';
        
        // Define limites para evitar que a janela suma ou quebre
        this.terminal.style.minWidth = '280px';
        this.terminal.style.minHeight = '150px';

        // Garante que a transição de fonte seja suave
        this.terminal.style.transition = 'font-size 0.1s ease-out';
        
        // Ajuste de fonte inicial
        this.atualizarTamanhoFonte(this.terminal.offsetWidth);
    },

    atualizarTamanhoFonte(largura) {
        /**
         * LÓGICA DE ESCALONAMENTO
         * Em telas pequenas (300px), a fonte fica em 12px.
         * Em telas grandes (1200px+), a fonte estabiliza em 20px.
         */
        const novoTamanho = Math.max(12, Math.min(20, largura / 45));
        
        // Aplica ao container principal
        this.terminal.style.fontSize = `${novoTamanho}px`;

        // Força a atualização em elementos internos que possam ter estilos próprios
        const elementosInternos = this.terminal.querySelectorAll('span, p, div, pre');
        elementosInternos.forEach(el => {
            el.style.fontSize = 'inherit'; // Faz herdar do #main-terminal
        });
    },

    iniciarObservador() {
        // O ResizeObserver detecta qualquer mudança de tamanho na Div
        const monitor = new ResizeObserver(entries => {
            for (let entry of entries) {
                // Pegamos a largura atualizada após o redimensionamento
                const larguraAtual = entry.contentRect.width;
                this.atualizarTamanhoFonte(larguraAtual);
            }
        });

        monitor.observe(this.terminal);
    }
};

// Inicializa o motor assim que o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    TerminalEngine.init();
});
