import React from 'react';
import { Form, Col, Row} from 'react-bootstrap';
import SelectPaymentTokenComponent from '../Payments/SelectPaymentTokenComponent.js';


const func = require("../../../functions/PublicFunctions.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");

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
      PaymentPlan : "",
      paymentTokenID : "",
      selectedPaymentLabel : "Select payment Token",
      FromCredit : false
    };

    async refresh() {
      await this.props.refresh()
    }

    handleNewProposal = async (event) => {
      event.preventDefault();
      await func.AddMarket(this.state.Owner.trim(), this.state.Name.trim(), this.state.Symbol.trim(), this.state.FeeAmount.trim(), this.state.FeeDecimals.trim(), this.state.PaymentPlan.trim(), this.state.FromCredit, this.props.contract, this.state.paymentTokenID)
      this.setState({ Owner: "", Name : "", Symbol : "", FeeAmount : "", FeeDecimals : "", PaymentPlan : "", FromCredit : false})
      await this.refresh();
    };

    HandleSelect = async (index) => {
      this.setState({paymentTokenID : index});
      let label = "Selected payment Token - " + PaymentsFunc.TokenSymbols[index];
      this.setState({selectedPaymentLabel : label});
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
                <Form.Control type="integer" name="amount" placeholder="Fee Amount" 
                    value={this.state.FeeAmount}
                    onChange={event => this.setState({ FeeAmount: event.target.value })}/> 
                <Form.Control type="integer" name="decimals" placeholder="Fee Decimals" 
                    value={this.state.FeeDecimals}
                    onChange={event => this.setState({ FeeDecimals: event.target.value })}/> 
                <Form.Control type="integer" name="payment" placeholder="Payment Plan" 
                    value={this.state.PaymentPlan}
                    onChange={event => this.setState({ PaymentPlan: event.target.value })}/>  
                <Row>
                      <Col>
                        <SelectPaymentTokenComponent 
                          HandleSelect={this.HandleSelect}
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