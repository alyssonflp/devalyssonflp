/**
 * Módulo do Dock Lateral - Alysson_OS
 */

export function initDock() {
    let dockContainer = document.getElementById('terminal-dock');
    if (!dockContainer) return;

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
            // Passamos o comando com a "/" pois seu terminal usa esse prefixo
            simulateTyping(`/${item.name}`);
        };

        dockContainer.appendChild(iconBtn);
    });

    if (window.lucide) window.lucide.createIcons();
}

/**
 * Simula a digitação e execução do comando
 */
async function simulateTyping(command) {
    const input = document.getElementById('terminal-input');
    if (!input) return;

    // 1. Limpa o prompt atual para receber o novo comando do dock
    input.value = '';
    input.focus();

    // 2. Efeito de digitação humana
    for (let i = 0; i < command.length; i++) {
        input.value += command[i];
        
        // Dispara o evento de input para que o placeholder suma/mude
        input.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Velocidade da "digitação"
        await new Promise(r => setTimeout(r, 40)); 
    }

    // 3. Pequeno delay antes do "Enter" para o usuário ver o que foi digitado
    setTimeout(() => {
        // Dispara o Enter para acionar o seu listener no terminal.js
        const enterEvent = new KeyboardEvent('keydown', { 
            key: 'Enter', 
            code: 'Enter', 
            keyCode: 13, 
            bubbles: true 
        });
        input.dispatchEvent(enterEvent);
        
        // Adicionamos um efeito sutil de "comando aceito"
        console.log(`[SYS] Executing: ${command}`);
    }, 150);
}
