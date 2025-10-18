import express from 'express';
import router from './router/router.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.set("view engine", "pug"); 
app.set('views', "frontend/views")
app.use(express.static("public"));

// Enable CORS for all routes - more permissive for development
app.use(cors());

// Handle preflight requests
app.options('*', cors());

app.use(express.urlencoded({ extended : true}));
app.use(express.json());


app.use('/', router);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));