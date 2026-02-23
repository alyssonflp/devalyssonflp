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
            
            // Ativa ocultação do título no CSS
            iconBtn.classList.add('is-typing');
            
            simulateTyping(`/${item.name}`, () => {
                // Finaliza o estado e permite que o título volte no hover
                iconBtn.classList.remove('is-typing');
            });
        };

        dockContainer.appendChild(iconBtn);
    });

    if (window.lucide) window.lucide.createIcons();
}

/**
 * Simula a digitação enviando caracteres para o terminal-input
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
        await new Promise(r => setTimeout(r, 40)); 
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
