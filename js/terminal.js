/**
 * Terminal Alysson_OS - Versão Direta & Adaptável
 */

export async function initTerminal() {
    const root = document.getElementById('root-terminal');
    if (!root) return;

    root.innerHTML = ''; // Inicia o monitor limpo

    // 1. CRIAÇÃO DO PROMPT DIRETO
    createPrompt(root);
}

function createPrompt(container) {
    const promptDiv = document.createElement('div');
    promptDiv.className = "prompt-container";
    
    // Detecta o tipo de dispositivo pela largura da tela
    const isMobile = window.innerWidth <= 768;
    const helpText = isMobile 
        ? "Digite /help para dúvidas" 
        : "Digite /help para consultar os comandos disponiveis";

    promptDiv.innerHTML = `
        <span class="prompt-user-white">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
        <div class="input-wrapper">
            <input type="text" id="terminal-input" autofocus autocomplete="off" spellcheck="false" placeholder="${helpText}">
        </div>
    `;
    
    container.appendChild(promptDiv);
    
    const input = document.getElementById('terminal-input');
    input.focus();

    // Mantém o foco no input
    document.addEventListener('click', () => input.focus());

    // Listener para comandos
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            handleCommand(cmd, container);
            input.value = ''; 
        }
    });
}

/**
 * Processa o comando e dispara o holograma
 */
function handleCommand(cmd, container) {
    if (!cmd) return;

    // 1. Adiciona o comando ao histórico visual do terminal
    const history = document.createElement('div');
    history.className = "terminal-history";
    history.innerHTML = `<span class="prompt-char">></span> ${cmd}`;
    container.insertBefore(history, document.querySelector('.prompt-container'));

    // 2. Banco de dados de conteúdos para o Holograma
    const contents = {
        '/about': {
            type: 'about',
            title: 'USER_PROFILE_01',
            body: '<p>> NOME: ALYSSON</p><p>> CARGO: DEV FULLSTACK</p><p>Especialista em criar interfaces que saltam da tela.</p>'
        },
        '/skills': {
            type: 'skills',
            title: 'CORE_COMPETENCIES',
            body: '<p>> FRONT: React, Three.js, CSS Art</p><p>> BACK: Node.js, API Rest</p><p>> UI/UX: Immersive Design</p>'
        },
        '/experience': {
            type: 'experience',
            title: 'HISTORY_LOG',
            body: '<p>> 2024: Freelance Dev</p><p>> 2025: Fullstack Explorer</p><p>> 2026: Alysson_OS Architect</p>'
        },
        '/projects': {
            type: 'projects',
            title: 'ACTIVE_REPOS',
            body: '<p>> ALYSSON_OS: Interface 3D</p><p>> NEON_GRID: Landing Page</p><p>> CRYPTO_CORE: Dashboard</p>'
        },
        '/ia': {
            type: 'ia',
            title: 'AI_CORE_LINK',
            body: '<p>> STATUS: Conectado à rede neural.</p><p>Utilizando Gemini 1.5 Flash para processamento cognitivo.</p>'
        }
    };

    // 3. Executa a ação
    if (contents[cmd]) {
        // Dispara o holograma usando a função global do app.js
        if (typeof window.triggerHologram === 'function') {
            window.triggerHologram(contents[cmd]);
        }
    } else if (cmd === '/help') {
        const msg = document.createElement('div');
        msg.className = "terminal-output";
        msg.innerHTML = "Comandos: /about, /skills, /experience, /projects, /ia";
        container.insertBefore(msg, document.querySelector('.prompt-container'));
    } else {
        const error = document.createElement('div');
        error.className = "terminal-output error";
        error.innerHTML = `Comando "${cmd}" não reconhecido.`;
        container.insertBefore(error, document.querySelector('.prompt-container'));
    }

    // Mantém o scroll no final
    container.scrollTop = container.scrollHeight;
}
