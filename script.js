const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [{
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
    songIndex > songs.length - 1 && (songIndex = 0)
    loadSong(songs[songIndex]);
    playSong();
}

const prevSong = () => {
    songIndex--;
    songIndex < 0 && (songIndex = songs.length - 1)
    loadSong(songs[songIndex]);
    playSong();
}

const convertSecondsToTimeString = (timeInSecs) => {
    return Math.floor(timeInSecs / 60).toString() + ':' +
        (timeInSecs % 60 < 10 ? '0' + Math.floor(timeInSecs % 60).toString() : Math.floor(timeInSecs % 60).toString())
};

const updateProgressBar = (e) => {
        const {
            duration,
            currentTime
        } = e.srcElement;

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`

        if (duration) {
            durationEl.innerText = convertSecondsToTimeString(duration);
        }
        if (currentTime) {
            currentTimeEl.innerText = convertSecondsToTimeString(currentTime);
        }
    
}

function setProgressBar(e) {
    console.log(e)
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {
        duration,
        currentTime
    } = music;
    music.currentTime = (clickX / width) * duration;
}

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);