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
    let voteCount = localStorage.getItem("voteCount") ? parseInt(localStorage.getItem("voteCount")) : 0;

    userBalanceDisplay.innerText = userBalance;
    userVotesDisplay.innerText = userVotes;

    // ✅ Generate a CAPTCHA based on vote count
    function generateCaptcha() {
        voteCount = parseInt(localStorage.getItem("voteCount")) || 0;

        if (voteCount < 5) {
            // 🟢 Text CAPTCHA (6+ chars)
            let length = 6 + voteCount * 2;
            captchaCode = generateRandomString(length);
            captchaCodeElement.innerText = `🔒 Type this: ${captchaCode}`;

        } else if (voteCount < 7) {
            // 🔢 Math CAPTCHA (Basic → Harder)
            captchaCode = generateMathProblem(voteCount);
            captchaCodeElement.innerText = `🔢 Solve: ${captchaCode.problem}`;
            
        } else if (voteCount < 9) {
            // 📜 Copy Text CAPTCHA
            let sentences = [
                "Democracy is a scam, but we do it anyway.",
                "In a fair election, only money wins.",
                "The quick brown fox jumps over the lazy dog."
            ];
            captchaCode = sentences[voteCount - 7];
            captchaCodeElement.innerText = `📜 Type exactly: "${captchaCode}"`;
            
        } else if (voteCount < 12) {
            // 🧮 Brutal Math (Algebra, Logs)
            captchaCode = generateAdvancedMath(voteCount);
            captchaCodeElement.innerText = `🧮 Solve: ${captchaCode.problem}`;
            
        } else if (voteCount < 14) {
            // 🎭 Image CAPTCHA (Invisible Objects)
            captchaCode = "Click the invisible bicycles (good luck)";
            captchaCodeElement.innerText = `🎭 ${captchaCode}`;
            
        } else if (voteCount < 16) {
            // ⌨️ Typing Speed Challenge
            let longText = "In this democracy, speed matters more than fairness.";
            captchaCode = longText;
            captchaCodeElement.innerText = `⌨️ Type this FAST: "${captchaCode}"`;
            
        } else if (voteCount < 18) {
            // 🧩 Jigsaw Puzzle CAPTCHA
            captchaCode = "Complete this puzzle... Oh wait, it's broken.";
            captchaCodeElement.innerText = `🧩 ${captchaCode}`;
            
        } else {
            // 📝 Full Essay Challenge
            captchaCode = "Write 200 words on 'Why democracy is important'.";
            captchaCodeElement.innerText = `📝 ${captchaCode}`;
        }

        captchaInput.value = ""; // ✅ Clear input field every time a new CAPTCHA is generated
        captchaVerified = false;
        captchaVerify.disabled = false;
        captchaInput.disabled = false;
        captchaInput.style.backgroundColor = "white";
    }

    generateCaptcha();

    // ✅ CAPTCHA Verification
    captchaVerify.addEventListener("click", () => {
        let userAnswer = captchaInput.value.trim();

        if (voteCount < 5 && userAnswer.toUpperCase() === captchaCode) {
            passCaptcha();
        } else if (voteCount < 7 && eval(captchaCode.answer) === parseFloat(userAnswer)) {
            passCaptcha();
        } else if (voteCount < 9 && userAnswer === captchaCode) {
            passCaptcha();
        } else if (voteCount < 12 && eval(captchaCode.answer) === parseFloat(userAnswer)) {
            passCaptcha();
        } else if (voteCount < 14 && Math.random() > 0.5) { // 50% chance of failing
            passCaptcha();
        } else if (voteCount < 16 && userAnswer === captchaCode) {
            passCaptcha();
        } else if (voteCount < 18 && Math.random() > 0.7) { // 30% chance of failing
            passCaptcha();
        } else if (voteCount >= 18 && userAnswer.length >= 200) {
            passCaptcha();
        } else {
            alert("❌ CAPTCHA failed! Try again.");
            captchaInput.style.backgroundColor = "pink";
            captchaInput.value = "";  // ✅ Clears input on failure
            generateCaptcha();
        }
    });

    function passCaptcha() {
        alert("✅ CAPTCHA Verified!");
        captchaVerified = true;
        captchaVerify.disabled = true;
        captchaInput.disabled = true;
        captchaInput.style.backgroundColor = "lightgreen";
    }

    function generateRandomString(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < length; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
    }

    function generateMathProblem(level) {
        if (level === 5) return { problem: "12 + 23 - 5", answer: 30 };
        if (level === 6) return { problem: "45 × 2 ÷ 3", answer: 30 };
    }

    function generateAdvancedMath(level) {
        if (level === 9) return { problem: "3x + 4 = 19, find x", answer: 5 };
        if (level === 10) return { problem: "Solve: (5/2) × (8/4)", answer: 5 };
        if (level === 11) return { problem: "log₂ 32 = ?", answer: 5 };
    }

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
            generateCaptcha();
        });
    });

    // ✅ View Results Button
    resultsButton.addEventListener("click", () => {
        window.location.href = "results.html";
    });
});
