import 'dotenv/config'
import express from 'express';
import './config/connection.js'

const app = express();
const PORT = process.env.PORT || 3001;







app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
