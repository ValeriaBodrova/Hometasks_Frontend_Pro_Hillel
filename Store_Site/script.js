const products = [
  { name: 'Товар 1', category: 'flowers', price: 200, id: '1' },
  { name: 'Товар 2', category: 'flowers', price: 350, id: '2' },
  { name: 'Товар 3', category: 'flowers', price: 250, id: '3' },
  { name: 'Товар 1', category: 'electronics', price: 1000, id: '4' },
  { name: 'Товар 2', category: 'electronics', price: 1500, id: '5' },
  { name: 'Товар 3', category: 'electronics', price: 2000, id: '6' },
  { name: 'Товар 1', category: 'books', price: 100, id: '7' },
  { name: 'Товар 2', category: 'books', price: 150, id: '8' },
  { name: 'Товар 3', category: 'books', price: 200, id: '9' },
];

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

function displayProductsByCategory(category) {
  const filteredProducts = products.filter(product => product.category === category);
  console.log(filteredProducts);

  const middleBlock = document.getElementById('middle-block');

  middleBlock.innerHTML = '';

  filteredProducts.forEach(product => {
    const productElement = document.createElement('div');
    const productLink = document.createElement('a');
    productLink.href = `/product/${product.id}`;
    productElement.textContent = `${product.name} - Ціна: ${product.price} грн`;
    productLink.appendChild(productElement);
    middleBlock.appendChild(productLink);

    productLink.addEventListener('click', function (event) {
      event.preventDefault();
      const productId = this.getAttribute('href').split('/')[2];
      const selectedProduct = products.find(product => product.id === productId);

      history.pushState({ page: 'product', productURL: `product/${productId}` }, '', `product/${productId}`);

      displayProductInfo(selectedProduct);
    });
  });
}

function displayProductInfo(product) {
  const productInfoBlock = document.getElementById('selected-product-info');
  productInfoBlock.innerHTML = '';

  const productName = document.createElement('div');
  productName.textContent = `Назва: ${product.name}`;
  productInfoBlock.appendChild(productName);

  const productPrice = document.createElement('div');
  productPrice.textContent = `Ціна: ${product.price} грн`;
  productInfoBlock.appendChild(productPrice);
  console.log(productInfoBlock);
}

// Отримання поточного URL
const currentURL = window.location.pathname;

// Функція для обробки URL і відображення інформації про товар
function handleProductURL(url) {
  // Розділення URL, щоб отримати id товару
  const parts = url.split('/');
  const productId = parts[2]; // Тут має бути індекс, на якому знаходиться id у вашому URL

  // Знайдемо товар з відповідним id
  const selectedProduct = products.find(product => product.id === productId);

  displayProductInfo(selectedProduct);
}

// Виклик функції для обробки поточного URL
handleProductURL(currentURL);

// Обробник події popstate для оновлення інформації про товар при натисканні кнопок назад/вперед у браузері
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page === 'product') {
    // Отримаємо URL товару зі стану
    const productURL = event.state.productURL;

    handleProductURL(productURL);
  }
});
