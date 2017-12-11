import React,{Component} from "react";
import Home from "./Component/Home/index";
import "bootstrap/dist/css/bootstrap.css"
import "./Static/public/reset.css";
import "./Static/footer/footer.css";

import {
    HashRouter as Router,
    Link,
    Route,
    Switch
} from "react-router-dom"
import List from "./Component/List/index";
import Cart from "./Component/Cart/index";
import Personal from "./Component/Personal/index";

export default (
    <Router>
      <div>
          <div className="footer">
              <Link to="/">
                  <i className="glyphicon glyphicon-home">
                  </i>
                  <span>首页</span>
              </Link>
              <Link to="/list">
                  <i className="glyphicon glyphicon-th-list">

                  </i>
                  <span>分类</span>
              </Link>
              <Link to="/cart">
                  <i className="glyphicon glyphicon-shopping-cart">

                  </i>
                  <span>购物车</span>
              </Link>
              <Link to="/personal">
                  <i className="glyphicon glyphicon-user">

                  </i>
                  <span>我的优选</span>
              </Link>
          </div>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/list" component={List}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/personal" component={Personal}/>
        </Switch>
      </div>
    </Router>
)