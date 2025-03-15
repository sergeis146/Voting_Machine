document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".vote-button");
    const lastVoteText = document.getElementById("lastVote").querySelector("span");
    const progressBarContainer = document.querySelector(".democracy-bar");
    const progressBar = document.querySelector(".bar-progress");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const vote = button.dataset.option;

            // Show the progress bar
            progressBarContainer.style.display = "block";
            progressBar.style.width = "0%"; // Reset progress

            // Start filling bar
            setTimeout(() => {
                progressBar.style.width = "100%";
            }, 100);

            // Fake delay for "processing"
            lastVoteText.innerText = "Processing vote...";
            setTimeout(() => {
                lastVoteText.innerText = vote;

                // Hide the progress bar once vote is counted
                progressBarContainer.style.display = "none";
                progressBar.style.width = "0%"; // Reset blue bar immediately
            }, Math.random() * 3000 + 1000);

            // Useless confirmation
            setTimeout(() => {
                alert("Thank you for voting. Your opinion matters! (It doesn't.)");
            }, 3000);
        });
    });
});
