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

    // 🔎 TESTE VISUAL
    document.body.style.background = "red";

    if (started) return;
    started = true;

    const interfaceModule = await safeImport("./interface_3d.js");
    const infoModule = await safeImport("./info_sistema.js");

    interfaceModule?.initInterface3D?.();
    await infoModule?.initSystemInfo?.();
}

window.startOS = startOS;
