// =====================================================
// axiomOS - Terminal com ASCII neon azul
// =====================================================

export async function initTerminal() {
  const root = document.getElementById('root-terminal');
  if(!root) return;
  root.innerHTML = '';

  // Exibe a pré-mensagem
  await showPreMessage(root);

  // Depois, cria o prompt normal
  createPrompt(root);
}

// ===============================
// PRÉ-MENSAGEM COM DIGITAÇÃO RÁPIDA E NEON AZUL
// ===============================
async function showPreMessage(container) {
  const messages = [
    "  _   _      _ _        __        __         _     _  \n",
    " | | | | ___| | | ___   \\ \\      / /__  _ __| | __| | \n",
    " | |_| |/ _ \\ | |/ _ \\   \\ \\ /\\ / / _ \\| '__| |/ _` | \n",
    " |  _  |  __/ | | (_) |   \\ V  V / (_) | |  | | (_| | \n",
    " |_| |_|\\___|_|_|\\___/     \\_/\\_/ \\___/|_|  |_|\\__,_| \n",
    "\nOlá! Seja bem-vindo ao meu site!\n",
    "Para saber mais sobre mim, clique nos botões abaixo ou digite /help.\n",
    "Aqui você vai encontrar um pouco mais sobre mim, fugindo da trivialidade de um linktree.\n"
  ];

  let skip = false;
  const removeMessage = () => { skip = true; container.innerHTML=''; };
  container.addEventListener('click', removeMessage, { once: true });

  for(const line of messages) {
    if(skip) break;
    await typeLine(container, line, 2, '#0f504e'); // digitação ultra-rápida, neon azul
  }
}

// ===============================
// DIGITAÇÃO COM VELOCIDADE AJUSTADA
// ===============================
function typeLine(container, text, speed=2, color='#0f504e') {
  return new Promise(resolve => {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-output log-done';
    lineDiv.style.color = color;
    lineDiv.style.whiteSpace = 'pre'; // mantém formatação
    lineDiv.style.fontWeight = 'bold';
    lineDiv.style.padding = '0 2px'; // 2px padding de cada lado
    lineDiv.style.textShadow = `0 0 2px ${color}, 0 0 4px ${color}`; // neon sem brilho exagerado
    container.appendChild(lineDiv);
    container.scrollTop = container.scrollHeight;

    let i = 0;
    const interval = setInterval(() => {
      lineDiv.textContent += text[i];
      container.scrollTop = container.scrollHeight;
      i++;
      if(i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

// ===============================
// PROMPT EXISTENTE
// ===============================
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

// ===============================
// HANDLE COMMAND EXISTENTE
// ===============================
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
