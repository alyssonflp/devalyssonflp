/**
 * Módulo do Dock Lateral - Alysson_OS
 * Integrado com Lucide Icons
 */

export function initDock() {
    // CORREÇÃO: Usamos o container específico que criamos no index.html
    // Se ele não existir, buscamos o desktop-3d como fallback
    let dockContainer = document.getElementById('terminal-dock');
    const fallbackContainer = document.getElementById('desktop-3d');
    
    // Se o elemento não estiver no HTML, nós o criamos
    if (!dockContainer) {
        if (!fallbackContainer) {
            setTimeout(initDock, 500);
            return;
        }
        dockContainer = document.createElement('div');
        dockContainer.id = 'terminal-dock';
        fallbackContainer.appendChild(dockContainer);
    }

    // Limpa conteúdo pré-existente para evitar duplicatas em hot-reload
    dockContainer.innerHTML = '';

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
        // Adicionamos 'stroke-width' para garantir visibilidade
        iconBtn.innerHTML = `<i data-lucide="${item.lucide}" style="width:20px; height:20px;"></i>`;
        
        iconBtn.onclick = (e) => {
            e.stopPropagation(); // Evita conflitos com cliques no monitor 3D
            simulateTyping(`/${item.name}`);
        };

        dockContainer.appendChild(iconBtn);
    });

    // ESSENCIAL: Comando que renderiza os ícones da biblioteca Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    } else {
        console.warn("Lucide não carregado globalmente.");
    }
}

/**
 * Simula a digitação do comando no input do terminal
 */
async function simulateTyping(command) {
    const input = document.getElementById('terminal-input');
    
    // Se o seu terminal for o Xterm.js ou similar, talvez precise de uma lógica diferente,
    // mas para inputs HTML padrão, isso funciona:
    if (!input) {
        console.warn("Input do terminal não encontrado para simulação.");
        return;
    }

    input.value = ''; 
    input.focus();

    for (let i = 0; i < command.length; i++) {
        input.value += command[i];
        // Trigger de evento de input para que o terminal reconheça a mudança
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise(r => setTimeout(r, 40)); 
    }

    // Pequena pausa antes do Enter
    setTimeout(() => {
        const event = new KeyboardEvent('keydown', { 
            key: 'Enter', 
            code: 'Enter', 
            keyCode: 13, 
            bubbles: true 
        });
        input.dispatchEvent(event);
    }, 100);
}
