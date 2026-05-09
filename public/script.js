async function ambilNomor() {

    const jumlah = document.getElementById('jumlah').value;

    const res = await fetch('/get-number/' + jumlah);

    const data = await res.json();

    if (!data.numbers.length) {
        alert('Stock kosong');
        return;
    }

    const hasil = data.numbers.join('\n');

    navigator.clipboard.writeText(hasil);

    alert('Nomor berhasil disalin');

    updateStock();
}

async function updateStock() {

    const res = await fetch('/stock');

    const data = await res.json();

    document.getElementById('stock').innerText =
        data.stock;
}

updateStock();