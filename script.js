
let songsData = [];

// Ielādē tautasdziesmas no ārējā JSON faila
fetch('tautasdziesmas.json')
    .then(response => response.json())
    .then(data => {
        songsData = data;
        displaySongs(songsData); // Parāda sākotnējo sarakstu
    })
    .catch(error => console.error('Error loading the songs:', error));

// Funkcija, lai attēlotu tautasdziesmas
function displaySongs(songs) {
    const songList = document.getElementById('songList');
    songList.innerHTML = ''; // Iztukšo sarakstu

    // Izveido HTML struktūru katrai dziesmai
    songs.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="song-title">${song.rinda1}<br></span>
            <span class="song-title">${song.rinda2}<br></span>
            <span class="song-title">${song.rinda3}<br></span>
            <span class="song-title">${song.rinda4}<br></span>
        `;
        songList.appendChild(li);
    });
}

// Meklēšanas funkcija
function searchSongs() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    
    // Filtrē tautasdziesmas pēc meklēšanas ievades
    let filteredSongs = songsData.filter(song => {
        return song.tautasdziesma.toLowerCase().includes(input) || 
               song.rinda2.toLowerCase().includes(input) ||
               song.rinda3.toLowerCase().includes(input) ||
               song.rinda4.toLowerCase().includes(input);
    });
    
    // Atjaunina tautasdziesmu sarakstu ar filtrētajiem rezultātiem
    displaySongs(filteredSongs);
}