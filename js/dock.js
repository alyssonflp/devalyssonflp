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
        
        iconBtn.onmousedown = (e) => {
            // Evita que o input perca o foco ao clicar no botão
            e.preventDefault();
        };

        iconBtn.onclick = (e) => {
            e.stopPropagation();
            simulateTyping(`/${item.name}`);
        };

        dockContainer.appendChild(iconBtn);
    });

    if (window.lucide) window.lucide.createIcons();
}

/**
 * Simula a digitação e execução do comando no prompt ativo
 */
async function simulateTyping(command) {
    const input = document.getElementById('terminal-input');
    
    if (!input) {
        console.warn("Input do terminal não encontrado!");
        return;
    }

    // 1. Prepara o campo
    input.focus();
    input.value = ''; // Limpa para garantir que comece do início da linha

    // 2. Efeito de digitação humana
    for (let i = 0; i < command.length; i++) {
        input.value += command[i];
        
        // Importante: Disparar evento de input para que o terminal reconheça a mudança
        input.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Delay aleatório leve para parecer real (entre 30ms e 60ms)
        await new Promise(r => setTimeout(r, Math.random() * 30 + 30)); 
    }

    // 3. Pequeno delay para o usuário ler o que foi 'escrito' no prompt
    await new Promise(r => setTimeout(r, 200));

    // 4. Dispara o Enter de forma que o listener do terminal.js capture
    const enterEvent = new KeyboardEvent('keydown', { 
        key: 'Enter', 
        code: 'Enter', 
        keyCode: 13, 
        which: 13,
        bubbles: true,
        cancelable: true
    });
    
    input.dispatchEvent(enterEvent);
    
    // Se por algum motivo o terminal.js não limpar o input após o Enter, limpamos aqui
    // Mas o ideal é que o handleCommand do seu terminal.js cuide disso.
}
