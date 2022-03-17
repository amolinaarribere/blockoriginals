import React from 'react';
import { Form} from 'react-bootstrap';
import {PaymentsPlans} from '../../../config.js';
import SelectPaymentPlanComponent from '../NFTMarkets/SelectPaymentPlanComponent.js';

const func = require("../../../functions/NFTMarketFunctions.js");


class ChangePaymentPlanComponent extends React.Component {
    state = {
        marketId : "",
        newPaymentPlan : "",
        selectedPaymentPlanLabel : "Select payment Plan",
    };

    handleNewPrice = async (event) => {
        event.preventDefault();
        await func.changePaymentPlan(this.props.contract, this.state.marketId.trim(), this.state.newPaymentPlan);
        this.setState({marketId: "", newPaymentPlan : ""});
        this.props.refresh();
    };

    HandleSelectPaymentPlan = async (index) => {
        this.setState({newPaymentPlan : index});
        let label = "Selected payment Plan - " + PaymentsPlans[index];
        this.setState({selectedPaymentPlanLabel : label});
      }

    render(){
        return (
            <div>
              <h4>Change Market payment plan</h4>
              <Form onSubmit={this.handleNewPrice} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
                        <SelectPaymentPlanComponent 
                          HandleSelect={this.HandleSelectPaymentPlan}
                          selectedPaymentPlanLabel={this.state.selectedPaymentPlanLabel}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Set New Payment Plan</button>  &nbsp;&nbsp;
                </Form>
            </div>
            
          );
    }
}


export default ChangePaymentPlanComponent;