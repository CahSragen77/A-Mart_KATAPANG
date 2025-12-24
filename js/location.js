// 1. Buka Google Maps
function openGoogleMaps() {
    window.open('https://maps.app.goo.gl/7Ah9ezhcviZHefX87', '_blank');
}

// 2. Rute dari lokasi pengguna
function getDirections() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const destination = '-6.934952,107.552441';
                window.open(
                    `https://www.google.com/maps/dir/${latitude},${longitude}/${destination}/`,
                    '_blank'
                );
            },
            () => openGoogleMaps()
        );
    } else {
        openGoogleMaps();
    }
}

// 3. Telepon toko
function callStore() {
    if (confirm('Hubungi A-Mart Katapang di (022) 1234-5678?')) {
        window.location.href = 'tel:+622212345678';
    }
}

// 4. Share lokasi
function shareLocation() {
    const data = {
        title: 'A-Mart Katapang',
        text: 'Mini Market terlengkap di Katapang',
        url: 'https://maps.app.goo.gl/7Ah9ezhcviZHefX87'
    };

    if (navigator.share) {
        navigator.share(data);
    } else {
        navigator.clipboard.writeText(data.url);
        alert('Link lokasi disalin ke clipboard!');
    }
}

// 5. Live Time
function updateLiveTime() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta'
    });

    document.getElementById('liveTime').textContent = formatter.format(now);
}

// 6. Deteksi device
function detectDevice() {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
        const btn = document.querySelector('.btn-navigate');
        btn.innerHTML = '<i class="fas fa-map-marker-alt"></i><span>Buka di Aplikasi Maps</span>';
    }
}

// 7. Init
document.addEventListener('DOMContentLoaded', () => {
    updateLiveTime();
    setInterval(updateLiveTime, 1000);
    detectDevice();
});
