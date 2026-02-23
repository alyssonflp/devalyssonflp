/**
 * Terminal Alysson_OS - Versão Final (Sutil & Fluxo Linear)
 */

export async function initTerminal() {
    const root = document.getElementById('root-terminal');
    if (!root) return;

    root.innerHTML = ''; 
    createPrompt(root);
}

/**
 * Cria a linha de comando ativa no final do log
 */
function createPrompt(container) {
    const oldPrompt = document.querySelector('.prompt-container:not(.terminal-history)');
    if (oldPrompt) oldPrompt.remove();

    const promptDiv = document.createElement('div');
    promptDiv.className = "prompt-container";
    
    const isMobile = window.innerWidth <= 768;
    const helpText = isMobile ? "Type..." : "Awaiting command...";

    promptDiv.innerHTML = `
        <span class="prompt-user-white">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
        <div class="input-wrapper">
            <input type="text" id="terminal-input" autofocus autocomplete="off" spellcheck="false" placeholder="${helpText}">
        </div>
    `;
    
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
 * Processa comandos com histórico e logs síncronos
 */
async function handleCommand(cmd, container) {
    if (!cmd) return;

    const currentPrompt = document.querySelector('.prompt-container:not(.terminal-history)');

    // 1. Transforma o comando atual em histórico estático (Fonte Sutil 13px)
    const history = document.createElement('div');
    history.className = "prompt-container terminal-history";
    history.style.fontSize = "13px"; 
    history.innerHTML = `
        <span class="prompt-user-white">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
        <span style="color: #00d4ff; margin-left: 8px;">${cmd}</span>
    `;
    
    // Insere o comando fixo antes do prompt de digitação
    container.insertBefore(history, currentPrompt);

    // Limpa o input imediatamente para simular o "envio"
    const input = document.getElementById('terminal-input');
    if(input) input.value = '';

    const contents = {
        '/about': { type: 'about' },
        '/skills': { type: 'skills' },
        '/experience': { type: 'experience' },
        '/projects': { type: 'projects' },
        '/ia': { type: 'ia' }
    };

    // 2. Lógica de Execução e Logs
    if (contents[cmd] || cmd === '/help' || cmd === '/clear') {
        
        if(cmd === '/clear') {
            container.innerHTML = '';
            createPrompt(container);
            return;
        }

        // --- Log de Loading (Abaixo do comando) ---
        const loadingDiv = document.createElement('div');
        loadingDiv.className = "terminal-output";
        loadingDiv.style.color = "rgba(255, 255, 255, 0.4)";
        loadingDiv.style.fontSize = "12px"; // Fonte sutil
        loadingDiv.style.margin = "2px 0 2px 20px";
        container.insertBefore(loadingDiv, currentPrompt);

        for (let i = 0; i <= 10; i++) {
            const bar = "#".repeat(i) + "-".repeat(10 - i);
            loadingDiv.innerHTML = `[${bar}] CACHING... ${i * 10}%`;
            container.scrollTop = container.scrollHeight;
            await new Promise(r => setTimeout(r, 40));
        }

        // --- Log de DONE (Abaixo do Loading) ---
        const doneDiv = document.createElement('div');
        doneDiv.className = "terminal-output";
        doneDiv.style.color = "#00ff41";
        doneDiv.style.fontSize = "11px"; // Ainda mais sutil
        doneDiv.style.paddingLeft = "20px";
        doneDiv.style.marginBottom = "8px";
        doneDiv.innerHTML = `> SYNC_STATUS: DONE`;
        container.insertBefore(doneDiv, currentPrompt);

        // Executa ação do holograma
        if (contents[cmd] && typeof window.triggerHologram === 'function') {
            window.triggerHologram(contents[cmd]);
        } else if (cmd === '/help') {
            const help = document.createElement('div');
            help.className = "terminal-output";
            help.style.paddingLeft = "20px";
            help.style.fontSize = "12px";
            help.style.color = "#00d4ff";
            help.innerHTML = "> KEYS: /about, /skills, /experience, /projects, /ia, /clear";
            container.insertBefore(help, currentPrompt);
        }
    } else {
        // Log de Erro (Abaixo do comando)
        const error = document.createElement('div');
        error.className = "terminal-output";
        error.style.color = "#ff3e3e";
        error.style.fontSize = "12px";
        error.style.paddingLeft = "20px";
        error.style.marginBottom = "8px";
        error.innerHTML = `> ERR: NOT_FOUND [${cmd}]`;
        container.insertBefore(error, currentPrompt);
    }

    // 3. Rola para o fim mantendo o foco no prompt que já existe lá
    container.scrollTop = container.scrollHeight;
    if(input) input.focus();
}
