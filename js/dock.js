/* --- JS/DOCK.JS ATUALIZADO --- */

export function initDock() {
    const dockContainer = document.getElementById('terminal-dock');
    if (!dockContainer) return;

    const icons = [
        { name: 'about', lucide: 'user-circle', label: 'About' },
        { name: 'skills', lucide: 'code-2', label: 'Skills' },
        { name: 'experience', lucide: 'binary', label: 'Experience' },
        { name: 'projects', lucide: 'layout-template', label: 'Projects' },
        { name: 'ia', lucide: 'bot', label: 'I.A' }
    ];

    // Limpa e reconstrói
    dockContainer.innerHTML = '';

    icons.forEach(item => {
        const iconBtn = document.createElement('div');
        iconBtn.className = 'dock-item';
        iconBtn.setAttribute('data-tooltip', item.label);
        
        // Criamos a tag que o Lucide vai transformar em SVG
        iconBtn.innerHTML = `<i data-lucide="${item.lucide}"></i>`;
        
        iconBtn.onclick = (e) => {
            // ... sua lógica de simulateTyping aqui ...
        };

        dockContainer.appendChild(iconBtn);
    });

    // RE-INICIALIZA O LUCIDE (Essencial para os ícones aparecerem)
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
