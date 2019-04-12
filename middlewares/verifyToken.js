
module.exports =(req,res,next)=> {
  const bearerHeader = req.headers['authorization'];

  //check of bearer is undefined
  if(typeof bearerHeader !=='undefined'){
    const bearer = bearerHeader.split(' ');

    //get token from array
    const bearerToken = bearer[1]

    //set the token
    req.token = bearerToken

    next();
  } else {
    res.sendStatus(403)
  }
}