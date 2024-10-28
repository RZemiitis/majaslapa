let songsData = [];
let songsPerPage = 15;
let currentPage = 1;

fetch('tautasdziesmas.json')//izmantoju fetch, lai linkotu jsonu uz javascriptu
    .then(response => response.json())
    .then(data => {
        songsData = data;
        updatePaginationButtons(Math.ceil(songsData.length / songsPerPage));//aktivi aprekina cik pogas ir vajadzigas, gadijuma ja papildina datubazi
        displaySongs(songsData, currentPage);
    })
    .catch(error => console.error('Error loading the songs:', error));//backup, gadijuma ja nestrada jsons

function displaySongs(songs, page = 1) {
    const songList = document.getElementById('songList');
    songList.innerHTML = '';

    const startIndex = (page - 1) * songsPerPage;
    const endIndex = startIndex + songsPerPage;
    const displayedSongs = songs.slice(startIndex, endIndex);

    displayedSongs.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="song-title1">${song.rinda1}<br></span>
            <span class="song-title">${song.rinda2}<br></span>
            <span class="song-title">${song.rinda3}<br></span>
            <span class="song-title">${song.rinda4}<br></span>
        `;
        songList.appendChild(li);
    });
}

function searchSongs() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let filteredSongs = songsData.filter(song => 
        song.rinda1.toLowerCase().includes(input) || 
        song.rinda2.toLowerCase().includes(input) ||
        song.rinda3.toLowerCase().includes(input) ||
        song.rinda4.toLowerCase().includes(input)
    );

    currentPage = 1;
    updatePaginationButtons(Math.ceil(filteredSongs.length / songsPerPage));
    displaySongs(filteredSongs, currentPage);
}

function goToPage(pageNumber) {
    currentPage = pageNumber;
    const input = document.getElementById('searchInput').value;
    if (input) {
        searchSongs();
    } else {
        displaySongs(songsData, currentPage);
    }
    updatePaginationButtons(Math.ceil((input ? filteredSongs : songsData).length / songsPerPage));
}

function updatePaginationButtons(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    if (currentPage > 1) {
        const firstButton = document.createElement('button');
        firstButton.textContent = '1';
        firstButton.onclick = () => goToPage(1);
        paginationContainer.appendChild(firstButton);
    }

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > totalPages - 3) {
        startPage = Math.max(1, totalPages - 3);
        endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => goToPage(i);
        if (i === currentPage) button.classList.add('active');
        paginationContainer.appendChild(button);
    }

    if (currentPage < totalPages - 2) {
        const lastButton = document.createElement('button');
        lastButton.textContent = totalPages;
        lastButton.onclick = () => goToPage(totalPages);
        paginationContainer.appendChild(lastButton);
    }
}
