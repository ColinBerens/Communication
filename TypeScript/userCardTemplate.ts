interface Game {
    id: string;
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

    const stylecontainer = document.getElementById('game-list-style');
    if (!stylecontainer) return;
  
    stylecontainer.innerHTML = '<link rel="stylesheet" href="CSS/gamesCardTemplate.css"> \n <link rel="stylesheet" href="CSS/gamesTemplate.css">';

    const games: Game[] = [
        { id: 'Fastnetic', thumbnail: 'IMAGES/Portfolio/FastneticInGame.png', title: 'Fastnetic', description: 'Fast-Paced Platformer', year: 2025 },
        { id: 'TwoLeftJams', thumbnail: 'IMAGES/Portfolio/boom.png', title: 'Two Left Jams', description: 'Award Winning Coop Game', year: 2025 },
        { id: 'Slother', thumbnail: 'IMAGES/SnH+uH.png', title: 'Slother', description: 'Tower-Defence Game', year: 2024 }
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

        const button = clone.querySelector('.game-button') as HTMLButtonElement | null;
        console.log(button);
        if (button) {
            button.addEventListener('click', () => {
                console.log(`Navigating to game ID: ${game.id}`);
                window.location.href = `index.html?id=${game.id}`;
            });
        }
        container.appendChild(clone);
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', async () => {
    renderGames();

    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id");
    if (!gameId) {
        document.getElementById("gamesTemplate")!.innerHTML = "<h2>Game not found</h2>";
        return;
    }
        const template = await loadTemplate('gamesTemplate.html'); // adjust path
        if (!template) return;
        const container = document.getElementById('game-list');
        if (!container) return;
    try {
        const res = await fetch("Data/games.json");
        const games: any[] = await res.json(); // you can create an interface if desired
        const game = games.find((g: any) => g.id === gameId);

        if (!game) {
            document.getElementById("gamesTemplate")!.innerHTML = "<h2>Game not found</h2>";
            return;
        }

        const clone = template.content.cloneNode(true) as DocumentFragment;

        // Assign values from JSON
        clone.getElementById("game-name")!.querySelector("h2")!.textContent = game["game-name-h2"];
        const upperBoxText = clone.getElementById("game-upperbox-text")!;
        upperBoxText.querySelector("h3")!.textContent = game["game-upperbox-text-h3"];
        upperBoxText.querySelector("p")!.innerHTML = game["game-upperbox-text-p"];

        const lowerBoxText = clone.getElementById("game-lowerbox-text")!;
        const h3Elements = lowerBoxText.querySelectorAll("h3");
        const pElements = lowerBoxText.querySelectorAll("p");

        if (h3Elements[0]) h3Elements[0].textContent = game["game-lowerbox-text-h3"];
        if (pElements[0]) pElements[0].textContent = game["game-lowerbox-text-p"];
        if (h3Elements[1]) h3Elements[1].textContent = game["game-lowerbox-text-h3-02"];
        if (pElements[1]) pElements[1].textContent = game["game-lowerbox-text-p-02"];
        if (h3Elements[2]) h3Elements[2].textContent = game["game-lowerbox-text-h3-teammembers"];
        if (pElements[2]) pElements[2].innerHTML = game["Teammembers"];

        clone.getElementById("DownloadText")!.textContent = game["DownloadText"];
        const downloadLink = clone.querySelector("a") as HTMLAnchorElement;
        if (game["downloadlink"]) downloadLink.href = game["downloadlink"];
        else downloadLink.style.display = "none";

        // Images
        const mainImage = clone.querySelector("#game-upperbox img") as HTMLImageElement;
        const gameplayImage = clone.querySelector("#game-lowerbox img") as HTMLImageElement;
        if (mainImage) mainImage.src = game.IMAGES["image-01"];
        if (gameplayImage) gameplayImage.src = game.IMAGES["image-02"];

        container.appendChild(clone);
    } catch (error) {
        console.error("Error loading game data:", error);
        container.innerHTML = "<h2>Error loading game data</h2>";
    }
});