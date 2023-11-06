const products = [
    { name: 'Товар 1', category: 'flowers', price: 200},
    { name: 'Товар 2', category: 'flowers', price: 350},
    { name: 'Товар 3', category: 'flowers', price: 250},

    { name: 'Товар 1', category: 'electronics', price: 1000},
    { name: 'Товар 2', category: 'electronics', price: 1500},
    { name: 'Товар 3', category: 'electronics', price: 2000},

    { name: 'Товар 1', category: 'books', price: 100},
    { name: 'Товар 2', category: 'books', price: 150},
    { name: 'Товар 3', category: 'books', price: 200},
  ];
  
  function displayProductsByCategory(category) {
    // Фільтруємо товари за обраною категорією
    const filteredProducts = products.filter(product => product.category === category);
    console.log(filteredProducts);

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
    console.log(middleBlock);
  }
  


  const links = document.querySelectorAll('.list-group-item a');

  links.forEach(link => {
      link.addEventListener('click', function (event) {
          event.preventDefault();
          const category = this.getAttribute('href').substring(1);
  
          // Встановлюємо новий URL та викликаємо pushState
          history.pushState({ page: 'category', category }, '', `/${category}`);
  
          // Загружаємо вміст категорії і відображаємо його в контейнері
          displayProductsByCategory(category);
      });
  });

// Обробник події popstate для оновлення вмісту при натисканні кнопок назад/вперед у браузері
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page === 'category') {
        const category = event.state.category;

        displayProductsByCategory(category);
    }
});
