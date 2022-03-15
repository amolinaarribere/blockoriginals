import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/OriginalsFunctions.js");

class OriginalsTransferComponent extends React.Component {
    state = {
      amount : "",
      recipient : ""
    };

    handleTransfer = async (event) => {
      event.preventDefault();

      await func.transfer(this.state.recipient.trim(), this.state.amount.trim(), this.props.contract);
      this.setState({amount: "", recipient: ""});
      await this.props.refresh();
    };
    
    render(){
      return (
        <div class="border border-0">
                <Form onSubmit={this.handleTransfer} style={{margin: '50px 50px 50px 50px' }}>
                  <Form.Group  className="mb-3">
                    <Form.Control type="integer" name="Amount" placeholder="amount" 
                          value={this.state.amount}
                          onChange={event => this.setState({ amount: event.target.value })}/>
                    <Form.Control type="text" name="Recipient" placeholder="recipient address" 
                          value={this.state.recipient}
                          onChange={event => this.setState({ recipient: event.target.value })}/>
                  </Form.Group>
                  <button class="btn btn-primary">Transfer Amount</button>
                </Form>
                <br/>
          </div>
      );
    }
  }

export default OriginalsTransferComponent;