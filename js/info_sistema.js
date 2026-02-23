export async function initSystemInfo() {
    const footer = document.getElementById("info-footer");
    if (!footer) return;

    // Detectar Browser e OS com fallbacks
    const ua = navigator.userAgent;
    let browser = ua.includes("Chrome") ? "CHROME" : ua.includes("Firefox") ? "FIREFOX" : "BROWSER";
    let os = navigator.platform.toLowerCase().includes("win") ? "WINDOWS" : "LINUX/MOBILE";

    console.log("🌐 Buscando dados de rede...");

    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error("API Offline");
        const data = await response.json();

        footer.innerHTML = `
            <div class="footer-group">
                <div class="info-item"><span class="label">IP:</span> <span class="value">${data.ip}</span></div>
                <div class="info-item hide-mobile"><span class="label">BRW:</span> <span class="value">${browser}</span></div>
            </div>
            <div class="footer-group">
                <div class="info-item hide-mobile"><span class="label">SYS:</span> <span class="value">${os}</span></div>
                <div class="info-item"><span class="label">LOC:</span> <span class="value">${data.city}, ${data.region_code}</span></div>
            </div>
        `;
        console.log("✅ Rodapé atualizado com sucesso.");
    } catch (error) {
        console.error("❌ Erro na API de IP:", error);
        // Fallback para não deixar vazio
        footer.innerHTML = `<div class="footer-group"><div class="info-item"><span class="label">SYS:</span> <span class="value">${os}</span></div></div>
                            <div class="footer-group"><div class="info-item"><span class="label">STATUS:</span> <span class="value">OFFLINE_MODE</span></div></div>`;
    }
}
