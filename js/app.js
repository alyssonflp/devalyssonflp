// js/app.js

// 🚀 Ponto de entrada da aplicação
// Aqui inicializamos tudo na ordem correta.

import { init3D } from './modules/interface_3d.js';
import { initDock } from './modules/dock.js';
import { initTerminal } from './modules/terminal.js';

document.addEventListener("DOMContentLoaded", () => {

    // Inicializa monitor 3D
    init3D();

    // Inicializa dock inferior
    initDock();

    // Inicializa terminal
    initTerminal();

});
