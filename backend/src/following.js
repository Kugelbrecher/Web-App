const connector = require("./mongo");
const userSchema = require("./schema/userSchema");
const mongoose = require("mongoose");
const User = mongoose.model("user", userSchema);

// Note: following is also in database>userSchema, so it should be empty for new user

async function getPassword(req, res) {
    const username = req.username;
    const user = await findUser(username);
    if (!user) {
        return res.sendStatus(401);
    }
    const password = user.password;
    return res.send({username, password});
}

// put password
async function putPassword(req, res) {
    const username = req.username;
    const password = req.body.password;
    const user = await findUser(username);
    if (!user) {
        return res.sendStatus(401);

    }
    if (!password) {
        return res.sendStatus(400);
    }
    const result = await updateUserPSW(username, password);
    return res.send({username, password});
}

async function updateUserPSW(username, password) {
    return User.updateOne ({
        username: username,
    }, {password: password});
}



async function getFollowing(req, res) {
    const user = req.params.user
    if (user) {
        let result = await findUser(user);
        return res.send({username: user, following: result.following})
    } else {
        return res.send({username: 'no user'})
    }
}

async function addFollowing(req, res) {
    const _following =  req.params.user

    if (_following===req.username) {
        return res.send({message: "You cannot follow yourself"})
    }

     const needFollowUser =await findUser(_following);
        console.log('needFollowUser',needFollowUser)
    if (!needFollowUser) {
        return res.send({username: 'no user'})
    }

    if (!_following){
        return res.send({message:"Must input followers!"})
    }
    let following

        let result = await findUser(req.username);
      if (!result.following){
          result.following = [_following]
          updateUser(req.username, [_following])
      }else{
          if (result.following.indexOf(_following) === -1) {
              following = result.following.push(_following)
              updateUser(req.username, following)
          }else{
              return res.send({message:'User has been followed!'})
          }
      }
        return res.send({username: req.username, following: result.following,result:'success'})

}

async function deleteFollowing(req, res) {
    const _following =  req.params.user
    if (!_following){
        return res.send({message:"Must input followers!"})
    }
    let following
    let result = await findUser(req.username);
    if (result.following.indexOf(_following) === -1) {
        return res.send({message:'User has not been followed!'})
    }else{
        following = result.following.filter(item => item !== _following)
        updateUser(req.username, following)
    }
    return res.send({username: req.username, following: following})
}

async function findUser(username) {
    return User.findOne({username: username});
}

async function updateUser(username, following) {
    return User.updateOne({
        username: username,
    }, {following: following});
}


module.exports = (app) => {
    app.get("/following/:user?", getFollowing);
    app.put("/following/:user", addFollowing);
    app.delete("/following/:user", deleteFollowing);
    app.get("/password/", getPassword);
    app.put("/password/", putPassword);
};
