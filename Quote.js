async function fetchQuote() {
    try{
        const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
        const data = await response.json();

        if (data.success && data.data) {
            document.getElementById("quote").textContent = `${data.data.content}`;
            document.getElementById("author").textContent = `-${data.data.author}`;
        } else {
            document.getElementById("quote").textContent = "Failed to fetch quote.";
            document.getElementById("author").textContent = "";
        }

        changeBackground();

    }catch (error) {
        document.getElementById("quote").textContent = "Error fetching quote.";
        document.getElementById("author").textContent = "";
    }
}

function copyQuote() {
    const quoteText = document.getElementById("quote").textContent + " " + document.getElementById("author").textContent;
    navigator.clipboard.writeText(quoteText).then(() => {
        alert("Quote copied!");
    });
}

function shareOnTwitter() {
    const quoteText = document.getElementById("quote").textContent + " " + document.getElementById("author").textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText)}`;
    window.open(twitterUrl, "_blank");
}

function changeBackground() {
    const randomImage = `https://source.unsplash.com/1600x900/?nature,landscape,abstract`;
    document.body.style.backgroundImage = `url(${randomImage})`;
}

function exportAsImage() {
    const container = document.getElementById("quote-container");
    html2canvas(container).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "quote.png";
        link.click();
    });
}

fetchQuote();