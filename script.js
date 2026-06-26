// =====================
// GALLERY FILTER
// =====================

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});


// =====================
// LIGHTBOX
// =====================

const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

let currentIndex = 0;
let visibleItems  = [];

// Open lightbox when clicking a gallery item
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    // Build list of currently visible items
    visibleItems = [...galleryItems].filter(i => !i.classList.contains('hidden'));
    currentIndex = visibleItems.indexOf(item);
    openLightbox(currentIndex);
  });
});

function openLightbox(index) {
  const item    = visibleItems[index];
  const img     = item.querySelector('img');
  const caption = item.querySelector('.overlay p');

  lightboxImg.src         = img.src;
  lightboxImg.alt         = img.alt;
  lightboxCaption.textContent = caption ? caption.textContent : '';

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

// Click outside image to close
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Previous image
lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  openLightbox(currentIndex);
});

// Next image
lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % visibleItems.length;
  openLightbox(currentIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;

  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   lightboxPrev.click();
  if (e.key === 'ArrowRight')  lightboxNext.click();
});
