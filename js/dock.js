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
            
            const input = document.getElementById('terminal-input');
            const isTouch = window.matchMedia("(pointer: coarse)").matches;

            // 1. Prepara o input para Mobile (ReadOnly temporário)
            if (isTouch && input) {
                input.readOnly = true;
            }

            // 2. Remove o foco visual do botão para limpar o hover de clique
            iconBtn.blur();
            
            // 3. Simula a digitação passando o botão como referência
            simulateTyping(`/${item.name}`, iconBtn, () => {
                // 4. Ao terminar TUDO, remove a classe de bloqueio do título
                iconBtn.classList.remove('is-typing');
                
                if (isTouch && input) {
                    input.readOnly = false;
                }
            });
        };

        dockContainer.appendChild(iconBtn);
    });

    if (window.lucide) window.lucide.createIcons();
}

/**
 * Simula a digitação com sincronia de título
 */
async function simulateTyping(command, iconBtn, onFinish) {
    const input = document.getElementById('terminal-input');
    if (!input) {
        if (onFinish) onFinish();
        return;
    }

    input.value = '';

    // --- O PONTO CHAVE: ---
    // Aplicamos a classe que esconde o título apenas quando a digitação INICIA
    iconBtn.classList.add('is-typing');

    for (let i = 0; i < command.length; i++) {
        input.value += command[i];
        input.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Delay humano de digitação
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
