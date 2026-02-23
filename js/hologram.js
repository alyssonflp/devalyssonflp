/**
 * Módulo Hologram Padrão - Alysson_OS
 */

const ICON_PATHS = {
    about: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    skills: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/>',
    experience: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    projects: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
    ia: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="12" r="3"/>'
};

export function toggleHologram(content, monitorRotationY = 0) {
    const container = document.getElementById('desktop-3d');
    if (!container) return;

    const existing = document.querySelector('.hologram-card');
    if (existing) {
        existing.classList.remove('hologram-active');
        setTimeout(() => existing.remove(), 400);
        if (existing.dataset.type === content.type) return;
    }

    const hologram = document.createElement('div');
    hologram.className = `hologram-card ${monitorRotationY > 0 ? 'pop-left' : 'pop-right'}`;
    hologram.dataset.type = content.type;

    // Template PADRÃO para todas as abas
    hologram.innerHTML = `
        <div class="hologram-inner">
            <div class="hologram-visual-header">
                <svg viewBox="0 0 24 24" class="hologram-main-icon" filter="url(#hologram-glow)">
                    ${ICON_PATHS[content.type] || ICON_PATHS.about}
                </svg>
                <div class="hologram-glitch-title">${content.title}</div>
            </div>
            
            <div class="hologram-content-area">
                ${content.body}
            </div>

            <div class="hologram-ui-footer">
                <span class="scan-status">DECODING_FILE...</span>
                <div class="hologram-bar"></div>
            </div>
        </div>
        <div class="projector-beam"></div>
    `;

    container.appendChild(hologram);
    setTimeout(() => hologram.classList.add('hologram-active'), 10);
}
