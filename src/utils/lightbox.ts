export function initGallery() {
  const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item');
  const lightbox = document.getElementById('lightbox') as HTMLElement | null;
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement | null;
  const closeLightbox = document.getElementById('close-lightbox') as HTMLElement | null;
  const prevBtn = document.getElementById('prev-btn') as HTMLElement | null;
  const nextBtn = document.getElementById('next-btn') as HTMLElement | null;
  const currentImageSpan = document.getElementById('current-image') as HTMLElement | null;
  const loadMoreBtn = document.querySelector('.load-more') as HTMLButtonElement | null;

  let currentImageIndex = 0;

  // Lightbox functionality
  galleryItems.forEach((item, index) => {
    const zoomBtn = item.querySelector('.gallery-zoom');

    zoomBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(index);
    });

    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index: number) {
    currentImageIndex = index;
    const imgSrc = galleryItems[index].getAttribute('data-src');
    if (!imgSrc || !lightboxImg || !lightbox) return;

    lightboxImg.src = imgSrc;
    lightbox.classList.remove('opacity-0', 'invisible');
    lightbox.classList.add('opacity-100', 'visible');

    if (currentImageSpan) {
      currentImageSpan.textContent = (index + 1).toString();
    }

    document.body.style.overflow = 'hidden';
  }

  function closeLightboxModal() {
    if (!lightbox) return;
    lightbox.classList.add('opacity-0', 'invisible');
    lightbox.classList.remove('opacity-100', 'visible');
    document.body.style.overflow = '';
  }

  // Navegación
  prevBtn?.addEventListener('click', () => {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryItems.length - 1;
    const imgSrc = galleryItems[currentImageIndex].getAttribute('data-src');
    if (!imgSrc || !lightboxImg) return;

    lightboxImg.src = imgSrc;
    if (currentImageSpan) {
      currentImageSpan.textContent = (currentImageIndex + 1).toString();
    }
  });

  nextBtn?.addEventListener('click', () => {
    currentImageIndex = currentImageIndex < galleryItems.length - 1 ? currentImageIndex + 1 : 0;
    const imgSrc = galleryItems[currentImageIndex].getAttribute('data-src');
    if (!imgSrc || !lightboxImg) return;

    lightboxImg.src = imgSrc;
    if (currentImageSpan) {
      currentImageSpan.textContent = (currentImageIndex + 1).toString();
    }
  });

  // Cerrar
  closeLightbox?.addEventListener('click', closeLightboxModal);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightboxModal();
  });

  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('visible')) return;

    if (e.key === 'Escape') closeLightboxModal();
    if (e.key === 'ArrowLeft') prevBtn?.click();
    if (e.key === 'ArrowRight') nextBtn?.click();
  });

  // Load more
  loadMoreBtn?.addEventListener('click', function (this: HTMLButtonElement) {
    this.innerHTML = `
      <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581
          m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
        </path>
      </svg>
      Cargando...
    `;

    setTimeout(() => {
      this.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        ¡Todas las imágenes cargadas!
      `;
      this.disabled = true;
      this.classList.add('opacity-50', 'cursor-not-allowed');
    }, 1500);
  });
}
