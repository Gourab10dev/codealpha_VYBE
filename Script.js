// ==========================================================
// VYBE MUSIC PLAYER
// ==========================================================


// ==========================================================
// SONG DATA
// ==========================================================

const songs = [

    {
        title: "Bondhu Astamite",
        artist: "Chirkut Official",
        image: "musimage/astamite.jpg",
        audio: "songs/astamite.mp3"
    },

    {
        title: "Jol Phoring 2.O",
        artist: "Anupam Roy",
        image: "musimage/jolphoring.jpg",
        audio: "songs/Jawl-Phoring-2.0.mp3"
    },

    {
        title: "Piyu Bole",
        artist: "Shreya Ghoshal, Sonu Nigam",
        image: "musimage/pareenita.jpg",
        audio: "songs/Piyu Bole (Parineeta).mp3"
    },

    {
        title: "Tomake(Female)",
        artist: "Shreya Ghoshal",
        image: "musimage/porinita.jpg",
        audio: "songs/TomakeFemale.mp3"
    },

    {
        title: "Sokhi Vabona Kahare bole",
        artist: "RabindraNath Tagore",
        image: "musimage/sokhi-bhabona.jpg",
        audio: "songs/Shokhi Bhabona.mp3"
    },

    {
        title: "Ki Name Deke",
        artist: "Shyamal Mitra",
        image: "musimage/kinamedeke1.jpg",
        audio: "songs/KiNameDeke1.mp3"
    },

    {
        title: "Tu Jane NA",
        artist: "Atif Aslam",
        image: "musimage/tujanena.jpg",
        audio: "songs/TuJaaneNa.mp3"
    },

    {
        title: "Tomake Chai",
        artist: "Arijit Singh",
        image: "musimage/tomake-chai.jpg",
        audio: "songs/Tomake Chai.mp3"
    },

    {
        title: "Ki Name Deke",
        artist: "Miftadh Jaman",
        image: "musimage/kinamedeke2.jpg",
        audio: "songs/KiNameDeke2.mp3"
    },

    {
        title: "English E Bangla",
        artist: "Shilajit Majumdar",
        image: "musimage/EnglisheBangla.jpg",
        audio: "songs/Englishebangla.mp3"
    }

];


// ==========================================================
// CURRENT SONG
// ==========================================================

let currentSongIndex = 0;


// ==========================================================
// SHUFFLE & REPEAT STATE
// ==========================================================

let isShuffleOn = false;
let isRepeatOn = false;


// ==========================================================
// ALBUM CONTAINER
// ==========================================================

const albumContainer =
    document.querySelector(".album-container");


// ==========================================================
// DISPLAY SONG CARDS
// ==========================================================

function displaySongs(songList) {

    albumContainer.innerHTML = "";


    songList.forEach((song) => {

        const card = document.createElement("div");

        card.classList.add("album-card");


        card.innerHTML = `

            <img
                src="${song.image}"
                alt="${song.title}"
            >

            <button
                class="play-btn"
                type="button"
                aria-label="Play ${song.title}"
                title="Play"
            >
                <i class="fa-solid fa-play"></i>
            </button>

            <h3>${song.title}</h3>

            <p>${song.artist}</p>

        `;


        albumContainer.appendChild(card);


        // Get play button
        const playBtn =
            card.querySelector(".play-btn");


        // Play selected song
        playBtn.addEventListener("click", function (event) {

            // Prevent card click from interfering
            event.stopPropagation();


            const songIndex =
                songs.indexOf(song);


            playSong(songIndex);

        });

    });

}


// Display all songs when page loads
displaySongs(songs);



// ==========================================================
// ALBUM SCROLL BUTTONS
// ==========================================================

const scrollLeft =
    document.getElementById("scroll-left");

const scrollRight =
    document.getElementById("scroll-right");


// Scroll left
if (scrollLeft) {

    scrollLeft.addEventListener("click", function () {

        albumContainer.scrollBy({

            left: -400,

            behavior: "smooth"

        });

    });

}


