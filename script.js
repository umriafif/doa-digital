// ==================== 1. JADWAL SHOLAT & COUNTDOWN ====================

const PRAYER_SCHEDULES = {
  jakarta: {
    name: "Jakarta",
    subuh: "04:12",
    dzuhur: "11:42",
    ashar: "15:02",
    maghrib: "17:54",
    isya: "19:07"
  },
  bandung: {
    name: "Bandung",
    subuh: "04:09",
    dzuhur: "11:39",
    ashar: "15:00",
    maghrib: "17:51",
    isya: "19:04"
  },
  surabaya: {
    name: "Surabaya",
    subuh: "03:48",
    dzuhur: "11:18",
    ashar: "14:38",
    maghrib: "17:30",
    isya: "18:43"
  },
  yogyakarta: {
    name: "Yogyakarta",
    subuh: "03:57",
    dzuhur: "11:27",
    ashar: "14:47",
    maghrib: "17:39",
    isya: "18:52"
  },
  semarang: {
    name: "Semarang",
    subuh: "03:56",
    dzuhur: "11:26",
    ashar: "14:46",
    maghrib: "17:38",
    isya: "18:51"
  },
  medan: {
    name: "Medan",
    subuh: "04:52",
    dzuhur: "12:15",
    ashar: "15:37",
    maghrib: "18:14",
    isya: "19:26"
  },
  makassar: {
    name: "Makassar",
    subuh: "04:24",
    dzuhur: "11:53",
    ashar: "15:15",
    maghrib: "18:04",
    isya: "19:17"
  }
};

const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

let selectedCityKey = localStorage.getItem('selectedWilayah') || 'jakarta';

function initPrayerClock() {
  const wilayahSelect = document.getElementById('wilayahSelect');
  if (wilayahSelect) {
    wilayahSelect.value = selectedCityKey;
    wilayahSelect.addEventListener('change', (e) => {
      selectedCityKey = e.target.value;
      localStorage.setItem('selectedWilayah', selectedCityKey);
      updateClockAndCountdown();
    });
  }

  updateClockAndCountdown();
  setInterval(updateClockAndCountdown, 1000);
}

function updateClockAndCountdown() {
  const now = new Date();

  // 1. Tampilkan Waktu Lokal Real-Time
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const clockStr = `${hours}:${minutes}:${seconds} WIB`;

  const clockEl = document.getElementById('currentClockDisplay');
  if (clockEl) {
    clockEl.textContent = clockStr;
  }

  // 2. Tampilkan Tanggal Bahasa Indonesia
  const dayName = DAY_NAMES[now.getDay()];
  const dateNum = now.getDate();
  const monthName = MONTH_NAMES[now.getMonth()];
  const yearNum = now.getFullYear();
  const dateStr = `${dayName}, ${dateNum} ${monthName} ${yearNum}`;

  const dateEl = document.getElementById('currentDateDisplay');
  if (dateEl) {
    dateEl.textContent = dateStr;
  }

  // 3. Tentukan Jadwal Sholat Kota Aktif
  const schedule = PRAYER_SCHEDULES[selectedCityKey] || PRAYER_SCHEDULES['jakarta'];
  const prayers = [
    { name: 'Subuh', time: schedule.subuh },
    { name: 'Dzuhur', time: schedule.dzuhur },
    { name: 'Ashar', time: schedule.ashar },
    { name: 'Maghrib', time: schedule.maghrib },
    { name: 'Isya', time: schedule.isya }
  ];

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowSeconds = now.getSeconds();

  let nextPrayer = null;
  let nextPrayerMinutes = 0;

  for (let p of prayers) {
    const [h, m] = p.time.split(':').map(Number);
    const pMinutes = h * 60 + m;
    if (pMinutes > nowMinutes || (pMinutes === nowMinutes && nowSeconds === 0)) {
      nextPrayer = p;
      nextPrayerMinutes = pMinutes;
      break;
    }
  }

  let isTomorrow = false;
  if (!nextPrayer) {
    // Jika semua sholat hari ini sudah lewat, maka sholat berikutnya adalah Subuh besok
    nextPrayer = prayers[0];
    const [h, m] = nextPrayer.time.split(':').map(Number);
    nextPrayerMinutes = h * 60 + m;
    isTomorrow = true;
  }

  // 4. Hitung Sisa Waktu Countdown
  let totalRemainingSeconds = 0;
  if (isTomorrow) {
    const remainingToday = (24 * 60 - nowMinutes) * 60 - nowSeconds;
    totalRemainingSeconds = remainingToday + (nextPrayerMinutes * 60);
  } else {
    totalRemainingSeconds = (nextPrayerMinutes * 60) - (nowMinutes * 60 + nowSeconds);
  }

  if (totalRemainingSeconds < 0) totalRemainingSeconds = 0;

  const cdHours = String(Math.floor(totalRemainingSeconds / 3600)).padStart(2, '0');
  const cdMinutes = String(Math.floor((totalRemainingSeconds % 3600) / 60)).padStart(2, '0');
  const cdSecs = String(totalRemainingSeconds % 60).padStart(2, '0');

  // Update Tampilan DOM
  const nextNameEl = document.getElementById('nextPrayerName');
  const nextTimeEl = document.getElementById('nextPrayerTime');
  const countdownEl = document.getElementById('countdownDisplay');

  if (nextNameEl) nextNameEl.textContent = nextPrayer.name;
  if (nextTimeEl) nextTimeEl.textContent = `${nextPrayer.time} WIB`;
  if (countdownEl) countdownEl.textContent = `${cdHours}:${cdMinutes}:${cdSecs}`;
}


