import { initInterface3D } from './interface_3d.js';
import { initSystemInfo } from './info_sistema.js';

console.log("🛠️ App.js carregado. Aguardando comando startOS...");

export function startOS() {
    console.log("🚀 Comando recebido: Iniciando Alysson_OS...");
    
    // Inicializa a interface 3D
    if (typeof initInterface3D === 'function') {
        initInterface3D();
    } else {
        console.warn("⚠️ initInterface3D não encontrada.");
    }
    
    // Inicializa as informações do sistema (IP/Localização)
    if (typeof initSystemInfo === 'function') {
        initSystemInfo();
    } else {
        console.warn("⚠️ initSystemInfo não encontrada.");
    }
}

// Expõe para o window para que o intro.js possa chamar mesmo sendo um módulo
window.startOS = startOS;

// Verificação de segurança para recarregamento (F5)
document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login-screen");
    if (login && (login.classList.contains("hidden") || login.style.display === "none")) {
        startOS();
    }
});
