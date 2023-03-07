
function validateLogin(username, password, user) {
    return user.username === username && user.address.street === password
}

function logout(){
    localStorage.setItem('currentUserInfo',JSON.stringify({}))
    return localStorage.getItem('currentUserInfo')
}

module.exports={
    validateLogin,
    logout
}
