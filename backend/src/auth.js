let cookieKey = "sid";
const md5 = require("md5");
const connector = require("./mongo");
const userSchema = require("./schema/userSchema");
const profileSchema = require("./schema/profileSchema");
const mongoose = require("mongoose");
const User = mongoose.model("user", userSchema);
const Profile = mongoose.model("profile", profileSchema);
const sessionMap = new Map()

async function isLoggedIn(req, res, next) {
    // likely didn't install cookie parser
    if (!req.cookies) {
      return res.sendStatus(401);
    }
    // pagination
    let sid = req.cookies[cookieKey];

    if (!sid) {
        return res.sendStatus(401);
    }

    if (sessionMap.has(sid)){
        return sessionMap[sid]
    }

    let user = await findUser(null,sid);
    if (!user || !user.username || (new Date().getTime() - new Date(user.sessionTime).getTime()) > 3600*1000*1000) {
        res.sendStatus(401);
    }else{
        req.username = user.username;
        next();
    }
}


async function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // supply username and password
    if (!username || !password) {
        return res.sendStatus(400);
    }

    let user = await findUser(username,null,true);
    if (!user) {
        return res.sendStatus(401);
    }

    // create hash using md5, user salt and request password, check if hash matches user hash
    let hash = md5(password + user.salt);

    if (hash === user.hash) {
        let sid = req.cookies[cookieKey];
        const sessionKey = md5('rice' + new Date().getTime() + user.username)
        console.log('login success',sessionKey)

        await updateUser(username,null,{session:sessionKey,sessionTime:new Date()});
        // Adding cookie for session id
        res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000})

        let msg = { username:user.username, result: "success", profile: {...user.profile._doc,password:user.password}};
        res.send(msg);
    } else {
        res.status(401).send('Wrong username or password');
    }
}

function register(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // console.log(req.body)

    if (!username || !password) {
        return res.sendStatus(400);
    }

    let salt = username + new Date().getTime();
    let hash = md5(password + salt); // TODO: Change this to use md5 to create a hash

    (async () => {
        let user = await connector.then(async () => {
            const _user = await findUser(username);

            if (_user) {
                let msg = { username: username, result: "Username has been registered" };
                return  res.status(409).send(msg);
            }else{
                const newUser = await createUser(username, password, salt, hash);
                await createProfile(username,newUser._id,req.body.email,req.body.dob,req.body.zipcode,req.body.phone);
                res.send({ username:username, result: "success" });
            }
        });
    })();
}

async function logout(req, res) {
    let sid = req.cookies[cookieKey];
    await updateUser(null,sid,{session:null,sessionTime:null});
    res.send('Logout');
}

async function createUser(username,password,salt,hash) {
    return new User({
        username,
        password,
        salt,
        hash,
        created: Date.now(),
    }).save();
}




async function createProfile(username,pid,email,dob,zipcode,phone) {
    return new Profile({
        username,
        pid: pid,
        email,
        dob,
        zipcode,
        phone,
        following: [],
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        headline: 'default headline',
    }).save();
}
async function updateUser(username,sid,props){
    if (username) {
        return User.updateOne({
            username: username
        }, props);
    }else{
        return User.updateOne({
            session: sid
        }, props);
    }
}
async function findUser(username,sid,needProfile) {
    if (username) {
        // https://www.geeksforgeeks.org/mongoose-findone-function/amp/
        const user =await User.findOne({ username: username })
        if (needProfile) {
            const profile = await Profile.findOne({username: username})
            user.profile = profile
        }
            return user

    }else{
        const user =await User.findOne({ session: sid })
        if (needProfile) {
            const profile = await Profile.findOne({username: user.username})
            return {profile,...user._doc}
        }else{
            return user
        }
    }
}

module.exports = (app) => {
  app.post("/login", login);
  app.post("/register", register);
  app.use(isLoggedIn);
  app.put("/logout", logout);
};

