// ==========================================================
// VYBE - CREATE PLAYLIST
// ==========================================================


// ==========================================================
// SONG DATABASE
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
// PLAYLIST STORAGE
// ==========================================================

let playlists =
    JSON.parse(
        localStorage.getItem("vybePlaylists")
    ) || [];


// ==========================================================
// CURRENT PLAYLIST
// ==========================================================

let playlistId =
    new URLSearchParams(
        window.location.search
    ).get("id");


// ==========================================================
// CREATE DEFAULT PLAYLIST IF NEEDED
// ==========================================================

if (!playlistId) {

    playlistId =
        "playlist_" +
        Date.now();


    const newPlaylist = {

        id: playlistId,

        name: "My Playlist",

        description:
            "Create your own collection of songs.",

        songs: []

    };


    playlists.push(
        newPlaylist
    );


    localStorage.setItem(
        "vybePlaylists",
        JSON.stringify(playlists)
    );

}


// ==========================================================
// FIND CURRENT PLAYLIST
// ==========================================================

let playlist =
    playlists.find(
        item =>
            item.id === playlistId
    );


// ==========================================================
// SAFETY FALLBACK
// ==========================================================

if (!playlist) {

    playlistId =
        "playlist_" +
        Date.now();


    playlist = {

        id: playlistId,

        name: "My Playlist",

        description:
            "Create your own collection of songs.",

        songs: []

    };


    playlists.push(
        playlist
    );

}


// ==========================================================
// SAVE PLAYLISTS
// ==========================================================

function savePlaylist() {

    const index =
        playlists.findIndex(
            item =>
                item.id === playlistId
        );


    if (index !== -1) {

        playlists[index] =
            playlist;

    } else {

        playlists.push(
            playlist
        );

    }


    localStorage.setItem(
        "vybePlaylists",
        JSON.stringify(playlists)
    );


    // Keep compatibility with your
    // existing storage system
    localStorage.setItem(
        "vybeCurrentPlaylist",
        JSON.stringify(playlist)
    );

}

// ==========================================================
// ELEMENTS
// ==========================================================

const playlistName =
    document.getElementById(
        "playlist-name"
    );

const playlistDescription =
    document.getElementById(
        "playlist-description"
    );

const playlistCount =
    document.getElementById(
        "playlist-song-count"
    );

const playlistSongList =
    document.getElementById(
        "playlist-song-list"
    );

const playlistEmpty =
    document.getElementById(
        "playlist-empty"
    );

const searchInput =
    document.getElementById(
        "playlist-search-input"
    );

const searchResults =
    document.getElementById(
        "playlist-search-results"
    );

const editButton =
    document.getElementById(
        "edit-playlist-button"
    );

const addSongButton =
    document.getElementById(
        "add-song-button"
    );
const deleteButton =
    document.getElementById(
        "delete-playlist-button"
    );

// ==================================================
// DELETE PLAYLIST
// ==================================================

if (deleteButton) {

    deleteButton.addEventListener("click", () => {

        const confirmDelete = confirm(
            `Are you sure you want to delete "${playlist.name}"?`
        );

        if (!confirmDelete) {
            return;
        }

        // Get all saved playlists
        let savedPlaylists =
            JSON.parse(
                localStorage.getItem("vybePlaylists")
            ) || [];

        // Remove current playlist
        savedPlaylists =
            savedPlaylists.filter(
                item => item.id !== playlistId
            );

        // Save updated playlists
        localStorage.setItem(
            "vybePlaylists",
            JSON.stringify(savedPlaylists)
        );

        // Remove old current-playlist data if it exists
        localStorage.removeItem(
            "vybeCurrentPlaylist"
        );

        // Go back to home page
        window.location.href = "index.html";
    });

}

// ==========================================================
// UPDATE HEADER
// ==========================================================

function updatePlaylistHeader() {

    playlistName.textContent =
        playlist.name;

    playlistDescription.textContent =
        playlist.description;

    playlistCount.textContent =
        `${playlist.songs.length} ${
            playlist.songs.length === 1
                ? "song"
                : "songs"
        }`;

}


// ==========================================================
// CHECK SONG EXISTS
// ==========================================================

function isSongInPlaylist(song) {

    return playlist.songs.some(
        item =>
            item.audio === song.audio
    );

}


// ==========================================================
// DISPLAY PLAYLIST SONGS
// ==========================================================

