export async function initSystemInfo() {

    const footer = document.getElementById("info-footer");

    if (!footer) {
        console.log("Footer não encontrado");
        return;
    }

    footer.innerHTML = `
        <div style="color:lime;font-size:16px;">
            SISTEMA ATIVO
        </div>
    `;
}
