// =====================================================
// Alysson OS - Core do Sistema
// =====================================================

let started = false;
window.currentRotationY = 0; 

async function safeImport(path) {
    try {
        return await import(`${path}?t=${Date.now()}`);
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
    const terminalModule = await safeImport("./terminal.js");
    const dockModule = await safeImport("./dock.js");
    const hologramModule = await safeImport("./hologram.js");

    // Inicializa Interface 3D
    try {
        interfaceModule?.initInterface3D?.();
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

    // Inicializa o Dock (Criação do DOM)
    try {
        await dockModule?.initDock?.();
        
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // AGUARDA O CARREGAMENTO DO TERMINAL PARA EXIBIR O DOCK
        // O delay de 3000ms garante que a intro do terminal acabou
        setTimeout(() => {
            const dockEl = document.getElementById('terminal-dock');
            if (dockEl) {
                dockEl.classList.add('active');
                console.log("🎨 Dock ativado e renderizado");
            }
        }, 3000); 

    } catch (e) { console.warn("Erro ao iniciar Dock"); }

    /**
     * Trigger Global para Hologramas
     */
    window.triggerHologram = (content) => {
        if (hologramModule && hologramModule.toggleHologram) {
            hologramModule.toggleHologram(content, window.currentRotationY);
        } else {
            console.error("Módulo de holograma não disponível.");
        }
    };
}

window.startOS = startOS;
