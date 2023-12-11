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

function displayCategories() {
  const links = document.querySelectorAll('.list-group-item a');
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const category = this.getAttribute('href').substring(1);
      console.log(category);
      history.pushState({page: 'category' }, '', `${category}`);
      displayProductsByCategory(category);
    });
  });
}
displayCategories();

function displayProductsByCategory(category) {
  const filteredProducts = products.filter(product => product.category === category);
console.log(filteredProducts);
  const middleBlock = document.getElementById('middle-block');
  middleBlock.innerHTML = '';

  filteredProducts.forEach(product => {
    const productElement = document.createElement('div');
    const productLink = document.createElement('a');
    productLink.href = `/${product.category}/${product.id}`;
    productElement.textContent = `${product.name} - Ціна: ${product.price} грн`;
    productLink.appendChild(productElement);
    middleBlock.appendChild(productLink);
    productLink.addEventListener('click', (event) => {
    event.preventDefault();
    history.pushState({ page: 'product' }, '', `${product.category}`);
    displayProductInfo(product);
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

  const buyButton = document.createElement('button');
  buyButton.textContent = 'Купити';
  buyButton.addEventListener('click', function (event) {
    event.preventDefault();
    const newURL = `/${product.category}/${product.id}`;
    history.pushState({ page: 'product' }, '', newURL);

    alert(`Товар "${product.name}" куплений!`);
    countItems();

    const backURL = `/${product.category}`;
    history.replaceState({ page: 'category'}, '', backURL);
  });

  productInfoBlock.appendChild(buyButton);
}
const BASKET_KEY = 'productsInBasket'
function countItems(itemId){
  const basketItems = JSON.parse(localStorage.getItem('cart')) || [];
  basketItems.push(itemId)
  localStorage.setItem(BASKET_KEY, JSON.stringify(basketItems));
  document.getElementById('basket-count').textContent = basketItems.length;
}

const basketLink = document.getElementById('basket-link');
basketLink.addEventListener('click', function (event) {
  event.preventDefault();
 history.pushState({page: 'basket'}, '', `/basket`);
 displayBasket();
});


function displayBasket() {
  const basketItems = JSON.parse(localStorage.getItem('cart')) || [];
  const productInfoBlock = document.getElementById('selected-product-info');
  productInfoBlock.innerHTML = '';
  const middleBlock = document.getElementById('middle-block');
  middleBlock.innerHTML = '';

  basketItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.textContent = `${item.name} - Ціна: ${item.price} грн`;
    middleBlock.appendChild(itemElement);
  });
}

/* const renderContent = () => {
  // render content according to the current url
  const match = window.location.pathname.match(/(\w+)\/?(\w*)/) || [, '', ''];
  const [, slug, productId] = match;
  if ((category === slug)) {
    displayCategories(
      displayProductsByCategory(slug)
    );
  }
  if (productId) {
    displayProductInfo(productId);
  }
  if (`/${slug}` === Route.basket) {
    displayBasket();
  }
}; */


/* const init = () => {
  displayCategories();
 renderContent();

  document.addEventListener(
    ONPUSH_STATE_EVENT_NAME,
    (event) => {
      console.log(event);
      const url = event.detail.url;
      const state = event.detail.state;
      console.log(state);
      switch (true) {
        case state.hasOwnProperty('category'): {
          displayProductsByCategory(products.filter(product => product.category === state.category));
          break;
        }
        case url === Route.home: {
          clearProductListContainer();
          clearProductInfoContainer();
          break;
        }
        case typeof event.detail.state === 'number': {
          displayProductInfo(products.find(product => product.id === state.productId));
          break;
        }
        case url === Route.basket: {
          displayBasket();
          break;
        }
        default:
          break;
      }
    },
    false
  );
};

init(); */

const clearProductInfoContainer = () => {
  const productInfoBlock = document.getElementById('selected-product-info');
  productInfoBlock.innerHTML = '';
};

const clearProductListContainer = () => {
  const middleBlock = document.getElementById('middle-block');
  middleBlock.innerHTML = '';
};
