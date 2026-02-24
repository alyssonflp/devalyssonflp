// js/core/controller.js

// 🎛 Controller central
// Aqui decidimos o que acontece quando algo é clicado.
// Nenhum módulo conversa direto com outro.

import { toggleHologram } from '../modules/hologram.js';
import { setActiveSection, getRotationY } from './state.js';

// 🚀 Abre uma seção do sistema
export function openSection(sectionName) {

    // Atualiza estado
    setActiveSection(sectionName);

    // Pega rotação atual do monitor
    const rotation = getRotationY();

    // Aciona holograma
    toggleHologram(sectionName, rotation);
}
