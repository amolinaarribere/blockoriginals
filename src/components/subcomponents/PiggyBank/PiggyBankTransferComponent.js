import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const func = require("../../../functions/AdminPiggyBankFunctions.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");


class PiggyBankTransferComponent extends React.Component {
    state = {
      amount : 0,
      receiver : ""
    };

    handleTransfer = async (event) => {
      event.preventDefault();

      await func.AddTransfer(this.props.contract, this.state.receiver, this.state.amount);
      this.setState({amount: 0, receiver: ""});
      await this.props.refresh();
    };
    
    render(){
      return (
        <div class="border border-0">
              <Container style={{margin: '10px 50px 50px 50px' }}>
                  <Row>
                    <Col><b>Balance ({PaymentsFunc.TokenSymbol}) :</b></Col> 
                    <Col>{func.PiggyBankBalance.toString()}</Col>
                  </Row>
                </Container>
                <Form onSubmit={this.handleTransfer} style={{margin: '50px 50px 50px 50px' }}>
                  <Form.Group  className="mb-3">
                    <Form.Control type="integer" name="Amount" placeholder="amount" 
                          value={this.state.amount}
                          onChange={event => this.setState({ amount: event.target.value })}/>
                    <Form.Control type="text" name="receiver" placeholder="receiver address or ENS name" 
                          value={this.state.receiver}
                          onChange={event => this.setState({ receiver: event.target.value })}/>
                  </Form.Group>
                  <button class="btn btn-primary">Transfer Amount</button>
                </Form>
                <br/>
          </div>
      );
    }
  }

export default PiggyBankTransferComponent;