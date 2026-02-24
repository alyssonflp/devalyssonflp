/**
 * Dock lateral do Alysson OS
 * Responsável por criar os ícones e conectar com o holograma
 */

import { toggleHologram } from './hologram.js';

export function initDock() {
    const dockContainer = document.getElementById('terminal-dock');
    if (!dockContainer) return;

    // Lista de atalhos do sistema
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

        // 🔥 CORREÇÃO AQUI
        iconBtn.setAttribute('data-label', item.label);

        // Inserindo o ícone Lucide
        iconBtn.innerHTML = `<i data-lucide="${item.lucide}"></i>`;

        // Evita seleção estranha no mobile
        iconBtn.onmousedown = (e) => e.preventDefault();

        iconBtn.onclick = (e) => {
            e.stopPropagation();

            iconBtn.classList.add('is-active');

            simulateTyping(`/${item.name}`, iconBtn, () => {
                iconBtn.classList.remove('is-typing', 'is-active');

                const monitor = document.getElementById('desktop-3d');
                const rotationY = monitor ? parseFloat(monitor.dataset.rotationY) || 0 : 0;

                toggleHologram(item.name, rotationY);
            });
        };

        dockContainer.appendChild(iconBtn);
    });

    // 🔥 MUITO IMPORTANTE
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

async function simulateTyping(command, iconBtn, onFinish) {
    const input = document.getElementById('terminal-input');
    if (!input) {
        if (onFinish) onFinish();
        return;
    }

    input.value = '';
    iconBtn.classList.add('is-typing');

    for (const char of command) {
        input.value += char;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise(r => setTimeout(r, 400 / command.length));
    }

    await new Promise(r => setTimeout(r, 200));

    input.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true
    }));

    if (onFinish) onFinish();
}
