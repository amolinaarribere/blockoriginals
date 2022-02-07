import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { ETHDecimals, ETHFactor } from '../../../config';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/TreasuryFunctions.js");

class AssignWithdrawComponent extends React.Component {
    state = {
        amount : ""
      };
    
      handleWithdrawAll = async (event) => {
        event.preventDefault();
      await func.WithdrawAll(this.props.contract);
      this.props.refresh();
    };

    handleWithdraw = async (event) => {
      event.preventDefault();
      await func.WithdrawAmount((new BigNumber(this.state.amount).multipliedBy(ETHFactor)).dp(0, 1).toString(), this.props.contract);
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
                <Col><b>Aggregated Balance (ETH) :</b></Col> 
                <Col>{func.TreasuryAggregatedBalanceWei.dividedBy(ETHFactor).dp(ETHDecimals, 0).toString()}</Col>
              </Row>
              <Row>
                <Col><b>Contract Balance (ETH) :</b></Col> 
                <Col>{func.TreasuryBalanceWei.dividedBy(ETHFactor).dp(ETHDecimals, 0).toString()}</Col>
              </Row>
              <Row>
                <Col><b>Your current Balance (ETH) :</b></Col> 
                <Col>{func.AccountBalanceWei.dividedBy(ETHFactor).dp(ETHDecimals, 0).toString()}</Col>
              </Row>
              <br />
              <button type="button" class="btn btn-primary" onClick={this.handleWithdrawAll}>Withdraw All</button>
            </Container>
          </div>
          <div class="border border border-0">
            <Form onSubmit={this.handleWithdraw} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="string" name="Amount" placeholder="Amount in ETH" 
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