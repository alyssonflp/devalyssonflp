/**
 * Módulo do Dock (Painel de Hardware) - Alysson_OS
 */
import { toggleHologram } from './hologram-engine.js';

export function initDock() {
    const dockContainer = document.getElementById('terminal-dock');
    if (!dockContainer) return;

    // Banco de dados de ícones - Fácil de escalar
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
        // Usamos data-tooltip para o CSS unificado
        iconBtn.setAttribute('data-tooltip', item.label); 
        iconBtn.innerHTML = `<i data-lucide="${item.lucide}"></i>`;
        
        // Impede foco indesejado no clique
        iconBtn.onmousedown = (e) => e.preventDefault();

        iconBtn.onclick = (e) => {
            e.stopPropagation();
            
            const input = document.getElementById('terminal-input');
            const isTouch = window.matchMedia("(pointer: coarse)").matches;

            if (isTouch && input) input.readOnly = true;

            // Feedback visual de clique
            iconBtn.classList.add('is-active');
            
            // Inicia simulação de digitação
            simulateTyping(`/${item.name}`, iconBtn, () => {
                iconBtn.classList.remove('is-typing', 'is-active');
                if (isTouch && input) input.readOnly = false;
                
                // Abre o holograma correspondente após a digitação
                const monitor = document.getElementById('desktop-3d');
                const rotationY = monitor ? parseFloat(monitor.dataset.rotationY) || 0 : 0;
                toggleHologram(item.name, rotationY);
            });
        };

        dockContainer.appendChild(iconBtn);
    });

    if (window.lucide) window.lucide.createIcons();
}

async function simulateTyping(command, iconBtn, onFinish) {
    const input = document.getElementById('terminal-input');
    if (!input) return onFinish?.();

    input.value = '';
    iconBtn.classList.add('is-typing');

    for (const char of command) {
        input.value += char;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise(r => setTimeout(r, Math.random() * 30 + 30)); 
    }

    await new Promise(r => setTimeout(r, 200));

    const enterEvent = new KeyboardEvent('keydown', { 
        key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true 
    });
    
    input.dispatchEvent(enterEvent);
    if (onFinish) onFinish();
}
