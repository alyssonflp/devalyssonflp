import { toggleHologram } from './hologram-engine.js';

export function initDock() {
    const dockContainer = document.getElementById('terminal-dock');
    if (!dockContainer) return;

    const icons = [
        { name: 'about', lucide: 'user-circle', label: 'About' },
        { name: 'skills', lucide: 'code-2', label: 'Skills' },
        { name: 'experience', lucide: 'binary', label: 'Experience' },
        { name: 'projects', lucide: 'layout-template', label: 'Projects' },
        { name: 'ia', lucide: 'bot', label: 'I.A' }
    ];

    dockContainer.innerHTML = '';

    icons.forEach(item => {
        const iconBtn = document.createElement('div');
        iconBtn.className = 'dock-item';
        iconBtn.setAttribute('data-label', item.label);
        iconBtn.innerHTML = `<i data-lucide="${item.lucide}"></i>`;
        
        iconBtn.onclick = (e) => {
            e.stopPropagation();
            
            // Ativa o estado visual
            document.querySelectorAll('.dock-item').forEach(el => el.classList.remove('is-active'));
            iconBtn.classList.add('is-active');

            // Simula digitação e abre o holograma
            simulateTyping(`/${item.name}`, iconBtn, () => {
                const monitor = document.getElementById('desktop-3d');
                const rotationY = monitor ? parseFloat(monitor.dataset.rotationY) || 0 : 0;
                
                toggleHologram(item.name, rotationY);
                
                // Feedback: mantém vermelho por 1s após abrir
                setTimeout(() => iconBtn.classList.remove('is-active'), 1000);
            });
        };

        dockContainer.appendChild(iconBtn);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

async function simulateTyping(command, iconBtn, onFinish) {
    const input = document.getElementById('terminal-input');
    if (!input) return onFinish?.();

    input.value = '';
    iconBtn.classList.add('is-typing');

    for (const char of command) {
        input.value += char;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise(r => setTimeout(r, 40)); 
    }

    await new Promise(r => setTimeout(r, 200));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    
    iconBtn.classList.remove('is-typing');
    if (onFinish) onFinish();
}
