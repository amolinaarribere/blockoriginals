import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/TreasuryFunctions.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");


class AssignWithdrawComponent extends React.Component {
    state = {
        amount : ""
      };
    
    handleWithdrawAll = async (event) => {
        event.preventDefault();
      await func.WithdrawAll(this.props.contract, PaymentsFunc.CurrentPaymentID);
      this.props.refresh();
    };

    handleWithdraw = async (event) => {
      event.preventDefault();
      await func.WithdrawAmount((new BigNumber(this.state.amount).multipliedBy(PaymentsFunc.TokenDecimalsFactors[PaymentsFunc.CurrentPaymentID])).dp(0, 1).toString(), this.props.contract, PaymentsFunc.CurrentPaymentID);
      this.setState({amount: ""});
      this.props.refresh();
    };

    render(){
      return (
        <div>
          <div class="border border-0">
            <h3>Treasury Balances</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Aggregated Balance ({PaymentsFunc.TokenSymbols[PaymentsFunc.CurrentPaymentID]}) :</b></Col> 
                <Col>{func.TreasuryAggregatedBalance[PaymentsFunc.CurrentPaymentID].toString()}</Col>
              </Row>
              <Row>
                <Col><b>Contract Balance ({PaymentsFunc.TokenSymbols[PaymentsFunc.CurrentPaymentID]}) :</b></Col> 
                <Col>{func.TreasuryBalance[PaymentsFunc.CurrentPaymentID].toString()}</Col>
              </Row>
              <Row>
                <Col><b>Your current Balance ({PaymentsFunc.TokenSymbols[PaymentsFunc.CurrentPaymentID]}) :</b></Col> 
                <Col>{func.AccountBalance[PaymentsFunc.CurrentPaymentID].toString()}</Col>
              </Row>
              <br />
              <button type="button" class="btn btn-primary" onClick={this.handleWithdrawAll}>Withdraw All</button>
            </Container>
          </div>
          <div class="border border border-0">
            <Form onSubmit={this.handleWithdraw} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="string" name="Amount" placeholder="Amount in Token" 
                  value={this.state.amount}
                  onChange={event => this.setState({ amount: event.target.value })}/>
              </Form.Group>
              <button class="btn btn-primary">Withdraw Amount</button>
            </Form>
          </div>
          <hr class="bg-secondary"/>
        </div>

      );
    }
  }
  
export default AssignWithdrawComponent;