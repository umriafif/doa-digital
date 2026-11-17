// ==================== 1. JADWAL SHOLAT & COUNTDOWN (API EQURAN.ID) ====================

// Data cadangan jika API tidak terhubung / offline
const FALLBACK_PRAYER_TIMES = {
  subuh: "04:12",
  dzuhur: "11:42",
  ashar: "15:02",
  maghrib: "17:54",
  isya: "19:07"
};

const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Wilayah tersimpan (default: DKI Jakarta & Jakarta Pusat)
let selectedProvinsi = localStorage.getItem('selectedProvinsi') || 'DKI Jakarta';
let selectedKabKota = localStorage.getItem('selectedKabKota') || 'Kota Adm. Jakarta Pusat';

// Menyimpan jadwal sholat aktif di memori
let currentPrayerTimes = null;

// Fungsi memperbarui jam dan tanggal lokal real-time
function updateClock() {
  const now = new Date();

  // Jam lokal
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const clockEl = document.getElementById('currentClockDisplay');
  if (clockEl) {
    clockEl.textContent = `${hours}:${minutes}:${seconds} WIB`;
  }

  // Tanggal
  const dayName = DAY_NAMES[now.getDay()];
  const dateNum = now.getDate();
  const monthName = MONTH_NAMES[now.getMonth()];
  const yearNum = now.getFullYear();
  const dateEl = document.getElementById('currentDateDisplay');
  if (dateEl) {
    dateEl.textContent = `${dayName}, ${dateNum} ${monthName} ${yearNum}`;
  }
}

// Fungsi menghitung countdown sholat berikutnya
function updateCountdown() {
  if (!currentPrayerTimes) return;

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowSeconds = now.getSeconds();

  const prayers = [
    { name: 'Subuh', time: currentPrayerTimes.subuh },
    { name: 'Dzuhur', time: currentPrayerTimes.dzuhur },
    { name: 'Ashar', time: currentPrayerTimes.ashar },
    { name: 'Maghrib', time: currentPrayerTimes.maghrib },
    { name: 'Isya', time: currentPrayerTimes.isya }
  ];

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
    nextPrayer = prayers[0]; // Subuh esok hari
    const [h, m] = nextPrayer.time.split(':').map(Number);
    nextPrayerMinutes = h * 60 + m;
    isTomorrow = true;
  }

  // Hitung sisa detik
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

  // Update elemen DOM
  const nextNameEl = document.getElementById('nextPrayerName');
  const nextTimeEl = document.getElementById('nextPrayerTime');
  const countdownEl = document.getElementById('countdownDisplay');

  if (nextNameEl) nextNameEl.textContent = nextPrayer.name;
  if (nextTimeEl) nextTimeEl.textContent = `${nextPrayer.time} WIB`;
  if (countdownEl) countdownEl.textContent = `${cdHours}:${cdMinutes}:${cdSecs}`;
}

// 1. Ambil daftar Provinsi dari API
async function fetchProvinsi() {
  const provSelect = document.getElementById('provinsiSelect');
  if (!provSelect) return;

  try {
    const response = await fetch('https://equran.id/api/v2/shalat/provinsi');
    const result = await response.json();
    const provinsiList = Array.isArray(result) ? result : (result.data || []);

    provSelect.innerHTML = '';
    provinsiList.forEach(prov => {
      const opt = document.createElement('option');
      opt.value = prov;
      opt.textContent = prov;
      provSelect.appendChild(opt);
    });

    if (provinsiList.includes(selectedProvinsi)) {
      provSelect.value = selectedProvinsi;
    } else if (provinsiList.length > 0) {
      selectedProvinsi = provinsiList[0];
      provSelect.value = selectedProvinsi;
      localStorage.setItem('selectedProvinsi', selectedProvinsi);
    }
  } catch (error) {
    console.error('Gagal mengambil provinsi:', error);
    provSelect.innerHTML = `
      <option value="DKI Jakarta">DKI Jakarta</option>
      <option value="Jawa Barat">Jawa Barat</option>
      <option value="Jawa Tengah">Jawa Tengah</option>
      <option value="Jawa Timur">Jawa Timur</option>
      <option value="DI Yogyakarta">DI Yogyakarta</option>
    `;
    provSelect.value = selectedProvinsi;
  }

  // Lanjutkan mengambil daftar kab/kota untuk provinsi ini
  await fetchKabKota(provSelect.value);
}

