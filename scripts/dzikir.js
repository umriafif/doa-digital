// --- SCRIPT UNTUK COUNTER TASBIH & FILTER ---
  
  // 1. Jalankan setelah halaman selesai dimuat
  document.addEventListener('DOMContentLoaded', () => {
    const counterButtons = document.querySelectorAll('.btn-counter');

    counterButtons.forEach(button => {
      let currentCount = 0;
      // Ambil angka target dari atribut data-target, default ke 0 kalau tidak ada
      const targetCount = parseInt(button.getAttribute('data-target')) || 0;

      button.addEventListener('click', () => {
        currentCount++;

        // Jika target > 0 dan hitungan melebihi target, bisa di-reset atau berhenti di target
        // Di sini kita bikin kalau udah pas target, bisa di-reset kembali ke 0 atau lanjut terus.
        // Format teks tombol diubah otomatis:
        if (targetCount > 0) {
          button.innerText = `Hitung: ${currentCount} / ${targetCount}`;
          
          // Opsional: Kalau sudah selesai sesuai hitungan (misal 33), kasih efek atau notifikasi kecil
          if (currentCount === targetCount) {
            button.style.backgroundColor = '#10B981'; // Berubah warna hijau tanda selesai
            button.style.color = '#fff';
          }
        } else {
          // Kalau tidak ada batas target khusus
          button.innerText = `Hitung: ${currentCount}`;
        }
      });
    });
  });

  // Fungsi filter group yang sudah ada sebelumnya tetap dipertahankan
  function filterGroup(groupId, titleText, subtitleText) {
    document.querySelectorAll('.dzikir-group').forEach(group => {
      group.style.display = 'none';
    });
    document.querySelectorAll('.btn-filter').forEach(btn => {
      btn.classList.remove('active');
    });
    document.getElementById('group-' + groupId).style.display = 'block';
    event.currentTarget.classList.add('active');
    document.getElementById('header-title').innerText = titleText;
    document.getElementById('header-subtitle').innerText = subtitleText;
  }

  document.addEventListener('DOMContentLoaded', () => {
  // 1. Ambil tanggal hari ini (format: YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  const savedDate = localStorage.getItem('dzikir_last_date');

  const counterButtons = document.querySelectorAll('.btn-counter');
  const progressFill = document.getElementById('dzikir-progress-fill');
  const progressPercent = document.getElementById('dzikir-progress-percent');

  // 2. Cek apakah sudah ganti hari -> jika ya, reset semua hitungan
  if (savedDate !== today) {
    localStorage.setItem('dzikir_last_date', today);
    counterButtons.forEach((_, index) => {
      localStorage.removeItem(`dzikir_count_${index}`);
    });
  }

  // Fungsi untuk menghitung dan memperbarui persentase
  function updateOverallProgress() {
    let totalTarget = 0;
    let totalDone = 0;

    counterButtons.forEach((button, index) => {
      const target = parseInt(button.getAttribute('data-target')) || 0;
      const current = parseInt(localStorage.getItem(`dzikir_count_${index}`)) || 0;

      if (target > 0) {
        totalTarget += target;
        // Batasi hitungan per item agar tidak melebihi target saat dihitung ke persentase
        totalDone += Math.min(current, target);
      }
    });

    const percent = totalTarget > 0 ? Math.min(100, Math.round((totalDone / totalTarget) * 100)) : 0;

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressPercent) progressPercent.textContent = `${percent} %`;
  }

  // 3. Pasang event klik pada tiap tombol counter
  counterButtons.forEach((button, index) => {
    const targetCount = parseInt(button.getAttribute('data-target')) || 0;
    let currentCount = parseInt(localStorage.getItem(`dzikir_count_${index}`)) || 0;

    // Tampilkan nilai awal saat halaman dibuka
    button.innerText = targetCount > 0
      ? `Hitung: ${currentCount} / ${targetCount}`
      : `Hitung: ${currentCount}`;

    button.addEventListener('click', () => {
      currentCount++;
      localStorage.setItem(`dzikir_count_${index}`, currentCount);
      localStorage.setItem('dzikir_last_date', today);

      if (targetCount > 0) {
        button.innerText = `Hitung: ${currentCount} / ${targetCount}`;
        if (currentCount >= targetCount) {
          button.style.backgroundColor = '#10B981';
          button.style.color = '#fff';
        }
      } else {
        button.innerText = `Hitung: ${currentCount}`;
      }

      updateOverallProgress();
    });
  });

  // Hitung persentase pertama kali saat halaman dimuat
  updateOverallProgress();
});