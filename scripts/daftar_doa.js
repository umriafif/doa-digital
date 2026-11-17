// Konfigurasi Pagination (Maksimal 10 Doa Per Halaman)
const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let filteredData = [...doaData];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const doaListContainer = document.getElementById('doaListContainer');
const paginationContainer = document.getElementById('paginationContainer');
const infoCount = document.getElementById('infoCount');

// Fungsi Render List Doa
function renderList() {
  doaListContainer.innerHTML = '';

  if (filteredData.length === 0) {
    doaListContainer.innerHTML = `
      <div class="no-result">
        <p>Doa yang Anda cari tidak ditemukan.</p>
      </div>
    `;
    paginationContainer.innerHTML = '';
    infoCount.textContent = 'Menampilkan 0 doa';
    return;
  }

  // Hitung Index Slice Data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length);
  const currentItems = filteredData.slice(startIndex, endIndex);

  infoCount.textContent = `Menampilkan ${startIndex + 1}-${endIndex} dari ${filteredData.length} doa`;

  // Buat Elemen Card Doa
  currentItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'doa-card';
    card.innerHTML = `
      <div class="doa-top">
        <span class="doa-title">${item.title}</span>
        <span class="doa-source">${item.source}</span>
      </div>
      <div class="doa-arabic-box">
        <div class="doa-arabic">${item.arabic}</div>
      </div>
      <div class="doa-latin">${item.latin}</div>
      <div class="doa-meaning"><span class="label">Arti:</span> ${item.meaning}</div>
    `;
    doaListContainer.appendChild(card);
  });

  renderPagination();
}

// Fungsi Render Pagination Sesuai Format « 1 2 3 4 »
function renderPagination() {
  paginationContainer.innerHTML = '';
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  if (totalPages <= 1) return;

  // Tombol Previous «
  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.innerHTML = '&laquo;';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderList();
      scrollToSection();
    }
  };
  paginationContainer.appendChild(prevBtn);

  // Angka Halaman
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.onclick = () => {
      currentPage = i;
      renderList();
      scrollToSection();
    };
    paginationContainer.appendChild(pageBtn);
  }

  // Tombol Next »
  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.innerHTML = '&raquo;';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderList();
      scrollToSection();
    }
  };
  paginationContainer.appendChild(nextBtn);
}

// Fungsi Scroll Otomatis ke awal list saat pindah halaman
function scrollToSection() {
  const section = document.getElementById('daftarDoaSection');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Fitur Live Search
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    filteredData = doaData.filter(item => 
      item.title.toLowerCase().includes(keyword) ||
      item.latin.toLowerCase().includes(keyword) ||
      item.meaning.toLowerCase().includes(keyword) ||
      item.arabic.includes(keyword)
    );
    currentPage = 1;
    renderList();
  });
}

// Inisialisasi Tampilan Awal
renderList();
