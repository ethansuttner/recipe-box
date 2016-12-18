import React, { Component } from 'react';
import './App.css';
var Panel = require('react-bootstrap').Panel;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Accordian = require('react-bootstrap').Accordian;
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Modal = require('react-bootstrap').Modal;
var FormGroup = require('react-bootstrap').FormGroup;
var FormControl = require('react-bootstrap').FormControl;
var FieldGroup = require('react-bootstrap').FieldGroup;

const uuidV4 = require('uuid/v4');

var App = React.createClass({
  getInitialState: function () {
    return {
      showModal: false,
      modalInput: "",
      modalTitleInput: "",
      editRecipe: {},
      recipes: [
        {id: uuidV4(),
        title: 'recipeName1',
        ingredients: ['item1','item2','item3'],
        collapsed: true},
        {id: uuidV4(),
        title: 'recipeName2',
        ingredients: ['item4','item5'],
        collapsed: false}
      ]
    }
  },
  deleteRecipe(recipeID) {
    this.setState({recipes: this.state.recipes.filter((recipe)=>{
      return recipe.id !== recipeID; 
    })});
  },
  editRecipe(recipeID) {
    let recipeToEdit = this.state.recipes.find((recipe)=>{
        return recipe.id === recipeID;  
    });
    this.setState({showModal: true, editRecipe: recipeToEdit});
  },
  handleSelect(activeKey) {
    this.setState({activeKey});
  },
  closeModal() {
    this.setState({showModal: false, editRecipe: {}, modalInput: ""});  
  },
  render: function() {
    var recipes = this.state.recipes.map((recipe, index) => {
      return <Recipe editRecipe={this.editRecipe} deleteRecipe={this.deleteRecipe} accordianNumber={index} key={recipe.id} id={recipe.id} title={recipe.title} ingredients={recipe.ingredients}/>
    });
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Recipe Box </h2>
        </div>
        <ModalContainer closeModal={this.closeModal} showProp={this.state.showModal} onHideProp={()=>{this.setState({showModal: false});}} recipe={this.state.editRecipe} recipeInitialTitle={this.state.editRecipe.title} recipeInitialIngredients={this.state.editRecipe.ingredients} />
        <div className="container">
          <div className="row">
            <div className="col-md-11">
              <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
                {recipes}
              </PanelGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      title: this.props.recipeInitialTitle,
      ingredients: this.props.recipeInitialIngredients 
    };
  }
  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }
  handleIngredientsChange(event) {
    this.setState({ingredients: event.target.value});
  }
  render() {
    console.log(this.state.title);
    return (
        <Modal show={this.props.showProp} onHide={this.props.onHideProp}>
          <Modal.Header>
            <Modal.Title>
              Edit Recipe
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Title</h4>
            <input
              type="text"
              placeholder="Enter Recipe Title"
              value={this.state.props}
              onChange={this.handleTitleChange}
            />
            <h4>Ingredients</h4>
            <input
              type="text"
              placeholder="Enter ingredients"
              value={this.state.ingredients}
              onChange={this.handleIngredientsChange}
            />
          <ButtonToolbar>
            <Button bsStyle="primary">Save</Button>
            <Button onClick={this.props.closeModal}>Cancel</Button>
          </ButtonToolbar>
          </Modal.Body>
        </Modal>
    );
  }
};

function Recipe (props) {
  let ingredients = props.ingredients.map((ingredient, index)=>{
    return <ListGroupItem key={index}>{ingredient}</ListGroupItem>;
  });
  return (
        <Panel className="clickable" eventKey={props.accordianNumber+1+""} header={props.title} bsStyle="primary" collapsible>
          <ListGroup fill>
            {ingredients}
          </ListGroup>
          <ButtonToolbar >
            <Button bsStyle="danger" onClick={()=>{props.deleteRecipe(props.id)}}>Delete Recipe</Button>
            <Button bsStyle="warning" onClick={()=>{props.editRecipe(props.id)}}>Edit Recipe</Button>
          </ButtonToolbar>
        </Panel>
  );
}
export default App;

        // <div className="panel panel-primary panel-collapsed">
        //   <div className="panel-heading panel-collapsed" onClick={()=>props.clickChangeCollapsed(props.id,!props.collapsed)}>
        //     <h3 className="panel-title">{props.title}</h3>
        //     <span className="pull-right clickable"><i className="glyphicon glyphicon-chevron-up"></i></span>
        //   </div>
        //     <div className="panel-body panel-collapsed">{props.ingredients}</div>
        //   </div>
