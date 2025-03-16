document.addEventListener("DOMContentLoaded", () => {
    let votes = JSON.parse(localStorage.getItem("votes")) || [];
    let counts = { "Shrek": 0, "Big Chungus": 0, "Giga Chad": 0, "Mr. Krabs": 0 };

    votes.forEach(vote => { if (counts[vote] !== undefined) counts[vote]++; });

    new Chart(document.getElementById("voteChart"), {
        type: 'bar',
        data: { labels: Object.keys(counts), datasets: [{ label: "Votes", data: Object.values(counts), backgroundColor: ["green", "gray", "blue", "red"] }] }
    });
});
function resetVotes() {
    if (prompt("Enter admin password:") === "password1234") {
        localStorage.setItem("votes", JSON.stringify([]));
        alert("✅ All votes have been reset.");
        location.reload();
    } else {
        alert("❌ Incorrect password. Access denied.");
    }
}

