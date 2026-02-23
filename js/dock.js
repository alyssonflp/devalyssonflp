/**
 * Módulo do Dock Lateral - Alysson_OS
 */

export function initDock() {
    const monitor = document.getElementById('root-terminal');
    if (!monitor) {
        setTimeout(initDock, 500);
        return;
    }

    if (document.getElementById('terminal-dock')) return;

    const dock = document.createElement('div');
    dock.id = 'terminal-dock';
    
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
        
        iconBtn.onclick = () => simulateTyping(`/${item.name}`);

        dock.appendChild(iconBtn);
    });

    monitor.appendChild(dock);
}

async function simulateTyping(command) {
    const input = document.getElementById('terminal-input');
    if (!input) return;

    input.value = ''; 
    input.focus();

    for (let i = 0; i < command.length; i++) {
        input.value += command[i];
        await new Promise(r => setTimeout(r, 50)); // Digitação rápida
    }

    setTimeout(() => {
        const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
        input.dispatchEvent(event);
    }, 150);
}
