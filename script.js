const songs = [
  {
    title: "All to Well",
    artist: "Taylor Swift",
    src: "Music/all to well.mp3",
    img: "image/all to well.jpg",
  },
  {
    title: "Blue",
    artist: "Yang kai",
    src: "Music/blue.mp3",
    img: "image/blue.jpeg",
  },
  {
    title: "Bundle of Joy",
    artist: "Inside Out Ft. Pixar",
    src: "Music/Bundle of Joy.mp3",
    img: "image/bundle of joy.jpg",
  },
  {
    title: "Dandelion",
    artist: "Ruth B",
    src: "Music/dandelions.mp3",
    img: "image/dandelions.jpeg",
  },
  {
    title: "End of beginning",
    artist: "Djo",
    src: "Music/end of beginning.mp3",
    img: "image/end of beginning.jpg",
  },
  {
    title: "Game of Thrones Theme",
    artist: "GOT",
    src: "Music/got.mp3",
    img: "image/got.jpg",
  },
  {
    title: "Marvel",
    artist: "Marvel",
    src: "Music/marvel.mp3",
    img: "image/marvel.jpeg",
  },
  {
    title: "Runaway",
    artist: "Aurora",
    src: "Music/runaways.mp3",
    img: "image/runaway.jpeg",
  },
  {
    title: "Snap",
    artist: "Rosa Linn",
    src: "Music/snap.mp3",
    img: "image/snap.jpeg",
  },
];

let currentSong = 0;
const favorites = new Set();

const song = document.getElementById("song");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const songImg = document.getElementById("songImg");
const progress = document.getElementById("progress");
const ctrlIcon = document.getElementById("ctrlIcon");
const searchBar = document.getElementById("searchBar");
const playlistDiv = document.getElementById("playlistDiv");
const volumeControl = document.getElementById("volumeControl");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const favBtn = document.getElementById("favBtn");
const musicPlayer = document.getElementById("musicPlayer"); // ✅ Add this line

function loadSong(index) {
  const s = songs[index];
  song.src = s.src;
  songTitle.textContent = s.title;
  songArtist.textContent = s.artist;
  songImg.src = s.img;
  progress.value = 0;
  song.load();
  song.play();
  updateFavoriteIcon();
  ctrlIcon.classList.remove("fa-play");
  ctrlIcon.classList.add("fa-pause");
  localStorage.setItem("lastPlayed", index);
  displaySongs();
}

const lastPlayedIndex = localStorage.getItem("lastPlayed");
if (lastPlayedIndex !== null && !isNaN(lastPlayedIndex)) {
  currentSong = parseInt(lastPlayedIndex, 10);
}

let isPlaying = false;

function togglePlayPause() {
  if (song.paused || song.ended) {
    song.play();
    isPlaying = true;
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
  } else {
    song.pause();
    isPlaying = false;
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
}

function previousSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
}

let isLooping = false;
let isShuffleOn = false;

function shuffleSongs() {
  isShuffleOn = !isShuffleOn;
  const shuffleBtn = document.querySelector(".fa-random");

  if (isShuffleOn) {
    playRandomSong();
    shuffleBtn.style.color = "var(--basic-color)";
    shuffleBtn.style.background = "var(--secondary-color)";
  } else {
    shuffleBtn.style.color = "var(--secondary-color)";
    shuffleBtn.style.background = "var(--basic-color)";
  }
}

function playRandomSong() {
  currentSong = Math.floor(Math.random() * songs.length);
  loadSong(currentSong);
}

function toggleLoop() {
  isLooping = !isLooping;
  const loopBtn = document.querySelector(".fa-repeat");
  loopBtn.style.color = isLooping
    ? "var(--basic-color)"
    : "var(--secondary-color)";
  loopBtn.style.background = isLooping
    ? "var(--secondary-color)"
    : "var(--basic-color)";
  song.loop = isLooping;
}

function toggleFavorite() {
  const title = songs[currentSong].title;
  if (favorites.has(title)) {
    favorites.delete(title);
  } else {
    favorites.add(title);
  }
  updateFavoriteIcon();
}

