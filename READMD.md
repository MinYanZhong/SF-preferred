所有数据成功 success 0  失败 success1

###首页
- 轮播 carousel
  {
     req:{
     url:"/home/carousel",
     method:"get",
     }
     res :{
      homeCarousel{
       homeCarousel:[],//轮播数据
       homeNavigation:[]
      }
     }
  }
- 推荐 recommend
   {
   req:{
     url:"/home/recommend?offset=${offset}",
     method:"get"
   }
   res:{
     recommend:[],//推荐数据
     flag:true/false
     offset:
   }
###分类页
 - 分类 
    {
    req:{
       url:"/classification"
        method:"get"
        }
    res:{
        success:0
        classification:[]
    }
 
   }
// 首页
 {
 "recommendImg": 封面
 ,"recommendTitle":标题,
  "recommendDescribe":详细,
    "recommendPrice":价格,
    "recommendID":  id,
     "recommendGift":"满赠"
     "recommendMember":会员价格
    }
    
 //列表页
  {
  "recommendImg": 封面
  ,"recommendTitle":标题,
     "recommendPrice":价格,
     "recommendID":  id,
       "recommendMember":会员价格
     "recommendGift": "多陪积分",
     //商品详情
     "graphicImg": 轮播图(7张)
     "graphicOrigin": 产地,
     "graphicBrand": 品牌,
     "graphicSpecification": 规格,
     "graphicWeight": 重量,
     "graphicStorage":存储条件,
      "graphicComment": "200",
      "graphicLife":保质期,
     "graphicDescription":商品图片(1张),
     "graphicPriceDescription": 价格说明(img)
     }
        
      苹果/蟹