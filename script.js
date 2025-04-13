const container = document.querySelector('.cards-container');
const progressFill = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');
const filterSelect = document.querySelector('#filter');

function renderCards() {
    challenges.forEach(challenge => {
        const card = createCard(challenge);
        container.appendChild(card);
    });
}

function getCardColor(index) {
    const colors = getComputedStyle(document.documentElement).getPropertyValue('--card-colors').split(',');
    return colors[index % colors.length].trim();
}

function createCard(challenge) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = challenge.id;
    
    // カードの色を設定
    const cardColor = getCardColor(challenge.id - 1);
    card.style.setProperty('--card-color', cardColor);

    card.innerHTML = `
        <div class="card__inner">
            <div class="card__face card__face--front">
                <span class="card__number">#${challenge.id}</span>
                <h2 class="card__title">${challenge.title}</h2>
                <input type="checkbox" class="card__checkbox" ${challenge.isCompleted ? 'checked' : ''}>
            </div>
            <div class="card__face card__face--back">
                <p>${challenge.detail}</p>
            </div>
        </div>
    `;

    attachCardListeners(card);
    return card;
}

function attachCardListeners(card) {
    const checkbox = card.querySelector('.card__checkbox');
    
    card.addEventListener('click', (e) => {
        if (e.target !== checkbox) {
            card.classList.toggle('is-flipped');
        }
    });

    checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        const id = card.dataset.id;
        saveCompletedState(id, e.target.checked);
        updateProgress();
        applyFilter(filterSelect.value);
    });
}

function saveCompletedState(id, isCompleted) {
    localStorage.setItem(`challenge-${id}`, isCompleted);
}

function loadCompletedState() {
    const checkboxes = document.querySelectorAll('.card__checkbox');
    checkboxes.forEach(checkbox => {
        const card = checkbox.closest('.card');
        const id = card.dataset.id;
        const isCompleted = localStorage.getItem(`challenge-${id}`) === 'true';
        checkbox.checked = isCompleted;
    });
}

function updateProgress() {
    const total = challenges.length;
    const completed = document.querySelectorAll('.card__checkbox:checked').length;
    const percentage = (completed / total) * 100;
    
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${completed}/${total} 完了`;
}

function attachFilterListener() {
    filterSelect.addEventListener('change', (e) => {
        applyFilter(e.target.value);
    });
}

function applyFilter(filterValue) {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const checkbox = card.querySelector('.card__checkbox');
        const isCompleted = checkbox.checked;
        
        card.classList.remove('hidden');
        
        if (filterValue === 'completed' && !isCompleted) {
            card.classList.add('hidden');
        } else if (filterValue === 'incomplete' && isCompleted) {
            card.classList.add('hidden');
        }
    });
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    loadCompletedState();
    updateProgress();
    attachFilterListener();
});