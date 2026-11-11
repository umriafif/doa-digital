/**
 * Doa Digital - Script Jadwal Sholat (jadwal.js)
 * Mengelola Jam Real-Time, Countdown Waktu Sholat, & 8 Jadwal Sholat Harian
 */

// ==================== BASIS DATA JADWAL SHOLAT ====================

const PRAYER_SCHEDULES = {
  jakarta: {
    name: "Jakarta",
    imsak: "04:02",
    subuh: "04:12",
    terbit: "05:28",
    dhuha: "06:12",
    dzuhur: "11:42",
    ashar: "15:02",
    maghrib: "17:54",
    isya: "19:07"
  },
  bandung: {
    name: "Bandung",
    imsak: "03:59",
    subuh: "04:09",
    terbit: "05:25",
    dhuha: "06:09",
    dzuhur: "11:39",
    ashar: "15:00",
    maghrib: "17:51",
    isya: "19:04"
  },
  surabaya: {
    name: "Surabaya",
    imsak: "03:38",
    subuh: "03:48",
    terbit: "05:04",
    dhuha: "05:48",
    dzuhur: "11:18",
    ashar: "14:38",
    maghrib: "17:30",
    isya: "18:43"
  },
  yogyakarta: {
    name: "Yogyakarta",
    imsak: "03:47",
    subuh: "03:57",
    terbit: "05:13",
    dhuha: "05:57",
    dzuhur: "11:27",
    ashar: "14:47",
    maghrib: "17:39",
    isya: "18:52"
  },
  semarang: {
    name: "Semarang",
    imsak: "03:46",
    subuh: "03:56",
    terbit: "05:12",
    dhuha: "05:56",
    dzuhur: "11:26",
    ashar: "14:46",
    maghrib: "17:38",
    isya: "18:51"
  },
  medan: {
    name: "Medan",
    imsak: "04:42",
    subuh: "04:52",
    terbit: "06:08",
    dhuha: "06:52",
    dzuhur: "12:15",
    ashar: "15:37",
    maghrib: "18:14",
    isya: "19:26"
  },
  makassar: {
    name: "Makassar",
    imsak: "04:14",
    subuh: "04:24",
    terbit: "05:40",
    dhuha: "06:24",
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

// ==================== INISIALISASI & EVENT LISTENERS ====================

function initJadwalPage() {
  const wilayahSelect = document.getElementById('wilayahSelect');
  if (wilayahSelect) {
    wilayahSelect.value = selectedCityKey;
    wilayahSelect.addEventListener('change', (e) => {
      selectedCityKey = e.target.value;
      localStorage.setItem('selectedWilayah', selectedCityKey);
      updateJadwalUI();
    });
  }

  updateJadwalUI();
  setInterval(updateJadwalUI, 1000);
}

// ==================== FUNGSI UTAMA PEMBARUAN JADWAL ====================

function updateJadwalUI() {
  const now = new Date();

  // 1. Format Waktu Lokal Real-Time
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const clockStr = `${hours}:${minutes}:${seconds} WIB`;

  const clockEl = document.getElementById('currentClockDisplay');
  if (clockEl) {
    clockEl.textContent = clockStr;
  }

  // 2. Format Tanggal Lengkap Bahasa Indonesia
  const dayName = DAY_NAMES[now.getDay()];
  const dateNum = now.getDate();
  const monthName = MONTH_NAMES[now.getMonth()];
  const yearNum = now.getFullYear();
  const dateStr = `${dayName}, ${dateNum} ${monthName} ${yearNum}`;

  const dateEl = document.getElementById('currentDateDisplay');
  if (dateEl) {
    dateEl.textContent = dateStr;
  }

  // 3. Ambil Jadwal Kota Terpilih
  const s = PRAYER_SCHEDULES[selectedCityKey] || PRAYER_SCHEDULES['jakarta'];

  // 8 Waktu Lengkap (Imsak, Subuh, Terbit, Dhuha, Dzuhur, Ashar, Maghrib, Isya)
  const allPrayers = [
    { name: 'Imsak', time: s.imsak },
    { name: 'Subuh', time: s.subuh },
    { name: 'Terbit', time: s.terbit },
    { name: 'Dhuha', time: s.dhuha },
    { name: 'Dzuhur', time: s.dzuhur },
    { name: 'Ashar', time: s.ashar },
    { name: 'Maghrib', time: s.maghrib },
    { name: 'Isya', time: s.isya }
  ];

  // 5 Waktu Sholat Fardhu untuk Countdown
  const fardhuPrayers = [
    { name: 'Subuh', time: s.subuh },
    { name: 'Dzuhur', time: s.dzuhur },
    { name: 'Ashar', time: s.ashar },
    { name: 'Maghrib', time: s.maghrib },
    { name: 'Isya', time: s.isya }
  ];

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowSeconds = now.getSeconds();

  let nextPrayer = null;
  let nextPrayerMinutes = 0;

  for (let p of fardhuPrayers) {
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
    nextPrayer = fardhuPrayers[0]; // Subuh esok hari
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

  // Update Countdown DOM
  const nextNameEl = document.getElementById('nextPrayerName');
  const nextTimeEl = document.getElementById('nextPrayerTime');
  const countdownEl = document.getElementById('countdownDisplay');

  if (nextNameEl) nextNameEl.textContent = nextPrayer.name;
  if (nextTimeEl) nextTimeEl.textContent = `${nextPrayer.time} WIB`;
  if (countdownEl) countdownEl.textContent = `${cdHours}:${cdMinutes}:${cdSecs}`;

  // 5. Render 8 Kartu Rincian Waktu Sholat
  const scheduleGrid = document.getElementById('scheduleGrid');
  if (scheduleGrid) {
    scheduleGrid.innerHTML = allPrayers.map(p => {
      const isNext = (p.name === nextPrayer.name);
      return `
        <div class="card schedule-card ${isNext ? 'active-card' : ''}">
          <div class="schedule-card-header">
            <span class="schedule-label">${p.name}</span>
            ${isNext ? '<span class="schedule-badge-active">Berikutnya</span>' : ''}
          </div>
          <div class="schedule-time">
            ${p.time} <span class="time-unit">WIB</span>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Inisialisasi setelah DOM siap
document.addEventListener('DOMContentLoaded', initJadwalPage);
