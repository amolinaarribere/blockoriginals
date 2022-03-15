import React from 'react';
import { Container, Row, Col, Form} from 'react-bootstrap';
import SelectPaymentTokenComponent from '../Payments/SelectPaymentTokenComponent.js';

const func = require("../../../functions/AdminPiggyBankFunctions.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");


class PiggyBankTransferComponent extends React.Component {
    state = {
      amount : "",
      receiver : "",
      paymentTokenID : "",
      selectedPaymentLabel : "Select payment Token"
    };

    handleTransfer = async (event) => {
      event.preventDefault();
      await func.AddTransfer(this.props.contract, this.state.receiver.trim(), this.state.amount.trim(), this.state.paymentTokenID);
      this.setState({amount: "", receiver: "", paymentTokenID : ""});
      await this.props.refresh();
    };

    HandleSelect = async (index) => {
      this.setState({paymentTokenID : index});
      let label = "Selected payment Token - " + PaymentsFunc.TokenSymbols[index];
      this.setState({selectedPaymentLabel : label});
    }
    
    render(){
      return (
        <div class="border border-0">
              <Container style={{margin: '10px 50px 50px 50px' }}>
                {func.PiggyBankBalances.map(
                  (PiggyBankBalance, index) => 
                    (
                      <Row>
                        <Col><b>Balance ({PaymentsFunc.TokenSymbols[index]}) :</b></Col> 
                        <Col>{PiggyBankBalance.toString()}</Col>
                      </Row>
                    )
                )}
                  
                </Container>
                {(Aux.account && this.props.isOwner)?
                  <Form onSubmit={this.handleTransfer} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                      <Form.Control type="integer" name="Amount" placeholder="amount" 
                            value={this.state.amount}
                            onChange={event => this.setState({ amount: event.target.value })}/>
                      <Form.Control type="text" name="receiver" placeholder="receiver address" 
                            value={this.state.receiver}
                            onChange={event => this.setState({ receiver: event.target.value })}/>
                      <SelectPaymentTokenComponent 
                        HandleSelect={this.HandleSelect}
                        selectedPaymentLabel={this.state.selectedPaymentLabel}
                        DisplayAll={true}/>
                    </Form.Group>
                    <button class="btn btn-primary">Transfer Amount</button>
                  </Form>
                  :
                  null}
                <br/>
          </div>
      );
    }
  }

export default PiggyBankTransferComponent;