"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Load the template from a separate HTML file
function loadTemplate(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const html = yield response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.querySelector('template');
    });
}
// Render games
function renderGames() {
    return __awaiter(this, void 0, void 0, function* () {
        const template = yield loadTemplate('gamesTemplate.html'); // adjust path
        if (!template)
            return;
        const container = document.getElementById('game-list');
        if (!container)
            return;
        const games = [
            { thumbnail: 'IMAGES/Fastnetic.png', title: 'Fastnetic', description: 'Cool concept', year: 2025 },
            { thumbnail: 'IMAGES/Portfolio/main_Screen.png', title: 'Two Left Jams', description: 'Fast-paced racing', year: 2025 }
        ];
        games.forEach(game => {
            const clone = template.content.cloneNode(true);
            const thumbnail = clone.querySelector('.thumbnail');
            const title = clone.querySelector('.title');
            const description = clone.querySelector('.description');
            const year = clone.querySelector('.year');
            if (thumbnail)
                thumbnail.src = game.thumbnail;
            if (title)
                title.textContent = game.title;
            if (description)
                description.textContent = game.description;
            if (year)
                year.textContent = game.year.toString();
            container.appendChild(clone);
        });
    });
}
// Call on page load
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
});
