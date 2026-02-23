/**
 * Terminal Alysson_OS - Versão Corrigida (Fluxo Natural)
 */

export async function initTerminal() {
    const root = document.getElementById('root-terminal');
    if (!root) return;

    root.innerHTML = ''; // Inicia o monitor limpo
    createPrompt(root);
}

function createPrompt(container) {
    // Removemos qualquer prompt antigo para garantir que o novo seja sempre o último
    const oldPrompt = document.querySelector('.prompt-container');
    if (oldPrompt) oldPrompt.remove();

    const promptDiv = document.createElement('div');
    promptDiv.className = "prompt-container";
    
    const isMobile = window.innerWidth <= 768;
    const helpText = isMobile 
        ? "Digite /help para dúvidas" 
        : "Digite /help para consultar comandos";

    promptDiv.innerHTML = `
        <span class="prompt-user-white">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
        <div class="input-wrapper">
            <input type="text" id="terminal-input" autofocus autocomplete="off" spellcheck="false" placeholder="${helpText}">
        </div>
    `;
    
    // appendChild garante que o prompt esteja sempre no fim da fila
    container.appendChild(promptDiv);
    
    const input = document.getElementById('terminal-input');
    input.focus();

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            handleCommand(cmd, container);
        }
    });
}

/**
 * Processa o comando e mantém a ordem cronológica
 */
function handleCommand(cmd, container) {
    if (!cmd) return;

    // 1. Substitui o input atual por texto estático (Histórico)
    const history = document.createElement('div');
    history.className = "terminal-history";
    history.innerHTML = `<span class="prompt-user-white">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span> <span class="cmd-text">${cmd}</span>`;
    
    // Adiciona o histórico antes de processar a resposta
    container.appendChild(history);

    // 2. Banco de dados de conteúdos
    const contents = {
        '/about': { type: 'about', title: 'USER_PROFILE_01', body: '<p>> NOME: ALYSSON</p><p>> CARGO: DEV FULLSTACK</p>' },
        '/skills': { type: 'skills', title: 'CORE_COMPETENCIES', body: '<p>> FRONT: React, Three.js</p>' },
        '/experience': { type: 'experience', title: 'HISTORY_LOG', body: '<p>> 2026: Alysson_OS Architect</p>' },
        '/projects': { type: 'projects', title: 'ACTIVE_REPOS', body: '<p>> ALYSSON_OS: Interface 3D</p>' },
        '/ia': { type: 'ia', title: 'AI_CORE_LINK', body: '<p>> STATUS: Conectado à rede neural Gemini.</p>' }
    };

    // 3. Lógica de Resposta (Aparece abaixo do comando)
    if (contents[cmd]) {
        if (typeof window.triggerHologram === 'function') {
            window.triggerHologram(contents[cmd]);
        }
        const msg = document.createElement('div');
        msg.className = "terminal-output success";
        msg.innerHTML = `> Executando módulo ${cmd}... [OK]`;
        container.appendChild(msg);
    } else if (cmd === '/help') {
        const msg = document.createElement('div');
        msg.className = "terminal-output";
        msg.innerHTML = "Comandos: /about, /skills, /experience, /projects, /ia";
        container.appendChild(msg);
    } else {
        const error = document.createElement('div');
        error.className = "terminal-output error";
        error.innerHTML = `Comando "${cmd}" não reconhecido.`;
        container.appendChild(error);
    }

    // 4. CRIA UM NOVO PROMPT VAZIO NO FINAL
    createPrompt(container);

    // Rola para o fim
    container.scrollTop = container.scrollHeight;
}
