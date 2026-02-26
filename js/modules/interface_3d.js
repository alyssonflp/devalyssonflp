/**
 * AxiomOS — Módulo de Interface 3D + Hello World animado
 * Mostra ASCII + mensagem com digitação dentro do monitor
 */

export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    if (!terminal) return;

    const wrapper = terminal.querySelector(".terminal-content-wrapper");
    if (!wrapper) return;

    // ===============================
    // ROTATION DO MONITOR
    // ===============================
    let isDragging = false;
    let rotationY = 25;
    let rotationX = 10;
    let startX = 0;
    let startY = 0;

    const updateTransform = (yDeg, xDeg) => {
        terminal.style.transform =
            `translate(-50%, -50%) rotateY(${yDeg}deg) rotateX(${xDeg}deg)`;
    };

    const startDrag = (e) => {
        isDragging = true;
        startX = e.pageX || e.touches?.[0].pageX || 0;
        startY = e.pageY || e.touches?.[0].pageY || 0;
        terminal.style.transition = "none";
        terminal.style.cursor = "grabbing";
        hideWelcome(); // remove mensagem se interagir
    };

    const stopDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        terminal.style.transition =
            "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
        terminal.style.cursor = "grab";
    };

    const doDrag = (e) => {
        if (!isDragging) return;
        const x = e.pageX || e.touches?.[0].pageX || 0;
        const y = e.pageY || e.touches?.[0].pageY || 0;

        rotationY += (x - startX) / 5;
        rotationX -= (y - startY) / 5;

        rotationY = Math.max(-80, Math.min(80, rotationY));
        rotationX = Math.max(-25, Math.min(25, rotationX));

        updateTransform(rotationY, rotationX);

        startX = x;
        startY = y;
    };

    terminal.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);
    terminal.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", doDrag, { passive: false });
    window.addEventListener("touchend", stopDrag);
    updateTransform(rotationY, rotationX);

    // ===============================
    // HELLO WORLD + MENSAGEM COM DIGITAÇÃO
    // ===============================
    const welcomeDiv = document.createElement("div");
    welcomeDiv.style.textAlign = "center";
    welcomeDiv.style.margin = "0 auto";
    welcomeDiv.style.whiteSpace = "pre-wrap";
    welcomeDiv.style.fontFamily = "'Share Tech Mono', monospace";
    wrapper.appendChild(welcomeDiv);

    const asciiText = document.createElement("pre");
    asciiText.style.color = "#ff007a"; // rosa
    asciiText.style.fontWeight = "bold";
    asciiText.style.margin = "0";
    asciiText.style.whiteSpace = "pre-wrap";

    const messageText = document.createElement("div");
    messageText.style.color = "#00ff00"; // verde terminal
    messageText.style.marginTop = "10px";
    messageText.style.whiteSpace = "pre-wrap";

    welcomeDiv.appendChild(asciiText);
    welcomeDiv.appendChild(messageText);

    // Texto linha a linha
    const asciiLines = [
`  _   _      _ _        __        __         _     _ 
 | | | | ___| | | ___   \\ \\      / /__  _ __| | __| |
 | |_| |/ _ \\ | |/ _ \\   \\ \\ /\\ / / _ \\| '__| |/ _\` |
 |  _  |  __/ | | (_) |   \\ V  V / (_) | |  | | (_| |
 |_| |_|\\___|_|_|\\___( )   \\_/\\_/ \\___/|_|  |_|\\__,_|
                     |/                                
    `
    ];

    const messageLines = [
`Olá! Seja bem-vindo ao meu site! 🌟
Para saber mais sobre mim, clique nos botões abaixo ou digite /help.
Aqui você vai encontrar um pouco mais sobre mim, fugindo da trivialidade de um linktree.`
    ];

    let currentLine = 0;
    let currentChar = 0;

    function typeAscii() {
        if (currentLine < asciiLines.length) {
            asciiText.textContent += asciiLines[currentLine][currentChar] || '';
            currentChar++;
            if (currentChar < asciiLines[currentLine].length) {
                setTimeout(typeAscii, 10);
            } else {
                currentLine++;
                currentChar = 0;
                asciiText.textContent += '\n';
                setTimeout(typeAscii, 10);
            }
        } else {
            currentLine = 0;
            currentChar = 0;
            typeMessage();
        }
    }

    function typeMessage() {
        if (currentLine < messageLines.length) {
            messageText.textContent += messageLines[currentLine][currentChar] || '';
            currentChar++;
            if (currentChar < messageLines[currentLine].length) {
                setTimeout(typeMessage, 10);
            } else {
                currentLine++;
                currentChar = 0;
                messageText.textContent += '\n';
            }
        }
    }

    typeAscii();

    // Remove a mensagem após 12s ou interação
    const timeout = setTimeout(hideWelcome, 12000);

    function hideWelcome() {
        if (welcomeDiv) {
            welcomeDiv.style.transition = "opacity 1s";
            welcomeDiv.style.opacity = "0";
            setTimeout(() => welcomeDiv.remove(), 1000);
        }
    }

    ["click","keydown"].forEach(evt => {
        wrapper.addEventListener(evt, () => {
            clearTimeout(timeout);
            hideWelcome();
        });
    });
            }
