// =====================================================
// 🧠 axiomOS — Estado Global
// =====================================================
//
// Este arquivo guarda o estado central do sistema.
// Todas as decisões de UI e dados dinâmicos devem
// referenciar este objeto para manter consistência.
//

export const OSState = {
    isStarted: false,         // Sistema já iniciou?
    currentRotationY: 0,      // Rotação Y do monitor 3D
    currentRotationX: 0,      // Rotação X do monitor 3D
    activeHologram: null      // Holograma ativo
};
