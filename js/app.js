// =====================================================
// Alysson OS - Core do Sistema
// =====================================================

let started = false;

async function safeImport(path) {
    try {
        return await import(path);
    } catch (error) {
        console.warn("Falha ao carregar módulo:", path);
        return null;
    }
}

export async function startOS() {
    if (started) return; 
    started = true;

    console.log("🚀 Alysson OS iniciado");

    const interfaceModule = await safeImport("./interface_3d.js");
    const infoModule = await safeImport("./info_sistema.js");
    const terminalModule = await safeImport("./terminal.js"); // Novo módulo

    // Inicializa Interface 3D
    try {
        interfaceModule?.initInterface3D?.();
    } catch (e) { console.warn("Erro ao iniciar Interface 3D"); }

    // Inicializa Info Sistema
    try {
        await infoModule?.initSystemInfo?.();
    } catch (e) { console.warn("Erro ao iniciar Info Sistema"); }

    // Inicializa o Terminal (Hello World -> Prompt)
    try {
        await terminalModule?.initTerminal?.();
    } catch (e) { console.warn("Erro ao iniciar Terminal"); }
}

window.startOS = startOS;
