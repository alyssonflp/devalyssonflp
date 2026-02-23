import { initInterface3D } from './interface_3d.js';
import { initSystemInfo } from './info_sistema.js';

// 1. Definimos a função
function startOS() {
    console.log("🚀 Iniciando Alysson_OS...");
    initInterface3D();
    initSystemInfo();
}

// 2. Vinculamos ao window IMEDIATAMENTE
// Isso garante que o intro.js consiga enxergar a função globalmente
window.startOS = startOS;

// 3. Verificação de segurança para carregamento direto
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    checkAndStart();
} else {
    document.addEventListener("DOMContentLoaded", checkAndStart);
}

function checkAndStart() {
    const login = document.getElementById("login-screen");
    // Se a tela de login já estiver oculta, disparas o sistema
    if (login && (login.classList.contains("hidden") || window.getComputedStyle(login).display === "none")) {
        startOS();
    }
}