// Scroll right
if (scrollRight) {

    scrollRight.addEventListener("click", function () {

        albumContainer.scrollBy({

            left: 400,

            behavior: "smooth"

        });

    });

}



// ==========================================================
// TOP ARTISTS
// ==========================================================

const artists = [

    {
        name: "Arijit Singh",
        image: "artistimage/arijit.jpg"
    },

    {
        name: "Anupam Roy",
        image: "artistimage/anupam.jpg"
    },

    {
        name: "Shreya Ghoshal",
        image: "artistimage/shreya.jpg"
    },

    {
        name: "Sonu Nigam",
        image: "artistimage/sonu.jpg"
    },

    {
        name: "Sunidhi Chauhan",
        image: "artistimage/sunidhi.jpg"
    },

    {
        name: "Atif Aslam",
        image: "artistimage/atif.jpg"
    },

    {
        name: "Silajit Majumdar",
        image: "artistimage/silajit.jpg"
    }

];


// ==========================================================
// CREATE ARTIST CARDS
// ==========================================================

const artistsContainer =
    document.getElementById("artists-container");


artists.forEach(artist => {

    const artistCard =
        document.createElement("div");


    artistCard.classList.add("artist-card");


    artistCard.innerHTML = `

        <img
            src="${artist.image}"
            alt="${artist.name}"
        >

        <h3>${artist.name}</h3>

        <p>Artist</p>

    `;


    artistsContainer.appendChild(artistCard);

});

// ==========================================================
// TOP ARTISTS SCROLL BUTTONS
// ==========================================================

const artistScrollLeft =
    document.getElementById("artist-scroll-left");

const artistScrollRight =
    document.getElementById("artist-scroll-right");


// ====================
// SCROLL ARTISTS LEFT
// ====================

if (artistScrollLeft) {

    artistScrollLeft.addEventListener("click", function () {

        artistsContainer.scrollBy({

            left: -400,

            behavior: "smooth"

        });

    });

}


// =====================
// SCROLL ARTISTS RIGHT
// =====================

if (artistScrollRight) {

    artistScrollRight.addEventListener("click", function () {

        artistsContainer.scrollBy({

            left: 400,

            behavior: "smooth"

        });

    });

}


// ==========================================================
// SEARCH SONGS
// ==========================================================

const searchInput =
    document.getElementById("search-input");


searchInput.addEventListener("input", function () {

    const searchText =
        this.value.toLowerCase().trim();


    const filteredSongs =
        songs.filter(song => {

            return (

                song.title
                    .toLowerCase()
                    .includes(searchText)

                ||

                song.artist
                    .toLowerCase()
                    .includes(searchText)

            );

        });


    displaySongs(filteredSongs);

});



// ==========================================================
// PLAYER ELEMENTS
// ==========================================================

const audioPlayer =
    document.getElementById("audio-player");

const playButton =
    document.getElementById("play-button");

const songImage =
    document.getElementById("song-image");

const songTitle =
    document.getElementById("song-title");

const songArtist =
    document.getElementById("song-artist");

const progressBar =
    document.getElementById("progress-bar");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");

const volumeBar =
    document.getElementById("volume-bar");

const volumeIcon =
    document.getElementById("volume-icon");

const prevButton =
    document.getElementById("prev-button");

const nextButton =
    document.getElementById("next-button");

const shuffleButton =
    document.getElementById("shuffle-button");

const repeatButton =
    document.getElementById("repeat-button");

const likeButton = 
    document.getElementById("like-button");


// =========================
// LIKED SONGS
// =========================

let likedSongs = JSON.parse(localStorage.getItem("vybeLikedSongs")) || [];

function isSongLiked(song) {
    return likedSongs.some(likedSong => likedSong.audio === song.audio);
}


