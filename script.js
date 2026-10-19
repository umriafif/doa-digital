// ==========================================================
// FILTER PENCARIAN SEDERHANA (UNTUK LIST HARDCODE HTML)
// ==========================================================
const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const listItems = document.querySelectorAll('.list-item');

    listItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(keyword)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// ==========================================================
// INTERAKSI PAGINATION BASIC (GANTI CLASS ACTIVE)
// ==========================================================
const pageLinks = document.querySelectorAll('.pagination a');

pageLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isNaN(link.textContent.trim())) {
      pageLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});
