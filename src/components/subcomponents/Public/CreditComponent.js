import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { ETHFactor } from '../../../config';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/PublicFunctions.js");


class CreditComponent extends React.Component {   
    state = {
        loading : false,
        receiver : "",
        amount : "",
        withdrawAmount : ""
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
        await func.WithdrawCredit((new BigNumber(this.state.withdrawAmount).multipliedBy(ETHFactor)).dp(0, 1).toString(), this.props.contract);
        this.setState({withdrawAmount: ""});
        this.props.refresh();
    };

    handleWithdrawAll = async (event) => {
        event.preventDefault();
        await func.WithdrawAllCredit(this.props.contract);
        this.props.refresh();
    };

    sendCredit = async (event) => {
        event.preventDefault();
        await func.SendCredit(this.state.receiver, (new BigNumber(this.state.amount).multipliedBy(ETHFactor)).dp(0, 1).toString(), this.props.contract);
        this.setState({amount: "", receiver : ""});
        this.props.refresh();
    };

    render(){
        return (
          <div>
            <h3>Markets Credit</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
                <Row>
                    <Col><b>Your Current Credit (ETH) :</b></Col> 
                    <Col>{func.Credit.toString()}</Col>
                </Row>
                <br />
                <button type="button" class="btn btn-primary" onClick={this.handleWithdrawAll}>Withdraw All</button>
            </Container>
            <Form onSubmit={this.handleWithdraw} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="integer" name="Amount" placeholder="Amount in ETH" 
                  value={this.state.withdrawAmount}
                  onChange={event => this.setState({ withdrawAmount: event.target.value })}/>
              </Form.Group>
              <button class="btn btn-primary">Withdraw Credit</button>
            </Form>
            <Form onSubmit={this.sendCredit} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="text" name="Receiver" placeholder="receiver address" 
                  value={this.state.receiver}
                  onChange={event => this.setState({ receiver: event.target.value })}/>
                <Form.Control type="integer" name="Amount" placeholder="Amount in ETH" 
                  value={this.state.amount}
                  onChange={event => this.setState({ amount: event.target.value })}/>
              </Form.Group>
              <button class="btn btn-primary">Send Credit</button>
            </Form>
          </div>
        );
      }

}

export default CreditComponent;