/**
 * AxiomOS — Módulo de Interface 3D + Hello World
 */

export function initInterface3D() {
    const terminal = document.querySelector(".main-terminal");
    if (!terminal) return;

    // ===============================
    // ROTATION DO MONITOR (seu código existente)
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
        hideWelcome();
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
    // HELLO WORLD + MENSAGEM
    // ===============================
    const wrapper = terminal.querySelector(".terminal-content-wrapper");
    if (!wrapper) return;

    const welcomeMessage = document.createElement("div");
    welcomeMessage.style.width = "100%";
    welcomeMessage.style.display = "flex";
    welcomeMessage.style.flexDirection = "column";
    welcomeMessage.style.alignItems = "center";
    welcomeMessage.style.justifyContent = "center";
    welcomeMessage.style.pointerEvents = "auto";
    welcomeMessage.style.opacity = "1";
    welcomeMessage.style.transition = "opacity 1s ease-out";

    // ASCII rosa
    const asciiText = document.createElement("pre");
    asciiText.style.color = "#ff007a"; // rosa do site
    asciiText.style.fontFamily = "'Share Tech Mono', monospace";
    asciiText.style.fontWeight = "bold";
    asciiText.style.textAlign = "center";
    asciiText.style.margin = "0";
    asciiText.style.whiteSpace = "pre-wrap";
    asciiText.textContent = `
  _   _      _ _        __        __         _     _ 
 | | | | ___| | | ___   \\ \\      / /__  _ __| | __| |
 | |_| |/ _ \\ | |/ _ \\   \\ \\ /\\ / / _ \\| '__| |/ _\` |
 |  _  |  __/ | | (_) |   \\ V  V / (_) | |  | | (_| |
 |_| |_|\\___|_|_|\\___( )   \\_/\\_/ \\___/|_|  |_|\\__,_|
                     |/                                
    `;

    // Mensagem verde
    const messageText = document.createElement("div");
    messageText.style.color = "#00ff00"; // cor do terminal do seu CSS
    messageText.style.fontFamily = "'Share Tech Mono', monospace";
    messageText.style.textAlign = "center";
    messageText.style.marginTop = "10px";
    messageText.style.whiteSpace = "pre-wrap";
    messageText.textContent = `
Olá! Seja bem-vindo ao meu site! 🌟
Para saber mais sobre mim, clique nos botões abaixo ou digite /help.
Aqui você vai encontrar um pouco mais sobre mim, fugindo da trivialidade de um linktree.
    `;

    welcomeMessage.appendChild(asciiText);
    welcomeMessage.appendChild(messageText);
    wrapper.appendChild(welcomeMessage);

    // Desaparece sozinho após leitura
    const displayTime = 12000;
    let hideTimeout = setTimeout(hideWelcome, displayTime);

    function hideWelcome() {
        if (welcomeMessage) {
            welcomeMessage.style.opacity = "0";
            setTimeout(() => welcomeMessage.remove(), 1000);
        }
    }

    // Remove imediatamente se usuário clicar ou digitar
    ["click","keydown"].forEach(evt => {
        wrapper.addEventListener(evt, () => {
            clearTimeout(hideTimeout);
            hideWelcome();
        });
    });
        }
