const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const isDog = Math.random() < 0.5;
  const type = isDog ? 'dog' : 'cat';
  const title = isDog ? 'Random Dog 🐶' : 'Random Cat 🐱';

  try {
    let imageUrl = '';

    if (type === 'cat') {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      imageUrl = response.data[0].url;
    } else {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      imageUrl = response.data.message;
    }

    res.send(`
      <html>
        <head>
          <title>Random Animal</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
          <style>
            body {
              margin: 0;
              background-color: #121212;
              font-family: 'Poppins', sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 100vh;
              color: #f1f1f1;
              text-align: center;
              padding: 2rem;
              box-sizing: border-box;
            }
            h1 {
              font-size: 2.7rem;
              margin-bottom: 1rem;
              font-weight: 600;
            }
            .image-container {
              flex-grow: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              max-height: 70vh;
              width: 100%;
              overflow: hidden;
              margin-bottom: 2rem;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              border-radius: 16px;
              box-shadow: 0 8px 20px rgba(255, 255, 255, 0.08);
              transition: transform 0.3s ease;
            }
            img:hover {
              transform: scale(1.02);
            }
            button {
              padding: 12px 24px;
              font-size: 1rem;
              font-weight: 500;
              background-color: #1e88e5;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              transition: background-color 0.2s ease;
            }
            button:hover {
              background-color: #1565c0;
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div class="image-container">
            <img src="${imageUrl}" alt="Random ${type}">
          </div>
          <button onclick="window.location.reload()">Another One</button>
        </body>
      </html>
    `);
  } catch (error) {
    res.send('<p style="color: white; text-align: center;">Failed to get an animal picture 😿</p>');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
