document.addEventListener("DOMContentLoaded", () => {
    function createAdPopup() {
        const adPopup = document.createElement("div");
        adPopup.className = "adPopup";

        adPopup.innerHTML = `
            <a class="adLink" href="ad.html">
                <img class="adImage" src="" alt="Advertisement">
            </a>
            <button class="closeAd">X</button>
        `;

        document.body.appendChild(adPopup);
        return adPopup;
    }

    const adImages = [
        "images/ad1.png", "images/ad2.png", "images/ad3.png", 
        "images/ad4.png", "images/ad5.png", "images/ad6.png", "images/ad7.png"
    ];

    function showAd() {
        let adPopup = createAdPopup();
        let adImage = adPopup.querySelector(".adImage");
        let randomIndex = Math.floor(Math.random() * adImages.length);
        adImage.src = adImages[randomIndex];

        let randomX = Math.floor(Math.random() * (window.innerWidth - 350));
        let randomY = Math.floor(Math.random() * (window.innerHeight - 250));
        adPopup.style.left = `${randomX}px`;
        adPopup.style.top = `${randomY}px`;

        adPopup.querySelector(".closeAd").addEventListener("click", () => {
            adPopup.remove();
        });

        setTimeout(showAd, 5000); // Show a new ad every 5 seconds
    }

    showAd();
});
