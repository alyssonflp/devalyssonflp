// ======================================================
// ALYSSON OS — Dock Module
// ======================================================

// 🚀 Dock visual inferior
// Ele NÃO sabe o que é holograma.
// Ele só comunica intenção ao controller.

import { openSection } from '../core/controller.js';

export function initDock() {

    const dock = document.getElementById('terminal-dock');
    if (!dock) return;

    const items = [
        { name: "about", icon: "user" },
        { name: "projects", icon: "folder" },
        { name: "skills", icon: "cpu" },
        { name: "contact", icon: "mail" }
    ];

    // Limpa dock
    dock.innerHTML = "";

    items.forEach(item => {

        const button = document.createElement("button");
        button.classList.add("dock-item");
        button.type = "button";
        button.innerHTML = `<i data-lucide="${item.icon}"></i>`;

        // 🎯 Comunicação com controller
        button.addEventListener("click", () => {
            openSection(item.name);
        });

        dock.appendChild(button);
    });

    // Recarrega ícones Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 🔥 ATIVA O DOCK (estava faltando isso)
    dock.classList.add("active");
}
