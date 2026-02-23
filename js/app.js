import { initInterface3D } from './interface_3d.js';
import { initSystemInfo } from './info_sistema.js';

// Inicialização centralizada
document.addEventListener("DOMContentLoaded", () => {
    // Inicia a rotação 3D do monitor
    initInterface3D();
    
    // Inicia a captura de dados do rodapé
    initSystemInfo();

    console.log("🚀 Alysson_FLP OS: Todos os sistemas carregados.");
});
