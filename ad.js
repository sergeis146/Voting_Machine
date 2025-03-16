document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ ad.js Loaded!"); // Debugging check

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressPercent");
    const fileName = document.getElementById("fileName");
    const cancelButton = document.getElementById("cancelButton");

    if (!progressBar || !progressText || !fileName || !cancelButton) {
        console.error("❌ ERROR: One or more elements not found!");
        return;
    }

    console.log("✅ Elements found. Starting fake download...");

    const fakeFiles = [
        "passwords_export.csv",
        "bank_statements_2024.pdf",
        "browsing_history.html",
        "social_security_info.txt",
        "crypto_wallet_keys.dat",
        "contacts_list.vcf",
        "confidential_government_docs.zip",
        "sensitive_data.zip"
    ];

    let progress = 0;

    function updateProgress() {
        if (progress < 100) {
            let increase = Math.floor(Math.random() * 8) + 3; // Increase by 3-10%
            progress += increase;
            if (progress > 100) progress = 100; // Ensure it stops at 100%

            console.log(`🔄 Progress: ${progress}%`); // Debugging log

            progressBar.style.width = progress + "%";
            progressText.innerText = progress + "%";

            setTimeout(updateProgress, Math.random() * 1200 + 300); // Random delay between 0.3s - 1.2s
        } else {
            console.log("✅ Fake download complete!");
            setTimeout(() => {
                document.body.innerHTML = `
                    <div class="transfer-complete">
                        <h1>✅ Transfer Complete</h1>
                        <p>Your data has been successfully downloaded.</p>
                        <p class="warning">⚠️ If this was a mistake, please contact our support team... Oh wait, you can't. 😈</p>
                        <button id="returnButton">⬅ Return to Voting</button>
                    </div>
                `;

                document.getElementById("returnButton").addEventListener("click", () => {
                    window.location.href = "vote.html";
                });
            }, 2000);
        }
    }

    function startFakeDownload() {
        console.log("🚀 Starting fake download...");
        setTimeout(updateProgress, 1000); // Start after 1 second
    }

    // Change fake file names every 1.5 seconds
    setInterval(() => {
        let newFile = fakeFiles[Math.floor(Math.random() * fakeFiles.length)];
        console.log(`📂 New file: ${newFile}`); // Debugging log
        fileName.innerText = newFile;
    }, 1500);

    // Fake "Stop Transfer" button error
    cancelButton.addEventListener("click", () => {
        console.log("❌ Cancel button clicked!");
        alert("❌ ERROR: Transfer cannot be canceled.");
    });

    startFakeDownload();
});
