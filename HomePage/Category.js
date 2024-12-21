let activeCategory = 'all';

function setCategory(category) {
    activeCategory = category;

    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach((btn) => btn.classList.remove('active'));
    document.querySelector(`[onclick="setCategory('${category}')"]`).classList.add('active');

    filterCards();
}

function filterCards() {
    const minPrice = parseInt(document.getElementById('min-price').value) || 0;
    const maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;

    const cards = document.querySelectorAll('.place-card');

    cards.forEach((card) => {
        const priceText = card.querySelector('.card-cost').textContent;
        const prices = priceText.match(/\d+/g).map(Number);
        const minCardPrice = Math.min(...prices);
        const maxCardPrice = Math.max(...prices);

        const categoryMatch =
            activeCategory === 'all' || card.classList.contains(`category-${activeCategory}`);
        const priceMatch =
            minCardPrice >= minPrice && maxCardPrice <= maxPrice;

        if (categoryMatch && priceMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
