document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ results.js is running!");

    const resultsContainer = document.getElementById("resultsContainer");

    if (!resultsContainer) {
        console.error("❌ Error: 'resultsContainer' not found in results.html!");
        return;
    }

    let votes = JSON.parse(localStorage.getItem("votes")) || {};

    // ✅ Add random votes (10-30) to each candidate, even if they already have votes
    let candidates = ["Shrek", "Big Chungus", "Giga Chad", "Mr. Krabs"];

    candidates.forEach(candidate => {
        if (!votes[candidate]) votes[candidate] = 0; // If missing, start at 0
        votes[candidate] += getRandomVotes(); // Always add random votes
    });

    // ✅ Store updated results back in localStorage
    localStorage.setItem("votes", JSON.stringify(votes));

    console.log("Updated Votes:", votes);

    let resultsHTML = "<h2>🗳️ Voting Results</h2><ul>";

    Object.entries(votes).forEach(([candidate, count]) => {
        resultsHTML += `<li><strong>${candidate}:</strong> ${count} votes</li>`;
    });

    resultsHTML += "</ul>";
    resultsContainer.innerHTML = resultsHTML;
});

// ✅ Function to generate random vote numbers (10-30)
function getRandomVotes() {
    return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
}
