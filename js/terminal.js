/**
 * Terminal Alysson_OS - Versão Final (Sutil & Fluxo Contínuo)
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
 * Processa comandos e organiza o histórico cronológico
 */
async function handleCommand(cmd, container) {
    if (!cmd) return;

    // 1. Converte o prompt atual em histórico estático
    const history = document.createElement('div');
    history.className = "prompt-container terminal-history";
    history.innerHTML = `
        <span class="prompt-user-white">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
        <span style="color: #00d4ff; margin-left: 8px;">${cmd}</span>
    `;
    
    // Insere antes do prompt ativo
    container.insertBefore(history, document.querySelector('.prompt-container'));

    const contents = {
        '/about': { type: 'about' },
        '/skills': { type: 'skills' },
        '/experience': { type: 'experience' },
        '/projects': { type: 'projects' },
        '/ia': { type: 'ia' }
    };

    // 2. Lógica de Execução
    if (contents[cmd] || cmd === '/help' || cmd === '/clear') {
        
        if(cmd === '/clear') {
            container.innerHTML = '';
            createPrompt(container);
            return;
        }

        // --- Efeito Loading Sutil ---
        const loadingDiv = document.createElement('div');
        loadingDiv.className = "terminal-output";
        loadingDiv.style.color = "rgba(255, 255, 255, 0.4)";
        loadingDiv.style.fontSize = "12px";
        loadingDiv.style.margin = "5px 0 5px 20px";
        container.insertBefore(loadingDiv, document.querySelector('.prompt-container'));

        for (let i = 0; i <= 10; i++) {
            const bar = "#".repeat(i) + "-".repeat(10 - i);
            loadingDiv.innerHTML = `[${bar}] CACHING_SYSTEM... ${i * 10}%`;
            container.scrollTop = container.scrollHeight;
            await new Promise(r => setTimeout(r, 40));
        }

        // --- Adiciona o DONE abaixo da barra ---
        const doneDiv = document.createElement('div');
        doneDiv.className = "terminal-output";
        doneDiv.style.color = "#00ff41";
        doneDiv.style.fontSize = "12px";
        doneDiv.style.paddingLeft = "20px";
        doneDiv.style.marginBottom = "10px";
        doneDiv.innerHTML = `> SYNC_STATUS: DONE`;
        container.insertBefore(doneDiv, document.querySelector('.prompt-container'));

        // Executa ação do holograma
        if (contents[cmd] && typeof window.triggerHologram === 'function') {
            window.triggerHologram(contents[cmd]);
        } else if (cmd === '/help') {
            const help = document.createElement('div');
            help.className = "terminal-output";
            help.style.paddingLeft = "20px";
            help.style.color = "#00d4ff";
            help.innerHTML = "> KEYS: /about, /skills, /experience, /projects, /ia, /clear";
            container.insertBefore(help, document.querySelector('.prompt-container'));
        }
    } else {
        // Log de Erro
        const error = document.createElement('div');
        error.className = "terminal-output";
        error.style.color = "#ff3e3e";
        error.style.paddingLeft = "20px";
        error.innerHTML = `> ERR: COMMAND_NOT_FOUND [${cmd}]`;
        container.insertBefore(error, document.querySelector('.prompt-container'));
    }

    // 3. Limpa o input e rola para o fim
    const input = document.getElementById('terminal-input');
    if(input) input.value = '';
    
    container.scrollTop = container.scrollHeight;
}
