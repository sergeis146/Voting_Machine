document.addEventListener("DOMContentLoaded", () => {
    const resultsList = document.getElementById("results-list");
    const resetBtn = document.getElementById("reset-btn");

    let votes = JSON.parse(localStorage.getItem("votes")) || {
        "Shrek": 0,
        "Big Chungus": 0,
        "Giga Chad": 0,
        "Mr. Krabs": 0
    };

    resultsList.innerHTML = `
        <li><strong>Shrek:</strong> ${votes["Shrek"]} votes</li>
        <li><strong>Big Chungus:</strong> ${votes["Big Chungus"]} votes</li>
        <li><strong>Giga Chad:</strong> ${votes["Giga Chad"]} votes</li>
        <li><strong>Mr. Krabs:</strong> ${votes["Mr. Krabs"]} votes</li>
    `;

    // ✅ Reset Votes Button
    resetBtn.addEventListener("click", () => {
        let password = prompt("Enter admin password:");
        if (password === "password1234") {
            localStorage.removeItem("votes");
            localStorage.removeItem("hasVoted");
            alert("✅ All votes have been reset.");
            location.reload();
        } else {
            alert("❌ Incorrect password.");
        }
    });
});
