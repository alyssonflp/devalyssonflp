import { initInterface3D } from './interface_3d.js';
import { initSystemInfo } from './info_sistema.js';

window.startOS = () => {
    console.log("Iniciando componentes..."); // Debug
    initInterface3D();
    initSystemInfo();
};

// Força a inicialização caso a tela de login seja ignorada
if (document.readyState === 'complete') {
    if (document.getElementById("login-screen")?.classList.contains("hidden")) {
        window.startOS();
    }
}
