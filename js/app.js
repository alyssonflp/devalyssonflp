import { initInterface3D } from './interface_3d.js';
import { initSystemInfo } from './info_sistema.js';

export function startOS() {
    console.log("🚀 Alysson_OS Ativado.");
    if (typeof initInterface3D === 'function') initInterface3D();
    if (typeof initSystemInfo === 'function') initSystemInfo();
}

// Vincula ao window para que o intro.js (script comum) enxergue o módulo
window.startOS = startOS;