function displayPlaylistSongs() {

    playlistSongList.innerHTML = "";


    if (
        playlist.songs.length === 0
    ) {

        playlistEmpty.style.display =
            "block";

        return;

    }


    playlistEmpty.style.display =
        "none";


    playlist.songs.forEach(
        (song, index) => {


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "playlist-added-song";


            row.innerHTML = `

                <img
                    src="${song.image}"
                    class="playlist-song-image"
                    alt="${song.title}"
                >


                <div class="playlist-song-details">

                    <h3>
                        ${song.title}
                    </h3>

                    <p>
                        ${song.artist}
                    </p>

                </div>


                <button
                    class="playlist-row-play"
                    title="Play"
                >

                    <i
                        class="fa-solid fa-play"
                    ></i>

                </button>


                <button
                    class="playlist-row-remove"
                    title="Remove"
                >

                    <i
                        class="fa-solid fa-xmark"
                    ></i>

                </button>

            `;


            playlistSongList.appendChild(
                row
            );


            // PLAY

            row
                .querySelector(
                    ".playlist-row-play"
                )
                .addEventListener(
                    "click",
                    () => {

                        playSong(
                            index
                        );

                    }
                );


            // REMOVE

            row
                .querySelector(
                    ".playlist-row-remove"
                )
                .addEventListener(
                    "click",
                    () => {

                        playlist.songs.splice(
                            index,
                            1
                        );


                        savePlaylist();

                        updatePlaylistHeader();

                        displayPlaylistSongs();

                        displaySearchResults(
                            searchInput.value
                        );

                    }
                );

        }
    );

}


// ==========================================================
// SEARCH SONGS
// ==========================================================

function searchSongs() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    if (!query) {

        searchResults.innerHTML = "";

        return;

    }


    const results =
        songs.filter(
            song =>

                song.title
                    .toLowerCase()
                    .includes(query)

                ||

                song.artist
                    .toLowerCase()
                    .includes(query)
        );


    displaySearchResults(
        query,
        results
    );

}


// ==========================================================
// DISPLAY SEARCH RESULTS
// ==========================================================

function displaySearchResults(
    query,
    results
) {

    if (
        query === undefined
    ) {

        query =
            searchInput.value
                .trim()
                .toLowerCase();

    }


    if (!query) {

        searchResults.innerHTML = "";

        return;

    }


    if (
        results === undefined
    ) {

        results =
            songs.filter(
                song =>

                    song.title
                        .toLowerCase()
                        .includes(query)

                    ||

                    song.artist
                        .toLowerCase()
                        .includes(query)
            );

    }


    searchResults.innerHTML = "";


    if (
        results.length === 0
    ) {

        searchResults.innerHTML = `

            <div class="playlist-no-results">

                <i
                    class="fa-solid fa-magnifying-glass"
                ></i>

                <p>
                    No songs found
                </p>

            </div>

        `;

        return;

    }


    results.forEach(
        song => {


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "playlist-search-song";


            const alreadyAdded =
                isSongInPlaylist(
                    song
                );


            row.innerHTML = `

                <img
                    src="${song.image}"
                    class="playlist-search-image"
                    alt="${song.title}"
                >


                <div class="playlist-search-details">

                    <h3>
                        ${song.title}
                    </h3>

                    <p>
                        ${song.artist}
                    </p>

                </div>


                <button
                    class="playlist-search-add"
                    title="${
                        alreadyAdded
                            ? "Already added"
                            : "Add to playlist"
                    }"
                    ${
                        alreadyAdded
                            ? "disabled"
                            : ""
                    }
                >

                    <i
                        class="fa-solid ${
                            alreadyAdded
                                ? "fa-check"
                                : "fa-plus"
                        }"
                    ></i>

                </button>

            `;


            searchResults.appendChild(
                row
            );


            if (!alreadyAdded) {

                row
                    .querySelector(
                        ".playlist-search-add"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            playlist.songs.push(
                                song
                            );


                            savePlaylist();

                            updatePlaylistHeader();

                            displayPlaylistSongs();

                            displaySearchResults(
                                searchInput.value
                            );

                        }
                    );

            }

        }
    );

}


// ==========================================================
// SEARCH INPUT
// ==========================================================

searchInput.addEventListener(
    "input",
    searchSongs
);


// ==========================================================
// ADD SONG BUTTON
// ==========================================================

