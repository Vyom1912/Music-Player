const song = document.getElementById("song");
const progress = document.getElementById("progress");
const ctrlIcon = document.getElementById("ctrlIcon");

// Set max progress bar value once metadata is loaded
song.onloadedmetadata = () => {
  progress.max = song.duration;
};

// Play/Pause toggle
function togglePlayPause() {
  if (song.paused) {
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
  } else {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  }
}

// Update progress bar as song plays
song.addEventListener("timeupdate", () => {
  progress.value = song.currentTime;
});

// Seek to different time
progress.oninput = () => {
  song.currentTime = progress.value;
};

// Restart song from beginning
function restartSong() {
  song.currentTime = 0;
  song.play();
  ctrlIcon.classList.remove("fa-play");
  ctrlIcon.classList.add("fa-pause");
}
