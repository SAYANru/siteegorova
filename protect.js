function addWatermark() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Создаем контейнер для водяного знака
        const container = document.createElement('div');
        container.style.position = 'relative';
        container.style.display = 'inline-block';
        
        img.parentNode.insertBefore(container, img);
        container.appendChild(img);
        
        const watermark = document.createElement('div');
        watermark.innerHTML = 'WB Наставник ©';
        watermark.style.position = 'absolute';
        watermark.style.bottom = '10px';
        watermark.style.right = '10px';
        watermark.style.color = 'rgba(255,255,255,0.7)';
        watermark.style.fontSize = '20px';
        watermark.style.fontWeight = 'bold';
        watermark.style.pointerEvents = 'none';
        watermark.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        
        container.appendChild(watermark);
    });
}

document.addEventListener('DOMContentLoaded', addWatermark);
