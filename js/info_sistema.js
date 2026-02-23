export async function initSystemInfo() {
    const footer = document.getElementById("info-footer");
    if (!footer) return;

    const getTime = () => new Date().toLocaleTimeString('pt-BR', { hour12: false });

    // Detectar Navegador e OS
    const ua = navigator.userAgent;
    let browser = ua.includes("Chrome") ? "CHROME" : "BROWSER";
    let os = navigator.platform.includes("Win") ? "WINDOWS" : "LINUX/MOBILE";

    // Template Inicial com Relógio
    footer.innerHTML = `
        <div class="footer-group">
            <div class="info-item"><span class="label">IP:</span> <span id="ip-val" class="value">LOADING...</span></div>
            <div class="info-item hide-mobile"><span class="label">TIME:</span> <span id="clock-val" class="value">${getTime()}</span></div>
        </div>
        <div class="footer-group">
            <div class="info-item hide-mobile"><span class="label">SYS:</span> <span class="value">${os}</span></div>
            <div class="info-item"><span class="label">LOC:</span> <span id="loc-val" class="value">DETECTING...</span></div>
        </div>
    `;

    // Atualiza o relógio a cada segundo
    setInterval(() => {
        const clock = document.getElementById("clock-val");
        if (clock) clock.innerText = getTime();
    }, 1000);

    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        document.getElementById("ip-val").innerText = data.ip;
        document.getElementById("loc-val").innerText = `${data.city}, ${data.region_code}`;
    } catch (e) {
        document.getElementById("ip-val").innerText = "SECURE_IP";
        document.getElementById("loc-val").innerText = "UNKNOWN_LOC";
    }
}
