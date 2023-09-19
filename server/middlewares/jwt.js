const jwt = require("jsonwebtoken");


//Mot dang hash data cua minh
const generateAccessToken = (uid, role) => {
    return jwt.sign({_id: uid, role}, process.env.JWT_SECRET, {expiresIn: '2d'});
}

const generateRefreshToken = (uid) => {
    return jwt.sign({_id: uid}, process.env.JWT_SECRET, {expiresIn: '7d'});
}

//Refresh Token => Cap moi access token
//Access token => Xac thuc va phan quyen nguoi dung
module.exports = {
    generateAccessToken,
    generateRefreshToken
}


