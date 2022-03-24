const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.headers['x-access-token'];
    if(!token){
        res.send('Access Denied');
    }else{
            const verified = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
                if(err){
                    console.log(err)
                    res.json({auth: false, message: "authentication failed"})
                }
                else{
                    req.userId = decoded.id
                    next()
                }
            });
    }

};