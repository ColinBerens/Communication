interface Game {
    thumbnail: string;
    title: string;
    description: string;
    year: number;
}

// Load the template from a separate HTML file
async function loadTemplate(url: string): Promise<HTMLTemplateElement | null> {
    const response = await fetch(url);
    const html = await response.text();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    return tempDiv.querySelector('template');
}

// Render games
async function renderGames() {
    const template = await loadTemplate('gamesTemplate.html'); // adjust path
    if (!template) return;

    const container = document.getElementById('game-list');
    if (!container) return;

    const games: Game[] = [
        { thumbnail: 'IMAGES/Fastnetic.png', title: 'Fastnetic', description: 'Cool concept', year: 2025 },
        { thumbnail: 'IMAGES/Portfolio/main_Screen.png', title: 'Two Left Jams', description: 'Fast-paced racing', year: 2025 }
    ];

    games.forEach(game => {
        const clone = template.content.cloneNode(true) as DocumentFragment;

        const thumbnail = clone.querySelector('.thumbnail') as HTMLImageElement | null;
        const title = clone.querySelector('.title') as HTMLElement | null;
        const description = clone.querySelector('.description') as HTMLElement | null;
        const year = clone.querySelector('.year') as HTMLElement | null;

        if (thumbnail) thumbnail.src = game.thumbnail;
        if (title) title.textContent = game.title;
        if (description) description.textContent = game.description;
        if (year) year.textContent = game.year.toString();

        container.appendChild(clone);
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
});
