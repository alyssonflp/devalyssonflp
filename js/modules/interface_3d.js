/**
 * AxiomOS — Módulo de Interface 3D + Boas-vindas ASCII
 * Controla rotação do monitor e mostra mensagem de introdução animada
 */

export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    if (!terminal) return;

    // ===============================
    // ROTATION LOGIC
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
        hideWelcome(); // Esconde a mensagem se o usuário interagir
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
    // WELCOME MESSAGE ASCII
    // ===============================

    const welcomeMessage = document.createElement("div");
    welcomeMessage.style.position = "absolute";
    welcomeMessage.style.bottom = "50px";
    welcomeMessage.style.left = "50%";
    welcomeMessage.style.transform = "translateX(-50%)";
    welcomeMessage.style.width = "90%";
    welcomeMessage.style.maxWidth = "600px";
    welcomeMessage.style.padding = "20px";
    welcomeMessage.style.background = "rgba(10, 15, 30, 0.9)";
    welcomeMessage.style.borderRadius = "20px";
    welcomeMessage.style.border = "2px solid #ff007a"; // rosa do site
    welcomeMessage.style.fontFamily = "'Share Tech Mono', monospace";
    welcomeMessage.style.color = "#00ff00"; // verde terminal
    welcomeMessage.style.whiteSpace = "pre-wrap";
    welcomeMessage.style.textAlign = "center";
    welcomeMessage.style.lineHeight = "1.2";
    welcomeMessage.style.zIndex = "999";
    welcomeMessage.style.boxShadow = "0 0 20px #ff007a";
    welcomeMessage.style.opacity = "1";
    welcomeMessage.style.transition = "opacity 1s ease-out";
    welcomeMessage.style.pointerEvents = "auto";

    const asciiText = document.createElement("pre");
    asciiText.style.color = "#ff007a"; // ASCII rosa
    asciiText.style.fontWeight = "bold";
    welcomeMessage.appendChild(asciiText);

    terminal.appendChild(welcomeMessage);

    const messageLines = [
`  _   _      _ _        __        __         _     _ 
 | | | | ___| | | ___   \\ \\      / /__  _ __| | __| |
 | |_| |/ _ \\ | |/ _ \\   \\ \\ /\\ / / _ \\| '__| |/ _\` |
 |  _  |  __/ | | (_) |   \\ V  V / (_) | |  | | (_| |
 |_| |_|\\___|_|_|\\___( )   \\_/\\_/ \\___/|_|  |_|\\__,_|
                     |/                                
-------------------------------------------------------
Olá! Seja bem-vindo ao meu site! 🌟

Para saber mais sobre mim:
- Clique nos botões abaixo
- Ou digite /help para ver os comandos disponíveis

Aqui você vai encontrar um pouco mais sobre mim,
fugindo da trivialidade de um linktree convencional.`
    ];

    const typingSpeed = 10;
    let currentLine = 0;
    let currentChar = 0;

    function typeLine() {
        if (currentLine < messageLines.length) {
            asciiText.textContent += messageLines[currentLine][currentChar] || '';
            currentChar++;
            if (currentChar < messageLines[currentLine].length) {
                setTimeout(typeLine, typingSpeed);
            } else {
                currentLine++;
                currentChar = 0;
                asciiText.textContent += '\n';
                setTimeout(typeLine, typingSpeed);
            }
        }
    }

    typeLine();

    const displayTime = 12000; // 12 segundos
    let hideTimeout = setTimeout(hideWelcome, displayTime);

    function hideWelcome() {
        if (welcomeMessage) {
            welcomeMessage.style.opacity = "0";
            setTimeout(() => welcomeMessage.remove(), 1000);
        }
    }

    ["click","keydown"].forEach(evt => {
        terminal.addEventListener(evt, () => {
            clearTimeout(hideTimeout);
            hideWelcome();
        });
    });
            }
