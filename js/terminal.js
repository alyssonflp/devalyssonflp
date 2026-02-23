/**
 * Terminal Alysson_OS - Sequência Rápida
 */

export async function initTerminal() {
    const root = document.getElementById('root-terminal');
    if (!root) return;

    root.innerHTML = ''; // Limpa o monitor

    // 1. HELLO WORLD RELÂMPAGO
    const hello = document.createElement('h1');
    hello.className = "hello-world-fast";
    root.appendChild(hello);
    await typeText("HELLO WORLD", hello, 30); // Muito rápido
    
    await new Promise(r => setTimeout(r, 400)); // Pausa mínima
    root.innerHTML = ''; // Limpa para o terminal

    // 2. MENSAGEM DE AJUDA OFUSCADA
    const helpMsg = document.createElement('p');
    helpMsg.className = "terminal-line-faint";
    root.appendChild(helpMsg);
    await typeText("Digite /help para ver os comandos disponíveis.", helpMsg, 20);

    // 3. CRIAÇÃO DO PROMPT
    createPrompt(root);
}

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
    
    // Mantém o foco no monitor
    document.addEventListener('click', () => input.focus());

    // Listener para o Enter
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value;
            // Aqui você pode adicionar a lógica de comandos depois
            input.value = ''; 
        }
    });
}
