/**
 * Módulo de Terminal - Alysson_OS
 * Sequência: Hello World -> Ajuda -> Prompt
 */

export async function initTerminal() {
    const root = document.getElementById('root-terminal');
    if (!root) return;

    root.innerHTML = ''; // Limpa o monitor para começar

    // 1. HELLO WORLD (Efeito relâmpago)
    const hello = document.createElement('h1');
    hello.className = "hello-world-fast";
    root.appendChild(hello);
    await typeText("HELLO WORLD", hello, 25); // 25ms por letra (muito rápido)
    
    await new Promise(r => setTimeout(r, 450)); // Pausa curta
    root.innerHTML = ''; // Limpa para o terminal

    // 2. MENSAGEM DE AJUDA (Ofuscada)
    const helpMsg = document.createElement('p');
    helpMsg.className = "terminal-line-faint";
    root.appendChild(helpMsg);
    await typeText("Digite /help para ver os comandos disponíveis.", helpMsg, 15);

    // 3. PROMPT INTERATIVO
    createPrompt(root);
}

/**
 * Função utilitária de digitação
 */
function typeText(text, element, speed) {
    return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
            element.innerText += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

/**
 * Cria o prompt alyssonflp@root e ativa o input
 */
function createPrompt(container) {
    const promptDiv = document.createElement('div');
    promptDiv.className = "prompt-container";
    
    promptDiv.innerHTML = `
        <span class="prompt-user">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
        <div class="input-wrapper">
            <input type="text" id="terminal-input" autofocus autocomplete="off" spellcheck="false">
        </div>
    `;
    
    container.appendChild(promptDiv);
    
    const input = document.getElementById('terminal-input');
    input.focus();
    
    // Mantém o foco no input sempre que o utilizador clicar no monitor
    document.addEventListener('click', () => input.focus());

    // Listener para comandos (Enter)
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            // Futuramente podes adicionar handleCommand(cmd) aqui
            input.value = ''; 
        }
    });
}
