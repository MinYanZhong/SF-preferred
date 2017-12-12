let express=require("express");
let app=express();
let fs=require("fs");
let uuid=require("uuid");// 唯一字符串
let number=6; // 步长
let post=8000;//端口号
let homeCarousel=require("./data/home/Static/swiper");//轮播数据
let retrievData=require("./retrievData/index"); //获取数据执行的函数
let read=(url,cb)=>{
    fs.readFile(url,"utf-8",(err,data)=>{
        if(err||data.length===0) return cb([]);
        cb(JSON.parse(data))
    });
}; //读数据方法
let write=(url,data,cb)=>{
    fs.writeFile(url,JSON.stringify(data),cb)
}; //写数据方法
//跨域响应头
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1');
    if(req.method==="OPTIONS") return res.end();
    next();
});

//所有请求 success成功1 失败0
//首页
///home/carousel  轮播+图标导航 homeCarousel
app.get("/home/carousel",(req,res)=>{
    Object.keys(homeCarousel).length>0?res.send({homeCarousel,success:0}):res.send({homeCarousel:{},success:1});
});

//给评论加id
let getComment=(res,data,next)=>{
    read("./data/home/Content/comment.json",comment=>{
        if(!comment[comment.length-1].commentID){
            comment.forEach((item,index)=>item.commentID=data[index].recommendID);
            write("./data/home/Content/comment.json",comment,()=>{
                res.comment=comment;
                next();
            })
        }else {
            res.comment=comment;
            next();
        }
    });
};

//获取列表数据 并且加上id属性
app.use("/public",(req,res,next)=>{
    read("./data/home/Content/recommend.json",data=>{
        if(!data[data.length-1].recommendID){
           data.forEach((item,index)=>item.recommendID=uuid.v4());
            write("./data/home/Content/recommend.json",data,()=>{
                getComment(res,data,next);
                res.data=data;
           })
       }else {
            res.data=data;
            getComment(res,data,next);
       }
    });
});

///home/recommend  推荐  分类页  内容 recommend , 判断条件 flag 请求参数offset
app.get("/public/recommend",(req,res)=>{
    retrievData(req,res,res.data,number)
});

// 详情页 details   该商品details 类似similar  评论comment
app.get("/public/details",(req,res)=>{
    let id=req.query.id;
    if(id){
           let details=res.data.find(item=>item.recommendID===id);
          let similar=res.data.filter(item=>item.classification===details.classification).slice(0,6);
         let comment=res.comment.find(item=>item.commentID===id);
           res.send({success:0,details,similar,comment})
       }else {
           res.send({success:1,err:"传参有误"})
       }
});

//搜索 search    传参 关键字 keyWords
app.get("/public/search",(req,res)=>{
    let keyWords=req.query.keyWords;
    if(keyWords){
        let datas=res.data.filter(item=>item.recommendTitle.includes(keyWords));
        res.send({success:0,datas});
    }else {
        res.send({success:1,err:"抱歉,您搜索的商品未找到!"});
    }
});

//点击 classification  每个分类 classification 传参 关键字 keyWords
app.get("/public/classification",(req,res)=>{
    let keyWords=req.query.keyWords;
    if(keyWords){
        let datas=res.data.filter(item=>item.classification===keyWords);
        res.send({success:0,datas});
    }else {
        res.send({success:1});
    }
});

//公共
app.all("*",(req,res)=>{
    res.end("not find")
});

app.listen(post,()=>console.log(`端口${post}监听成功`));