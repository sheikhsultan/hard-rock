let inputTitle = document.getElementById('title');
const searchBtn = document.getElementById('search');

// For collect 10 search result of songs
let songList = [];

// Search activity
searchBtn.addEventListener('click', function () {
    const title = inputTitle.value;
    songList = [];
    if (!title) {
      alert("There is nothing to search");
    }
    if (title.length > 0) {
        const searchApi = `https://api.lyrics.ovh/suggest/${title}`;
        fetch(searchApi)
            .then((res) => res.json())
            .then((data) => {
                let len = data.data.length;
                if (len > 10) len = 10;

                const searchResult = document.getElementById('searchResult');
                searchResult.innerHTML = '';

                for (let i = 0; i < len; i++) {
                    const songTitle = data.data[i].title;
                    const album = data.data[i].album.title;
                    const artist = data.data[i].artist.name;
                    const pic = data.data[i].artist.picture_small;
                    const playLink = data.data[i].preview;

                    songList[i] = [i, songTitle, artist];

                    searchResult.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                            <div class="col-md-7">
                                              <h3 class="lyrics-name"> ${songTitle} </h3>
                                              <p class="author lead">${album} By ${artist}</p>
                                            </div>
                                            <div class="col-md-1">
                                              <a href="${playLink}" target="_blank"> Play </a>
                                            </div>
                                            <div class="col-md-1">
                                              <img src="${pic}"> </img>
                                            </div>
                                            <div class="col-md-3 text-md-right text-center">
                                              <button class="btn btn-success" onclick="showLyrics(${i})">Get Lyrics</button>
                                            </div>
                                          </div>`;
                }
            });
    }
});

// Show Lyrics after click on "Get Lyrics" button
const showLyrics = (id) => {
    const title = songList[id][1];
    const artist = songList[id][2];

    const lyricApi = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(lyricApi)
        .then((res) => res.json())
        .then((data) => {
            const showTitle = document.getElementById('songInfo');
            showTitle.innerHTML = `${title} - ${artist}`;

            const showLyric = document.getElementById('showLyric');
            let myLyrics = data.lyrics;
            if (!myLyrics) {
                myLyrics = 'No lyrics found!';
            }
            showLyric.innerText = `${myLyrics}`;
        });
};