function updateLikeButton() {

    if (currentSongIndex < 0 || currentSongIndex >= songs.length) {
        return;
    }

    const currentSong = songs[currentSongIndex];

    if (isSongLiked(currentSong)) {

        likeButton.classList.add("liked");

        likeButton.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

        likeButton.title = "Remove from Liked Songs";

    } else {

        likeButton.classList.remove("liked");

        likeButton.innerHTML =
            '<i class="fa-regular fa-plus"></i>';

        likeButton.title = "Add to Liked Songs";
    }
}


likeButton.addEventListener("click", () => {

    if (currentSongIndex < 0 || currentSongIndex >= songs.length) {
        return;
    }

    const currentSong = songs[currentSongIndex];

    const existingIndex = likedSongs.findIndex(
        likedSong => likedSong.audio === currentSong.audio
    );

    if (existingIndex === -1) {

        // Add song
        likedSongs.push(currentSong);

    } else {

        // Remove song
        likedSongs.splice(existingIndex, 1);
    }

    // Save to browser
    localStorage.setItem(
        "vybeLikedSongs",
        JSON.stringify(likedSongs)
    );

    updateLikeButton();
});

// ==========================================================
// PLAY BUTTON ICON
// ==========================================================

function updatePlayIcon() {

    if (audioPlayer.paused) {

        playButton.innerHTML =
            '<i class="fa-solid fa-play"></i>';

        playButton.setAttribute(
            "aria-label",
            "Play"
        );

        playButton.setAttribute(
            "title",
            "Play"
        );

    } else {

        playButton.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

        playButton.setAttribute(
            "aria-label",
            "Pause"
        );

        playButton.setAttribute(
            "title",
            "Pause"
        );

    }

}



// ==========================================================
// PLAY SONG
// ==========================================================

function playSong(index) {

    // Safety check
    if (index < 0 || index >= songs.length) {
        return;
    }


    // Update current song
    currentSongIndex = index;


    const song = songs[index];


    // ======================================================
    // SET AUDIO
    // ======================================================

    audioPlayer.src = song.audio;


    // ======================================================
    // UPDATE SONG INFORMATION
    // ======================================================

    songTitle.textContent =
        song.title;

    songArtist.textContent =
        song.artist;


    // ======================================================
    // UPDATE SONG IMAGE
    // ======================================================

    songImage.style.backgroundImage =
        `url("${song.image}")`;


    // ======================================================
    // RESET PROGRESS
    // ======================================================

    progressBar.value = 0;

    currentTime.textContent =
        "0:00";

    duration.textContent =
        "0:00";


    // ======================================================
    // PLAY SONG
    // ======================================================

    const playPromise =
        audioPlayer.play();


    // Browser safety
    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                updatePlayIcon();

            })
            .catch(error => {

                console.log(
                    "Audio playback error:",
                    error
                );

                updatePlayIcon();

            });

    }
    updateLikeButton();

}



// ==========================================================
// MAIN PLAY / PAUSE BUTTON
// ==========================================================

playButton.addEventListener("click", function () {


    // If no audio source has been selected yet
    if (!audioPlayer.src) {

        playSong(currentSongIndex);

        return;

    }


    // ======================================================
    // PLAY
    // ======================================================

    if (audioPlayer.paused) {

        const playPromise =
            audioPlayer.play();


        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    updatePlayIcon();

                })
                .catch(error => {

                    console.log(
                        "Audio playback error:",
                        error
                    );

                });

        }

    }


    // ======================================================
    // PAUSE
    // ======================================================

    else {

        audioPlayer.pause();

        updatePlayIcon();

    }

});



// ==========================================================
// SHUFFLE BUTTON
// ==========================================================

