console.log("🚀 ads.js is loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Ads script loaded!"); // Debugging: Ensure script runs

    const adImages = [
        "images/ad1.png",
        "images/ad2.png",
        "images/ad3.png",
        "images/ad4.png",
        "images/ad5.png",
        "images/ad6.png",
        "images/ad7.png",
        "images/ad8.png",
        "images/ad9.png",
        "images/ad10.png",
        "images/ad11.png",
        "images/ad12.png",
        "images/ad13.png",
        "images/ad14.png",
        "images/ad15.png",
        "images/ad16.png",
        "images/ad17.png",
        "images/ad18.png"
    ];

    function createAdPopup() {
        console.log("🚀 Creating ad popup..."); // Debugging: Check if function runs

        // Create the ad container
        const adContainer = document.createElement("div");
        adContainer.classList.add("adPopup");

        // Select a random ad image
        const randomAd = adImages[Math.floor(Math.random() * adImages.length)];
        console.log("🎯 Random ad chosen:", randomAd); // Debugging: Check if ad image is picked

        const adImage = document.createElement("img");
        adImage.src = randomAd;
        adImage.classList.add("adImage");

        // Close button
        const closeButton = document.createElement("button");
        closeButton.innerText = "❌";
        closeButton.classList.add("closeAd");
        closeButton.onclick = () => adContainer.remove();

        // Clicking the ad sends the user to `ad.html`
        adImage.onclick = () => {
            console.log("🔗 Ad clicked, redirecting...");
            window.location.href = "ad.html";
        };

        // Add elements to the ad container
        adContainer.appendChild(adImage);
        adContainer.appendChild(closeButton);
        document.body.appendChild(adContainer);

        // Random positioning
        adContainer.style.position = "fixed";
        adContainer.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
        adContainer.style.left = `${Math.random() * (window.innerWidth - 200)}px`;

        console.log(`📍 Ad placed at: ${adContainer.style.top}, ${adContainer.style.left}`);
    }

    // ✅ Force-Show First Ad Immediately
    createAdPopup();

    // ✅ Show a new ad every 5 seconds
    setInterval(createAdPopup, 10000);
});
