export async function initSystemInfo() {
    const footer = document.getElementById("info-footer");
    if (!footer) return;

    // Função para atualizar o relógio
    const updateClock = () => {
        const now = new Date();
        return now.toLocaleTimeString('pt-BR', { hour12: false });
    };

    // Dados iniciais
    const ua = navigator.userAgent;
    let browser = ua.includes("Chrome") ? "CHROME" : "BROWSER";
    let os = navigator.platform.includes("Win") ? "WINDOWS" : "LINUX/MOBILE";

    // Template inicial enquanto carrega o IP
    const render = (ip = "LOADING...", loc = "WAITING...") => {
        footer.innerHTML = `
            <div class="footer-group">
                <div class="info-item"><span class="label">IP:</span> <span class="value">${ip}</span></div>
                <div class="info-item hide-mobile"><span class="label">TIME:</span> <span id="footer-clock" class="value">${updateClock()}</span></div>
            </div>
            <div class="footer-group">
                <div class="info-item hide-mobile"><span class="label">SYS:</span> <span class="value">${os}</span></div>
                <div class="info-item"><span class="label">LOC:</span> <span class="value">${loc}</span></div>
            </div>
        `;
    };

    render();

    // Inicia o intervalo do relógio
    setInterval(() => {
        const clockEl = document.getElementById("footer-clock");
        if (clockEl) clockEl.innerText = updateClock();
    }, 1000);

    // Busca dados de rede
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error();
        const data = await response.json();
        render(data.ip, `${data.city}, ${data.region_code}`);
    } catch (e) {
        render("ENCRYPTED", "PRIVATE_ZONE");
    }
}
