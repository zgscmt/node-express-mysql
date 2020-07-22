module.exports= function comm(res){
    return res.json({
        code:1,
        status:401,
        message:'token失效'
    })
}
