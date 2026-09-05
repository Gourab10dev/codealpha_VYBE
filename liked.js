// ==========================================================
// VYBE - LIKED SONGS PAGE + MUSIC PLAYER
// ==========================================================


// ==========================================================
// GET SAVED LIKED SONGS
// ==========================================================

let likedSongs =
    JSON.parse(
        localStorage.getItem("vybeLikedSongs")
    ) || [];


// ==========================================================
// ELEMENTS - LIKED SONG PAGE
// ==========================================================

const likedSongsContainer =
    document.getElementById(
        "liked-songs-container"
    );

const emptyLiked =
    document.getElementById(
        "empty-liked"
    );

const likedCount =
    document.getElementById(
        "liked-count"
    );


// ==========================================================
// PLAYER ELEMENTS
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

const likeButton =
    document.getElementById(
        "like-button"
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


// ==========================================================
// PLAYER STATE
// ==========================================================

let currentSongIndex = -1;

let isShuffle = false;

let isRepeat = false;

let previousVolume = 1;


// ==========================================================
// FORMAT TIME
// ==========================================================

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${secs}`;
}


// ==========================================================
// UPDATE PLAY ICON
// ==========================================================

function updatePlayIcon() {

    if (!playButton) return;

    if (audioPlayer.paused) {

        playButton.innerHTML =
            '<i class="fa-solid fa-play"></i>';

        playButton.title = "Play";

    } else {

        playButton.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

        playButton.title = "Pause";
    }
}


// ==========================================================
// CHECK WHETHER SONG IS LIKED
// ==========================================================

function isSongLiked(song) {

    return likedSongs.some(
        likedSong =>
            likedSong.audio === song.audio
    );
}


// ==========================================================
// UPDATE LIKE BUTTON
// ==========================================================

function updateLikeButton() {

    if (
        currentSongIndex < 0 ||
        currentSongIndex >= likedSongs.length
    ) {
        return;
    }

    const song =
        likedSongs[currentSongIndex];


    if (isSongLiked(song)) {

        likeButton.classList.add(
            "liked"
        );

        likeButton.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

        likeButton.title =
            "Remove from Liked Songs";

    } else {

        likeButton.classList.remove(
            "liked"
        );

        likeButton.innerHTML =
            '<i class="fa-regular fa-plus"></i>';

        likeButton.title =
            "Add to Liked Songs";
    }
}


// ==========================================================
// PLAY SONG
// ==========================================================

function playSong(index) {

    if (
        index < 0 ||
        index >= likedSongs.length
    ) {
        return;
    }


    currentSongIndex = index;

    const song =
        likedSongs[currentSongIndex];


    // AUDIO

    audioPlayer.src =
        song.audio;


    // SONG INFORMATION

    songTitle.textContent =
        song.title;

    songArtist.textContent =
        song.artist;


    // SONG IMAGE

    songImage.style.backgroundImage =
        `url("${song.image}")`;


    // RESET PROGRESS

    progressBar.value = 0;

    currentTime.textContent =
        "0:00";

    duration.textContent =
        "0:00";


    // PLAY

    audioPlayer.play()
        .then(() => {

            updatePlayIcon();

        })
        .catch(error => {

            console.log(
                "Playback error:",
                error
            );

            updatePlayIcon();

        });


    updateLikeButton();
}


// ==========================================================
// PLAY / PAUSE
// ==========================================================

playButton.addEventListener(
    "click",
    function () {

        if (!audioPlayer.src) {

            if (likedSongs.length > 0) {
                playSong(0);
            }

            return;
        }


        if (audioPlayer.paused) {

            audioPlayer.play();

        } else {

            audioPlayer.pause();

        }
    }
);


// ==========================================================
// AUDIO PLAY
// ==========================================================

audioPlayer.addEventListener(
    "play",
    function () {

        updatePlayIcon();

    }
);


// ==========================================================
// AUDIO PAUSE
// ==========================================================

audioPlayer.addEventListener(
    "pause",
    function () {

        updatePlayIcon();

    }
);


// ==========================================================
// PREVIOUS SONG
// ==========================================================

prevButton.addEventListener(
    "click",
    function () {

        if (likedSongs.length === 0) {
            return;
        }


        if (currentSongIndex <= 0) {

            currentSongIndex =
                likedSongs.length - 1;

        } else {

            currentSongIndex--;
        }


        playSong(
            currentSongIndex
        );
    }
);


// ==========================================================
// NEXT SONG
// ==========================================================

nextButton.addEventListener(
    "click",
    function () {

        if (likedSongs.length === 0) {
            return;
        }


        if (isShuffle) {

            let randomIndex;

            do {

                randomIndex =
                    Math.floor(
                        Math.random() *
                        likedSongs.length
                    );

            } while (
                likedSongs.length > 1 &&
                randomIndex === currentSongIndex
            );


            currentSongIndex =
                randomIndex;

        } else {

            currentSongIndex++;

            if (
                currentSongIndex >=
                likedSongs.length
            ) {

                currentSongIndex = 0;
            }
        }


        playSong(
            currentSongIndex
        );
    }
);


// ==========================================================
// SHUFFLE
// ==========================================================

shuffleButton.addEventListener(
    "click",
    function () {

        isShuffle =
            !isShuffle;


        shuffleButton.classList.toggle(
            "active",
            isShuffle
        );
    }
);


// ==========================================================
// REPEAT
// ==========================================================

repeatButton.addEventListener(
    "click",
    function () {

        isRepeat =
            !isRepeat;


        repeatButton.classList.toggle(
            "active",
            isRepeat
        );
    }
);


// ==========================================================
// SONG ENDED
// ==========================================================

audioPlayer.addEventListener(
    "ended",
    function () {

        if (isRepeat) {

            audioPlayer.currentTime = 0;

            audioPlayer.play();

            return;
        }


        if (likedSongs.length === 0) {
            return;
        }


        if (isShuffle) {

            let randomIndex;

            do {

                randomIndex =
                    Math.floor(
                        Math.random() *
                        likedSongs.length
                    );

            } while (
                likedSongs.length > 1 &&
                randomIndex === currentSongIndex
            );


            playSong(randomIndex);

        } else {

            let nextIndex =
                currentSongIndex + 1;


            if (
                nextIndex >=
                likedSongs.length
            ) {

                nextIndex = 0;
            }


            playSong(nextIndex);
        }
    }
);


// ==========================================================
// PROGRESS UPDATE
// ==========================================================

audioPlayer.addEventListener("timeupdate", () => {

    if (
        !audioPlayer.duration ||
        isNaN(audioPlayer.duration)
    ) {
        return;
    }

    const percentage =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;

    progressBar.value = percentage;

    currentTime.textContent =
        formatTime(audioPlayer.currentTime);

});


// ==========================================================
// METADATA LOADED
// ==========================================================

audioPlayer.addEventListener("loadedmetadata", () => {

    if (
        !audioPlayer.duration ||
        isNaN(audioPlayer.duration)
    ) {
        return;
    }

    duration.textContent =
        formatTime(audioPlayer.duration);

    progressBar.value = 0;

    currentTime.textContent = "0:00";

});


// ==========================================================
// SEEK / DRAG PROGRESS BAR
// ==========================================================

progressBar.addEventListener("input", () => {

    if (
        !audioPlayer.duration ||
        isNaN(audioPlayer.duration)
    ) {
        return;
    }

    const seekTime =
        (Number(progressBar.value) / 100) *
        audioPlayer.duration;

    audioPlayer.currentTime = seekTime;

    currentTime.textContent =
        formatTime(seekTime);

});


// ==========================================================
// VOLUME
// ==========================================================

volumeBar.addEventListener(
    "input",
    function () {

        audioPlayer.volume =
            volumeBar.value;


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

        volumeIcon.title =
            "Unmute";

    } else if (
        audioPlayer.volume < 0.5
    ) {

        icon.className =
            "fa-solid fa-volume-low";

        volumeIcon.title =
            "Mute";

    } else {

        icon.className =
            "fa-solid fa-volume-high";

        volumeIcon.title =
            "Mute";
    }
}


// ==========================================================
// MUTE / UNMUTE
// ==========================================================

volumeIcon.addEventListener(
    "click",
    function () {

        if (
            audioPlayer.volume > 0
        ) {

            previousVolume =
                audioPlayer.volume;

            audioPlayer.volume = 0;

            volumeBar.value = 0;

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
// LIKE / UNLIKE CURRENT SONG
// ==========================================================

likeButton.addEventListener(
    "click",
    function () {

        if (
            currentSongIndex < 0 ||
            currentSongIndex >=
            likedSongs.length
        ) {
            return;
        }


        const song =
            likedSongs[currentSongIndex];


        const existingIndex =
            likedSongs.findIndex(
                likedSong =>
                    likedSong.audio ===
                    song.audio
            );


        if (existingIndex !== -1) {

            likedSongs.splice(
                existingIndex,
                1
            );


            localStorage.setItem(
                "vybeLikedSongs",
                JSON.stringify(
                    likedSongs
                )
            );


            /*
             * Since this is the
             * Liked Songs page,
             * refresh the list.
             */

            displayLikedSongs();


            /*
             * If the current song
             * was removed, clear
             * the player.
             */

            if (
                likedSongs.length === 0
            ) {

                audioPlayer.pause();

                audioPlayer.src = "";

                songTitle.textContent =
                    "No song playing";

                songArtist.textContent =
                    "—";

                songImage.style.backgroundImage =
                    "none";

                currentSongIndex = -1;

                updatePlayIcon();

            } else {

                if (
                    currentSongIndex >=
                    likedSongs.length
                ) {

                    currentSongIndex =
                        likedSongs.length - 1;
                }

                updateLikeButton();
            }
        }
    }
);


// ==========================================================
// DISPLAY LIKED SONGS
// ==========================================================

function displayLikedSongs() {

    likedSongsContainer.innerHTML =
        "";


    // ======================================================
    // EMPTY
    // ======================================================

    if (
        likedSongs.length === 0
    ) {

        emptyLiked.style.display =
            "block";

        likedCount.textContent =
            "0 songs";

        return;
    }


    // ======================================================
    // SONGS EXIST
    // ======================================================

    emptyLiked.style.display =
        "none";


    likedCount.textContent =
        `${likedSongs.length} ${
            likedSongs.length === 1
                ? "song"
                : "songs"
        }`;


    // ======================================================
    // CREATE SONG ROWS
    // ======================================================

    likedSongs.forEach(
        (song, index) => {

            const songElement =
                document.createElement(
                    "div"
                );


            songElement.classList.add(
                "liked-song"
            );


            songElement.innerHTML = `

                <img
                    src="${song.image}"
                    alt="${song.title}"
                    class="liked-song-image"
                >


                <div class="liked-song-info">

                    <h3>
                        ${song.title}
                    </h3>

                    <p>
                        ${song.artist}
                    </p>

                </div>


                <button
                    class="liked-play-button"
                    type="button"
                    title="Play ${song.title}"
                    aria-label="Play ${song.title}"
                >

                    <i
                        class="fa-solid fa-play"
                    ></i>

                </button>


                <button
                    class="liked-remove-button"
                    type="button"
                    title="Remove from Liked Songs"
                    aria-label="Remove ${song.title}"
                >

                    <i
                        class="fa-solid fa-heart"
                    ></i>

                </button>

            `;


            likedSongsContainer.appendChild(
                songElement
            );


            // ==================================================
            // PLAY
            // ==================================================

            const playButton =
                songElement.querySelector(
                    ".liked-play-button"
                );


            playButton.addEventListener(
                "click",
                function () {

                    playSong(index);

                }
            );


            // ==================================================
            // CLICK SONG ROW
            // ==================================================

            songElement.addEventListener(
                "dblclick",
                function (event) {

                    if (
                        event.target.closest(
                            "button"
                        )
                    ) {
                        return;
                    }


                    playSong(index);

                }
            );


            // ==================================================
            // REMOVE
            // ==================================================

            const removeButton =
                songElement.querySelector(
                    ".liked-remove-button"
                );


            removeButton.addEventListener(
                "click",
                function () {

                    const wasCurrentSong =
                        currentSongIndex ===
                        index;


                    likedSongs.splice(
                        index,
                        1
                    );


                    localStorage.setItem(
                        "vybeLikedSongs",
                        JSON.stringify(
                            likedSongs
                        )
                    );


                    if (
                        wasCurrentSong
                    ) {

                        audioPlayer.pause();

                        audioPlayer.src = "";

                        songTitle.textContent =
                            "No song playing";

                        songArtist.textContent =
                            "—";

                        songImage.style.backgroundImage =
                            "none";

                        currentSongIndex =
                            -1;

                        updatePlayIcon();
                    }


                    displayLikedSongs();
                }
            );

        }
    );
}


// ==========================================================
// INITIAL VOLUME
// ==========================================================

audioPlayer.volume = 1;

volumeBar.value = 1;

updateVolumeIcon();

updatePlayIcon();


// ==========================================================
// LOAD LIKED SONGS
// ==========================================================

displayLikedSongs();

// ==========================================================
// VYBE DYNAMIC PLAYLIST SIDEBAR
// ==========================================================

function loadSidebarPlaylists() {

    const sidebarPlaylists =
        document.getElementById(
            "sidebar-playlists"
        );


    // If sidebar playlist area doesn't exist
    if (!sidebarPlaylists) {
        return;
    }


    // Get saved playlists
    const savedPlaylists =
        JSON.parse(
            localStorage.getItem(
                "vybePlaylists"
            )
        ) || [];


    // Clear old items
    sidebarPlaylists.innerHTML = "";


    // ======================================================
    // HEADING
    // ======================================================

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


    // ======================================================
    // NO PLAYLISTS
    // ======================================================

    if (
        savedPlaylists.length === 0
    ) {

        const emptyMessage =
            document.createElement(
                "div"
            );

        emptyMessage.className =
            "sidebar-playlist-empty";

        emptyMessage.textContent =
            "No playlists yet";


        sidebarPlaylists.appendChild(
            emptyMessage
        );

        return;
    }


    // ======================================================
    // CREATE PLAYLIST LINKS
    // ======================================================

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


            sidebarPlaylists.appendChild(
                item
            );

        }
    );

}


// ==========================================================
// LOAD PLAYLIST SIDEBAR
// ==========================================================

loadSidebarPlaylists();