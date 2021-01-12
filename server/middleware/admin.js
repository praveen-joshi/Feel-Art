function admin(req,res,next) {
    if(!req.user.isAdmin) return res.status(401).send("You Are Not admin..)");

    next();
}


module.exports=admin;