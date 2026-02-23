// =====================================================
// Núcleo do Alysson OS
// Responsável por iniciar os módulos do sistema
// =====================================================

let systemStarted = false;

/**
 * Importação segura para evitar que o sistema quebre
 * caso algum arquivo não carregue no GitHub Pages.
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
 * Função principal chamada após boot
 */
export async function startOS() {

    if (systemStarted) return;
    systemStarted = true;

    console.log("🚀 Alysson OS iniciado");

    const systemModule = await safeImport("./info_sistema.js");

    try {
        await systemModule?.initSystemInfo?.();
    } catch (e) {
        console.warn("Erro ao iniciar informações do sistema");
    }
}

// Disponibiliza globalmente para intro.js
window.startOS = startOS;
