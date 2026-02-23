// =====================================================
// Alysson OS - Core
// Responsável por iniciar Interface 3D e Info Sistema
// =====================================================

let started = false;

/**
 * Importação segura para GitHub Pages
 */
async function safeImport(path) {
    try {
        return await import(path);
    } catch (error) {
        console.warn("Falha ao carregar:", path);
        return null;
    }
}

/**
 * Função principal chamada após boot
 */
export async function startOS() {

    if (started) return;
    started = true;

    console.log("🚀 Sistema iniciado");

    const interfaceModule = await safeImport("./interface_3d.js");
    const infoModule = await safeImport("./info_sistema.js");

    try {
        interfaceModule?.initInterface3D?.();
    } catch (e) {
        console.warn("Erro Interface 3D");
    }

    try {
        await infoModule?.initSystemInfo?.();
    } catch (e) {
        console.warn("Erro Info Sistema");
    }
}

window.startOS = startOS;
