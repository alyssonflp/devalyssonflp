// =====================================================
// Alysson OS - Núcleo principal do sistema
// Responsável por iniciar e conectar todos os módulos
// =====================================================

let started = false;

// Guarda rotação atual do monitor 3D
window.currentRotationY = 0;

/**
 * Import seguro sem cache busting
 * GitHub Pages pode falhar com query string
 */
async function safeImport(path) {
    try {
        return await import(path);
    } catch (error) {
        console.warn("⚠️ Falha ao carregar módulo:", path, error);
        return null;
    }
}

/**
 * Inicializa o sistema inteiro
 */
export async function startOS() {
    if (started) return;
    started = true;

    console.log("🚀 Alysson OS iniciado");

    const interfaceModule = await safeImport("./interface_3d.js");
    const infoModule = await safeImport("./info_sistema.js");
    const terminalModule = await safeImport("./terminal.js");
    const dockModule = await safeImport("./dock.js");
    const hologramModule = await safeImport("./hologram.js");

    // =========================
    // 1️⃣ Interface 3D
    // =========================
    try {
        interfaceModule?.initInterface3D?.();

        document.addEventListener('monitorRotate', (e) => {
            window.currentRotationY = e.detail.rotationY || 0;
        });

    } catch (e) {
        console.warn("⚠️ Erro ao iniciar Interface 3D", e);
    }

    // =========================
    // 2️⃣ Informações do sistema
    // =========================
    try {
        await infoModule?.initSystemInfo?.();
    } catch (e) {
        console.warn("⚠️ Erro ao iniciar Info Sistema", e);
    }

    // =========================
    // 3️⃣ Terminal
    // =========================
    try {
        await terminalModule?.initTerminal?.();
    } catch (e) {
        console.warn("⚠️ Erro ao iniciar Terminal", e);
    }

    // =========================
    // 4️⃣ Dock
    // =========================
    try {
        dockModule?.initDock?.();

        // Renderiza ícones do Lucide
        if (window.lucide) {
            window.lucide.createIcons();
        }

        setTimeout(() => {
            const dockEl = document.getElementById('terminal-dock');
            if (dockEl) {
                dockEl.classList.add('active');
                console.log("🎨 Dock ativado com sucesso");
            }
        }, 500);

    } catch (e) {
        console.warn("⚠️ Erro ao iniciar Dock", e);
    }

    // =========================
    // Trigger global do holograma
    // =========================
    window.triggerHologram = (content) => {
        if (hologramModule?.toggleHologram) {
            hologramModule.toggleHologram(content, window.currentRotationY);
        } else {
            console.error("❌ Módulo de holograma não disponível.");
        }
    };
}

// Expondo no escopo global
window.startOS = startOS;
