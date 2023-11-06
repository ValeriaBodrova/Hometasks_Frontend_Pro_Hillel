const products = [
    { name: 'Товар 1', category: 'Категорія 1', price: 100},
    { name: 'Товар 2', category: 'Категорія 1', price: 150},
    { name: 'Товар 3', category: 'Категорія 1', price: 200},

    { name: 'Товар 1', category: 'Категорія 2', price: 100},
    { name: 'Товар 2', category: 'Категорія 2', price: 150},
    { name: 'Товар 3', category: 'Категорія 2', price: 200},

    { name: 'Товар 1', category: 'Категорія 3', price: 100},
    { name: 'Товар 2', category: 'Категорія 3', price: 150},
    { name: 'Товар 3', category: 'Категорія 3', price: 200},
  ];
  
  function displayProductsByCategory(category) {
    // Фільтруємо товари за обраною категорією
    const filteredProducts = products.filter(product => product.category === category);
  
    // Отримуємо доступ до середнього блоку, де буде відображено
    // список товарів для обраної категорії
    const middleBlock = document.getElementById('middle-block');
  
    // Очищаємо вміст середнього блоку
    middleBlock.innerHTML = '';
  
    // Додаємо товари до середнього блоку
    filteredProducts.forEach(product => {
      const productElement = document.createElement('div');
      productElement.textContent = `${product.name} - Ціна: ${product.price} грн`;
      middleBlock.appendChild(productElement);
    });
  }
  
  const categories = document.getElementById('categories-list');
  // При кліку на елемент списку категорій
  categories.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      // Отримуємо обрану категорію з дата-атрибута
      const category = event.target.getAttribute('data-category');
  
      // Викликаємо функцію для відображення товарів цієї категорії
      displayProductsByCategory(category);
      history.pushState({ page: 'category', category }, '', `/${category}`);
    }
  });

// Обробник події popstate для оновлення вмісту при натисканні кнопок назад/вперед у браузері
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page === 'category') {
        const category = event.state.category;

        displayProductsByCategory(category);
    }
});
