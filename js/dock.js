/**
 * Módulo do Dock Minimalista - Alysson_OS
 */

export function initDock() {
    const monitor = document.getElementById('root-terminal');
    if (!monitor) return;

    const dock = document.createElement('div');
    dock.id = 'terminal-dock';
    
    // Ícones solicitados
    const icons = [
        { name: 'about', icon: '👤', label: 'About' },
        { name: 'skills', icon: '⚛', label: 'Skills' },
        { name: 'experience', icon: '💼', label: 'Experience' },
        { name: 'projects', icon: '🚀', label: 'Projects' },
        { name: 'ia', icon: '🧠', label: 'I.A' }
    ];

    icons.forEach(item => {
        const iconBtn = document.createElement('div');
        iconBtn.className = 'dock-item';
        iconBtn.setAttribute('data-label', item.label);
        iconBtn.innerHTML = `<span>${item.icon}</span>`;
        
        iconBtn.onclick = () => simulateTypingAndExecute(`/${item.name}`);

        dock.appendChild(iconBtn);
    });

    monitor.appendChild(dock);
}

/**
 * Simula a digitação no input do terminal antes de executar
 */
async function simulateTypingAndExecute(fullCommand) {
    const input = document.getElementById('terminal-input');
    if (!input) return;

    input.value = ''; // Limpa antes de começar
    input.focus();

    // Efeito de digitação no input
    for (let i = 0; i < fullCommand.length; i++) {
        input.value += fullCommand[i];
        await new Promise(r => setTimeout(r, 50)); // Velocidade da digitação no input
    }

    // Pequena pausa após terminar de digitar e antes de dar o Enter
    await new Promise(r => setTimeout(r, 200));

    // Dispara o evento de Enter para o terminal processar
    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    input.dispatchEvent(event);
}