// ==================== 2. DOA FAVORIT (3 DOA TERPILIH) ====================

function renderFavoritePrayers() {
  const container = document.getElementById('favCardsContainer');
  if (!container || typeof doaData === 'undefined' || !doaData.length) return;

  // Pilih 3 doa terfavorit: Keluar Rumah (id: 9), Sapu Jagad (id: 25), Bangun Tidur (id: 1)
  const targetIds = [9, 25, 1];
  const favoriteItems = targetIds.map(id => doaData.find(d => d.id === id)).filter(Boolean);

  container.innerHTML = favoriteItems.map(item => `
    <div class="card fav-card">
      <div class="fav-card-top">
        <h3 class="fav-card-title">${item.title}</h3>
        <span class="doa-source">${item.source}</span>
      </div>
      <div class="fav-arabic-box">
        <div class="fav-arabic">${item.arabic}</div>
      </div>
      <p class="fav-latin">${item.latin}</p>
      <p class="fav-meaning">${item.meaning}</p>
      <div class="fav-card-bottom">
        <a href="daftar_doa.html" class="fav-link-detail">Detail &rarr;</a>
      </div>
    </div>
  `).join('');
}


// ==================== 3. DAFTAR DOA (ACCORDION DROPDOWN) ====================

const ITEMS_PER_PAGE = 5;
let currentPage = 1;

function renderAccordionList() {
  const container = document.getElementById('simpleList');
  const infoCount = document.getElementById('infoCount');
  if (!container || typeof doaData === 'undefined' || !doaData.length) return;

  const totalItems = doaData.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentItems = doaData.slice(startIndex, endIndex);

  if (infoCount) {
    infoCount.textContent = `Menampilkan ${startIndex + 1}-${endIndex} dari ${totalItems} doa`;
  }

  container.innerHTML = currentItems.map((item, index) => {
    const itemNum = String(startIndex + index + 1).padStart(2, '0');
    return `
      <div class="accordion-item" data-id="${item.id}">
        <div class="accordion-header">
          <div class="accordion-title-wrap">
            <span class="accordion-num">${itemNum}</span>
            <span class="accordion-title">${item.title}</span>
          </div>
          <div class="accordion-actions">
            <span class="accordion-source">${item.source}</span>
            <span class="accordion-chevron">&#9660;</span>
          </div>
        </div>
        <div class="accordion-body">
          <div class="accordion-body-inner">
            <div class="doa-arabic-box">
              <div class="doa-arabic">${item.arabic}</div>
            </div>
            <div class="doa-latin">${item.latin}</div>
            <div class="doa-meaning"><span class="label">Arti:</span> ${item.meaning}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  renderPagination();
}

function setupAccordionEvents() {
  const container = document.getElementById('simpleList');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;
    const item = header.closest('.accordion-item');
    if (item) {
      item.classList.toggle('open');
    }
  });

  const btnExpandAll = document.getElementById('btnExpandAll');
  if (btnExpandAll) {
    btnExpandAll.addEventListener('click', () => {
      document.querySelectorAll('.accordion-item').forEach(it => it.classList.add('open'));
    });
  }

  const btnCollapseAll = document.getElementById('btnCollapseAll');
  if (btnCollapseAll) {
    btnCollapseAll.addEventListener('click', () => {
      document.querySelectorAll('.accordion-item').forEach(it => it.classList.remove('open'));
    });
  }
}

function renderPagination() {
  const container = document.getElementById('paginationContainer');
  if (!container || typeof doaData === 'undefined') return;

  container.innerHTML = '';
  const totalPages = Math.ceil(doaData.length / ITEMS_PER_PAGE);
  if (totalPages <= 1) return;

  // Tombol Previous «
  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.innerHTML = '&laquo;';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderAccordionList();
      scrollToAccordionSection();
    }
  };
  container.appendChild(prevBtn);

  // Batasi tombol halaman yang tampil agar rapi
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  }
  if (currentPage > totalPages - 3) {
    startPage = Math.max(1, totalPages - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.onclick = () => {
      if (currentPage !== i) {
        currentPage = i;
        renderAccordionList();
        scrollToAccordionSection();
      }
    };
    container.appendChild(pageBtn);
  }

  // Tombol Next »
  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.innerHTML = '&raquo;';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderAccordionList();
      scrollToAccordionSection();
    }
  };
  container.appendChild(nextBtn);
}

function scrollToAccordionSection() {
  const section = document.getElementById('daftarDoaSection');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


// ==================== 4. SEARCH REDIRECT ====================

function setupSearchRedirect() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.location.href = 'daftar_doa.html';
      }
    });
  }
}


// ==================== 5. INISIALISASI ====================

document.addEventListener('DOMContentLoaded', () => {
  initPrayerClock();
  renderFavoritePrayers();
  renderAccordionList();
  setupAccordionEvents();
  setupSearchRedirect();
});