shuffleButton.addEventListener("click", function () {


    // Toggle shuffle
    isShuffleOn =
        !isShuffleOn;


    // Add/remove green active class
    shuffleButton.classList.toggle(
        "active",
        isShuffleOn
    );


    // Update accessibility information
    if (isShuffleOn) {

        shuffleButton.setAttribute(
            "aria-label",
            "Shuffle on"
        );

        shuffleButton.setAttribute(
            "title",
            "Shuffle on"
        );

    } else {

        shuffleButton.setAttribute(
            "aria-label",
            "Shuffle off"
        );

        shuffleButton.setAttribute(
            "title",
            "Shuffle off"
        );

    }

});



// ==========================================================
// REPEAT BUTTON
// ==========================================================

repeatButton.addEventListener("click", function () {


    // Toggle repeat
    isRepeatOn =
        !isRepeatOn;


    // Add/remove green active class
    repeatButton.classList.toggle(
        "active",
        isRepeatOn
    );


    // Update accessibility information
    if (isRepeatOn) {

        repeatButton.setAttribute(
            "aria-label",
            "Repeat on"
        );

        repeatButton.setAttribute(
            "title",
            "Repeat current song"

        );

    } else {

        repeatButton.setAttribute(
            "aria-label",
            "Repeat off"
        );

        repeatButton.setAttribute(
            "title",
            "Repeat off"
        );

    }

});



// ==========================================================
// PREVIOUS SONG
// ==========================================================

prevButton.addEventListener("click", function () {


    // If song has already played more than 3 seconds,
    // pressing previous will restart the current song.

    if (audioPlayer.currentTime > 3) {

        audioPlayer.currentTime = 0;

        return;

    }


    // Move to previous song
    currentSongIndex--;


    // If first song → go to last song
    if (currentSongIndex < 0) {

        currentSongIndex =
            songs.length - 1;

    }


    playSong(currentSongIndex);

});



// ==========================================================
// NEXT SONG
// ==========================================================

nextButton.addEventListener("click", function () {


    // ======================================================
    // SHUFFLE ON
    // ======================================================

    if (isShuffleOn) {

        playRandomSong();

        return;

    }


    // ======================================================
    // NORMAL NEXT
    // ======================================================

    currentSongIndex++;


    // If last song → first song
    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;

    }


    playSong(currentSongIndex);

});



// ==========================================================
// PLAY RANDOM SONG
// ==========================================================

function playRandomSong() {

    // If there is only one song
    if (songs.length <= 1) {

        playSong(0);

        return;

    }


    let randomIndex;


    // Keep generating a random song
    // until it is different from current song

    do {

        randomIndex =
            Math.floor(
                Math.random() * songs.length
            );

    }

    while (
        randomIndex === currentSongIndex
    );


    currentSongIndex =
        randomIndex;


    playSong(currentSongIndex);

}



// ==========================================================
// WHEN SONG ENDS
// ==========================================================

audioPlayer.addEventListener("ended", function () {


    // ======================================================
    // REPEAT ON
    // ======================================================

    if (isRepeatOn) {

        // Start the same song again
        audioPlayer.currentTime = 0;


        const playPromise =
            audioPlayer.play();


        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    updatePlayIcon();

                })
                .catch(error => {

                    console.log(
                        "Repeat playback error:",
                        error
                    );

                });

        }


        return;

    }


    // ======================================================
    // SHUFFLE ON
    // ======================================================

    if (isShuffleOn) {

        playRandomSong();

        return;

    }


    // ======================================================
    // NORMAL PLAYBACK
    // ======================================================

    currentSongIndex++;


    // If last song → start from first
    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;

    }


    playSong(currentSongIndex);

});



// ==========================================================
// AUDIO PLAY EVENT
// ==========================================================

audioPlayer.addEventListener("play", function () {

    updatePlayIcon();

});



// ==========================================================
// AUDIO PAUSE EVENT
// ==========================================================

audioPlayer.addEventListener("pause", function () {

    updatePlayIcon();

});



// ==========================================================
// AUDIO METADATA LOADED
// ==========================================================

