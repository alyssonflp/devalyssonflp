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
        // Importante: usamos data-label para o CSS exibir o título
        iconBtn.setAttribute('data-label', item.label);
        iconBtn.innerHTML = `<i data-lucide="${item.lucide}"></i>`;
        
        iconBtn.onclick = (e) => {
            e.stopPropagation();
            
            // Remove estado ativo de outros
            document.querySelectorAll('.dock-item').forEach(el => el.classList.remove('is-active'));
            
            // Ativa o estado vermelho e "para frente"
            iconBtn.classList.add('is-active');

            simulateTyping(`/${item.name}`, iconBtn, () => {
                // Abre o holograma após digitar
                const monitor = document.getElementById('desktop-3d');
                const rotationY = monitor ? parseFloat(monitor.dataset.rotationY) || 0 : 0;
                toggleHologram(item.name, rotationY);

                // Opcional: mantém o brilho vermelho por um tempo
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
        await new Promise(r => setTimeout(r, 50)); 
    }

    await new Promise(r => setTimeout(r, 200));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    
    iconBtn.classList.remove('is-typing');
    if (onFinish) onFinish();
}
