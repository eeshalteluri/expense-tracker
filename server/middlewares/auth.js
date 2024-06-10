
const verifyToken = async (req, res, next) => {
    try{
        const token = req.header("Authorization")

        if(!token){
            res.status(process.env.FORBIDDEN).json({msg: "Invalid Auth Token"})
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length)
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)

        if(!verified){
            res.status(proces.env.FORBIDDEN).json({msg:"Authorization denied"})
        }else{
            next()
        }

    }
    catch(err){
        res.status(process.env.INTERNAL_SERVER_ERROR).json({error: err.message})
        }
}

export default verifyToken