// =====================================================
// 🚀 ALYSSON OS - APP ENTRY POINT
// =====================================================
//
// Este é o ponto central da aplicação.
// Aqui conectamos todos os módulos do sistema.
// Nenhum módulo conversa diretamente entre si.
// Tudo passa por aqui.
//
// Estrutura esperada:
//
// js/
// ├── app.js
// ├── core/
// ├── modules/
// └── intro/
//
// =====================================================


// ===============================
// 📦 Imports de Módulos
// ===============================

import { init3D } from './modules/interface_3d.js';
import { initDock } from './modules/dock.js';
import { initTerminal } from './modules/terminal.js';
import { initSystemInfo } from './modules/info_sistema.js';
import { initBoot } from './intro/boot.js';


// ===============================
// 🧠 Inicialização Principal do Sistema
// ===============================
//
// Essa função é chamada APENAS depois
// que o boot termina.
//

window.startOS = function () {

    console.log("🚀 Iniciando Alysson OS...");

    try {

        // 🖥 Inicializa rotação 3D do monitor
        init3D();

        // 🚀 Inicializa dock inferior
        initDock();

        // 💻 Inicializa terminal principal
        initTerminal();

        // 🌍 Busca informações da API
        initSystemInfo();

        console.log("✅ Sistema iniciado com sucesso.");

    } catch (error) {

        console.error("❌ Erro ao iniciar sistema:", error);

    }
};


// ===============================
// 🔐 Inicializa Boot
// ===============================
//
// Boot é separado do sistema principal.
// Ele apenas libera o startOS quando terminar.
//

try {

    initBoot();

} catch (error) {

    console.error("❌ Erro ao iniciar boot:", error);

}
