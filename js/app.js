import { initInterface3D } from './interface_3d.js';
import { initSystemInfo } from './info_sistema.js';

/**
 * Função principal que desperta o sistema.
 * Exportamos e vinculamos ao window para que o intro.js possa chamá-la.
 */
export function startOS() {
    console.log("🚀 Iniciando Alysson_OS...");
    
    // Inicializa a rotação do monitor 3D
    if (typeof initInterface3D === 'function') {
        initInterface3D();
    }
    
    // Inicializa a coleta de IP e Informações
    if (typeof initSystemInfo === 'function') {
        initSystemInfo();
    }
}

// Vincula ao window imediatamente para o intro.js não encontrar a função como 'undefined'
window.startOS = startOS;

/**
 * Verificação de Segurança: 
 * Se o usuário der F5 e a tela de login já estiver escondida, 
 * o sistema inicia automaticamente.
 */
const checkAndStart = () => {
    const login = document.getElementById("login-screen");
    const isHidden = login && (
        login.classList.contains("hidden") || 
        window.getComputedStyle(login).display === "none"
    );

    if (isHidden) {
        startOS();
    }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    checkAndStart();
} else {
    document.addEventListener("DOMContentLoaded", checkAndStart);
}
