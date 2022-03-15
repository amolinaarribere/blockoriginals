import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import SelectPaymentTokenComponent from '../Payments/SelectPaymentTokenComponent.js';

const func = require("../../../functions/MarketsCreditsFunctions.js");
const PaymentsFunc = require("../../../functions/PaymentsFunctions.js");


class CreditComponent extends React.Component {   
    state = {
        loading : false,
        receiver : "",
        amount : "",
        withdrawAmount : "",
        paymentTokenIDWithdraw : "",
        selectedPaymentLabelWithdraw : "Select payment Token",
        paymentTokenIDSend : "",
        selectedPaymentLabelSend : "Select payment Token"
    };
    
    constructor(props) {
        super(props)
        this.refresh = this.refresh.bind(this)
    }

    async refresh() {
        await this.props.refresh()
    }

    handleWithdraw = async (event) => {
        event.preventDefault();
        await func.WithdrawCredit(this.state.withdrawAmount.trim(), this.props.contract, this.state.paymentTokenIDWithdraw);
        this.setState({withdrawAmount: ""});
        this.props.refresh();
    };

    handleWithdrawAll = async (event) => {
        event.preventDefault();
        await func.WithdrawAllCredit(this.props.contract, this.state.paymentTokenIDWithdraw);
        this.props.refresh();
    };

    sendCredit = async (event) => {
        event.preventDefault();
        await func.SendCredit(this.state.receiver.trim(), this.state.amount.trim(), this.props.contract, this.state.paymentTokenIDSend);
        this.setState({amount: "", receiver : ""});
        this.props.refresh();
    };

    HandleSelectWithdraw = async (index) => {
      this.setState({paymentTokenIDWithdraw : index});
      let label = "Selected payment Token - " + PaymentsFunc.TokenSymbols[index];
      this.setState({selectedPaymentLabelWithdraw : label});
    }

    HandleSelectSend = async (index) => {
      this.setState({paymentTokenIDSend : index});
      let label = "Selected payment Token - " + PaymentsFunc.TokenSymbols[index];
      this.setState({selectedPaymentLabelSend : label});
    }

    render(){
        return (
          <div>
            <h3>Markets Credit</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                  <Col><b>Your Current Credits</b></Col> 
                  <Col></Col>
              </Row>
              {func.Credits.map(
                  (credit, index) => (
                      <Row>
                        <Col><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{PaymentsFunc.TokenSymbols[index]} :</b></Col> 
                        <Col>{credit.toString()}</Col>
                      </Row>
                    )
                  )
                }
                <br />
            </Container>
            <Form onSubmit={this.handleWithdraw} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="integer" name="Amount" placeholder="Amount"
                  value={this.state.withdrawAmount}
                  onChange={event => this.setState({ withdrawAmount: event.target.value })}/>
                <SelectPaymentTokenComponent 
                      HandleSelect={this.HandleSelectWithdraw}
                      selectedPaymentLabel={this.state.selectedPaymentLabelWithdraw}
                      DisplayAll={true}/>
              </Form.Group>
              <button class="btn btn-primary">Withdraw Credit</button>&nbsp;&nbsp;
              <button class="btn btn-primary" onClick={this.handleWithdrawAll}>Withdraw All</button>
            </Form>
            <Form onSubmit={this.sendCredit} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="text" name="Receiver" placeholder="receiver address" 
                  value={this.state.receiver}
                  onChange={event => this.setState({ receiver: event.target.value })}/>
                <Form.Control type="integer" name="Amount" placeholder="Amount" 
                  value={this.state.amount}
                  onChange={event => this.setState({ amount: event.target.value })}/>
                <SelectPaymentTokenComponent 
                      HandleSelect={this.HandleSelectSend}
                      selectedPaymentLabel={this.state.selectedPaymentLabelSend}
                      DisplayAll={false}/>
              </Form.Group>
              <button class="btn btn-primary">Send Credit</button>
            </Form>
          </div>
        );
      }

}

export default CreditComponent;