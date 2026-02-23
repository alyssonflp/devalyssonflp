import { initInterface3D } from './interface_3d.js';
import { initSystemInfo } from './info_sistema.js';

/**
 * Função principal de inicialização do sistema.
 * É exposta no objeto window para ser chamada pelo intro.js
 */
function startOS() {
    console.log("🚀 Iniciando Alysson_OS...");
    
    // Inicializa a rotação e perspectiva do monitor
    initInterface3D();
    
    // Inicializa a captura de IP, Localização e Browser
    initSystemInfo();
}

// Expõe a função globalmente para que scripts externos (como intro.js) a vejam
window.startOS = startOS;

/**
 * Verificação de contingência:
 * Caso o sistema já esteja com a tela de login oculta (refresh de página),
 * ele inicia os processos automaticamente.
 */
document.addEventListener("DOMContentLoaded", () => {
    const loginScreen = document.getElementById("login-screen");
    
    // Verifica se a tela de login já está oculta
    const isHidden = loginScreen && (
        loginScreen.classList.contains("hidden") || 
        window.getComputedStyle(loginScreen).display === "none"
    );

    if (isHidden) {
        startOS();
    }
});