addSongButton.addEventListener(
    "click",
    () => {

        searchInput.focus();

        document
            .getElementById(
                "playlist-search-section"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// ==========================================================
// EDIT PLAYLIST
// ==========================================================

editButton.addEventListener(
    "click",
    () => {


        const newName =
            prompt(
                "Enter playlist name:",
                playlist.name
            );


        if (
            newName === null
        ) {
            return;
        }


        const trimmedName =
            newName.trim();


        if (
            trimmedName.length > 0
        ) {

            playlist.name =
                trimmedName;

        }


        const newDescription =
            prompt(
                "Enter playlist description:",
                playlist.description
            );


        if (
            newDescription !== null
        ) {

            playlist.description =
                newDescription.trim();

        }


        savePlaylist();

        updatePlaylistHeader();

        loadSidebarPlaylists();

    }
);


// ==========================================================
// BOTTOM PLAYER
// ==========================================================

const audioPlayer =
    document.getElementById(
        "audio-player"
    );

const songImage =
    document.getElementById(
        "song-image"
    );

const songTitle =
    document.getElementById(
        "song-title"
    );

const songArtist =
    document.getElementById(
        "song-artist"
    );

const playButton =
    document.getElementById(
        "play-button"
    );

const prevButton =
    document.getElementById(
        "prev-button"
    );

const nextButton =
    document.getElementById(
        "next-button"
    );

const shuffleButton =
    document.getElementById(
        "shuffle-button"
    );

const repeatButton =
    document.getElementById(
        "repeat-button"
    );

const progressBar =
    document.getElementById(
        "progress-bar"
    );

const currentTime =
    document.getElementById(
        "current-time"
    );

const duration =
    document.getElementById(
        "duration"
    );

const volumeBar =
    document.getElementById(
        "volume-bar"
    );

const volumeIcon =
    document.getElementById(
        "volume-icon"
    );

const likeButton =
    document.getElementById(
        "like-button"
    );


let currentSongIndex = -1;

let shuffleMode = false;

let repeatMode = false;

let previousVolume = 1;


// ==========================================================
// FORMAT TIME
// ==========================================================

function formatTime(seconds) {

    if (
        isNaN(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        Math.floor(
            seconds % 60
        )
        .toString()
        .padStart(
            2,
            "0"
        );


    return `${minutes}:${secs}`;

}


// ==========================================================
// PLAY SONG
// ==========================================================

function playSong(index) {

    if (
        index < 0 ||
        index >= playlist.songs.length
    ) {

        return;

    }


    currentSongIndex =
        index;


    const song =
        playlist.songs[
            currentSongIndex
        ];


    audioPlayer.src =
        song.audio;


    songTitle.textContent =
        song.title;


    songArtist.textContent =
        song.artist;


    songImage.style.backgroundImage =
        `url("${song.image}")`;


    progressBar.value = 0;

    currentTime.textContent =
        "0:00";


    duration.textContent =
        "0:00";


    audioPlayer.play()
        .then(
            updatePlayIcon
        )
        .catch(
            console.log
        );

}


// ==========================================================
// PLAY ICON
// ==========================================================

function updatePlayIcon() {

    playButton.innerHTML =
        audioPlayer.paused

            ? '<i class="fa-solid fa-play"></i>'

            : '<i class="fa-solid fa-pause"></i>';

}


// ==========================================================
// PLAY / PAUSE
// ==========================================================

playButton.addEventListener(
    "click",
    () => {


        if (
            !audioPlayer.src
        ) {

            if (
                playlist.songs.length
            ) {

                playSong(0);

            }

            return;

        }


        if (
            audioPlayer.paused
        ) {

            audioPlayer.play();

        } else {

            audioPlayer.pause();

        }

    }
);


audioPlayer.addEventListener(
    "play",
    updatePlayIcon
);


audioPlayer.addEventListener(
    "pause",
    updatePlayIcon
);


// ==========================================================
// NEXT
// ==========================================================

nextButton.addEventListener(
    "click",
    () => {


        if (
            !playlist.songs.length
        ) {

            return;

        }


        let nextIndex;


        if (
            shuffleMode
        ) {

            nextIndex =
                Math.floor(
                    Math.random() *
                    playlist.songs.length
                );

        } else {

            nextIndex =
                currentSongIndex + 1;


            if (
                nextIndex >=
                playlist.songs.length
            ) {

                nextIndex = 0;

            }

        }


        playSong(
            nextIndex
        );

    }
);


// ==========================================================
// PREVIOUS
// ==========================================================

prevButton.addEventListener(
    "click",
    () => {


        if (
            !playlist.songs.length
        ) {

            return;

        }


        let previousIndex =
            currentSongIndex - 1;


        if (
            previousIndex < 0
        ) {

            previousIndex =
                playlist.songs.length - 1;

        }


        playSong(
            previousIndex
        );

    }
);


// ==========================================================
// SHUFFLE
// ==========================================================

shuffleButton.addEventListener(
    "click",
    () => {

        shuffleMode =
            !shuffleMode;

        shuffleButton.classList.toggle(
            "active",
            shuffleMode
        );

    }
);


// ==========================================================
// REPEAT
// ==========================================================

repeatButton.addEventListener(
    "click",
    () => {

        repeatMode =
            !repeatMode;

        repeatButton.classList.toggle(
            "active",
            repeatMode
        );

    }
);


// ==========================================================
// SONG ENDED
// ==========================================================

audioPlayer.addEventListener(
    "ended",
    () => {


        if (
            repeatMode
        ) {

            audioPlayer.currentTime =
                0;

            audioPlayer.play();

            return;

        }


        nextButton.click();

    }
);


// ==========================================================
// PROGRESS
// ==========================================================

audioPlayer.addEventListener(
    "timeupdate",
    () => {


        if (
            !audioPlayer.duration ||
            isNaN(audioPlayer.duration)
        ) {

            return;

        }


        const percentage =
            (
                audioPlayer.currentTime /
                audioPlayer.duration
            ) * 100;


        progressBar.value =
            percentage;


        currentTime.textContent =
            formatTime(
                audioPlayer.currentTime
            );

    }
);


// ==========================================================
// LOADED METADATA
// ==========================================================

audioPlayer.addEventListener(
    "loadedmetadata",
    () => {


        duration.textContent =
            formatTime(
                audioPlayer.duration
            );

    }
);


// ==========================================================
// SEEK
// ==========================================================

progressBar.addEventListener(
    "input",
    () => {


        if (
            !audioPlayer.duration
        ) {

            return;

        }


        audioPlayer.currentTime =
            (
                Number(
                    progressBar.value
                ) / 100
            ) *
            audioPlayer.duration;


        currentTime.textContent =
            formatTime(
                audioPlayer.currentTime
            );

    }
);


// ==========================================================
// VOLUME
// ==========================================================

volumeBar.addEventListener(
    "input",
    () => {


        audioPlayer.volume =
            Number(
                volumeBar.value
            );


        if (
            audioPlayer.volume > 0
        ) {

            previousVolume =
                audioPlayer.volume;

        }


        updateVolumeIcon();

    }
);


// ==========================================================
// VOLUME ICON
// ==========================================================

function updateVolumeIcon() {

    const icon =
        volumeIcon.querySelector(
            "i"
        );


    if (
        audioPlayer.volume === 0
    ) {

        icon.className =
            "fa-solid fa-volume-xmark";

    } else if (
        audioPlayer.volume < 0.5
    ) {

        icon.className =
            "fa-solid fa-volume-low";

    } else {

        icon.className =
            "fa-solid fa-volume-high";

    }

}


// ==========================================================
// MUTE
// ==========================================================

volumeIcon.addEventListener(
    "click",
    () => {


        if (
            audioPlayer.volume > 0
        ) {

            previousVolume =
                audioPlayer.volume;

            audioPlayer.volume =
                0;

            volumeBar.value =
                0;

        } else {

            audioPlayer.volume =
                previousVolume || 1;

            volumeBar.value =
                audioPlayer.volume;

        }


        updateVolumeIcon();

    }
);


// ==========================================================
// INITIALIZE
// ==========================================================

updatePlaylistHeader();

displayPlaylistSongs();

updateVolumeIcon();

updatePlayIcon();

// ==========================================================
// DYNAMIC PLAYLIST SIDEBAR
// ==========================================================

function loadSidebarPlaylists() {

    const sidebarPlaylists =
        document.getElementById(
            "sidebar-playlists"
        );


    if (!sidebarPlaylists) {
        return;
    }


    // Get playlists
    const savedPlaylists =
        JSON.parse(
            localStorage.getItem(
                "vybePlaylists"
            )
        ) || [];


    // Clear sidebar
    sidebarPlaylists.innerHTML = "";


    // Heading
    const heading =
        document.createElement(
            "div"
        );

    heading.className =
        "playlist-heading";

    heading.textContent =
        "YOUR PLAYLIST";


    sidebarPlaylists.appendChild(
        heading
    );


    // No playlists
    if (
        savedPlaylists.length === 0
    ) {

        return;

    }


    // Create playlist links
    savedPlaylists.forEach(
        savedPlaylist => {

            const item =
                document.createElement(
                    "a"
                );


            item.className =
                "playlist-item simple-playlist";


            item.href =
                `create-playlist.html?id=${savedPlaylist.id}`;


            item.innerHTML = `

                <i class="fa-solid fa-music"></i>

                <span>
                    ${savedPlaylist.name}
                </span>

            `;


            // Highlight current playlist
            if (
                savedPlaylist.id === playlistId
            ) {

                item.classList.add(
                    "active-playlist"
                );

            }


            sidebarPlaylists.appendChild(
                item
            );

        }
    );

}


// Load sidebar
loadSidebarPlaylists();