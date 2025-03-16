document.addEventListener("DOMContentLoaded", () => {
    let votes = JSON.parse(localStorage.getItem("votes")) || [];

    let counts = {
        "Shrek": 0,
        "Big Chungus": 0,
        "Giga Chad": 0,
        "Mr. Krabs": 0
    };

    votes.forEach(vote => {
        if (counts[vote] !== undefined) counts[vote]++;
    });

    new Chart(document.getElementById("voteChart"), {
        type: 'bar',
        data: {
            labels: Object.keys(counts),
            datasets: [{
                label: "Total Votes",
                data: Object.values(counts),
                backgroundColor: ["green", "gray", "blue", "red"]
            }]
        }
    });
});

// Admin Reset Function
function resetVotes() {
    let password = prompt("Enter admin password:");
    if (password === "password1234") {
        localStorage.setItem("votes", JSON.stringify([]));
        alert("All votes have been reset.");
        location.reload();
    } else {
        alert("Incorrect password.");
    }
}
