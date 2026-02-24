// =====================================================
// axiomOS - Dock
// =====================================================
//
// Painel inferior com ícones de acesso rápido.
//

import { state } from '../core/state.js';
import { toggleHologram } from './hologram.js';

export function initDock() {
  const dock = document.getElementById("terminal-dock");
  if (!dock) return;

  const icons = [
    { name: 'about', lucide: 'user', label: 'About' },
    { name: 'skills', lucide: 'cpu', label: 'Skills' },
    { name: 'projects', lucide: 'folder', label: 'Projects' },
    { name: 'contact', lucide: 'mail', label: 'Contact' }
  ];

  dock.innerHTML = "";

  icons.forEach(item => {
    const btn = document.createElement("div");
    btn.className = "dock-item";
    btn.setAttribute("data-tooltip", item.label);
    btn.innerHTML = `<i data-lucide="${item.lucide}"></i>`;

    btn.onclick = () => {
      simulateTyping(`/${item.name}`, btn, () => toggleHologram({type:item.name, title:item.label, body:`Conteúdo ${item.label}`}));
    };

    dock.appendChild(btn);
  });

  if(window.lucide) window.lucide.createIcons();

  // Ativa animação
  setTimeout(() => { dock.classList.add('active'); state.dockActive = true; }, 500);
}

async function simulateTyping(command, btn, callback) {
  const input = document.getElementById('terminal-input');
  if(!input) return callback?.();
  input.value = '';
  btn.classList.add('is-typing');

  for(const char of command){
    input.value += char;
    input.dispatchEvent(new Event('input',{bubbles:true}));
    await new Promise(r=>setTimeout(r, 50));
  }

  input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter', bubbles:true}));
  btn.classList.remove('is-typing');
  callback?.();
      }
