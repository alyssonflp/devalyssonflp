export async function initSystemInfo() {

    const footer = document.getElementById("info-footer");

    if (!footer) return;

    const ua = navigator.userAgent;

    footer.innerHTML = `
        <div style="color:lime;font-size:14px;">
            USER AGENT:<br>
            ${ua}
        </div>
    `;
}
