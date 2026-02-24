// =====================================================
// axiomOS - App Entry Point
// =====================================================

import { initInterface3D } from './modules/interface_3d.js';
import { initDock } from './modules/dock.js';
import { initTerminal } from './modules/terminal.js';
import { initSystemInfo } from './modules/system-info.js';
import './intro/boot.js';  // Boot separado
import { state } from './core/state.js';
import { toggleHologram } from './modules/hologram.js';

export async function startOS() {
  console.log("🚀 axiomOS iniciando...");

  try { initInterface3D(); } catch(e){ console.warn(e); }
  try { initSystemInfo(); } catch(e){ console.warn(e); }
  try { await initTerminal(); } catch(e){ console.warn(e); }
  try { await initDock(); } catch(e){ console.warn(e); }

  // Exposição global de triggerHologram
  window.triggerHologram = toggleHologram;
}

window.startOS = startOS;
