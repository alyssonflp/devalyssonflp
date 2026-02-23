document.addEventListener("DOMContentLoaded", () => {
    const desktop = document.getElementById("desktop-3d");

    const infoFooter = document.createElement("div");
    infoFooter.id = "info-footer";
    desktop.appendChild(infoFooter);

    async function getSystemData() {
        // Detectar Navegador
        let browser = "UNKNOWN";
        const ua = navigator.userAgent;
        if (ua.indexOf("Firefox") > -1) browser = "FIREFOX";
        else if (ua.indexOf("Chrome") > -1) browser = "GOOGLE_CHROME";
        else if (ua.indexOf("Safari") > -1) browser = "SAFARI";
        else if (ua.indexOf("Edge") > -1) browser = "MS_EDGE";

        // Detectar Sistema Operacional
        let os = "OS_UNKNOWN";
        const platform = navigator.platform.toLowerCase();
        if (platform.indexOf("win") !== -1) os = "WINDOWS_OS";
        else if (platform.indexOf("mac") !== -1) os = "MACOS";
        else if (platform.indexOf("linux") !== -1) os = "LINUX_SYS";
        else if (/android|iphone|ipad|ipod/.test(ua.toLowerCase())) os = "MOBILE_DEVICE";

        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            infoFooter.innerHTML = `
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
                        <span class="label">OS:</span> 
                        <span class="value">${os}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">LOC:</span> 
                        <span class="value">${data.city}, ${data.region_code}</span>
                    </div>
                </div>
            `;
        } catch (error) {
            infoFooter.innerHTML = `<span>[ SYSTEM_CORE_RECOVERY_MODE ]</span>`;
        }
    }

    getSystemData();
});
