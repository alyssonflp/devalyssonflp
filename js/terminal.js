/**
 * Terminal Alysson_OS - Foco em Confinamento 3D
 */

export async function initTerminal() {
    const root = document.getElementById('root-terminal');
    if (!root) return;

    root.innerHTML = ''; // Limpa o monitor

    // 1. HELLO WORLD CENTRALIZADO (Rosa Neon)
    const hello = document.createElement('h1');
    hello.className = "hello-world-neon";
    root.appendChild(hello);
    
    // Digitação rápida
    await typeText("HELLO WORLD", hello, 35);
    
    await new Promise(r => setTimeout(r, 600)); 
    root.innerHTML = ''; // Limpa para dar lugar ao terminal

    // 2. MENSAGEM DE AJUDA E PROMPT
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
    
    // O placeholder simula o texto "morto" que some ao digitar
    promptDiv.innerHTML = `
        <span class="prompt-user-white">alyssonflp@root</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-char">$</span>
        <div class="input-wrapper">
            <input type="text" id="terminal-input" autofocus autocomplete="off" spellcheck="false" placeholder="Digite /help para ajuda...">
        </div>
    `;
    
    container.appendChild(promptDiv);
    
    const input = document.getElementById('terminal-input');
    input.focus();

    // Impede que cliques fora do input tirem o foco
    document.addEventListener('click', () => input.focus());

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            // Lógica de comandos pode ser inserida aqui
            input.value = ''; 
        }
    });
}
