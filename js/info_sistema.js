export async function initSystemInfo() {
    const footer = document.getElementById("info-footer");
    if (!footer) return;

    // Detectar Navegador
    const ua = navigator.userAgent;
    let browser = "BROWSER";
    if (ua.includes("Firefox")) browser = "FIREFOX";
    else if (ua.includes("Edg")) browser = "EDGE";
    else if (ua.includes("Chrome")) browser = "CHROME";
    else if (ua.includes("Safari")) browser = "SAFARI";

    // Detectar Sistema Operacional
    let os = "OS_UNKNOWN";
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("win")) os = "WINDOWS";
    else if (platform.includes("mac")) os = "MACOS";
    else if (platform.includes("linux")) os = "LINUX";
    else if (/android|iphone|ipad|ipod/.test(ua.toLowerCase())) os = "MOBILE";

    try {
        // Busca IP e Localização via API
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('API_OFFLINE');
        const data = await response.json();

        footer.innerHTML = `
            <div class="footer-group">
                <div class="info-item">
                    <span class="label">IP:</span> 
                    <span class="value">${data.ip}</span>
                </div>
                <div class="info-item hide-mobile">
                    <span class="label">BRW:</span> 
                    <span class="value">${browser}</span>
                </div>
            </div>
            <div class="footer-group">
                <div class="info-item hide-mobile">
                    <span class="label">SYS:</span> 
                    <span class="value">${os}</span>
                </div>
                <div class="info-item">
                    <span class="label">LOC:</span> 
                    <span class="value">${data.city}, ${data.region_code}</span>
                </div>
            </div>
        `;
    } catch (e) {
        // Caso o AdBlock bloqueie a API de IP
        footer.innerHTML = `
            <div style="width:100%; text-align:center; opacity:0.5; font-size:10px;">
                [ SECURE_ENCRYPTION_ACTIVE | SYSTEM_READY ]
            </div>
        `;
    }
}
