async function loadConfig() {
    try {
        const response = await fetch('./data/config.json');
        const config = await response.json();

        // Update the Browser Tab Title
        document.title = config.gameTitle;

        // Update the Game Title in the HTML
        // Note: Make sure your HTML elements have these IDs!
        if (document.getElementById('game-title')) {
            document.getElementById('game-title').innerText = config.gameTitle;
        }

        if (document.getElementById('entry-link')) {
            document.getElementById('entry-link').innerText = config.entryText;
        }

    } catch (error) {
        console.error("Error loading config:", error);
    }

}

// Run this when the page loads
window.onload = loadConfig;

