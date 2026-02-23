/**
 * Módulo do Dock Lateral - Alysson_OS
 * Integrado com Lucide Icons e Simulação Humana
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
            // Chama a simulação de digitação
            simulateTyping(`/${item.name}`);
        };

        dockContainer.appendChild(iconBtn);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Simula a digitação humana no input do terminal
 */
async function simulateTyping(command) {
    // Busca o input onde o usuário digita (ajuste o ID se necessário)
    const input = document.getElementById('terminal-input');
    
    if (!input) {
        console.warn("Input do terminal não encontrado.");
        return;
    }

    // Limpa o input e foca para iniciar a "digitação"
    input.value = ''; 
    input.focus();

    // Loop de digitação caractere por caractere
    for (let i = 0; i < command.length; i++) {
        input.value += command[i];
        
        // Dispara o evento de input para que o terminal detecte a mudança visual/estado
        input.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Velocidade variável para parecer mais humano (entre 30ms e 70ms)
        const delay = Math.floor(Math.random() * (70 - 30 + 1) + 30);
        await new Promise(r => setTimeout(r, delay)); 
    }

    // Pausa breve para simular a reação de apertar o Enter
    setTimeout(() => {
        // Cria o evento de teclado para o Enter
        const enterEvent = new KeyboardEvent('keydown', { 
            key: 'Enter', 
            code: 'Enter', 
            keyCode: 13, 
            which: 13,
            bubbles: true 
        });
        
        input.dispatchEvent(enterEvent);
        
        // Limpa o input após o comando ser "enviado" (opcional, dependendo do seu terminal.js)
        // input.value = ''; 
    }, 150);
}
