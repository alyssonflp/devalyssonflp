/**
 * LÓGICA DO TERMINAL ALYSSON_OS
 * Gerencia comandos, histórico e animações de log.
 */

export async function initTerminal() {
    const root = document.getElementById('root-terminal');
    if (!root) return;

    root.innerHTML = ''; 
    createPrompt(root);
}

/**
 * Cria a linha de comando ativa (onde o usuário digita)
 */
function createPrompt(container) {
    const oldPrompt = document.querySelector('.prompt-container:not(.terminal-history)');
    if (oldPrompt) oldPrompt.remove();

    const promptDiv = document.createElement('div');
    promptDiv.className = "prompt-container";
    
    // Detecta se é celular para mudar o texto de ajuda
    const isMobile = window.innerWidth <= 768;
    const helpText = isMobile 
        ? "Digite /help para dúvidas" 
        : "Digite /help para verificar os comandos existentes";

    promptDiv.innerHTML = `
        <span class="prompt-user-white">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
        <div class="input-wrapper">
            <input type="text" id="terminal-input" autofocus autocomplete="off" spellcheck="false" placeholder="${helpText}">
        </div>
    `;
    
    container.appendChild(promptDiv);
    
    const input = document.getElementById('terminal-input');

    // Foco inicial inteligente: Evita abrir teclado ao carregar o site no mobile
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice && input) {
        input.focus();
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            handleCommand(cmd, container);
        }
    });
}

/**
 * Processa o comando digitado e gera a cascata de logs
 */
async function handleCommand(cmd, container) {
    if (!cmd) return;

    const currentPrompt = document.querySelector('.prompt-container:not(.terminal-history)');

    const history = document.createElement('div');
    history.className = "prompt-container terminal-history";
    history.innerHTML = `
        <span class="prompt-user-white">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
        <span style="color: #00d4ff; margin-left: 8px;">${cmd}</span>
    `;
    
    container.insertBefore(history, currentPrompt);

    const input = document.getElementById('terminal-input');
    if(input) input.value = '';

    const contents = {
        '/about': { type: 'about' },
        '/skills': { type: 'skills' },
        '/experience': { type: 'experience' },
        '/projects': { type: 'projects' },
        '/ia': { type: 'ia' }
    };

    if (contents[cmd] || cmd === '/help' || cmd === '/clear') {
        
        if(cmd === '/clear') {
            container.innerHTML = '';
            createPrompt(container);
            return;
        }

        const loadingDiv = document.createElement('div');
        loadingDiv.className = "terminal-output log-loading";
        container.insertBefore(loadingDiv, currentPrompt);

        for (let i = 0; i <= 10; i++) {
            const bar = "#".repeat(i) + "-".repeat(10 - i);
            loadingDiv.innerHTML = `[${bar}] DONE... ${i * 10}%`;
            container.scrollTop = container.scrollHeight;
            await new Promise(r => setTimeout(r, 40));
        }

        const doneDiv = document.createElement('div');
        doneDiv.className = "terminal-output log-done";
        doneDiv.innerHTML = `> SYNC_STATUS: ACTIVE`;
        container.insertBefore(doneDiv, currentPrompt);

        if (contents[cmd] && typeof window.triggerHologram === 'function') {
            window.triggerHologram(contents[cmd]);
        } else if (cmd === '/help') {
            const help = document.createElement('div');
            help.className = "terminal-output log-help";
            help.innerHTML = "> COMANDOS: /about, /skills, /experience, /projects, /ia, /clear";
            container.insertBefore(help, currentPrompt);
        }
    } else {
        const error = document.createElement('div');
        error.className = "terminal-output log-error";
        error.innerHTML = `> ERRO: NÃO ENCONTRADO [${cmd}]`;
        container.insertBefore(error, currentPrompt);
    }

    // --- FINALIZAÇÃO COM TRAVA DE SEGURANÇA PARA MOBILE/TABLET ---
    container.scrollTop = container.scrollHeight;

    // Detecta se o dispositivo é touch (Celular, Tablet, iPad)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    // Só devolve o foco se NÃO for um dispositivo de toque (evita subir o teclado)
    if (!isTouchDevice && input) {
        input.focus();
    }
}
