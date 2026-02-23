// =====================================================
// Alysson OS - Core do Sistema
// =====================================================

let started = false;
window.currentRotationY = 0; 

async function safeImport(path) {
    try {
        // Cache busting para garantir carregamento da última versão do código
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

    // 1. Inicializa Interface 3D e escuta rotação
    try {
        interfaceModule?.initInterface3D?.();
        document.addEventListener('monitorRotate', (e) => {
            window.currentRotationY = e.detail.rotationY || 0;
        });
    } catch (e) { console.warn("Erro ao iniciar Interface 3D"); }

    // 2. Inicializa componentes de dados
    try {
        await infoModule?.initSystemInfo?.();
    } catch (e) { console.warn("Erro ao iniciar Info Sistema"); }

    // 3. Inicializa o Terminal (Motor principal)
    try {
        await terminalModule?.initTerminal?.();
    } catch (e) { console.warn("Erro ao iniciar Terminal"); }

    // 4. Inicializa o Dock (Construção e Ativação)
    try {
        await dockModule?.initDock?.();
        
        // Renderiza os ícones do Lucide após injetar no DOM
        if (window.lucide) {
            window.lucide.createIcons();
        }

        /**
         * ATIVAÇÃO DO DOCK
         * Delay de 1000ms para aguardar a montagem visual do terminal.
         * Aciona a animação de fade-in e o flash branco sutil.
         */
        setTimeout(() => {
            const dockEl = document.getElementById('terminal-dock');
            if (dockEl) {
                dockEl.classList.add('active');
                console.log("🎨 Dock ativado (Estética Minimalista)");
            }
        }, 500); 

    } catch (e) { console.warn("Erro ao iniciar Dock"); }

    /**
     * Trigger Global para Hologramas
     * Centraliza a projeção 3D baseada na rotação do monitor
     */
    window.triggerHologram = (content) => {
        if (hologramModule && hologramModule.toggleHologram) {
            hologramModule.toggleHologram(content, window.currentRotationY);
        } else {
            console.error("Módulo de holograma não disponível.");
        }
    };
}

// Expõe para o escopo global
window.startOS = startOS;
