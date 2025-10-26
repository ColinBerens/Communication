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
    const template = await loadTemplate('gamesCardTemplate.html'); // adjust path
    if (!template) return;
    const container = document.getElementById('game-list');
    if (!container) return;

    const template2 = await loadTemplate('gamesTemplate.html');
    if (!template2) return;
    const container2 = document.getElementById('gamesTemplate');
    if (!container2){
        console.log("fucked") 
        console.log(container2)
        return;
    }

    const stylecontainer = document.getElementById('game-list-style');
    if (!stylecontainer) return;
  
    stylecontainer.innerHTML = '<link rel="stylesheet" href="CSS/gamesCardTemplate.css"> \n <link rel="stylesheet" href="CSS/gamesTemplate.css">';

    const games: Game[] = [
        { thumbnail: 'IMAGES/Portfolio/FastneticInGame.png', title: 'Fastnetic', description: 'Fast-Paced Platformer', year: 2025 },
        { thumbnail: 'IMAGES/Portfolio/boom.png', title: 'Two Left Jams', description: 'Award Winning Coop Game', year: 2025 },
        { thumbnail: 'IMAGES/SnH+uH.png', title: 'Slother', description: 'Tower-Defence Game', year: 2024 }
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
    container2.appendChild(template2.content.cloneNode(true) as DocumentFragment);
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
});
