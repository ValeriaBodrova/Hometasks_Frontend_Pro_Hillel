const express = require('express');
const app = express();
const port = 3000;

// Масив для зберігання повідомлень
const messages = [];

// Middleware для розпізнавання JSON у тілі запиту
app.use(express.json());

// Запит GET до основного каталогу
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <p>Статичний текст</p>
        <a href="/about">Перейти на сторінку About</a>
        <button id="showMessageBtn">Show message</button>
        <p id="messageText"></p>

        <script>
          document.getElementById('showMessageBtn').addEventListener('click', () => {
            fetch('/api/message')
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                document.getElementById('messageText').innerText = data.message;
              })
              .catch(error => {
                document.getElementById('messageText').innerText = 'Помилка отримання повідомлення';
              });
          });
        </script>
      </body>
    </html>
  `);
});

// Запит GET до сторінки About
app.get('/about', (req, res) => {
  res.send(`
    <html>
      <body>
        <p>Статичний текст на сторінці About</p>
        <a href="/">Перейти на сторінку Home</a>
      </body>
    </html>
  `);
});

// Запит GET до API
app.get('/api/message', (req, res) => {
  // Генеруємо випадковий текст повідомлення
  const randomMessage = `Повідомлення ${Math.floor(Math.random() * 100)}`;

  // Додаємо повідомлення до масиву
  messages.push(randomMessage);

  // Відправляємо JSON з останнім повідомленням
  res.json({ message: randomMessage });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
