// app.js - Versão Blindada Alysson OS

let interface3DLoaded = false;
let systemInfoLoaded = false;

/**
 * Carrega módulo dinamicamente com proteção contra erro.
 */
async function safeImport(path) {
    try {
        const module = await import(path);
        console.log(`✅ Módulo carregado: ${path}`);
        return module;
    } catch (error) {
        console.warn(`⚠️ Falha ao carregar módulo: ${path}`);
        console.warn(error);
        return null;
    }
}

/**
 * Inicializa sistema principal
 */
export async function startOS() {
    console.log("🚀 Iniciando Alysson_OS (Modo Blindado)...");

    // Evita iniciar duas vezes
    if (window.__alyssonStarted) {
        console.log("⚠️ Sistema já iniciado.");
        return;
    }
    window.__alyssonStarted = true;

    // Carregamento dinâmico protegido
    const interfaceModule = await safeImport('./interface_3d.js');
    const systemModule = await safeImport('./info_sistema.js');

    // Inicializa Interface 3D se existir
    if (interfaceModule && typeof interfaceModule.initInterface3D === 'function') {
        try {
            interfaceModule.initInterface3D();
            interface3DLoaded = true;
        } catch (err) {
            console.warn("⚠️ Erro ao iniciar interface 3D:", err);
        }
    }

    // Inicializa sistema de IP e informações
    if (systemModule && typeof systemModule.initSystemInfo === 'function') {
        try {
            await systemModule.initSystemInfo();
            systemInfoLoaded = true;
        } catch (err) {
            console.warn("⚠️ Erro ao iniciar System Info:", err);
        }
    }

    console.log("🟢 Sistema iniciado.");
    console.log("Interface 3D:", interface3DLoaded ? "OK" : "FALHOU");
    console.log("System Info:", systemInfoLoaded ? "OK" : "FALHOU");
}

// Torna global imediatamente (evita problema com intro.js)
window.startOS = startOS;

/**
 * Auto start se login já estiver oculto (F5 protection)
 */
function autoStartCheck() {
    const login = document.getElementById("login-screen");
    if (!login) return;

    const isHidden =
        login.classList.contains("hidden") ||
        window.getComputedStyle(login).display === "none" ||
        login.style.opacity === "0";

    if (isHidden) {
        startOS();
    }
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    autoStartCheck();
} else {
    document.addEventListener("DOMContentLoaded", autoStartCheck);
    }
