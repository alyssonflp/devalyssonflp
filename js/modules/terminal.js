// =====================================================
// axiomOS - Terminal com pré-mensagem, IP e clique para pular
// =====================================================

export async function initTerminal() {
  const root = document.getElementById('root-terminal');
  if(!root) return;
  root.innerHTML = '';

  // Exibe a pré-mensagem com efeito de digitação
  await showPreMessage(root);

  // Depois, cria o prompt normal
  createPrompt(root);
}

// ===============================
// FUNÇÃO DE PRÉ-MENSAGEM
// ===============================
async function showPreMessage(container) {
  const ipInfo = await fetch('/api/get-ip')
    .then(res => res.json())
    .catch(() => ({ ip: 'Indisponível', city: 'Indisponível', userAgent: 'Indisponível' }));

  const messages = [
    { text: `
 _   _      _ _        __        __         _     _ 
| | | | ___| | | ___   \\ \\      / /__  _ __| | __| |
| |_| |/ _ \\ | |/ _ \\   \\ \\ /\\ / / _ \\| '__| |/ _\` |
|  _  |  __/ | | (_) |   \\ V  V / (_) | |  | | (_| |
|_| |_|\\___|_|_|\\___/     \\_/\\_/ \\___/|_|  |_|\\__,_|
`, color: '#ff79c6' }, // rosa ASCII
    { text: 'Olá! Seja bem-vindo ao meu site!', color: '' },
    { text: 'Para saber mais sobre mim, clique nos botões abaixo ou digite /help.', color: '' },
    { text: 'Aqui você vai encontrar um pouco mais sobre mim, fugindo da trivialidade de um linktree.', color: '' },
    { text: `Seu IP: ${ipInfo.ip} | Cidade: ${ipInfo.city} | Navegador: ${ipInfo.userAgent}`, color: '' }
  ];

  let skip = false;
  const removeMessage = () => { skip = true; container.innerHTML = ''; };
  
  // Remove pré-mensagem ao clicar em qualquer lugar
  container.addEventListener('click', removeMessage, { once: true });
  
  // Auto-remove após 12 segundos
  const autoRemove = setTimeout(removeMessage, 12000);

  for(const msg of messages) {
    if(skip) break;
    await typeLine(container, msg.text, 25, msg.color || 'var(--dracula-foreground)');
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-output log-done';
    container.appendChild(lineDiv);
    container.scrollTop = container.scrollHeight;
    await new Promise(r => setTimeout(r, 200)); // pausa entre linhas
  }

  clearTimeout(autoRemove); // limpa o timeout se terminou antes
}

// ===============================
// FUNÇÃO DE DIGITAÇÃO
// ===============================
function typeLine(container, text, speed=50, color='var(--dracula-foreground)') {
  return new Promise(resolve => {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-output log-done';
    lineDiv.style.color = color;
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
