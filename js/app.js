import { initInterface3D } from './interface_3d.js';
import { initSystemInfo } from './info_sistema.js';

// Função que será chamada pelo intro.js quando o carregamento acabar
window.startOS = () => {
    initInterface3D();
    initSystemInfo();
    console.log("🚀 Sistemas Alysson_OS inicializados.");
};

// Caso você não queira depender do intro.js para testar:
document.addEventListener("DOMContentLoaded", () => {
    // Se não houver tela de login, inicia direto
    if (document.getElementById("login-screen").classList.contains("hidden")) {
        window.startOS();
    }
});