function updateFavoriteIcon() {
  const title = songs[currentSong].title;
  favBtn.classList.toggle("fas", favorites.has(title));
  favBtn.classList.toggle("far", !favorites.has(title));
}

function downloadCurrentSong() {
  const link = document.createElement("a");
  link.href = song.src; // This must be a valid URL
  link.setAttribute("download", `${songs[currentSong].title}.mp3`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

song.ontimeupdate = () => {
  progress.value = song.currentTime;
  currentTimeDisplay.textContent = formatTime(song.currentTime);
};

song.onloadedmetadata = () => {
  progress.max = song.duration;
  durationDisplay.textContent = formatTime(song.duration);
};

progress.oninput = () => {
  song.currentTime = progress.value;
};

volumeControl.oninput = () => {
  song.volume = volumeControl.value;
};

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

// ✅ Search and filter
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();

  if (window.innerWidth <= 550) {
    musicPlayer.classList.remove("show");
    song.pause();
  }

  const filtered = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
  );

  playlistDiv.innerHTML = "";

  filtered.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "song-item";
    div.innerHTML = `<img src="${song.img}" /><div><strong>${song.title}</strong><br/><small>${song.artist}</small></div>`;
    div.onclick = () => {
      currentSong = songs.findIndex((s) => s.title === song.title);
      loadSong(currentSong);

      // ✅ Clear search
      searchBar.value = "";

      // ✅ Show player on small screens
      if (window.innerWidth <= 550) {
        musicPlayer.classList.add("show");
      }

      // ✅ Restore full song list
      displaySongs();
    };
    playlistDiv.appendChild(div);
  });
});

// ✅ Show full song list
function displaySongs() {
  playlistDiv.innerHTML = songs
    .map((song, index) => {
      return `<div class="song-item" data-index="${index}" onclick="songItemClick(${index})">
        <img src="${song.img}" alt="Song Image" />
        <span>${song.title}</span>
      </div>`;
    })
    .join("");
}
// function displaySongs() {
//   playlistDiv.innerHTML = songs
//     .map((song, index) => {
//       const isActive = index === currentSong ? "active-song" : "";
//       return `<div class="song-item ${isActive}" data-index="${index}" onclick="songItemClick(${index})">
//         <img src="${song.img}" alt="Song Image" />
//         <span>${song.title}</span>
//       </div>`;
//     })
//     .join("");

//   // Scroll into view for active song
//   const activeItem = playlistDiv.querySelector(".song-item.active-song");
//   if (activeItem) {
//     activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
//   }
// }

// ✅ Load initial list and last song
displaySongs();
loadSong(currentSong);

// ✅ Song Item Click
function songItemClick(index) {
  loadSong(index);
  if (window.innerWidth <= 550) {
    musicPlayer.classList.add("show");
  }
}

// ✅ Go Back Button
function goBackToList() {
  if (window.innerWidth <= 550) {
    musicPlayer.classList.remove("show");
    song.pause();
  }
}
// -----------------------------------------------------------------
// const song = document.getElementById("song");
// const progress = document.getElementById("progress");
// const ctrlIcon = document.getElementById("ctrlIcon");

// // Set max progress bar value once metadata is loaded
// song.onloadedmetadata = () => {
//   progress.max = song.duration;
// };

// // Play/Pause toggle
// function togglePlayPause() {
//   if (song.paused) {
//     song.play();
//     ctrlIcon.classList.remove("fa-play");
//     ctrlIcon.classList.add("fa-pause");
//   } else {
//     song.pause();
//     ctrlIcon.classList.remove("fa-pause");
//     ctrlIcon.classList.add("fa-play");
//   }
// }

// // Update progress bar as song plays
// song.addEventListener("timeupdate", () => {
//   progress.value = song.currentTime;
// });

// // Seek to different time
// progress.oninput = () => {
//   song.currentTime = progress.value;
// };

// // Restart song from beginning
// function restartSong() {
//   song.currentTime = 0;
//   song.play();
//   ctrlIcon.classList.remove("fa-play");
//   ctrlIcon.classList.add("fa-pause");
// }
