function toggleFavorite(event, btn) {
  event.stopPropagation();
  event.preventDefault();

  const card = btn.closest('.favorite-card');
  const icon = btn.querySelector('.star-icon');

  if (!card || card.dataset.removing === 'true') return;

  if (btn.classList.contains('active')) {
    btn.classList.remove('active');
    if (icon) icon.innerText = '☆';
    btn.setAttribute('title', 'Tambah ke Favorit');

    card.dataset.removing = 'true';
    card.style.transition = 'all 0.3s ease';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';

    setTimeout(() => {
      card.remove();
      updateFavoriteCount();
    }, 300);
  } else {
    btn.classList.add('active');
    if (icon) icon.innerText = '★';
    btn.setAttribute('title', 'Hapus dari Favorit');
  }
}

function updateFavoriteCount() {
  const remainingCards = document.querySelectorAll('.favorite-card').length;
  const countBadge = document.getElementById('favorite-count');
  const emptyState = document.getElementById('empty-state');

  if (countBadge) {
    countBadge.innerText = `${remainingCards} Doa`;
    countBadge.style.display = remainingCards === 0 ? 'none' : 'inline-block';
  }

  if (emptyState) {
    emptyState.style.display = remainingCards === 0 ? 'block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', updateFavoriteCount);