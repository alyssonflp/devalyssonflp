/**
 * GERENCIADOR DE MOVIMENTO - Alysson OS
 * Suporte para Mouse e Touch (Celular)
 */

const GerenciadorOS = {
    init() {
        this.terminal = document.getElementById('main-terminal');
        if (!this.terminal) return;

        this.setupDraggable();
    },

    setupDraggable() {
        const header = this.terminal.querySelector('.win-header');
        let isDragging = false;
        let offset = { x: 0, y: 0 };

        const startMoving = (e) => {
            isDragging = true;
            // Pega a posição correta se for Touch ou Mouse
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

            offset.x = clientX - this.terminal.offsetLeft;
            offset.y = clientY - this.terminal.offsetTop;
            
            this.terminal.style.transition = 'none'; // Remove delay ao arrastar
        };

        const move = (e) => {
            if (!isDragging) return;
            
            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

            // Calcula a nova posição
            let newX = clientX - offset.x;
            let newY = clientY - offset.y;

            // Aplica as coordenadas
            this.terminal.style.left = `${newX}px`;
            this.terminal.style.top = `${newY}px`;
            this.terminal.style.transform = 'none'; // Remove o translate de centralização
        };

        const stopMoving = () => {
            isDragging = false;
            this.terminal.style.transition = 'all 0.3s ease-out'; // Devolve a suavidade
        };

        // Eventos de Mouse
        header.addEventListener('mousedown', startMoving);
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', stopMoving);

        // Eventos de Touch (Celular)
        header.addEventListener('touchstart', startMoving, { passive: false });
        window.addEventListener('touchmove', move, { passive: false });
        window.addEventListener('touchend', stopMoving);
    }
};

document.addEventListener('DOMContentLoaded', () => GerenciadorOS.init());
