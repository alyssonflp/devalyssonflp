export async function initSystemInfo() {
    const footer = document.getElementById("info-footer");
    if (!footer) return;

    // Detectar Navegador e OS
    const ua = navigator.userAgent;
    let browser = ua.includes("Chrome") ? "CHROME" : ua.includes("Firefox") ? "FIREFOX" : "BROWSER";
    let os = navigator.platform.includes("Win") ? "WINDOWS" : "LINUX/MOBILE";

    try {
        const response = await fetch('https://ipapi.co/json/');
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
    } catch (e) {
        footer.innerHTML = `<span>[ SECURE_ENCRYPTION_ACTIVE ]</span>`;
    }
}
