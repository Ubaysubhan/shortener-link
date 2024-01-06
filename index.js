import  express  from "express";
import shortid from "shortid";

const app = express();
const urlDatabase = {};

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/shorten',(req,res)=>{
    const url = req.body.originalUrl;
    const shortUrl = "https://ubaysubhan/" + shortid.generate();

    urlDatabase[shortUrl] = url;
    res.json({ shortUrl: shortUrl }); 
})

app.get('/:shortUrl', (req, res) => {
    const shortUrl = "https://ubaysubhan/" + req.params.shortUrl;
    const originalUrl = urlDatabase[shortUrl]; // Get the original URL from the database

    if (originalUrl) {
        res.redirect(originalUrl); // Redirect to the original URL if found
    } else {
        res.status(404).send("URL not found");
    }
});
app.get('/', (req,res)=>{
    res.render('index.ejs')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
