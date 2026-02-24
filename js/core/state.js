// =====================================================
// axiomOS - State Global
// =====================================================
//
// Aqui guardamos estados compartilhados do sistema.
// Todos os módulos podem importar e atualizar.
// Ex.: monitor rotation, dock ativo, hologramas abertos.
//

export const state = {
  isBooting: true,
  currentRotationY: 0,
  currentRotationX: 0,
  dockActive: false,
  hologramOpen: false,
};
