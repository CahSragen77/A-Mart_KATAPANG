function updateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    };
    document.getElementById('liveTime').textContent = now.toLocaleDateString('id-ID', options);
}
setInterval(updateTime, 1000);
updateTime();
