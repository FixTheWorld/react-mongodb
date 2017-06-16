/**
 * Created by changjin.zhang on 6/16/2017.
 */
import React,{Component} from "react";
import ReactDOM from 'react-dom';
import {Table,Button,FormGroup,InputGroup,FormControl,Glyphicon,Modal} from "react-bootstrap";
import "./Products.scss";
export default class Products extends Component{
    //************系统方法***********
    constructor(props){
        super(props);
        this.state={
            list:[],
            showDialog:false,
            dialogText:"",
            displayConfirm:'none',
            name:'',
            category:'fruit',
            editProduct:false,
            text:'add'
        };
    }
    componentDidMount(){
        this.getProductList();
    }
    //*************工具方法************
    showDialog(text){
        this.setState({showDialog:true,dialogText:text,displayConfirm:'none'});
    }
    displayConfirm(text){
        this.setState({showDialog:true,dialogText:text,displayConfirm:'inline-block'});
    }
    closeDialog(){
        this.setState({showDialog:false});
    }
    //**************业务方法*************
    getProductList(){
        const settings={
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            }
        };
        return fetch("/getProducts",settings)
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.errorCode===0) {
                    this.setState({list: json.errorMessage});
                }else{
                    this.showDialog("error:"+json.errorMessage);
                }
            })
            .catch((error)=>{
                console.warn('server error',error);
            });
    }
    addProduct(){
        const productName=ReactDOM.findDOMNode(this.productName).value;
        const productCategory=ReactDOM.findDOMNode(this.productCategory).value;
        if(productName===''){
            this.showDialog("name can not be null!");
            return;
        }
        const settings={
            method:"POST",
            headers:{
                'Accept': 'application/json',
                "Content-Type":"application/json"
            },
            body:JSON.stringify({productName,productCategory})
        };
        fetch("/addProduct",settings)
            .then((response)=>response.json())
            .then((json)=>{
                if(json.errorCode===0){
                    this.getProductList();
                }else{
                    this.showDialog("error:"+json.errorMessage);
                }
            })
            .catch((error)=>{
                console.warn('server error',error);
            })
    }
    deleteProduct(item){
        this.displayConfirm("Are you sure to delete this product?");
        this.deleteProductId=item._id;
    }
    confirmDelete(){
        const settings={
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        };
        fetch("/delete/"+this.deleteProductId,settings)
            .then((response)=>response.json())
            .then((json)=>{
                if(json.errorCode===0){
                    this.closeDialog();
                    this.getProductList();
                }else{
                    this.showDialog("error:"+json.errorMessage);
                }
            })
            .catch((err)=>console.warn(err));
    }
    showAddForm(){
        this.setState({text:"add",name:"",editProduct:false,category:'fruit'});
    }
    showEditForm(item){
        this.setState({name:item.name,editProduct:true,category:item.category,text:"edit"});
        this.editProductId=item._id;
    }
    editProduct(){
        const productName=ReactDOM.findDOMNode(this.productName).value;
        const productCategory=ReactDOM.findDOMNode(this.productCategory).value;
        const settings={
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({productName,productCategory})
        };
        fetch("/updateProduct/"+this.editProductId,settings)
            .then((response)=>response.json())
            .then((json)=>{
                if(json.errorCode===0){
                    this.getProductList();
                }else{
                    this.showDialog("error:"+json.errorMessage);
                }
            })
            .catch((error)=>{
                console.warn('server error',error);
            })
    }
    render(){
        return (
          <article className="cj-main">
              <h2>Products list</h2>
              <Modal show={this.state.showDialog} className="cj-dialog" onHide={()=>this.closeDialog()}>
                  <Modal.Header>
                      <Modal.Title>Warning</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                      {this.state.dialogText}
                  </Modal.Body>

                  <Modal.Footer>
                      <Button onClick={()=>this.closeDialog()}>Close</Button>
                      <Button style={{display:this.state.displayConfirm}} onClick={()=>this.confirmDelete()} bsStyle="primary">Confirm</Button>
                  </Modal.Footer>
              </Modal>
              <Table bordered>
                  <thead className="cj-t-head">
                  <tr><td>Name</td><td>Category</td><td>Operate</td></tr>
                  </thead>
                  <tbody className="cj-t-body">
                  {this.state.list.map((item)=>{
                      return (
                          <tr key={item._id}>
                              <td>{item.name}</td>
                              <td>{item.category}</td>
                              <td>
                                  <a href="#" onClick={()=>this.showAddForm(item)}>
                                      <Glyphicon glyph="plus"/>
                                  </a>
                                  <a href="#" onClick={()=>this.deleteProduct(item)} className="cj-margin-left-xs">
                                      <Glyphicon glyph="remove"/>
                                  </a>
                                  <a href="#" onClick={()=>this.showEditForm(item)} className="cj-margin-left-xs">
                                      <Glyphicon glyph="edit"/>
                                  </a>
                              </td>
                          </tr>
                      );
                  })}
                  </tbody>
              </Table>
              <form ref={(ref)=>this.animateElement=ref}>
                  <h2><span className="cj-uppercase">{this.state.text}</span> Product</h2>
                  <FormGroup>
                      <InputGroup>
                          <InputGroup.Addon className="cj-addon">Product Name</InputGroup.Addon>
                          <FormControl
                              value={this.state.name}
                              onChange={(e)=>this.setState({name:e.target.value})}
                              type="text"
                              inputRef={(input)=>{this.productName=input}}
                          />
                      </InputGroup>
                  </FormGroup>
                  <FormGroup>
                      <InputGroup>
                          <InputGroup.Addon className="cj-addon">Product Category</InputGroup.Addon>
                          <FormControl
                              inputRef={(input)=>{this.productCategory=input;}}
                              componentClass="select"
                              placeholder="select"
                              onChange={(e)=>{this.setState({category:e.target.value})}}
                              value={this.state.category}>
                                  <option value="fruit">fruit</option>
                                  <option value="vegetable">vegetable</option>
                          </FormControl>
                      </InputGroup>
                  </FormGroup>
                  <Button onClick={this.state.editProduct?this.editProduct.bind(this):this.addProduct.bind(this)}>{this.state.text}</Button>
              </form>
          </article>
        );
    }
}