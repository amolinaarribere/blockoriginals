import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/OwnerFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class UpdateMinOwnerComponent extends React.Component{
    state = {
      minOwner : "",
      isManageMinOwnersShown: false
    };

    handleMinOwner = async (event) => {
        event.preventDefault();
      await func.UpdateMinOwner(this.state.minOwner, this.props.contract)
      this.setState({ minOwner: "" })
      await loadFunc.LoadOwnersFunc(this.props.contract);
      this.props.refresh();
    };

    toggleManageMinOwners = () => {
      if(this.state.isManageMinOwnersShown)this.setState({ isManageMinOwnersShown: false })
      else this.setState({ isManageMinOwnersShown: true })
    };
  
    render(){
      return(
        <div>
          <button
              className="btn btn-lg btn-primary center modal-button"
              onClick={this.toggleManageMinOwners}>Manage Min Owners</button>
          
          {this.state.isManageMinOwnersShown ? (
                    <div class="border border-primary border-5">
                       <Form onSubmit={this.handleMinOwner} style={{margin: '50px 50px 50px 50px' }}>
                        <Form.Group  className="mb-3">
                        <Form.Control type="interger" name="MinOwner" placeholder="min owner" 
                            value={this.state.minOwner}
                            onChange={event => this.setState({ minOwner: event.target.value })}/> 
                        </Form.Group>
                        <button type="submit" class="btn btn-primary">Update Min Owner</button> &nbsp;&nbsp;
                      </Form>
                      <br/>
                    </div>) : null}
        </div>
      );
    }
  }

  export default UpdateMinOwnerComponent;