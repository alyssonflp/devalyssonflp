// =====================================================
// Alysson OS - Core do Sistema
// Responsável por iniciar Interface 3D e Info Sistema
// Estrutura segura para GitHub Pages
// =====================================================

let started = false;

/**
 * Importação segura de módulos.
 * Evita que o sistema quebre caso algum arquivo falhe.
 */
async function safeImport(path) {
    try {
        return await import(path);
    } catch (error) {
        console.warn("Falha ao carregar módulo:", path);
        return null;
    }
}

/**
 * Função principal chamada após o boot
 */
export async function startOS() {

    if (started) return; // evita execução duplicada
    started = true;

    console.log("🚀 Alysson OS iniciado");

    // Importa módulos dinamicamente
    const interfaceModule = await safeImport("./interface_3d.js");
    const infoModule = await safeImport("./info_sistema.js");
    const terminalModule = await safeImport("./terminal.js");

    // Inicializa Interface 3D
    try {
        interfaceModule?.initInterface3D?.();
    } catch (error) {
        console.warn("Erro ao iniciar Interface 3D");
    }

    // Inicializa Informações do Sistema
    try {
        await infoModule?.initSystemInfo?.();
    } catch (error) {
        console.warn("Erro ao iniciar Info Sistema");
    }
}

// Torna a função acessível globalmente
window.startOS = startOS;
