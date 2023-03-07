
const mongoose = require("mongoose");
const profileSchema = require("./schema/profileSchema");
const articleSchema = require("./schema/articleSchema");
const Profile = mongoose.model("profile", profileSchema);
const Article = mongoose.model("article", articleSchema);

let articles = [
    { id: 0, author: "test", text: "Post 1", date: new Date(), comments: ['comment'] },
    { id: 1, author: "test", text: "Post 2", date: new Date(), comments: ['comment'] },
    { id: 2, author: "test", text: "Post 3", date: new Date(), comments: ['comment'] },
    { id: 3, author: "test", text: "Post 4", date: new Date(), comments: ['comment'] },
    { id: 4, author: "Zack", text: "Zack's post", date: new Date(), comments: ['comment'] },
];

// return articles for current logged in user
// const getArticles = (req, res) => res.send(articles);
const getArticles =async (req, res) => {
    const page = req.query.page
   const profile = await Profile.findOne({username:req.username})
    const usersToQuery = [ req.username, ...profile.following ]

    const articleCount = await Article.countDocuments({author:{$in:usersToQuery}})
    let articles
    if (page) {
         articles = await Article.find({author:{$in:usersToQuery}}).sort({date:-1}).skip(10*(page-1)).limit(10)
    }else{
         articles = await Article.find({author:{$in:usersToQuery}}).sort({date:-1}).limit(10)
    }


    res.send({
        data:articles?.map(e=>{e.id=e._id;return e}),
        total:articleCount
    }).status(200);
}

// solved a potential problem: article id is not ordered and starts from 0
const changeArticle =async (req, res) => {
    await  Article.updateOne({_id:req.params.id}, {title:req.body.title, content:req.body.content})
    res.send({msg:'success'})
};

const addComment =async (req, res) => {
    const comment = req.body.text
    await  Article.updateOne({_id:req.body.id}, {comments:comment})
    res.send({msg:'success'})
};

const addArticle =async (req, res) => {
    let post = req.body;
    console.log('post',post)
    let article = { id: articles.length, author: req.username,
        title: post.titleValue, content:post.contentValue,img:post.img, date: new Date(), comments: [] };

   const _article =await new Article(article).save()
    res.send(_article);
};

module.exports = app => {
    app.get("/articles/:id?", getArticles);
    app.put("/articles/:id", changeArticle);
    app.post("/articles/comment", addComment);
    app.post("/article", addArticle);
}
