/**
 * Módulo de Informações do Sistema
 * Captura IP, Localização, Navegador e OS
 */
export async function initSystemInfo() {
    // Detectar Navegador
    let browser = "UNKNOWN";
    const ua = navigator.userAgent;
    if (ua.indexOf("Firefox") > -1) browser = "FIREFOX";
    else if (ua.indexOf("Chrome") > -1) browser = "CHROME";
    else if (ua.indexOf("Safari") > -1) browser = "SAFARI";
    else if (ua.indexOf("Edge") > -1) browser = "EDGE";

    // Detectar Sistema Operacional
    let os = "OS_UNKNOWN";
    const platform = navigator.platform.toLowerCase();
    if (platform.indexOf("win") !== -1) os = "WINDOWS";
    else if (platform.indexOf("mac") !== -1) os = "MACOS";
    else if (platform.indexOf("linux") !== -1) os = "LINUX";
    else if (/android|iphone|ipad|ipod/.test(ua.toLowerCase())) os = "MOBILE";

    const footer = document.getElementById("info-footer");
    if (!footer) return;

    try {
        // Buscando IP e Localização
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error();
        const data = await response.json();

        footer.innerHTML = `
            <div class="footer-group">
                <div class="info-item">
                    <span class="label">NODE_IP:</span> 
                    <span class="value">${data.ip}</span>
                </div>
                <div class="info-item hide-mobile">
                    <span class="label">BROWSER:</span> 
                    <span class="value">${browser}</span>
                </div>
            </div>
            
            <div class="footer-group">
                <div class="info-item hide-mobile">
                    <span class="label">SYS_OS:</span> 
                    <span class="value">${os}</span>
                </div>
                <div class="info-item">
                    <span class="label">LOCATION:</span> 
                    <span class="value">${data.city}, ${data.region_code}</span>
                </div>
            </div>
        `;
    } catch (error) {
        footer.innerHTML = `<div style="width:100%; text-align:center; opacity:0.5;">[ SYSTEM_SECURE_MODE_ACTIVE ]</div>`;
    }
}
