// ===============================
// 🎵 SONG LIST DEFINITION
// ===============================
const songs = [
  // Each song contains title, artist, source of music, and image
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
    title: "Deja Vu",
    artist: "Olivia Rodrigo",
    src: "Music/Deja vu.mp3",
    img: "image/Deja vu.jpg",
  },
  {
    title: "Die With A Smile",
    artist: "Bruno Mars and Lady Gaga",
    src: "Music/die with smile.mp3",
    img: "image/Die with a smile.jpg",
  },
  {
    title: "End Of Beginning",
    artist: "Djo",
    src: "Music/end of beginning.mp3",
    img: "image/end of beginning.jpg",
  },
  {
    title: "Fortnight",
    artist: "Taylor Swift",
    src: "Music/Fortnight.mp3",
    img: "image/fortnight.jpg",
  },
  {
    title: "Gorgeous",
    artist: "Taylor Swift",
    src: "Music/Gorgeous.mp3",
    img: "image/gorgeous.jpg",
  },
  {
    title: "Game of Thrones Theme",
    artist: "GOT",
    src: "Music/got.mp3",
    img: "image/got.jpg",
  },
  {
    title: "Line Without A Hook",
    artist: "Ricky Montgomery",
    src: "Music/Line without a hook.mp3",
    img: "image/Line without a hook.jpg",
  },
  {
    title: "Look What You Made Me Do",
    artist: "Taylor Swift",
    src: "Music/Looks what you made me do.mp3",
    img: "image/look what you made mr do.jpg",
  },
  {
    title: "Marvel",
    artist: "Marvel",
    src: "Music/marvel.mp3",
    img: "image/marvel.jpeg",
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "Music/perfect.mp3",
    img: "image/perfect.jpg",
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
  {
    title: "The Night We Met",
    artist: "Lord Huron",
    src: "Music/the night we met.mp3",
    img: "image/the night we met.jpg",
  },
];

// ===============================
// 🎛️ GLOBAL VARIABLES
// ===============================
let currentSong = 0;
let isPlaying = false;
let isLooping = false;
let isShuffleOn = false;
const favorites = new Set();

// ===============================
// 🎚️ DOM ELEMENTS
// ===============================
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
const musicPlayer = document.getElementById("musicPlayer");

// ===============================
// 🎵 LOAD A SONG BY INDEX
// ===============================
function loadSong(index, shouldAutoPlay = true) {
  const s = songs[index];
  song.src = s.src;
  songTitle.textContent = s.title;
  songArtist.textContent = s.artist;
  songImg.src = s.img;
  progress.value = 0;
  song.load();

  if (shouldAutoPlay) {
    song.play();
    isPlaying = true;
    ctrlIcon.classList.replace("fa-play", "fa-pause");
  } else {
    isPlaying = false;
    ctrlIcon.classList.replace("fa-pause", "fa-play");
  }

  updateFavoriteIcon();
  localStorage.setItem("lastPlayed", index);
  displaySongs();
}

// ===============================
// 📀 LOAD LAST PLAYED SONG
// ===============================
const lastPlayedIndex = localStorage.getItem("lastPlayed");
if (lastPlayedIndex !== null && !isNaN(lastPlayedIndex)) {
  currentSong = parseInt(lastPlayedIndex);
}

// ===============================
// ⏯️ TOGGLE PLAY/PAUSE
// ===============================
function togglePlayPause() {
  if (!song.src) return;

  if (song.paused || song.ended) {
    song.play();
    isPlaying = true;
    ctrlIcon.classList.replace("fa-play", "fa-pause");
  } else {
    song.pause();
    isPlaying = false;
    ctrlIcon.classList.replace("fa-pause", "fa-play");
  }
}

// ===============================
// ⏭️ NEXT / PREVIOUS SONG
// ===============================
function nextSong() {
  if (isShuffleOn) {
    currentSong = Math.floor(Math.random() * songs.length);
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  loadSong(currentSong, true);
}

function previousSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong, true);
}

// ===============================
// 🔁 LOOP TOGGLE
// ===============================
function toggleLoop() {
  isLooping = !isLooping;
  song.loop = isLooping;

  const loopBtn = document.querySelector(".fa-repeat");
  loopBtn.style.color = isLooping
    ? "var(--basic-color)"
    : "var(--secondary-color)";
  loopBtn.style.background = isLooping
    ? "var(--secondary-color)"
    : "var(--basic-color)";
}

// ===============================
// 🔀 SHUFFLE SONGS
// ===============================
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
  loadSong(currentSong, isPlaying);
}

// ===============================
// ❤️ FAVORITE TOGGLE
// ===============================
function toggleFavorite() {
  const title = songs[currentSong].title;
  if (favorites.has(title)) favorites.delete(title);
  else favorites.add(title);
  updateFavoriteIcon();
}

function updateFavoriteIcon() {
  const title = songs[currentSong].title;
  favBtn.classList.toggle("fas", favorites.has(title));
  favBtn.classList.toggle("far", !favorites.has(title));
}

// ===============================
// ⬇️ DOWNLOAD CURRENT SONG
// ===============================
function downloadCurrentSong() {
  const link = document.createElement("a");
  link.href = song.src;
  link.setAttribute("download", `${songs[currentSong].title}.mp3`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ===============================
// ⏱️ PROGRESS BAR & TIMING
// ===============================
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

song.addEventListener("ended", () => {
  isPlaying = false;
  ctrlIcon.classList.replace("fa-pause", "fa-play");
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

// ===============================
// 🔍 SEARCH FUNCTIONALITY
// ===============================
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
      loadSong(currentSong, true);
      searchBar.value = "";
      if (window.innerWidth <= 550) musicPlayer.classList.add("show");
      displaySongs();
    };
    playlistDiv.appendChild(div);
  });
});

// ===============================
// 📜 DISPLAY SONG LIST
// ===============================
function displaySongs() {
  playlistDiv.innerHTML = songs
    .map((song, index) => {
      const isActive = index === currentSong ? "active-song" : "";
      return `<div class="song-item ${isActive}" data-index="${index}" onclick="songItemClick(${index})">
        <img src="${song.img}" alt="Song Image" />
        <span>${song.title}</span>
      </div>`;
    })
    .join("");
}

// 🔘 SONG ITEM CLICKED
function songItemClick(index) {
  currentSong = index;
  loadSong(index, true);
  if (window.innerWidth <= 550) musicPlayer.classList.add("show");
}

// ⬅️ GO BACK BUTTON FOR SMALL DEVICES
function goBackToList() {
  if (window.innerWidth <= 550) {
    musicPlayer.classList.remove("show");
    song.pause();
  }
}

// ===============================
// 🚀 INITIALIZE PLAYER
// ===============================
displaySongs();
loadSong(currentSong, false);
