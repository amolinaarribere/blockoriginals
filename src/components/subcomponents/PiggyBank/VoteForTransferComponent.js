import React from 'react';

const func = require("../../../functions/AdminPiggyBankFunctions.js");

class VoteForTransferComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

    handleValidatePropConfig = async (event) => {
      event.preventDefault();
      await func.ApproveTransfer(this.props.contract);
      await this.refresh();
    };

    handleRejectPropConfig = async (event) => {
        event.preventDefault();
        await func.RejectTransfer(this.props.contract);
        await this.refresh();
      };
    
    async refresh() {
        await this.props.refresh();
    }
  
    render(){
      return(
        <div>
          <button type="button" class="btn btn-success" onClick={this.handleValidatePropConfig}>Validate Transfer</button> &nbsp;&nbsp;
          <button type="button" class="btn btn-danger" onClick={this.handleRejectPropConfig}>Reject Transfer</button> &nbsp;&nbsp;
        </div>
      );
    }
  }

  export default VoteForTransferComponent;