// 2. Ambil daftar Kab/Kota berdasarkan Provinsi
async function fetchKabKota(provinsiName) {
  const kabSelect = document.getElementById('kabkotaSelect');
  if (!kabSelect) return;

  kabSelect.disabled = true;
  kabSelect.innerHTML = '<option value="">Memuat kab/kota...</option>';

  try {
    const response = await fetch('https://equran.id/api/v2/shalat/kabkota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provinsi: provinsiName })
    });
    const result = await response.json();
    const kabList = Array.isArray(result) ? result : (result.data || []);

    kabSelect.innerHTML = '';
    kabList.forEach(kab => {
      const opt = document.createElement('option');
      opt.value = kab;
      opt.textContent = kab;
      kabSelect.appendChild(opt);
    });

    if (kabList.includes(selectedKabKota)) {
      kabSelect.value = selectedKabKota;
    } else if (kabList.length > 0) {
      selectedKabKota = kabList[0];
      kabSelect.value = selectedKabKota;
      localStorage.setItem('selectedKabKota', selectedKabKota);
    }
    kabSelect.disabled = false;
  } catch (error) {
    console.error('Gagal mengambil kab/kota:', error);
    kabSelect.innerHTML = '<option value="Kota Adm. Jakarta Pusat">Kota Adm. Jakarta Pusat</option>';
    selectedKabKota = 'Kota Adm. Jakarta Pusat';
    kabSelect.disabled = false;
  }

  // Ambil jadwal sholat untuk kab/kota ini
  await fetchJadwalSholat(provinsiName, kabSelect.value);
}

// 3. Ambil jadwal sholat untuk kota terpilih (1 kali saat render / ganti kota)
async function fetchJadwalSholat(provinsiName, kabkotaName) {
  const nextTimeEl = document.getElementById('nextPrayerTime');
  if (nextTimeEl && !currentPrayerTimes) {
    nextTimeEl.textContent = 'Memuat...';
  }

  const now = new Date();
  const bulan = now.getMonth() + 1;
  const tahun = now.getFullYear();
  const tanggalHariIni = now.getDate();

  try {
    const response = await fetch('https://equran.id/api/v2/shalat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provinsi: provinsiName,
        kabkota: kabkotaName,
        bulan: bulan,
        tahun: tahun
      })
    });
    const result = await response.json();
    const listJadwal = (result.data && result.data.jadwal) ? result.data.jadwal : (result.jadwal || []);

    const todayData = listJadwal.find(item => Number(item.tanggal) === tanggalHariIni) || listJadwal[0];

    if (todayData) {
      currentPrayerTimes = {
        subuh: todayData.subuh,
        dzuhur: todayData.dzuhur,
        ashar: todayData.ashar,
        maghrib: todayData.maghrib,
        isya: todayData.isya
      };
    } else {
      currentPrayerTimes = FALLBACK_PRAYER_TIMES;
    }
  } catch (error) {
    console.error('Gagal mengambil jadwal sholat:', error);
    currentPrayerTimes = FALLBACK_PRAYER_TIMES;
  }

  updateCountdown();
}

// Inisialisasi sholat & event dropdown
function initPrayerClock() {
  const provSelect = document.getElementById('provinsiSelect');
  const kabSelect = document.getElementById('kabkotaSelect');

  if (provSelect) {
    provSelect.addEventListener('change', (e) => {
      selectedProvinsi = e.target.value;
      localStorage.setItem('selectedProvinsi', selectedProvinsi);
      fetchKabKota(selectedProvinsi);
    });
  }

  if (kabSelect) {
    kabSelect.addEventListener('change', (e) => {
      selectedKabKota = e.target.value;
      localStorage.setItem('selectedKabKota', selectedKabKota);
      fetchJadwalSholat(selectedProvinsi, selectedKabKota);
    });
  }

  // Update jam & countdown setiap detik
  updateClock();
  updateCountdown();
  setInterval(() => {
    updateClock();
    updateCountdown();
  }, 1000);

  // Ambil data wilayah dari API saat pertama kali dibuka
  fetchProvinsi();
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


// ==================== 3. DAFTAR DOA (5 DOA TERPILIH - ACCORDION) ====================

const HOME_DOA_LIMIT = 5;

function renderAccordionList() {
  const container = document.getElementById('simpleList');
  const infoCount = document.getElementById('infoCount');
  if (!container || typeof doaData === 'undefined' || !doaData.length) return;

  const currentItems = doaData.slice(0, HOME_DOA_LIMIT);

  if (infoCount) {
    infoCount.textContent = `Menampilkan ${currentItems.length} doa`;
  }

  container.innerHTML = currentItems.map((item, index) => {
    const itemNum = String(index + 1).padStart(2, '0');
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
