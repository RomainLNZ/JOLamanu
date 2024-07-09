// import '../../node_modules/leaflet/dist/leaflet.js';

const map = L.map('map').setView([48.8666, 2.3333], 12);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 2,
}).addTo(map);
//Marker




console.log(point);

console.log();

















for (let i = 0; i < point.length; i++) {
    L.marker([point[i].lat, point[i].long], { icon: icons[0] }).addTo(map);
}

// let singleMarker = L.marker([48.953, 2.3498], { icon: icons[0] });

// L.marker([48.883, 2.3498], { icon: icons[1] }).addTo(map);

// let popup = singleMarker.bindPopup('On est <p></p> laaaa' + singleMarker.getLatLng()).openPopup();

// popup.addTo(map);