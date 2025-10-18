import express from 'express';
import router from './router/router.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.set("view engine", "pug"); 
app.set('views', "frontend/views")
app.use(express.static("public"));

app.use(cors());

app.use(express.urlencoded({ extended : true}));
app.use(express.json());


app.use('/', router);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));