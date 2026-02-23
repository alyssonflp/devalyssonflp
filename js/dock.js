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
        
        iconBtn.onmousedown = (e) => e.preventDefault();

        iconBtn.onclick = (e) => {
            e.stopPropagation();
            
            // 1. Aplica a classe imediatamente
            iconBtn.classList.add('is-typing');
            
            // 2. Remove o foco visual para ajudar o CSS a resetar o hover
            iconBtn.blur();
            
            simulateTyping(`/${item.name}`, () => {
                // 3. Remove a classe ao fim, liberando o hover para a próxima vez
                iconBtn.classList.remove('is-typing');
            });
        };

        dockContainer.appendChild(iconBtn);
    });

    if (window.lucide) window.lucide.createIcons();
}

/**
 * Simula a digitação
 */
async function simulateTyping(command, onFinish) {
    const input = document.getElementById('terminal-input');
    
    if (!input) {
        if (onFinish) onFinish();
        return;
    }

    input.focus();
    input.value = '';

    for (let i = 0; i < command.length; i++) {
        input.value += command[i];
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise(r => setTimeout(r, Math.random() * 30 + 30)); 
    }

    await new Promise(r => setTimeout(r, 200));

    const enterEvent = new KeyboardEvent('keydown', { 
        key: 'Enter', 
        code: 'Enter', 
        keyCode: 13, 
        which: 13,
        bubbles: true,
        cancelable: true
    });
    
    input.dispatchEvent(enterEvent);
    
    if (onFinish) onFinish();
}
