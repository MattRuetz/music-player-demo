const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Song 2',
        artist: '?'
    },
    {
        name: 'jacinto-3',
        displayName: 'Song 3',
        artist: '?'
    },
    {
        name: 'metric-1',
        displayName: 'Song 4',
        artist: '?'
    },
]


let isPlaying = false;

// Play
const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

//Update DOM to reference new song file info
const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// On load - select first song
let songIndex = 0;

const nextSong = () => {
    songIndex++;
    loadSong(songs[songIndex]);
    playSong();
}

const prevSong = () => {
    songIndex--;
    loadSong(songs[songIndex]);
    playSong();
}

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);