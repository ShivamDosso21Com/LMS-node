import app from './app';

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Hello ${process.env.DATABASE_URL}`)
  console.log(`Server is running on http://localhost:${PORT}`);
});

// start this file enter these two commands 
// npx tsc
// node dist/server.js
// npm start to use nodemon
