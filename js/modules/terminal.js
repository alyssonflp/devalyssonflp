// =====================================================
// 💻 axiomOS — Terminal
// =====================================================

export async function initTerminal() {
    const root = document.getElementById('root-terminal');
    if (!root) return;

    root.innerHTML = '';
    createPrompt(root);
}

function createPrompt(container) {
    const old = document.querySelector('.prompt-container:not(.terminal-history)');
    if (old) old.remove();

    const promptDiv = document.createElement('div');
    promptDiv.className = "prompt-container";

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const helpText = isTouch ? "Digite /help para dúvidas" : "Digite /help para comandos";

    promptDiv.innerHTML = `
        <span class="prompt-user-white">axiomos@root</span>
        <span class="prompt-sep">:</span>
        <span class="prompt-path">~</span>
        <span class="prompt-char">$</span>
        <div class="input-wrapper">
            <input type="text" id="terminal-input" autocomplete="off" spellcheck="false" placeholder="${helpText}">
        </div>
    `;

    container.appendChild(promptDiv);
    const input = document.getElementById('terminal-input');
    if (!isTouch && input) input.focus();

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleCommand(input.value.trim().toLowerCase(), container);
    });
}

async function handleCommand(cmd, container) {
    if (!cmd) return;

    const currentPrompt = document.querySelector('.prompt-container:not(.terminal-history)');
    const history = document.createElement('div');
