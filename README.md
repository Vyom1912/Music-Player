# 🎵 Music Player

A music player with a playlist, search, shuffle, loop, favorites and more.

## ✨ Features

- **Playlist** of 17 songs with cover art
- **Play / pause, next and previous** controls
- **Seekable progress bar** with current time and duration
- **Volume control**
- **Shuffle** and **loop** modes
- **Favorite** songs with the heart button
- **Download** the current song
- **Search** songs by title or artist
- **Remembers the last played song** (localStorage)
- Responsive layout — on small screens the player opens as a separate view with a back button

## 🛠️ Built With

- HTML5 (`<audio>`)
- CSS3
- JavaScript (Vanilla, HTML Audio API, localStorage)
- [Font Awesome](https://fontawesome.com/)

## 📁 Project Structure

```
22 Music Player/
├── index.html
├── style.css
├── script.js       # Song list + player logic
├── image/          # Album covers and icon
└── Music/          # .mp3 files
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/vyom1912/<repository-name>.git
   ```
2. Open `index.html` in your browser — no build step or installation needed.

> Tip: For the best experience, use the **Live Server** extension in VS Code.

## ➕ Adding Songs

Put the `.mp3` file in `Music/` and the cover image in `image/`, then add an entry to the `songs` array in `script.js`:

```js
{
  title: "Song Title",
  artist: "Artist Name",
  src: "Music/song.mp3",
  img: "image/cover.jpg",
},
```

> ⚠️ The included songs belong to their respective artists and are used for educational purposes only.

## 👤 Author

**Vyom Patel** — [GitHub @vyom1912](https://github.com/vyom1912)

If you like this project, consider giving it a ⭐ on GitHub!
