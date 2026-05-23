const backToTopBtn = document.getElementById('back-to-top')

function backToTop() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
}

backToTopBtn.addEventListener('click', backToTop);