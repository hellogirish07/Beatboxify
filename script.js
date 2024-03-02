var files = []; // Array to store selected files
var currentIndex = 0; // Index of currently playing file
var audioPlayer = document.getElementById('audioPlayer');
var progressBar = document.getElementById('progressBar');

document.getElementById('fileInput').addEventListener('change', function (event) {
    files = event.target.files;
    currentIndex = 0; // Reset current index
    displayPlaylist();
});

document.getElementById('btnPlay').addEventListener('click', function () {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

audioPlayer.addEventListener('play', function () {
    // document.getElementById('btnPlay').textContent = 'Pause';
    btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

audioPlayer.addEventListener('pause', function () {
    // document.getElementById('btnPlay').textContent = 'Play';
    btnPlay.innerHTML = '<i class="fa-brands fa-google-play"></i>';
});

audioPlayer.addEventListener('timeupdate', function () {
    var progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
});

document.getElementById('btnNext').addEventListener('click', function () {
    if (files.length > 0) {
        playNext();
    }
});

document.getElementById('btnPrevious').addEventListener('click', function () {
    if (files.length > 0) {
        playPrevious();
    }
});

function displayPlaylist() {
    var playlist = document.getElementById('playlist');
    playlist.innerHTML = ''; // Clear existing playlist

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var listItem = document.createElement('li');
        listItem.textContent = file.name;
        listItem.setAttribute('data-index', i);
        listItem.addEventListener('click', function (event) {
            var index = parseInt(event.target.getAttribute('data-index'));
            playAudio(index);
        });
        playlist.appendChild(listItem);
    }
}

// function playAudio(index) {
//     currentIndex = index;
//     audioPlayer.src = URL.createObjectURL(files[index]);
//     audioPlayer.play();
// }

function playAudio(index) {
    currentIndex = index;
    audioPlayer.src = URL.createObjectURL(files[index]);
    audioPlayer.play();
    updateCurrentSongName(index);
}

function updateCurrentSongName(index) {
    var audioNameDiv = document.getElementById('audio-name');
    audioNameDiv.textContent = files[index].name;
}


function playNext() {
    var nextIndex = (currentIndex + 1) % files.length; // Wrap around to beginning
    playAudio(nextIndex);
}

function playPrevious() {
    var previousIndex = currentIndex - 1;
    if (previousIndex < 0) {
        previousIndex = files.length - 1; // Wrap around to end
    }
    playAudio(previousIndex);
}
