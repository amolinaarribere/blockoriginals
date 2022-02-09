import React from 'react';
import { Form} from 'react-bootstrap';

const func = require("../../../functions/PublicFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class SendNewProposalComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

    state = {
      Owner : "",
      Name : "",
      Symbol : "",
      FeeAmount : "",
      FeeDecimals : "",
      PaymentPlan : ""
    };

    async refresh() {
      await this.props.refresh()
    }

    handleNewProposal = async (event) => {
      event.preventDefault();
      
      await func.AddMarket(this.state.Owner, this.state.Name, this.state.Symbol, this.state.FeeAmount, this.state.FeeDecimals, this.state.PaymentPlan, this.props.price, this.props.contract)
      this.setState({ Owner: "", Name : "", Symbol : "", FeeAmount : "", FeeDecimals : "", PaymentPlan : ""})
      await this.refresh();
    };

    render(){
      return (
        <div>
         <h3>New Markets</h3>
         <Form onSubmit={this.handleNewProposal} style={{margin: '50px 50px 50px 50px' }}>
            <Form.Group  className="mb-3">
               <Form.Control type="text" name="owner" placeholder="address"
                    value={this.state.Owner}
                    onChange={event => this.setState({ Owner: event.target.value })}/>
                <Form.Control type="text" name="name" placeholder="Name" 
                    value={this.state.Name}
                    onChange={event => this.setState({ Name: event.target.value })}/> 
                <Form.Control type="text" name="symbol" placeholder="Symbol" 
                    value={this.state.Symbol}
                    onChange={event => this.setState({ Symbol: event.target.value })}/> 
                <Form.Control type="integer" name="amount" placeholder="Fee Amount" 
                    value={this.state.FeeAmount}
                    onChange={event => this.setState({ FeeAmount: event.target.value })}/> 
                <Form.Control type="integer" name="decimals" placeholder="Fee Decimals" 
                    value={this.state.FeeDecimals}
                    onChange={event => this.setState({ FeeDecimals: event.target.value })}/> 
                <Form.Control type="integer" name="payment" placeholder="Payment Plan" 
                    value={this.state.PaymentPlan}
                    onChange={event => this.setState({ PaymentPlan: event.target.value })}/>    
            </Form.Group>
            <button class="btn btn-primary">Submit Market Proposal</button> 
          </Form>
        </div>
      );
    }
  }
  
export default SendNewProposalComponent;