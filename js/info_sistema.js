// =====================================================
// Sistema de Informações
// Mostra IP + Navegador no rodapé
// Versão blindada para mobile + GitHub Pages
// =====================================================

export async function initSystemInfo() {

    const footer = document.getElementById("info-footer");
    if (!footer) return;

    const ua = navigator.userAgent;

    // Detecta navegador simplificado
    let browser = "UNKNOWN";

    if (ua.includes("Edg")) browser = "EDGE";
    else if (ua.includes("Chrome")) browser = "CHROME";
    else if (ua.includes("Firefox")) browser = "FIREFOX";
    else if (ua.includes("Safari")) browser = "SAFARI";

    let ip = "Indisponível";

    // Tentativa 1
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        if (response.ok) {
            const data = await response.json();
            ip = data.ip;
        }
    } catch (error) {
        console.warn("Falha na API principal");
    }

    footer.innerHTML = `
        <div class="footer-group">
            <div class="info-item">
                <span class="label">IP:</span>
                <span class="value">${ip}</span>
            </div>
            <div class="info-item">
                <span class="label">BRW:</span>
                <span class="value">${browser}</span>
            </div>
        </div>
    `;
}
