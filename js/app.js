import { initInterface3D } from './interface_3d.js';
import { initSystemInfo } from './info_sistema.js';

function startOS() {
    console.log("🚀 Iniciando Alysson_OS...");
    initInterface3D();
    initSystemInfo();
}

// Expõe a função para o mundo global (essencial para o intro.js ver)
window.startOS = startOS;

// Caso o usuário recarregue a página já logado
document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login-screen");
    if (login && (login.classList.contains("hidden") || login.style.display === "none")) {
        startOS();
    }
});
