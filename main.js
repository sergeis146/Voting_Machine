document.addEventListener("DOMContentLoaded", () => {
    const voteButtons = document.querySelectorAll(".vote-button");
    const captchaCodeElement = document.getElementById("captchaCode");
    const captchaInput = document.getElementById("captchaInput");
    const captchaVerify = document.getElementById("captchaVerify");
    const resultsButton = document.getElementById("results-btn");
    const buyVotesButton = document.getElementById("buyVotesButton");
    const voteAmountInput = document.getElementById("voteAmount");
    const userBalanceDisplay = document.getElementById("userBalance");
    const userVotesDisplay = document.getElementById("userVotes");

    let captchaCode = "";
    let captchaVerified = false;
    let userBalance = localStorage.getItem("userBalance") ? parseInt(localStorage.getItem("userBalance")) : 100;
    let userVotes = localStorage.getItem("userVotes") ? parseInt(localStorage.getItem("userVotes")) : 1;

    userBalanceDisplay.innerText = userBalance;
    userVotesDisplay.innerText = userVotes;

    // ✅ Generate a random CAPTCHA
    function generateCaptcha() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        captchaCode = code;
        captchaCodeElement.innerText = `🔒 ${captchaCode}`;
    }

    generateCaptcha();

    // ✅ CAPTCHA Verification
    captchaVerify.addEventListener("click", () => {
        if (captchaInput.value.toUpperCase() === captchaCode) {
            alert("✅ CAPTCHA Verified!");
            captchaVerified = true;
            captchaVerify.disabled = true;
            captchaInput.disabled = true;
            captchaInput.style.backgroundColor = "lightgreen";
        } else {
            alert("❌ Incorrect CAPTCHA! Try again.");
            captchaInput.style.backgroundColor = "pink";
            generateCaptcha();
        }
    });

    // ✅ Buying Extra Votes
    buyVotesButton.addEventListener("click", () => {
        let amount = parseInt(voteAmountInput.value);

        if (isNaN(amount) || amount < 1) {
            alert("❌ Enter a valid number of votes.");
            return;
        }

        let totalCost = amount * 5;
        if (userBalance < totalCost) {
            alert("❌ Not enough money! Earn more fake money.");
            return;
        }

        userBalance -= totalCost;
        userVotes += amount;
        localStorage.setItem("userBalance", userBalance);
        localStorage.setItem("userVotes", userVotes);
        userBalanceDisplay.innerText = userBalance;
        userVotesDisplay.innerText = userVotes;

        alert(`✅ You bought ${amount} extra votes!`);
    });

    // ✅ Make vote buttons move ONCE
    voteButtons.forEach(button => {
        button.addEventListener("mouseover", () => {
            if (!button.classList.contains("moved")) {
                button.classList.add("moved");
                button.style.transform = "translate(50px, 50px)";
            }
        });

        // ✅ Prevent voting if out of votes
        button.addEventListener("click", () => {
            if (!captchaVerified) {
                alert("❌ Complete CAPTCHA first!");
                return;
            }

            if (userVotes < 1) {
                alert("❌ You have no votes left! Buy more.");
                return;
            }

            let vote = button.dataset.option;
            let votes = JSON.parse(localStorage.getItem("votes")) || {};

            votes[vote] = (votes[vote] || 0) + 1;
            userVotes -= 1;

            localStorage.setItem("votes", JSON.stringify(votes));
            localStorage.setItem("userVotes", userVotes);
            userVotesDisplay.innerText = userVotes;

            alert(`✅ You cast a vote for ${vote}!`);
        });
    });

    // ✅ View Results Button
    resultsButton.addEventListener("click", () => {
        window.location.href = "results.html";
    });
});
