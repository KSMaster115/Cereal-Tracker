document.addEventListener('DOMContentLoaded', function () {
    // Simulate fetching data from an API (replace with actual API request)
    const salesItems = [
        { id: 1, image: 'item1.jpg', title: 'Item 1', description: 'Top Seller 1', price: '$99.99' },
        { id: 2, image: 'item2.jpg', title: 'Item 2', description: 'Top Seller 2', price: '$89.99' },
        { id: 3, image: 'item3.jpg', title: 'Item 3', description: 'Top Seller 3', price: '$79.99' }
    ];

    // Get the carousel container and indicators
    const carouselItemsContainer = document.getElementById('carouselItems');
    const carouselIndicatorsContainer = document.getElementById('carouselIndicators');

    // Loop through the sales items and dynamically populate the carousel
    salesItems.forEach((item, index) => {
        // Create the carousel item
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('item');
        
        if (index === 0) {
            carouselItem.classList.add('active'); // Mark the first item as active
        }

        carouselItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="carousel-caption">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p><strong>${item.price}</strong></p>
            </div>
        `;
        
        carouselItemsContainer.appendChild(carouselItem);

        // Create the indicator
        const indicator = document.createElement('li');
        indicator.setAttribute('data-target', '#salesCarousel');
        indicator.setAttribute('data-slide-to', index);

        if (index === 0) {
            indicator.classList.add('active'); // Mark the first indicator as active
        }

        carouselIndicatorsContainer.appendChild(indicator);
    });
});