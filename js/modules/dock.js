// =====================================================
// AxiomOS - Dock
// =====================================================

export function initDock() {
    const dock = document.getElementById("terminal-dock");
    if (!dock) return;

    const icons = [
        { name: 'about', lucide: 'user-circle' },
        { name: 'skills', lucide: 'code-2' },
        { name: 'experience', lucide: 'binary' },
        { name: 'projects', lucide: 'layout-template' },
        { name: 'ia', lucide: 'bot' }
    ];

    dock.innerHTML = "";

    icons.forEach(item => {
        const btn = document.createElement("div");
        btn.className = "dock-item";
        btn.innerHTML = `<i data-lucide="${item.lucide}"></i>`;

        btn.onclick = () => {
            const input = document.getElementById("terminal-input");
            if (!input) return;

            input.value = `/${item.name}`;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
        };

        dock.appendChild(btn);
    });

    if (window.lucide) window.lucide.createIcons();
}
