document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".vote-button");
    const captchaButton = document.getElementById("captchaButton");
    const captchaStatus = document.getElementById("captchaStatus");
    const captchaAlert = document.getElementById("captchaAlert");
    const resultsButton = document.getElementById("resultsButton");
    const premiumButton = document.getElementById("premiumButton");
    let captchaVerified = false;

    // Check if user has already voted
    let userVoted = localStorage.getItem("userVoted") === "true";
    let isPremium = localStorage.getItem("isPremium") === "true";

    // If user has voted & is not premium, disable voting
    if (userVoted && !isPremium) {
        buttons.forEach(button => button.disabled = true);
        document.getElementById("voteStatus").innerText = "❌ You have already voted!";
    }

    // Voting process
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (!captchaVerified) {
                captchaAlert.classList.remove("hidden");
                captchaAlert.style.color = "red";
                captchaAlert.innerText = "⚠️ You must complete CAPTCHA first!";
                return;
            }

            if (userVoted && !isPremium) {
                alert("❌ You have already voted! Get Premium to vote again.");
                return;
            }

            captchaAlert.classList.add("hidden");

            let vote = button.dataset.option;
            let votes = JSON.parse(localStorage.getItem("votes")) || [];
            votes.push(vote);
            localStorage.setItem("votes", JSON.stringify(votes));

            document.getElementById("lastVote").innerText = `Last vote: ${vote}`;
            resultsButton.classList.remove("hidden");

            // Mark user as voted
            localStorage.setItem("userVoted", "true");
            userVoted = true;

            // Play vote sound
            let voteSound = new Audio("sounds/vote_sound.mp3");
            voteSound.play().catch(() => console.log("Sound file missing or blocked."));

            // Disable voting after submission
            if (!isPremium) {
                buttons.forEach(button => button.disabled = true);
                document.getElementById("voteStatus").innerText = "❌ You have already voted!";
            }
        });
    });

    // CAPTCHA Handling
    captchaButton.addEventListener("click", () => {
        captchaVerified = true;
        captchaStatus.innerText = "✅ Verified!";
        captchaButton.innerText = "[✔]";
        captchaButton.style.background = "#28a745";
        captchaAlert.classList.add("hidden"); // Hide warning after verifying
    });

    // Premium Button (Removes Vote Limit)
    premiumButton.addEventListener("click", () => {
        setTimeout(() => {
            alert("✅ Premium Democracy Activated! You can now vote unlimited times.");
            localStorage.setItem("isPremium", "true");
            isPremium = true;
            buttons.forEach(button => button.disabled = false);
            document.getElementById("voteStatus").innerText = "✅ Unlimited Voting Enabled!";
        }, 3000);
    });
});
