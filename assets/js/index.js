// import '../../node_modules/leaflet/dist/leaflet.js';

    const map = L.map('map').setView([48.8666, 2.3333], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);