import React,{Component} from "react";
import "./index.css";
import {NavLink} from "react-router-dom"
export default class Tab extends Component{
    render(){
        return(
                <nav className="footer">
                    <NavLink to="/">
                        <i className="glyphicon glyphicon-home">
                        </i>
                        <span>首页</span>
                    </NavLink>
                    <NavLink to="/list">
                        <i className="glyphicon glyphicon-th-list">

                        </i>
                        <span>分类</span>
                    </NavLink>
                    <NavLink to="/cart">
                        <i className="glyphicon glyphicon-shopping-cart">

                        </i>
                        <span>购物车</span>
                    </NavLink>
                    <NavLink to="/personal">
                        <i className="glyphicon glyphicon-user">

                        </i>
                        <span>我的优选</span>
                    </NavLink>
                </nav>
        )
    }
}