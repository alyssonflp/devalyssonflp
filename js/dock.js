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
        
        // Impede que o clique tire o foco do que já estava selecionado
        iconBtn.onmousedown = (e) => e.preventDefault();

        iconBtn.onclick = (e) => {
            e.stopPropagation();
            
            // 1. Aplica a classe imediatamente para o CSS esconder o título
            iconBtn.classList.add('is-typing');
            
            // 2. Remove o foco do botão para limpar o hover
            iconBtn.blur();
            
            // 3. Simula a digitação
            simulateTyping(`/${item.name}`, () => {
                // 4. Remove a classe ao fim para o título poder voltar no futuro
                iconBtn.classList.remove('is-typing');
            });
        };

        dockContainer.appendChild(iconBtn);
    });

    if (window.lucide) window.lucide.createIcons();
}

/**
 * Simula a digitação sem invocar o teclado no mobile
 */
async function simulateTyping(command, onFinish) {
    const input = document.getElementById('terminal-input');
    
    if (!input) {
        if (onFinish) onFinish();
        return;
    }

    // REMOVIDO: input.focus() para evitar que o teclado suba em dispositivos móveis
    input.value = '';

    for (let i = 0; i < command.length; i++) {
        input.value += command[i];
        
        // Dispara o evento de input para o terminal reconhecer o comando
        input.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Delay humano de digitação
        await new Promise(r => setTimeout(r, Math.random() * 30 + 30)); 
    }

    // Pequena pausa para leitura antes do "Enter"
    await new Promise(r => setTimeout(r, 200));

    // Simula o pressionamento da tecla Enter
    const enterEvent = new KeyboardEvent('keydown', { 
        key: 'Enter', 
        code: 'Enter', 
        keyCode: 13, 
        which: 13,
        bubbles: true,
        cancelable: true
    });
    
    input.dispatchEvent(enterEvent);
    
    // Callback para limpar o estado do ícone no Dock
    if (onFinish) onFinish();
}
