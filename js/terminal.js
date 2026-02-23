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
        ? "Digite /help para dúvidas..." 
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
            const cmd = input.value.trim();
            // Lógica de processamento de comandos virá aqui
            input.value = ''; 
        }
    });
}
