import React,{Component} from "react";
export default class Recommend extends Component{
    Click=()=>{
        this.props.getData();
    };
    render(){
       let recommend=this.props.recommend||[];
        return(
            <ul className="list">
                {
                    recommend.map(item=>(
                        <li key={item.recommendID} className="list-item">
                            <img src={item.recommendImg} alt=""/>
                            <h4>{item.recommendTitle}</h4>
                            <p>{item.recommendDescribe}</p>
                            <div className="list-item-text">
                                <span>{`$${item.recommendPrice}`}</span>
                                {
                                    item.recommendGift ? <span className="span-text">{item.recommendGift}</span>:""
                                }
                            </div>
                        </li>
                    ))
                }
                <button onClick={this.Click}>{this.props.offset<13?"加载更多..":"你想累死我?"}</button>
            </ul>
        )
    }
}