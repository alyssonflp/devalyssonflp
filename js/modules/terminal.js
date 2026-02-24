// js/modules/terminal.js

// 🖥 Terminal base do sistema

export function initTerminal() {

    const root = document.getElementById("root-terminal");
    if (!root) return;

    root.innerHTML = `
        <div class="terminal-line">
            <span class="prompt">alysson@os:~$</span>
            <span> Sistema inicializado com sucesso.</span>
        </div>
    `;
}
