import { database, ref } from "./firebase-config.js";
import { getDatabase, set, update, increment, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

    // Firebase reference for votes
    const votesRef = ref(database, "votes");

    function generateCaptcha() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        captchaCodeElement.innerText = code;
        return code;
    }

    captchaVerify.addEventListener("click", () => {
        if (captchaInput.value.toUpperCase() === captchaCode) {
            captchaVerified = true;
            captchaStatus.innerText = "✅ Verified!";
            captchaStatus.style.color = "green";
        } else {
            captchaStatus.innerText = "❌ Incorrect CAPTCHA. Try again.";
            captchaStatus.style.color = "red";
            captchaCode = generateCaptcha();
            captchaInput.value = "";
        }
    });

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (!captchaVerified) {
                voteStatus.innerText = "❌ You must complete CAPTCHA before voting!";
                voteStatus.style.color = "red";
                return;
            }

            let vote = button.dataset.option;

            // Increment vote in Firebase
            const voteRef = ref(database, `votes/${vote}`);
            get(voteRef).then(snapshot => {
                if (snapshot.exists()) {
                    update(voteRef, { count: increment(1) });
                } else {
                    set(voteRef, { count: 1 });
                }
            });

            voteStatus.innerText = "✅ Vote successfully counted!";
            voteStatus.style.color = "green";

            resultsButton.classList.remove("hidden");
            setTimeout(() => {
                window.location.href = "results.html";
            }, 2000);
        });
    });
});