audioPlayer.addEventListener(
    "loadedmetadata",
    function () {


        // Set progress maximum
        progressBar.max =
            audioPlayer.duration;


        // Show total duration
        duration.textContent =
            formatTime(
                audioPlayer.duration
            );


        // Reset progress
        progressBar.value = 0;

        currentTime.textContent =
            "0:00";

    }
);



// ==========================================================
// UPDATE PROGRESS WHILE PLAYING
// ==========================================================

audioPlayer.addEventListener(
    "timeupdate",
    function () {


        // Update progress slider
        progressBar.value =
            audioPlayer.currentTime;


        // Update current time
        currentTime.textContent =
            formatTime(
                audioPlayer.currentTime
            );

    }
);



// ==========================================================
// SEEK / MOVE THROUGH SONG
// ==========================================================

progressBar.addEventListener(
    "input",
    function () {

        audioPlayer.currentTime =
            Number(this.value);

    }
);



// ==========================================================
// FORMAT TIME
// ==========================================================

function formatTime(seconds) {

    if (
        isNaN(seconds) ||
        !isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        Math.floor(seconds % 60);


    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;

}



// ==========================================================
// VOLUME
// ==========================================================

let previousVolume = 1;



// ==========================================================
// VOLUME SLIDER
// ==========================================================

volumeBar.addEventListener(
    "input",
    function () {


        const volume =
            Number(this.value);


        // Change audio volume
        audioPlayer.volume =
            volume;


        // Remember last non-zero volume
        if (volume > 0) {

            previousVolume =
                volume;

        }


        // Update icon
        updateVolumeIcon();

    }
);



// ==========================================================
// MUTE / UNMUTE
// ==========================================================

volumeIcon.addEventListener(
    "click",
    function () {


        // ==================================================
        // MUTE
        // ==================================================

        if (audioPlayer.volume > 0) {


            // Save current volume
            previousVolume =
                audioPlayer.volume;


            // Mute
            audioPlayer.volume = 0;

            volumeBar.value = 0;

        }


        // ==================================================
        // UNMUTE
        // ==================================================

        else {


            // Restore previous volume
            audioPlayer.volume =
                previousVolume;


            volumeBar.value =
                previousVolume;

        }


        // Update icon
        updateVolumeIcon();

    }
);



// ==========================================================
// UPDATE VOLUME ICON
// ==========================================================

function updateVolumeIcon() {


    if (audioPlayer.volume === 0) {

        volumeIcon.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

        volumeIcon.setAttribute(
            "aria-label",
            "Unmute"
        );

        volumeIcon.setAttribute(
            "title",
            "Unmute"
        );

    }


    else if (audioPlayer.volume < 0.5) {

        volumeIcon.innerHTML =
            '<i class="fa-solid fa-volume-low"></i>';

        volumeIcon.setAttribute(
            "aria-label",
            "Mute"
        );

        volumeIcon.setAttribute(
            "title",
            "Mute"
        );

    }


    else {

        volumeIcon.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

        volumeIcon.setAttribute(
            "aria-label",
            "Mute"
        );

        volumeIcon.setAttribute(
            "title",
            "Mute"
        );

    }

}



// ==========================================================
// INITIAL SETTINGS
// ==========================================================

// Start with volume at 100%
audioPlayer.volume = 1;


// Set correct volume icon
updateVolumeIcon();


// Set correct play icon
updatePlayIcon();

/* ==========================================================
   VYBE LOGIN / PROFILE SYSTEM
========================================================== */

const loginButton = document.getElementById("login-button");
const profileMenu = document.getElementById("profile-menu");
const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const logoutButton = document.getElementById("logout-button");

const savedUserName = localStorage.getItem("vybeUserName");
const savedUserEmail = localStorage.getItem("vybeUserEmail");


/* ----------------------------------------------------------
   SHOW LOGGED-IN USER
---------------------------------------------------------- */

if (savedUserName && loginButton) {

    const firstLetter = savedUserName
        .charAt(0)
        .toUpperCase();

    loginButton.href = "#";

    loginButton.innerHTML = `
        <span class="user-initial">
            ${firstLetter}
        </span>
    `;

    loginButton.title = savedUserName;

    if (profileName) {
        profileName.textContent = savedUserName;
    }

    if (profileEmail && savedUserEmail) {
        profileEmail.textContent = savedUserEmail;
    }
}


/* ----------------------------------------------------------
   OPEN / CLOSE PROFILE MENU
---------------------------------------------------------- */

if (loginButton) {

    loginButton.addEventListener("click", function (event) {

        if (savedUserName) {

            event.preventDefault();

            profileMenu.classList.toggle("show");

        }

    });

}


/* ----------------------------------------------------------
   LOG OUT
---------------------------------------------------------- */

if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("vybeUserName");
        localStorage.removeItem("vybeUserEmail");

        window.location.reload();

    });

}


