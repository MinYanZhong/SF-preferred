import React,{Component} from "react";
import {getCarousel,getRecommend} from "../../api/index"
import "./index.css"
import Swiper from "./Swiper/Swiper";
import Recommend from "./Recommend/Recommend";
import Search from "../Search/index";
import {
    Route,
    Link
} from "react-router-dom"
import App from "./Countdown/";

export default class Home extends Component{
    constructor(){
        super();
        this.state={homeCarousel:[],recommend:[],offset:0,flag:true, decide:false};
    }
    componentDidMount(){
        this.go();
        this.getData();
    }
    async go(){
     let {homeCarousel:{homeCarousel},success}=await getCarousel();
        success===0?this.setState({homeCarousel}):null;
    }

    async getData(){
        if(this.state.flag&&!this.state.decide&&this.state.offset<13){
            this.setState({decide:true});
            let  {recommend,flag,offset}=await getRecommend(this.state.offset);
            this.setState({recommend:[...this.state.recommend,...recommend],flag,offset,decide:false});
        }
    }
    render(){
        return (
                     <div>
                         <Link to="/search"> <input type="text"/></Link>
                         <div className="content">
                             <Swiper homeCarousel={this.state.homeCarousel}/>
                            <App/>
                               <div className="sm-title">
                                 <h2>为你推荐</h2>
                                 <p>全球美食 精选好货</p>
                             </div>
                             <Recommend recommend={this.state.recommend} getData={this.getData.bind(this)} offset={this.state.offset}/>
                         </div>
                         <Route path="/search" component={Search}/>
                     </div>

        );
    }
}