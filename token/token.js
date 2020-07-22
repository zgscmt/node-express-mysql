var jwt = require('jsonwebtoken');

var jwtScrect = 'zgs_first_token';

var setToken = function (user_name, user_id) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({ user_name: user_name, user_id: user_id }, jwtScrect, { expiresIn: '24h' });
        resolve(token)
    })
}
var getToken = function (token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            console.log('token是空的')
            reject({
                error: 'token 是空的'
            })
        }
        else {
            //第二种  改版后的
            var info = jwt.verify(token.split(' ')[1], jwtScrect);
            resolve(info);
        }
    })
}

module.exports = {
    setToken,
    getToken
}
