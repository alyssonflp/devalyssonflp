// =====================================================
// Coleta de Informações do Usuário
// Mostra IP + Navegador no rodapé
// =====================================================

export async function initSystemInfo() {

    const footer = document.getElementById("info-footer");
    if (!footer) return;

    const ua = navigator.userAgent;

    const browser =
        ua.includes("Edg") ? "EDGE" :
        ua.includes("Chrome") ? "CHROME" :
        ua.includes("Firefox") ? "FIREFOX" :
        ua.includes("Safari") ? "SAFARI" :
        "UNKNOWN";

    let ip = "N/A";

    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        ip = data.ip;
    } catch (error) {
        console.warn("Não foi possível obter IP");
    }

    footer.innerHTML = `
        <div class="footer-group">
            <div class="info-item">
                <span class="label">IP:</span>
                <span class="value">${ip}</span>
            </div>
            <div class="info-item hide-mobile">
                <span class="label">BRW:</span>
                <span class="value">${browser}</span>
            </div>
        </div>
    `;
}
