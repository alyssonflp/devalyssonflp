// =====================================================
// axiomOS - Terminal
// =====================================================

export async function initTerminal() {
  const root = document.getElementById('root-terminal');
  if(!root) return;
  root.innerHTML = '';
  createPrompt(root);
}

function createPrompt(container) {
  const oldPrompt = document.querySelector('.prompt-container:not(.terminal-history)');
  if(oldPrompt) oldPrompt.remove();

  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const helpText = isTouch ? "Digite /help" : "Digite /help para comandos";

  const prompt = document.createElement('div');
  prompt.className = "prompt-container";
  prompt.innerHTML = `
    <span class="prompt-user-white">axiomOS@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
    <div class="input-wrapper">
      <input type="text" id="terminal-input" autocomplete="off" placeholder="${helpText}" ${!isTouch?'autofocus':''}>
    </div>
  `;
  container.appendChild(prompt);

  const input = document.getElementById('terminal-input');
  if(!isTouch && input) input.focus();

  input.addEventListener('keydown', e => { if(e.key==='Enter') handleCommand(e.target.value.trim().toLowerCase(), container); });
}

async function handleCommand(cmd, container) {
  if(!cmd) return;

  const currentPrompt = document.querySelector('.prompt-container:not(.terminal-history)');
  const history = document.createElement('div');
  history.className = "prompt-container terminal-history";
  history.innerHTML = `<span class="prompt-user-white">axiomOS@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span> <span style="color:#00d4ff;margin-left:8px;">${cmd}</span>`;
  container.insertBefore(history, currentPrompt);

  document.getElementById('terminal-input').value = '';

  const contents = {
    '/about': { type:'about', title:'Sobre', body:'Bem-vindo ao axiomOS!' },
    '/skills': { type:'skills', title:'Skills', body:'Lista de habilidades...' },
    '/projects': { type:'projects', title:'Projects', body:'Projetos disponíveis...' },
    '/contact': { type:'contact', title:'Contact', body:'Contato...' }
  };

  if(cmd === '/clear') { container.innerHTML=''; createPrompt(container); return; }
  if(cmd==='/help') { container.insertBefore(Object.assign(document.createElement('div'), {className:'terminal-output log-help', innerHTML:"> COMANDOS: /about, /skills, /projects, /contact, /clear"}), currentPrompt); return; }

  if(contents[cmd] && window.triggerHologram) window.triggerHologram(contents[cmd]);
  else container.insertBefore(Object.assign(document.createElement('div'), {className:'terminal-output log-error', innerHTML:`> ERRO: ${cmd} não encontrado`}), currentPrompt);

  container.scrollTop = container.scrollHeight;
     }
