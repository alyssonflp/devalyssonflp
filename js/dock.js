/**
 * Módulo do Dock Lateral - Alysson_OS
 */

export function initDock() {
    let dockContainer = document.getElementById('terminal-dock');
    const fallbackContainer = document.getElementById('desktop-3d');
    
    if (!dockContainer) {
        if (!fallbackContainer) {
            setTimeout(initDock, 500);
            return;
        }
        dockContainer = document.createElement('div');
        dockContainer.id = 'terminal-dock';
        fallbackContainer.appendChild(dockContainer);
    }

    dockContainer.innerHTML = '';

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
        iconBtn.innerHTML = `<i data-lucide="${item.lucide}"></i>`;
        
        iconBtn.onclick = (e) => {
            e.stopPropagation();
            // Removemos a "/" se o seu terminal já lidar com comandos pelo nome
            simulateTyping(`${item.name}`); 
        };

        dockContainer.appendChild(iconBtn);
    });

    if (window.lucide) window.lucide.createIcons();
}

/**
 * Simula a digitação diretamente no prompt ativo
 */
async function simulateTyping(command) {
    // CORREÇÃO: Busca o input que está visível e focado no terminal
    const input = document.querySelector('.terminal-input') || document.getElementById('terminal-input');
    
    if (!input) {
        console.warn("Prompt de comando não encontrado.");
        return;
    }

    // Limpa o que estiver escrito para não concatenar errado
    input.value = '';
    input.focus();

    // Digitação caractere por caractere
    for (let i = 0; i < command.length; i++) {
        input.value += command[i];
        
        // Dispara eventos para o terminal entender que há texto novo
        input.dispatchEvent(new Event('input', { bubbles: true }));
        
        await new Promise(r => setTimeout(r, 60)); 
    }

    // Aguarda um momento e envia o Enter
    setTimeout(() => {
        const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
        });
        input.dispatchEvent(enterEvent);
    }, 200);
}
