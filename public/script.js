async function ambilNomor() {

    const jumlah = document.getElementById('jumlah').value;

    const res = await fetch('/get-number/' + jumlah);

    const data = await res.json();

    if (!data.numbers || data.numbers.length === 0) {
        alert('Stok nomor habis');
        return;
    }

    navigator.clipboard.writeText(
        data.numbers.join('\n')
    );

    alert('Nomor berhasil disalin');
}