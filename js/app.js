import { initInterface3D } from './interface_3d.js';
import { initSystemInfo } from './info_sistema.js';

// Variável de controle para não iniciar o sistema duas vezes
let isStarted = false;

/**
 * Função principal que desperta o sistema.
 * Agora com uma trava de segurança para evitar duplicidade.
 */
export function startOS() {
    if (isStarted) return; // Se já iniciou, não faz nada
    
    console.log("🚀 Iniciando Alysson_OS...");
    isStarted = true;

    // Inicializa a rotação do monitor 3D
    if (typeof initInterface3D === 'function') {
        initInterface3D();
    }
    
    // Inicializa a coleta de IP e Informações do rodapé
    if (typeof initSystemInfo === 'function') {
        initSystemInfo();
    }
}

// Vincula ao objeto global window para que scripts externos (como intro.js) a vejam
window.startOS = startOS;

/**
 * Verificação de Segurança (F5):
 * Se o usuário atualizar a página e a tela de login já estiver oculta,
 * o sistema detecta e inicia automaticamente.
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

// Garante que a verificação rode assim que o DOM estiver pronto
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    checkAndStart();
} else {
    document.addEventListener("DOMContentLoaded", checkAndStart);
}
