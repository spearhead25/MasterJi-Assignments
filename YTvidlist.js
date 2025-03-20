const API_URL = "https://api.freeapi.app/api/v1/public/youtube/videos";
let videos = [];

async function fetchVideos(){
    try{
        const response = await fetch(API_URL);
        const data = await response.json();

        if(data.success && data.data) {
            videos = data.data;
            displayVideos(videos);
        } else {
            throw new Error("Invalid API response");
        }
    } catch(error) {
        console.error("Error fetching videos:", error);
        document.getElementById("videoList").innerHTML = "<p>Failed to load videos.</p>";
    }
}

function displayVideos(videoArray) {
    const videoContainer = document.getElementById("videoList");
    videoContainer.innerHTML = "";

    videoArray.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">
            <div class="title">${video.title}</div>
            <div class="channel">${video.channel}</div>
        `;

        videoCard.addEventListener("click", () => {
            window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank");
        });

        videoContainer.appendChild(videoCard);
    });
}

document.getElementById("search").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchText) ||
    video.channel.toLowerCase().includes(searchText)
    );
    displayVideos(filteredVideos);
});

fetchVideos();