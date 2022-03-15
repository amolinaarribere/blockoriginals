import React from 'react';
import { Form} from 'react-bootstrap';

const func = require("../../../functions/NFTMarketFunctions.js");


class ChangePaymentPlanComponent extends React.Component {
    state = {
        marketId : "",
        newPaymentPlan : ""
    };

    handleNewPrice = async (event) => {
        event.preventDefault();
        await func.changePaymentPlan(this.props.contract, this.state.marketId.trim(), this.state.newPaymentPlan.trim());
        this.setState({marketId: "", newPaymentPlan : ""});
        this.props.refresh();
    };

    render(){
        return (
            <div>
              <h4>Change Market payment plan</h4>
              <Form onSubmit={this.handleNewPrice} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
                        <Form.Control type="text" name="NewPaymentPlan" placeholder="new payment plan" 
                            value={this.state.newPaymentPlan}
                            onChange={event => this.setState({ newPaymentPlan: event.target.value })}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Set New Payment Plan</button>  &nbsp;&nbsp;
                </Form>
            </div>
            
          );
    }
}


export default ChangePaymentPlanComponent;