async function updateStock(){
  const res = await fetch('/stock');
  const data = await res.json();
  document.getElementById('stock').innerText = data.stock;
}

async function getNumber(amount){

  const res = await fetch(`/get-number/${amount}`);
  const data = await res.json();

  const result = document.getElementById('result');
  result.innerHTML = '';

  if(data.numbers.length === 0){
    result.innerHTML = '<div class="number">Nomor habis</div>';
    return;
  }

  data.numbers.forEach(num => {

    const div = document.createElement('div');
    div.className = 'number';

    div.innerHTML = `
      ${num}
      <div class="copy">Klik untuk salin</div>
    `;

    div.onclick = () => {
      navigator.clipboard.writeText(num);
      div.querySelector('.copy').innerText = 'Tersalin';
    };

    result.appendChild(div);

  });

  updateStock();
}

updateStock();