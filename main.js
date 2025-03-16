document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".vote-button");
    const captchaCodeElement = document.getElementById("captchaCode");
    const captchaInput = document.getElementById("captchaInput");
    const captchaVerify = document.getElementById("captchaVerify");
    const captchaStatus = document.getElementById("captchaStatus");
    const voteStatus = document.getElementById("voteStatus");
    const resultsButton = document.getElementById("results-btn");

    let captchaCode = generateCaptcha();
    let captchaVerified = false;
    let buttonMoved = {}; // Track if a button has moved

    // Generate a random CAPTCHA
    function generateCaptcha() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        captchaCodeElement.innerText = code;
        return code;
    }

    // CAPTCHA Verification
    captchaVerify.addEventListener("click", () => {
        if (captchaInput.value.toUpperCase() === captchaCode) {
            captchaVerified = true;
            captchaStatus.innerText = "✅ Verified!";
            captchaStatus.style.color = "green";
        } else {
            captchaStatus.innerText = "❌ Incorrect CAPTCHA. Try again.";
            captchaStatus.style.color = "red";
            captchaCode = generateCaptcha(); // Regenerate CAPTCHA
            captchaInput.value = ""; // Clear input field
        }
    });

    // Move Vote Button Slightly (x=60, y=30), Only Once Per Button
    buttons.forEach(button => {
        buttonMoved[button.dataset.option] = false;

        button.addEventListener("mouseover", () => {
            if (!buttonMoved[button.dataset.option]) {
                button.style.transform = "translateX(60px) translateY(30px)";
                buttonMoved[button.dataset.option] = true; // Prevent further movement
            }
        });

        button.addEventListener("click", () => {
            if (!captchaVerified) {
                voteStatus.innerText = "❌ You must complete CAPTCHA before voting!";
                voteStatus.style.color = "red";
                return;
            }

            let vote = button.dataset.option;
            let votes = JSON.parse(localStorage.getItem("votes")) || [];
            votes.push(vote);
            localStorage.setItem("votes", JSON.stringify(votes));

            voteStatus.innerText = "✅ Vote successfully counted!";
            voteStatus.style.color = "green";

            resultsButton.classList.remove("hidden"); // Show Results button
            setTimeout(() => {
                window.location.href = "results.html";
            }, 2000);
        });
    });
});
