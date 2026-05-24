require('dotenv').config();
const app = require('./src/app.js');
const connectDB = require('./src/db/db.js');

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB().catch(err => {
  console.error('DB connection failed:', err.message);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ API Base URL: http://localhost:${PORT}/api`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

module.exports = app;