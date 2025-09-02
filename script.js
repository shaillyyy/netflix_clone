// Sample Movies
const movies = [
  {
    title: 'Stranger Things',
    img: 'https://picsum.photos/seed/1/400/600',
    video: 'https://www.youtube.com/embed/b9EkMc79ZSU'
  },
  {
    title: 'Money Heist',
    img: 'https://picsum.photos/seed/2/400/600',
    video: 'https://www.youtube.com/embed/_InqQJRqGW4'
  },
  {
    title: 'The Crown',
    img: 'https://picsum.photos/seed/3/400/600',
    video: 'https://www.youtube.com/embed/JWtnJjn6ng0'
  },
  {
    title: 'Dark',
    img: 'https://picsum.photos/seed/4/400/600',
    video: 'https://www.youtube.com/embed/cq2iTHoLrt0'
  },
  {
    title: 'Breaking Bad',
    img: 'https://picsum.photos/seed/5/400/600',
    video: 'https://www.youtube.com/embed/HhesaQXLuRY'
  }
];

const categories = [
  { name: 'Trending Now', items: movies },
  { name: 'Top Picks', items: movies },
  { name: 'New Releases', items: movies }
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

  // Auto-slide effect
  let scrollAmount = 0;
  setInterval(() => {
    if (cards.scrollLeft + cards.clientWidth >= cards.scrollWidth) {
      // Reset to start
      cards.scrollTo({ left: 0, behavior: "smooth" });
      scrollAmount = 0;
    } else {
      scrollAmount += 200; // move by 200px
      cards.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  }, 3000); // every 3 sec
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

// Play Hero Button
document.getElementById('playHero').addEventListener('click', () => openModal(movies[0]));

// Search filter
document.getElementById('searchInput').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('.meta').textContent.toLowerCase();
    card.style.display = title.includes(q) ? '' : 'none';
  });
});
