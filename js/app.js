// =====================================================
// 🚀 axiomOS — App Entry Point
// =====================================================
//
// Ponto central do sistema.
// Todos os módulos passam por aqui.
// Boot separado garante carregamento suave.
//

import { init3D } from './modules/interface_3d.js';
import { initDock } from './modules/dock.js';
import { initTerminal } from './modules/terminal.js';
import { initSystemInfo } from './modules/system-info.js';
import { initBoot } from './intro/boot.js';
import { OSState } from './core/state.js';

// Função principal para iniciar axiomOS
window.startOS = async function() {
    if (OSState.isStarted) return;
    OSState.isStarted = true;

    console.log("🚀 axiomOS iniciado");

    try {
        init3D();          // Rotação 3D do monitor
        initDock();        // Dock lateral
        initTerminal();    // Terminal principal
        await initSystemInfo();  // Informações de sistema
        console.log("✅ Sistema totalmente carregado");
    } catch (error) {
        console.error("❌ Erro ao iniciar axiomOS:", error);
    }
};

// Inicializa o boot automaticamente
try { initBoot(); } catch(error){ console.error("Erro ao iniciar boot:", error); }
