/**
 * Created by changjin.zhang on 6/12/2017.
 */
import React,{Component} from "react";
import {render} from "react-dom";
import Products from "./src/ProductsView";
render(<Products/>,document.querySelector("#root"));
if (module.hot) {
    module.hot.accept();
}