/**
 * Módulo Hologram Direcional - Alysson_OS
 */

export function toggleHologram(content, monitorRotationY = 0) {
    const container = document.getElementById('desktop-3d');
    if (!container) return;

    // Se já houver um holograma, removemos para dar lugar ao novo (ou fechar)
    const existingHologram = document.querySelector('.hologram-card');
    if (existingHologram) {
        existingHologram.classList.remove('hologram-active');
        setTimeout(() => existingHologram.remove(), 400);
        // Se o conteúdo for o mesmo, apenas fechamos
        if (existingHologram.dataset.type === content.type) return;
    }

    // Criar o elemento do holograma
    const hologram = document.createElement('div');
    hologram.className = 'hologram-card';
    hologram.dataset.type = content.type;

    // Definir a direção baseada na rotação do monitor
    // Se monitorRotationY > 0 (olhando para direita), projetar para a ESQUERDA
    const directionClass = monitorRotationY > 0 ? 'pop-left' : 'pop-right';
    hologram.classList.add(directionClass);

    hologram.innerHTML = `
        <div class="hologram-header">
            <span class="hologram-title">PROJEÇÃO: ${content.title}</span>
            <div class="hologram-close">×</div>
        </div>
        <div class="hologram-body">
            ${content.body}
        </div>
        <div class="hologram-footer">
            <div class="scanline"></div>
            <span>STATUS: ACTIVE_LINK</span>
        </div>
        <div class="projector-beam"></div>
    `;

    container.appendChild(hologram);

    // Pequeno delay para disparar a animação CSS
    setTimeout(() => {
        hologram.classList.add('hologram-active');
    }, 10);

    // Fechar ao clicar no "X"
    hologram.querySelector('.hologram-close').onclick = () => {
        hologram.classList.remove('hologram-active');
        setTimeout(() => hologram.remove(), 400);
    };
}
