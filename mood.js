function saveMood(mood) {
    const moods = JSON.parse(localStorage.getItem("moodLogs")) || [];
    const newEntry = { mood, date: new Date().toISOString() };
    moods.push(newEntry);
    localStorage.setItem("moodLogs", JSON.stringify(moods));
    displayMoods();
}

function displayMoods() {
    const filter = document.getElementById("filter").value;
    const moodTimeline = document.getElementById("mood-timeline");
    const moods = JSON.parse(localStorage.getItem("moodLogs")) || [];
    const now = new Date();

    const filteredMoods = moods.filter(({ date }) => {
        const moodDate = new Date(date);
        if (filter === "day") return now - moodDate < 24 * 60 * 60 * 1000;
        if (filter === "week") return now - moodDate < 7 * 24 * 60 * 60 * 1000;
        if (filter === "month") return now - moodDate < 30 * 24 * 60 * 60 * 1000;
        return true;
    });

    moodTimeline.innerHTML = filteredMoods.length
        ? filteredMoods.map(entry => `
            <div class="timeline-entry">
                <strong>${entry.mood}</strong><br>
                <small>${new Date(entry.date).toDateString()}</small>
            </div>`).join("")
        : "<p>No moods recorded</p>";
}

window.onload = displayMoods;