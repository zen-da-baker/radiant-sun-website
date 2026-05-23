const fullscreen = document.getElementById('fullscreen');
const frame = document.getElementById('frame');

function handleFullscreen() {
    
    frame.style.top = 0;
    frame.style.left = 0;
    frame.style.width = '100%';
    frame.style.height = '100%';
    frame.style.position = 'absolute';
}

fullscreen.addEventListener('click', handleFullscreen);