// =====================================================
// axiomOS - Hologram
// =====================================================
//
// Cria hologramas direcionais 3D no desktop.
//

import { state } from '../core/state.js';

const ICONS = {
  about: '<circle cx="12" cy="12" r="10"/>',
  skills: '<path d="M4 6h16v12H4z"/>',
  projects: '<path d="M3 3h18v18H3z"/>',
  contact: '<path d="M2 7h20v10H2z"/>'
};

export function toggleHologram(content, rotationY=state.currentRotationY) {
  const container = document.getElementById('desktop-3d');
  if(!container) return;

  const existing = document.querySelector('.hologram-card');
  if(existing) existing.remove();

  const holo = document.createElement('div');
  holo.className = 'hologram-card';
  const direction = rotationY>0 ? 'pop-left':'pop-right';

  holo.dataset.type = content.type;
  holo.classList.add(direction);
  holo.innerHTML = `
    <div class="scanline"></div>
    <div class="hologram-visual-header">
      <div class="hologram-close">×</div>
      <svg viewBox="0 0 24 24" class="hologram-main-icon">${ICONS[content.type]}</svg>
      <div class="hologram-glitch-title">${content.title}</div>
    </div>
    <div class="hologram-content-area">${content.body}</div>
    <div class="hologram-ui-footer">
      <span class="scan-status">SYSTEM_DECODING...</span>
      <div class="hologram-bar"></div>
    </div>
    <div class="projector-beam"></div>
  `;
  container.appendChild(holo);

  requestAnimationFrame(()=> holo.classList.add('hologram-active'));
  state.hologramOpen = true;

  holo.querySelector('.hologram-close').onclick = e => { holo.remove(); state.hologramOpen=false; };
}
