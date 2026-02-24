// js/core/state.js

// 🧠 Estado central da aplicação
// Aqui guardamos tudo que pode ser compartilhado entre módulos
// sem precisar que um importe o outro diretamente.

const state = {
    currentRotationY: 0,
    activeSection: null
};

// 📌 Atualiza a rotação do monitor
export function setRotationY(value) {
    state.currentRotationY = value;
}

// 📌 Retorna rotação atual
export function getRotationY() {
    return state.currentRotationY;
}

// 📌 Define seção ativa
export function setActiveSection(section) {
    state.activeSection = section;
}

// 📌 Retorna seção ativa
export function getActiveSection() {
    return state.activeSection;
}
