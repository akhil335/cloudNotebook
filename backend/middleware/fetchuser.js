const jwt = require('jsonwebtoken');
const JWT_SECRET = 'cloudNote';

const fetchuser = (req, res, next) =>{
    //get the user from jwt token and add id to req object

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({
            error: "please authenticate using valid token"
        })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user.id;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).send({
            error: "please authenticate using valid token"
        });
    }
   
}
module.exports = fetchuser;