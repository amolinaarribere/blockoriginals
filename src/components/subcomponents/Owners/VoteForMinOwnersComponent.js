import React from 'react';

const func = require("../../../functions/OwnerFunctions.js");

class VoteForMinOwnersComponent extends React.Component{

    handleValidateMinOwner = async (event) => {
      event.preventDefault();
      await func.ValidateMinOwner(this.props.contract)
      await this.reset();
    };
    handleRejectMinOwner = async (event) => {
        event.preventDefault();
        await func.RejectMinOwner(this.props.contract)
        await this.reset();
      };

    async reset(){
        await this.props.refresh();
      }
  
    render(){
      return(
        <div>
          <button type="button" class="btn btn-success" onClick={this.handleValidateMinOwner}>Validate Min Owners</button> &nbsp;&nbsp;
          <button type="button" class="btn btn-danger" onClick={this.handleRejectMinOwner}>Reject Min Owners</button>
        </div>
      );
    }
  }

  export default VoteForMinOwnersComponent;