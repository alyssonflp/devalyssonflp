// =====================================================
// 🎛 axiomOS — Controller Global
// =====================================================
//
// Aqui ficam funções utilitárias para abrir seções,
// manipular hologramas e interações gerais do sistema.
//

import { toggleHologram } from '../modules/hologram.js';

export function openSection(type) {
    if (!type) return;

    // Se a função global de holograma estiver pronta, usamos
    if (window.triggerHologram) {
        window.triggerHologram({
            type,
            title: type.toUpperCase(),
            body: `Conteúdo dinâmico da seção ${type}`
        });
    } else {
        console.warn("triggerHologram não disponível");
    }
}
