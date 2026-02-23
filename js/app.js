// =====================================================
// Alysson OS - Core do Sistema
// =====================================================

let started = false;
// Definimos no window para que o Terminal e o Holograma acessem em tempo real
window.currentRotationY = 0; 

async function safeImport(path) {
    try {
        // Adicionamos um timestamp para evitar cache durante o desenvolvimento
        const modulePath = `${path}?t=${Date.now()}`;
        return await import(modulePath);
    } catch (error) {
        console.warn("Falha ao carregar módulo:", path);
        return null;
    }
}

export async function startOS() {
    if (started) return; 
    started = true;

    console.log("🚀 Alysson OS iniciado");

    // Carregamento dos módulos
    const interfaceModule = await safeImport("./interface_3d.js");
    const infoModule = await safeImport("./info_sistema.js");
    const terminalModule = await safeImport("./terminal.js");
    const dockModule = await safeImport("./dock.js");
    const hologramModule = await safeImport("./hologram.js");

    // Inicializa Interface 3D
    try {
        interfaceModule?.initInterface3D?.();
        
        // Captura a rotação vinda da interface 3D
        document.addEventListener('monitorRotate', (e) => {
            window.currentRotationY = e.detail.rotationY || 0;
        });
    } catch (e) { console.warn("Erro ao iniciar Interface 3D"); }

    // Inicializa Info Sistema
    try {
        await infoModule?.initSystemInfo?.();
    } catch (e) { console.warn("Erro ao iniciar Info Sistema"); }

    // Inicializa o Terminal
    try {
        await terminalModule?.initTerminal?.();
    } catch (e) { console.warn("Erro ao iniciar Terminal"); }

    // Inicializa o Dock
    try {
        await dockModule?.initDock?.();
        // Força o Lucide a renderizar os ícones do Dock recém-criados
        if (window.lucide) {
            window.lucide.createIcons();
        }
    } catch (e) { console.warn("Erro ao iniciar Dock"); }

    /**
     * Trigger Global para Hologramas
     * Centraliza a chamada para que qualquer parte do sistema possa projetar dados
     */
    window.triggerHologram = (content) => {
        if (hologramModule && hologramModule.toggleHologram) {
            // Passamos o conteúdo e a rotação atual para o efeito direcional
            hologramModule.toggleHologram(content, window.currentRotationY);
        } else {
            console.error("Módulo de holograma não disponível.");
        }
    };
}

// Expõe a função para o escopo global
window.startOS = startOS;
