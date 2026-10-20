// search mengarah ke halaman doa
const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      window.location.href = 'daftar_doa.html';
    }
  });
}
