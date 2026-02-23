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
    // Removemos qualquer prompt aberto anteriormente para evitar duplicatas
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
    input.focus();

    // Monitora a tecla Enter
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

    // 1. Congela o comando atual e joga para o histórico
    const history = document.createElement('div');
    history.className = "prompt-container terminal-history";
    history.innerHTML = `
        <span class="prompt-user-white">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
        <span style="color: #00d4ff; margin-left: 8px;">${cmd}</span>
    `;
    
    container.insertBefore(history, currentPrompt);

    // Limpa o campo de digitação para o próximo comando
    const input = document.getElementById('terminal-input');
    if(input) input.value = '';

    const contents = {
        '/about': { type: 'about' },
        '/skills': { type: 'skills' },
        '/experience': { type: 'experience' },
        '/projects': { type: 'projects' },
        '/ia': { type: 'ia' }
    };

    // 2. Executa a lógica de resposta (Loading -> Done -> Ação)
    if (contents[cmd] || cmd === '/help' || cmd === '/clear') {
        
        if(cmd === '/clear') {
            container.innerHTML = '';
            createPrompt(container);
            return;
        }

        // --- Log de Loading Progressivo ---
        const loadingDiv = document.createElement('div');
        loadingDiv.className = "terminal-output log-loading";
        container.insertBefore(loadingDiv, currentPrompt);

        for (let i = 0; i <= 10; i++) {
            const bar = "#".repeat(i) + "-".repeat(10 - i);
            loadingDiv.innerHTML = `[${bar}] DONE... ${i * 10}%`;
            container.scrollTop = container.scrollHeight;
            await new Promise(r => setTimeout(r, 40));
        }

        // --- Log de Finalização (SYNC DONE) ---
        const doneDiv = document.createElement('div');
        doneDiv.className = "terminal-output log-done";
        doneDiv.innerHTML = `> SYNC_STATUS: DONE`;
        container.insertBefore(doneDiv, currentPrompt);

        // Dispara o holograma ou mostra o menu de ajuda
        if (contents[cmd] && typeof window.triggerHologram === 'function') {
            window.triggerHologram(contents[cmd]);
        } else if (cmd === '/help') {
            const help = document.createElement('div');
            help.className = "terminal-output log-help";
            help.innerHTML = "> COMANDOS: /about, /skills, /experience, /projects, /ia, /clear";
            container.insertBefore(help, currentPrompt);
        }
    } else {
        // --- Log de Erro quando o comando falha ---
        const error = document.createElement('div');
        error.className = "terminal-output log-error";
        error.innerHTML = `> ERR: NÃO ENCONTRADO [${cmd}]`;
        container.insertBefore(error, currentPrompt);
    }

    // Mantém o scroll sempre no final do terminal
    container.scrollTop = container.scrollHeight;
    if(input) input.focus();
}
