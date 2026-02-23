import { initInterface3D } from './interface_3d.js';
import { initSystemInfo } from './info_sistema.js';

export function startOS() {
    console.log("🚀 Alysson_OS Ativado.");
    if (typeof initInterface3D === 'function') initInterface3D();
    if (typeof initSystemInfo === 'function') initSystemInfo();
}

// Vincula ao window para que scripts não-módulos (intro.js) possam ver
window.startOS = startOS;

// Caso o usuário dê refresh e já esteja no desktop
window.addEventListener('load', () => {
    const desktop = document.getElementById('desktop-3d');
    if (desktop && !desktop.classList.contains('hidden')) {
        startOS();
    }
});
