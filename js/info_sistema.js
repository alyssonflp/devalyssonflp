// ======================================================
// System Info - IP + Browser + OS
// ======================================================

export async function initSystemInfo() {

    const footer = document.getElementById("info-footer");
    if (!footer) return;

    const ua = navigator.userAgent;
    const platform = navigator.platform;

    const browser =
        ua.includes("Edg") ? "EDGE" :
        ua.includes("Chrome") ? "CHROME" :
        ua.includes("Firefox") ? "FIREFOX" :
        ua.includes("Safari") ? "SAFARI" :
        "UNKNOWN";

    const os =
        platform.includes("Win") ? "WINDOWS" :
        platform.includes("Mac") ? "MACOS" :
        platform.includes("Linux") ? "LINUX" :
        "MOBILE";

    let ip = "N/A";
    let location = "UNKNOWN";

    const apis = [
        "https://ipapi.co/json/",
        "https://api.ipify.org?format=json"
    ];

    for (const api of apis) {
        try {
            const res = await fetch(api);
            if (!res.ok) continue;
            const data = await res.json();

            ip = data.ip || data.query || "N/A";
            location = data.city || location;
            break;

        } catch {}
    }

    footer.innerHTML = `
        <div class="footer-group">
            <div class="info-item"><span class="label">IP:</span> <span class="value">${ip}</span></div>
            <div class="info-item hide-mobile"><span class="label">BRW:</span> <span class="value">${browser}</span></div>
        </div>
        <div class="footer-group">
            <div class="info-item hide-mobile"><span class="label">SYS:</span> <span class="value">${os}</span></div>
            <div class="info-item"><span class="label">LOC:</span> <span class="value">${location}</span></div>
        </div>
    `;
}
