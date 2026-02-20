/**
 * GERENCIADOR DE JANELAS - ALYSSON OS
 * Funções: Arrastar e Controle de Z-Index
 */

const GerenciadorJanelas = {
    init() {
        this.configurarArrasto();
    },

    configurarArrasto() {
        document.addEventListener('mousedown', (e) => {
            // Verifica se o clique foi na barra de título (win-header)
            const header = e.target.closest('.win-header');
            if (!header) return;

            const janela = header.parentElement; // O #main-terminal ou .window
            
            // Traz a janela para a frente
            this.focarJanela(janela);

            // Calcula a posição do clique dentro da janela
            let shiftX = e.clientX - janela.getBoundingClientRect().left;
            let shiftY = e.clientY - janela.getBoundingClientRect().top;

            // Remove o transform de centralização para não bugar o movimento
            janela.style.transform = 'none';
            janela.style.margin = '0';

            const moveAt = (pageX, pageY) => {
                janela.style.left = pageX - shiftX + 'px';
                janela.style.top = pageY - shiftY + 'px';
            };

            const onMouseMove = (event) => {
                moveAt(event.pageX, event.pageY);
            };

            // Inicia o movimento
            document.addEventListener('mousemove', onMouseMove);

            // Finaliza o movimento
            document.onmouseup = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.onmouseup = null;
            };
        });

        // Previne comportamento padrão de arrastar imagens
        document.ondragstart = () => false;
    },

    focarJanela(el) {
        document.querySelectorAll('.window, #main-terminal').forEach(win => {
            win.style.zIndex = "50";
        });
        el.style.zIndex = "100";
    }
};

document.addEventListener('DOMContentLoaded', () => {
    GerenciadorJanelas.init();
});