/* ----------------------------------------------------------
   CLOSE MENU WHEN CLICKING OUTSIDE
---------------------------------------------------------- */

document.addEventListener("click", function (event) {

    if (
        profileMenu &&
        loginButton &&
        !loginButton.contains(event.target) &&
        !profileMenu.contains(event.target)
    ) {

        profileMenu.classList.remove("show");

    }

});

// ==========================================================
// VYBE DYNAMIC PLAYLIST SIDEBAR
// ==========================================================

function loadSidebarPlaylists() {

    const sidebarPlaylists =
        document.getElementById("sidebar-playlists");

    // If this page doesn't have the sidebar playlist area,
    // stop here.
    if (!sidebarPlaylists) {
        return;
    }


    // Get saved playlists
    let playlists =
        JSON.parse(
            localStorage.getItem("vybePlaylists")
        ) || [];


    // Clear old playlist items
    sidebarPlaylists.innerHTML = "";


    // Heading
    const heading =
        document.createElement("div");

    heading.className =
        "playlist-heading";

    heading.textContent =
        "YOUR PLAYLIST";

    sidebarPlaylists.appendChild(
        heading
    );


    // If there are no playlists
    if (playlists.length === 0) {

        const emptyMessage =
            document.createElement("div");

        emptyMessage.className =
            "sidebar-playlist-empty";

        emptyMessage.textContent =
            "No playlists yet";

        sidebarPlaylists.appendChild(
            emptyMessage
        );

        return;
    }


    // Create playlist items
    playlists.forEach(
        (playlist, index) => {

            const playlistItem =
                document.createElement("a");

            playlistItem.className =
                "playlist-item simple-playlist";

            playlistItem.href =
                `create-playlist.html?id=${playlist.id}`;


            playlistItem.innerHTML = `

                <i class="fa-solid fa-music"></i>

                <span>
                    ${playlist.name}
                </span>

            `;


            sidebarPlaylists.appendChild(
                playlistItem
            );

        }
    );

}


// Load playlists when page opens
loadSidebarPlaylists();


// ==========================================================
// YOUR LIBRARY GLOW
// ==========================================================

document.addEventListener("click", function (e) {

    const library = e.target.closest(".main-nav .nav-item");

    if (!library) return;

    const libraryText = library.querySelector("span");

    if (!libraryText) return;

    if (libraryText.textContent.trim() !== "Your Library") return;

    const children = document.querySelectorAll(".library-child");

    children.forEach(child => {

        child.classList.remove("library-flash");

        void child.offsetWidth;

        child.classList.add("library-flash");

    });

});
// ==========================================================
// SIDEBAR SEARCH → AUTO FOCUS SEARCH BAR
// ==========================================================

document.addEventListener("click", function (e) {

    const searchButton = e.target.closest(".main-nav .nav-item");

    if (!searchButton) return;

    const searchText = searchButton.querySelector("span");

    if (!searchText) return;

    if (searchText.textContent.trim() !== "Search") return;

    const searchInput = document.querySelector(".search-bar input");

    if (!searchInput) return;

    // Put the cursor inside the search bar
    searchInput.focus();

});