import React from 'react';
import {PaymentsPlans} from '../../../config.js';
import { Form, Col, Row} from 'react-bootstrap';
import SelectPaymentTokenComponent from '../Payments/SelectPaymentTokenComponent.js';
import SelectPaymentPlanComponent from '../NFTMarkets/SelectPaymentPlanComponent.js';


const func = require("../../../functions/PublicFunctions.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");
const BigNumber = require('bignumber.js');


class SendNewProposalComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

    state = {
      Owner : "",
      Name : "",
      Symbol : "",
      FeePercentage : "",
      PaymentPlan : "",
      selectedPaymentPlanLabel : "Select payment Plan",
      paymentTokenID : "",
      selectedPaymentLabel : "Select payment Token",
      FromCredit : false
    };

    async refresh() {
      await this.props.refresh()
    }

    handleNewProposal = async (event) => {
      event.preventDefault();

      await func.AddMarket(this.state.Owner.trim(), this.state.Name.trim(), this.state.Symbol.trim(), this.state.FeePercentage.trim(), this.state.PaymentPlan, this.state.FromCredit, this.props.contract, this.state.paymentTokenID)
      this.setState({ Owner: "", Name : "", Symbol : "", FeePercentage : "",  PaymentPlan : "", FromCredit : false})
      await this.refresh();
    };

    HandleSelectPaymentToken = async (index) => {
      this.setState({paymentTokenID : index});
      let label = "Selected payment Token - " + PaymentsFunc.TokenSymbols[index];
      this.setState({selectedPaymentLabel : label});
    }

    HandleSelectPaymentPlan = async (index) => {
      this.setState({PaymentPlan : index});
      let label = "Selected payment Plan - " + PaymentsPlans[index];
      this.setState({selectedPaymentPlanLabel : label});
    }

    render(){
      return (
        <div>
         <h3>New Market Request</h3>
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
                <Form.Control type="number" step="0.001" min="0" max="100" name="percentageFee" placeholder="Fee Percentage" 
                    value={this.state.FeePercentage}
                    onChange={event => this.setState({ FeePercentage: event.target.value })}/> 
                <SelectPaymentPlanComponent 
                          HandleSelect={this.HandleSelectPaymentPlan}
                          selectedPaymentPlanLabel={this.state.selectedPaymentPlanLabel}/>
                <Row>
                      <Col>
                        <SelectPaymentTokenComponent 
                          HandleSelect={this.HandleSelectPaymentToken}
                          selectedPaymentLabel={this.state.selectedPaymentLabel}
                          DisplayAll={false}/>
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" name="FromCredit" label="Use Credit"
                          checked={this.state.FromCredit}
                          onChange={event => this.setState({ FromCredit: event.target.checked })} />  
                      </Col>
                </Row>                
            </Form.Group>
            <button class="btn btn-primary">Submit Market Request</button> 
          </Form>
        </div>
      );
    }
  }
  
export default SendNewProposalComponent;