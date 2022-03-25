import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import SelectPaymentTokenComponent from '../Payments/SelectPaymentTokenComponent.js';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/TreasuryFunctions.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");


class AssignWithdrawComponent extends React.Component {
    state = {
        amount : "",
        paymentTokenID : "",
        selectedPaymentLabel : "Select payment Token"
      };
    
    handleWithdrawAll = async (event) => {
        event.preventDefault();
      await func.WithdrawAll(this.props.contract, this.state.paymentTokenID);
      this.props.refresh();
    };

    handleWithdraw = async (event) => {
      event.preventDefault();
      await func.WithdrawAmount(this.state.amount.trim(), this.props.contract, this.state.paymentTokenID);
      this.setState({amount: ""});
      this.props.refresh();
    };

    HandleSelect = async (index) => {
      this.setState({paymentTokenID : index});
      let label = "Selected payment Token - " + PaymentsFunc.TokenSymbols[index];
      this.setState({selectedPaymentLabel : label});
    }

    render(){
      return (
        <div>
          <div class="border border-0">
            <h3>Treasury Balances</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Aggregated Balance</b></Col> 
                <Col></Col>
              </Row>
              {func.TreasuryAggregatedBalance.map(
                (balance, index) => (
                    <Row>
                      <Col><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{PaymentsFunc.TokenSymbols[index]} :</b></Col> 
                      <Col>{balance.toString()}</Col>
                    </Row>
                  )
                )
              }
              <br />
              <Row>
                <Col><b>Contract Balance</b></Col> 
                <Col></Col>
              </Row>
              {func.TreasuryBalance.map(
                (balance, index) => (
                    <Row>
                      <Col><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{PaymentsFunc.TokenSymbols[index]} :</b></Col> 
                      <Col>{balance.toString()}</Col>
                    </Row>
                  )
                )
              }
              <br />
              <Row>
                <Col><b>Your current Balance</b></Col> 
                <Col></Col>
              </Row>
              {func.AccountBalance.map(
                (balance, index) => (
                    <Row>
                      <Col><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{PaymentsFunc.TokenSymbols[index]} :</b></Col> 
                      <Col>{balance.toString()}</Col>
                    </Row>
                  )
                )
              }
              <br />
            </Container>
          </div>
          <div class="border border border-0">
            <Form onSubmit={this.handleWithdraw} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="number" step="0.001" min="0" name="Amount" placeholder="Amount in Token" 
                  value={this.state.amount}
                  onChange={event => this.setState({ amount: event.target.value })}/>
                <SelectPaymentTokenComponent 
                      HandleSelect={this.HandleSelect}
                      selectedPaymentLabel={this.state.selectedPaymentLabel}
                      DisplayAll={true}/>
              </Form.Group>
              <button class="btn btn-primary">Withdraw Amount</button>&nbsp;&nbsp;
              <button class="btn btn-primary" onClick={this.handleWithdrawAll}>Withdraw All</button>
            </Form>
          </div>
          <hr class="bg-secondary"/>
        </div>

      );
    }
  }
  
export default AssignWithdrawComponent;