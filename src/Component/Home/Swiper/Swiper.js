import React,{Component} from "react";
import ReactSwipe from 'react-swipe';
export default class Swiper extends Component{
    render(){
        return(
            <ReactSwipe className="carousel" swipeOptions={{ startSlide: 2,
                speed: 1000,
                auto: 2000,
                effect : 'coverflow',
                slidesPerView: 3,
                continuous: true,
                disableScroll: false,
                stopPropagation: false}} key={this.props.homeCarousel.length}>
                {
                    this.props.homeCarousel.map((item,index)=>(
                        <img src={item} key={index} alt=""/>
                    ))
                }
            </ReactSwipe>
        )
    }
}