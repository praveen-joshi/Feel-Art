const jwt=require('jsonwebtoken');

function auth(req,res,next){
    console.log("Authencating A User");
    const token=req.header('Aurthorization');
    if(!token) return res.status(400).send('NO Access Token is Provided');
    
    try
    {
        jwtKey="praveenJoshi@12";
        const decoded=jwt.verify(token,jwtKey);
    
        //now other next middleware can access this user set in body even if they are accepting get req
        req.user=decoded;
        next();
    }
    catch{
        res.status(400).send("Invalid Token");
    }
    
}


module.exports=auth;

