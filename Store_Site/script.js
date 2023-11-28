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
    console.log(category);
    // Встановлюємо новий URL та викликаємо pushState
    history.pushState({ page: 'category' }, '', `/${category}`);

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

  // Додати кнопку "Купити"
  const buyButton = document.createElement('button');
  buyButton.textContent = 'Купити';
  buyButton.addEventListener('click', function () {
    // Змінити URL та викликати pushState
    const category = product.category;
    const productId = product.id;
    const newURL = `/${category}/${productId}`;
    history.pushState({ page: 'product', productURL: newURL }, '', newURL);

    alert(`Товар "${product.name}" куплений!`);

    const backURL = `/${category}`;
  history.pushState({ page: 'category'}, '', backURL);
  });

  productInfoBlock.appendChild(buyButton);
  connectionToBasket(selectedProduct);
}

function connectionToBasket(selectedProduct){
  // Отримати поточний список доданих товарів з локального сховища
const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

// Додати новий товар до списку
existingCart.push(selectedProduct);

// Оновити локальне сховище
localStorage.setItem('cart', JSON.stringify(existingCart));
// Оновити кількість доданих товарів у відображенні в шапці
document.getElementById('basket-count').textContent = existingCart.length;
}



