import express from 'express';
import router from './backend/router/router.js';


const app = express();
const PORT = 3000;

app.set("view engine", "pug"); 
app.set('views', "frontend/views")
app.use(express.static("public"));
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

app.use('/', router);


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));