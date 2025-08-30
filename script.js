const movies = [
  {
    title: 'Stranger Things',
    desc: 'Friends uncover mysteries in their small town.',
    img: 'https://picsum.photos/seed/1/400/600',
    video: 'https://www.youtube.com/embed/b9EkMc79ZSU'
  },
  {
    title: 'Money Heist',
    desc: 'A criminal mastermind plans the perfect heist.',
    img: 'https://picsum.photos/seed/2/400/600',
    video: 'https://www.youtube.com/embed/_InqQJRqGW4'
  },
  {
    title: 'The Crown',
    desc: 'The story of the British royal family.',
    img: 'https://picsum.photos/seed/3/400/600',
    video: 'https://www.youtube.com/embed/JWtnJjn6ng0'
  }
];

const categories = [
  { name: 'Trending Now', items: movies }
];

const rowsEl = document.getElementById('rows');

// Create movie rows
function createRow(cat) {
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = `<h3>${cat.name}</h3><div class="cards"></div>`;
  
  const cards = row.querySelector('.cards');
  cat.items.forEach(m => {
    const c = document.createElement('div');
    c.className = 'card';
    c.innerHTML = `
      <img src="${m.img}" alt="${m.title}">
      <div class="meta">${m.title}</div>
    `;
    c.addEventListener('click', () => openModal(m));
    cards.appendChild(c);
  });
  rowsEl.appendChild(row);
}
categories.forEach(createRow);

// Modal
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const player = document.getElementById('player');
const closeModalBtn = document.getElementById('closeModal');
const modalBackdrop = document.getElementById('modalBackdrop');

function openModal(m) {
  modal.classList.add('show');
  modalTitle.textContent = `Playing — ${m.title}`;
  player.innerHTML = `<iframe src="${m.video}" allowfullscreen></iframe>`;
}

function closeModal() {
  modal.classList.remove('show');
  player.innerHTML = '';
}

closeModalBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.getElementById('playHero').addEventListener('click', () => openModal(movies[0]));

// Search filter
document.getElementById('searchInput').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('.meta').textContent.toLowerCase();
    card.style.display = title.includes(q) ? '' : 'none';
  });
});
