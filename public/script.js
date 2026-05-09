async function ambilNomor() {

    const jumlah = document.getElementById('jumlah').value;

    const res = await fetch('/get-number/' + jumlah);

    const data = await res.json();

    if (!data.numbers.length) {
        alert('Stok kosong');
        return;
    }

    navigator.clipboard.writeText(
        data.numbers.join('\n')
    );

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