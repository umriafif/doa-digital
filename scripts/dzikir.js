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