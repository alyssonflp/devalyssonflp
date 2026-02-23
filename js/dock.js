/**
 * Módulo do Dock Lateral - Alysson_OS
 * Integrado com Lucide Icons
 */

export function initDock() {
    const monitor = document.getElementById('root-terminal');
    
    // Verifica se o monitor existe, se não, tenta novamente
    if (!monitor) {
        setTimeout(initDock, 500);
        return;
    }

    // Evita duplicatas
    if (document.getElementById('terminal-dock')) return;

    const dock = document.createElement('div');
    dock.id = 'terminal-dock';
    
    // Configuração com ícones Lucide modernos
    const icons = [
        { name: 'about', lucide: 'user-circle', label: 'About' },
        { name: 'skills', lucide: 'code-2', label: 'Skills' },
        { name: 'experience', lucide: 'binary', label: 'Experience' },
        { name: 'projects', lucide: 'layout-template', label: 'Projects' },
        { name: 'ia', lucide: 'bot', label: 'I.A' }
    ];

    icons.forEach(item => {
        const iconBtn = document.createElement('div');
        iconBtn.className = 'dock-item';
        iconBtn.setAttribute('data-label', item.label);
        
        // Insere a tag <i> que o Lucide transformará em SVG
        iconBtn.innerHTML = `<i data-lucide="${item.lucide}"></i>`;
        
        iconBtn.onclick = () => simulateTyping(`/${item.name}`);

        dock.appendChild(iconBtn);
    });

    monitor.appendChild(dock);

    // ESSENCIAL: Comando que renderiza os ícones da biblioteca Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.warn("Lucide não carregado. Verifique o script no index.html");
    }
}

/**
 * Simula a digitação do comando no input do terminal
 */
async function simulateTyping(command) {
    const input = document.getElementById('terminal-input');
    if (!input) return;

    input.value = ''; 
    input.focus();

    for (let i = 0; i < command.length; i++) {
        input.value += command[i];
        await new Promise(r => setTimeout(r, 50)); // Velocidade de digitação
    }

    // Pequena pausa antes do Enter para parecer humano
    setTimeout(() => {
        const event = new KeyboardEvent('keydown', { 
            key: 'Enter', 
            code: 'Enter', 
            keyCode: 13, 
            bubbles: true 
        });
        input.dispatchEvent(event);
    }, 150);
}
