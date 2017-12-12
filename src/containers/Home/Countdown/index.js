import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import "./css.css"
class AnimatedCard extends React.Component {
    render() {
        const { position, digit, animation } = this.props;
        return(
            <div className={`flipCard ${position} ${animation}`}>
                <span>{digit}</span>
            </div>
        );
    }
}

class StaticCard extends React.Component {

    render() {
        const { position, digit } = this.props;
        return(
            <div className={position}>
                <span>{digit}</span>
            </div>
        );
    }
}

class FlipUnitContainer extends React.Component {
    render() {
        const { digit, shuffle, unit } = this.props;

        let now = digit;
        let before = digit;

        // to prevent a negative value
        if( unit !== 'hours') {
            before = before === -1 ? 59 : before;
        } else {
            before = before === -1 ? 23 : before;
        }

        // add zero
        if( now < 10 ) now = `0${now}`;
        if( before < 10 ) before = `0${before}`;

        // shuffle digits
        const digit1 = shuffle ? before : now;
        const digit2 = !shuffle ? before : now;

        // shuffle animations
        const animation1 = shuffle ? 'fold' : 'unfold';
        const animation2 = !shuffle ? 'fold' : 'unfold';

        return(
            <div className={'flipUnitContainer'}>
                <StaticCard
                    position={'upperCard'}
                    digit={now}
                />
                <StaticCard
                    position={'lowerCard'}
                    digit={before}
                />
                <AnimatedCard
                    position={'first'}
                    digit={digit1}
                    animation={animation1}
                />
                <AnimatedCard
                    position={'second'}
                    digit={digit2}
                    animation={animation2}
                />
            </div>
        );
    }
}

class FlipClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            hoursShuffle: true,
            minutes: 0,
            minutesShuffle: true,
            seconds: 0,
            secondsShuffle: true,
            targetTime:new Date("2017 12 17 10:58:00")
        };
    }
    componentDidMount() {
        this.timer = setInterval(
            () => this.updateTime(),1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    updateTime() {
        let nowTime=new Date;
        let different=this.state.targetTime-nowTime;
        let  minutes=Math.floor(different%(1000*60*60*24)%(1000*60*60)/(1000*60));
        let  seconds=Math.floor(different%(1000*60*60*24)%(1000*60*60)%(1000*60)/1000);
        if( minutes !== this.state.minutes) {
            const minutesShuffle = !this.state.minutesShuffle;
            this.setState({
                minutes,
                minutesShuffle
            });
        }
        if(minutes<=0&&seconds<=0){
            clearInterval(this.timer);
            this.setState({minutes:0,minutesShuffle:0});
            return;
        }
        // on second chanage, update seconds and shuffle state
        if( seconds !== this.state.seconds) {
            const secondsShuffle = !this.state.secondsShuffle;
            this.setState({
                seconds,
                secondsShuffle
            });
        }
    }
    render() {
        const {  minutes, seconds, minutesShuffle, secondsShuffle } = this.state;
        return(
            <div className={'flipClock'}>
                <FlipUnitContainer
                    unit={'minutes'}
                    digit={minutes}
                    shuffle={minutesShuffle}
                />
                <FlipUnitContainer
                    unit={'seconds'}
                    digit={seconds}
                    shuffle={secondsShuffle}
                />
            </div>
        );
    }
}
export default class App extends React.Component {
    render() {
        return(
           <div className="spike">
               <div className="spike-content">
                   <div className="spike-text">秒杀倒计时</div>
                   <FlipClock />
               </div>
               <img src="https://ps.sfbest.com/mapp/resource/ae/ae9598581539b769a93b9d1331ae2cdb.jpg" alt=""/>
           </div>
        );
    }
}