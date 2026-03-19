require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Endpoints available at http://localhost:${PORT}/api`);
  console.log(`Swagger UI at http://localhost:${PORT}/api-docs`);
});
