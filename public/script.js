async function loadCount() {
  let res = await fetch('/api/count');
  let data = await res.json();

  document.getElementById('count').innerText = data.total;
}

async function ambil(count) {
  let res = await fetch('/api/random/' + count);
  let data = await res.json();

  document.getElementById('result').value = data.join('\n');

  loadCount();
}

loadCount();