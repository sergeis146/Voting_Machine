document.addEventListener("DOMContentLoaded", () => {
    const voteButtons = document.querySelectorAll(".vote-button");
    const captchaCodeElement = document.getElementById("captchaCode");
    const captchaInput = document.getElementById("captchaInput");
    const captchaVerify = document.getElementById("captchaVerify");
    const resultsButton = document.getElementById("results-btn");
    const buyVotesButton = document.getElementById("buyVotesButton");
    const userVotesDisplay = document.getElementById("userVotes");

    let captchaCode = "";
    let captchaVerified = false;
    let userVotes = localStorage.getItem("userVotes") ? parseInt(localStorage.getItem("userVotes")) : 1;
    let voteCount = localStorage.getItem("voteCount") ? parseInt(localStorage.getItem("voteCount")) : 0;
    
    userVotesDisplay.innerText = userVotes;

    // ✅ Generate CAPTCHA based on vote count (Starts at 6 chars, adds 2 each vote)
    function generateCaptcha() {
        let length = 6 + (voteCount * 2); // 6 chars + 2 per vote
        captchaCode = generateRandomString(length);
        captchaCodeElement.innerText = `🔒 Type this: ${captchaCode}`;

        // ✅ Reset input field
        captchaInput.value = "";
        captchaVerified = false;
        captchaVerify.disabled = false;
        captchaInput.disabled = false;
        captchaInput.style.backgroundColor = "white";
    }

    generateCaptcha();

    // ✅ CAPTCHA Verification
    captchaVerify.addEventListener("click", () => {
        if (captchaInput.value.trim().toUpperCase() === captchaCode) {
            alert("✅ CAPTCHA Verified!");
            captchaVerified = true;
            captchaVerify.disabled = true;
            captchaInput.disabled = true;
            captchaInput.style.backgroundColor = "lightgreen";
        } else {
            alert("❌ CAPTCHA failed! Try again.");
            captchaInput.style.backgroundColor = "pink";
            captchaInput.value = "";
        }
    });

    // ✅ Simple random character generator
    function generateRandomString(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < length; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
    }

    // ✅ Buying Extra Votes (Unlimited Purchases)
    buyVotesButton.addEventListener("click", () => {
        userVotes += 1;
        localStorage.setItem("userVotes", userVotes);
        userVotesDisplay.innerText = userVotes;
        alert("✅ Vote purchased successfully!");
    });

    // ✅ Voting Function
    voteButtons.forEach(button => {
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
            voteCount += 1;

            localStorage.setItem("votes", JSON.stringify(votes));
            localStorage.setItem("userVotes", userVotes);
            localStorage.setItem("voteCount", voteCount);
            userVotesDisplay.innerText = userVotes;

            alert(`✅ You cast a vote for ${vote}!`);
            generateCaptcha(); // ✅ New CAPTCHA after each vote
        });
    });

    resultsButton.addEventListener("click", () => {
        window.location.href = "results.html";
    });
});
