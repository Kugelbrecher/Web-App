
// create articleSchema.js, import this into article.js

let articles = [
    { id: 5, author: "Mack", text: "Post 1", date: new Date(), comments: [] },
    { id: 4, author: "Jack", text: "Post 2", date: new Date(), comments: [] },
    { id: 7, author: "Zack", text: "Post 3", date: new Date(), comments: [] },
];

const getArticles = (req, res) => res.send(articles.filter(article => article.author === req.username));

const getArticle = (req, res) => {
    res.send(articles.filter(article => article.id === parseInt(req.params.id)))
};

const addArticle = (req, res) => {
    let post = req.body;
    // console.log(post);
    let article = { id: articles.length, author: req.username,
        text: post.text, date: new Date(), comments: [] };
  return new Aticle(article).save()
};

module.exports = app => {
    // TODO:  implement GET /articles and GET /articles/:id as one endpoint not two
    app.get("/articles", getArticles); // return all articles for current logged in user
    app.get("/articles/:id", getArticle); // return article with the specified id
    app.post("/article", addArticle); // return all articles and the new article TODO: not working
    // TODO: how should i act in postman? x-www-form-urlencoded or raw json? both not working
}
