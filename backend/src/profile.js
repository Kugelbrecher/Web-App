let cookieKey = "sid";

const profileSchema = require("./schema/profileSchema");
const mongoose = require("mongoose");
const Profile = mongoose.model("profile", profileSchema);

// TODO: get headline of a specified user. GET /headlines/:user?
// currently, it only returns the headline of the logged in user
async function getHeadlines(req, res) {
    const username = req.params.user;
    const user = await findUser(username);
    if (!user) {
        return res.sendStatus(401);
    }
    const headline = user.headline;
    return res.send({username, headline});
}

async function getEmail(req, res) {
    const username = req.params.user;
    const user = await findUser(username);
    if (!user) {
        return res.sendStatus(401);
    }
    const email = user.email;
    return res.send({username, email});
}

async function getZipcode(req, res) {
    const username = req.params.user;
    const user = await findUser(username);
    if (!user) {
        return res.sendStatus(401);
    }
    const zipcode = user.zipcode;
    return res.send({username, zipcode});
}

async function getBirthday(req, res) {
    const username = req.params.user;
    const user = await findUser(username);
    if (!user) {
        return res.sendStatus(401);
    }
    const dob = user.dob;
    return res.send({username, dob});
}

async function getAvatar(req, res) {
    const username = req.params.user;
    const user = await findUser(username);
    if (!user) {
        return res.sendStatus(401);
    }
    const avatar = user.avatar;
    return res.send({username, avatar});
}


async function getFollowing(req, res) {
    const username = req.params.user;
    const user = await findUser(username);
    if (!user) {
        return res.sendStatus(401);
    }
    const following = user.following;
    return res.send({username, following});
}

async function addFollowing(req, res) {
    const followingUserName = req.params.user;
    const username = req.username;
    const _followingUserName = await findUser(followingUserName);

    if (!_followingUserName) {
        return res.send({result:'fail', msg:'user not found'});
    }
    const  currentUserProfile =await Profile.findOne({username});

    if (currentUserProfile?.following?.includes(followingUserName)) {
        return res.send({result:'fail', msg:'already following'});
    }

    currentUserProfile.following.push(followingUserName);
    console.log('currentUserProfile following', currentUserProfile.following);
    await Profile.updateOne({username}, {following: currentUserProfile.following});

    return res.send({username, following: currentUserProfile.following,result:'success'});
}

async function removeFollowing(req, res) {
    const followingUserName = req.params.user;
    const currentUserName = req.username;

    const  currentUserProfile =await Profile.findOne ({username:currentUserName
    });

    currentUserProfile.following.indexOf(followingUserName);
    currentUserProfile.following.splice(currentUserProfile.following.indexOf(followingUserName), 1);
    await Profile.updateOne({username: currentUserName}, {following: currentUserProfile.following});

    return res.send({username: currentUserName, following: currentUserProfile.following});
}


async function findUser(username) {
    return Profile.findOne ({username
    });
}

async function putHeadline(req, res) {
    const username = req.username;
    const headline = req.query.headline;
    if (!headline) {
        return res.sendStatus(400);
    }
    await updateUser(username, null, {headline: headline});
    return res.send({username, headline});
}

async function putEmail(req, res) {
    const username = req.username;
    const email = req.query.email;
    if (!email) {
        return res.sendStatus(400);
    }
    await updateUser(username, null, {email: email});
    return res.send({username, email});
}

async function putZipcode(req, res) {
    const username = req.username;
    const zipcode = req.query.zipcode;
    if (!zipcode) {
        return res.sendStatus(400);
    }
    await updateUser(username, null, {zipcode: zipcode});
    return res.send({username, zipcode});
}

async function putAvatar(req, res) {
    const username = req.username;
    const avatar = req.query.avatar;
    if (!avatar) {
        return res.sendStatus(400);
    }
    await updateUser(username, null, {avatar: avatar});
    return res.send({username, avatar});
}


async function updateUser(username, password, update) {
    if (password) {
        return Profile.updateOne({
            username
        }, {$set: update});
    } else {
        return Profile.updateOne({
            username
        }, {$set: update});
    }
}


module.exports = (app) => {
    app.get("/headline/:user", getHeadlines);
    app.get("/email/:user", getEmail);
    app.get("/zipcode/:user", getZipcode);
    app.get("/dob/:user", getBirthday);
    app.get("/avatar/:user", getAvatar);
    app.get("/following/:user?", getFollowing);
    app.put("/headline", putHeadline);
    app.put("/email", putEmail);
    app.put("/zipcode", putZipcode);
    app.put("/avatar", putAvatar);
    app.put("/following/:user", addFollowing);
    app.delete("/following/:user", removeFollowing);
};
