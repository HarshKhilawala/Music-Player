const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// Music
const songs = [
    {
        name: 'music-1',
        displayName: 'Electronic Chill Machine',
        artist: 'Jacinto',
    },

    {
        name: 'music-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto',
    },

    {
        name: 'music-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto',
    },

    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric',
    }
];


// Check if playing
let isPlaying = false;

// Play 
function playSong(){
    isPlaying= true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

// Pause
function pauseSong(){
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    isPlaying = false;
    music.pause();
}


// Play or Pause Event Listener
playBtn.addEventListener('click',() => (isPlaying ? pauseSong() : playSong() ));

// Update the DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgressBar(e){
    if(isPlaying){
        const {duration,currentTime} = e.srcElement;
        
        //Update Progress Bar
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate Display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay Switching duration element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }


        // Calculate Display for current time
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds<10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration}  = music;
    music.currentTime = (clickX/width) *duration;
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Event Listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);
