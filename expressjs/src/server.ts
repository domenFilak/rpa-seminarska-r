import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));

const PORT = 5000;


app.get('/api/foods', (req, res) => {
    res.send("hello world!");
});


app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});