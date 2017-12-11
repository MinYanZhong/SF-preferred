module.exports=function(req,res,data,number){
    let flag=true;
    let offset=parseInt(req.query.offset)||0;
        if(offset>=0&&data.length>0){
            let recommend=data.slice(offset,offset+number);
            flag=offset+number>=data.length?false:flag;
            offset=offset+number;
            res.send({recommend,flag,offset,success:0})
        }else {
            res.send({flag:false,success:1})
        }
};