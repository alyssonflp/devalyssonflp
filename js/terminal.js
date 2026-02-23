/**
 * Terminal Alysson_OS - Versão Final Corrigida
 */

export async function initTerminal() {
    const root = document.getElementById('root-terminal');
    if (!root) return;

    root.innerHTML = ''; 
    createPrompt(root);
}

/**
 * Cria a linha de comando ativa
 */
function createPrompt(container) {
    // Remove qualquer prompt anterior para não duplicar inputs
    const oldPrompt = document.querySelector('.prompt-container');
    if (oldPrompt) oldPrompt.remove();

    const promptDiv = document.createElement('div');
    promptDiv.className = "prompt-container";
    
    // Placeholder sutil
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
 * Processa comandos e transforma o input em texto estático
 */
async function handleCommand(cmd, container) {
    if (!cmd) return;

    // 1. TRANSFORMA O COMANDO EM TEXTO MORTO (Evita a aparência de "caixa de pesquisa")
    const history = document.createElement('div');
    history.className = "prompt-container"; // Mantém a mesma estrutura visual
    history.style.opacity = "0.8"; // Levemente ofuscado para diferenciar do ativo
    history.innerHTML = `
        <span class="prompt-user-white">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
        <span style="color: #00d4ff; margin-left: 8px;">${cmd}</span>
    `;
    
    // Insere o histórico antes de remover o prompt ativo
    container.insertBefore(history, document.querySelector('.prompt-container'));

    // 2. Banco de Conteúdos
    const contents = {
        '/about': { type: 'about', title: 'USER_PROFILE_01' },
        '/skills': { type: 'skills', title: 'CORE_COMPETENCIES' },
        '/experience': { type: 'experience', title: 'HISTORY_LOG' },
        '/projects': { type: 'projects', title: 'ACTIVE_REPOS' },
        '/ia': { type: 'ia', title: 'AI_CORE_LINK' }
    };

    // 3. Efeito Loading e Execução
    if (contents[cmd] || cmd === '/help' || cmd === '/clear') {
        
        if(cmd === '/clear') {
            container.innerHTML = '';
            createPrompt(container);
            return;
        }

        const loadingDiv = document.createElement('div');
        loadingDiv.style.color = "rgba(255, 255, 255, 0.4)";
        loadingDiv.style.fontSize = "12px";
        loadingDiv.style.margin = "5px 0 10px 20px";
        container.insertBefore(loadingDiv, document.querySelector('.prompt-container'));

        for (let i = 0; i <= 10; i++) {
            const bar = "#".repeat(i) + "-".repeat(10 - i);
            loadingDiv.innerHTML = `[${bar}] LOADING... ${i * 10}%`;
            await new Promise(r => setTimeout(r, 30));
        }
        loadingDiv.innerHTML = `[##########] DONE`;

        if (contents[cmd] && typeof window.triggerHologram === 'function') {
            window.triggerHologram(contents[cmd]);
        } else if (cmd === '/help') {
            const help = document.createElement('div');
            help.style.fontSize = "13px";
            help.style.paddingLeft = "20px";
            help.style.color = "#00d4ff";
            help.innerHTML = "> KEYS: /about, /skills, /experience, /projects, /ia, /clear";
            container.insertBefore(help, document.querySelector('.prompt-container'));
        }
    } else {
        const error = document.createElement('div');
        error.style.color = "#ff3e3e";
        error.style.fontSize = "13px";
        error.style.paddingLeft = "20px";
        error.innerHTML = `> ERR: NOT_FOUND [${cmd}]`;
        container.insertBefore(error, document.querySelector('.prompt-container'));
    }

    // 4. Limpa o input atual e rola
    const input = document.getElementById('terminal-input');
    if(input) input.value = '';
    
    container.scrollTop = container.scrollHeight;
}
