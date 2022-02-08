import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/OwnerFunctions.js");

class ManageOwnerComponent extends React.Component{
    state = {
      Owner : "",
      isManageOwnersShown: false
    };

    handleAddOwner = async (event) => {
      event.preventDefault();
      await this.handleOwner("1");
    };
    handleRemoveOwner = async (event) => {
      event.preventDefault();
      await this.handleOwner("2");
    };
    handleValidateOwner = async (event) => {
      event.preventDefault();
      await this.handleOwner("3");
    };
    handleRejectOwner = async (event) => {
      event.preventDefault();
      await this.handleOwner("4");
    };

    async handleOwner(type) {
      switch(type){
        case "1":
          await func.AddOwner(this.state.Owner, this.props.contract)
          break;
        case "2":
          await func.RemoveOwner(this.state.Owner, this.props.contract)
          break;
        case "3":
          await func.ValidateOwner(this.state.Owner, this.props.contract)
          break;
        case "4":
          await func.RejectOwner(this.state.Owner, this.props.contract)
          break;
      }
      await this.refresh();
    }
    
    async refresh() {
      this.setState({ Owner: "" })
      await this.props.refresh();
    }

    toggleManageOwners = () => {
      if(this.state.isManageOwnersShown)this.setState({ isManageOwnersShown: false })
      else this.setState({ isManageOwnersShown: true })
    };
  
    render(){
      return(
        <div>
          <button
              className="btn btn-lg btn-primary center modal-button"
              onClick={this.toggleManageOwners}>Manage Owners</button>
          
          {this.state.isManageOwnersShown ? (
                    <div class="border border-primary border-5">
                       <Form onSubmit={this.handleAddOwner} style={{margin: '50px 50px 50px 50px' }}>
                        <Form.Group  className="mb-3">
                          <Form.Control type="text" name="Owner" placeholder="address or ENS name" 
                              value={this.state.Owner}
                              onChange={event => this.setState({ Owner: event.target.value })}/>  
                        </Form.Group>
                        <button type="submit" class="btn btn-primary">Add Owner</button> &nbsp;&nbsp;
                        <button type="button" class="btn btn-primary" onClick={this.handleRemoveOwner}>Remove Owner</button> &nbsp;&nbsp;
                        <button type="button" class="btn btn-success" onClick={this.handleValidateOwner}>Validate Owner</button> &nbsp;&nbsp;
                        <button type="button" class="btn btn-danger" onClick={this.handleRejectOwner}>Reject Owner</button> 
                      </Form>
                      <br/>
                    </div>) : null}
        </div>
      );
    }
  }

  export default ManageOwnerComponent;