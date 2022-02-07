import React from 'react';
import SignVoteComponent from './SignVoteComponent.js';

const func = require("../../../functions/PropositionFunctions.js");

class VoteForPropositionComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

    handleValidatePropConfig = async (event) => {
      event.preventDefault();
      await func.VoteProposition(true, this.props.contract);
      await this.refresh();
    };

    handleRejectPropConfig = async (event) => {
        event.preventDefault();
        await func.VoteProposition(false, this.props.contract);
        await this.refresh();
      };

      handleCancelPropConfig = async (event) => {
        event.preventDefault();
        await func.CancelProposition(this.props.contract);
        await this.refresh();
      };
    
    async refresh() {
        await this.props.refresh();
    }
  
    render(){
      return(
        <div>
          <button type="button" class="btn btn-success" onClick={this.handleValidatePropConfig}>Validate Proposition</button> &nbsp;&nbsp;
          <button type="button" class="btn btn-danger" onClick={this.handleRejectPropConfig}>Reject Proposition</button> &nbsp;&nbsp;
          <button type="button" class="btn btn-dark" onClick={this.handleCancelPropConfig}>Cancel Proposition</button>
          <SignVoteComponent contract={this.props.contract}
            refresh={this.refresh}/>
        </div>
      );
    }
  }

  export default VoteForPropositionComponent;