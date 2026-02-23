export async function initSystemInfo() {

    const footer = document.getElementById("info-footer");
    if (!footer) return;

    const ua = navigator.userAgent;

    let browser = "UNKNOWN";

    if (ua.includes("Edg")) browser = "EDGE";
    else if (ua.includes("Chrome")) browser = "CHROME";
    else if (ua.includes("Firefox")) browser = "FIREFOX";
    else if (ua.includes("Safari")) browser = "SAFARI";

    let ip = "Indisponível";

    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        if (response.ok) {
            const data = await response.json();
            ip = data.ip;
        }
    } catch (error) {
        console.log("Falha ao buscar IP");
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
