import React from 'react';
import { Form} from 'react-bootstrap';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/NFTMarketFunctions.js");


class ChangeLifeTimeComponent extends React.Component {
    state = {
        marketId : "",
        newLifeTime : ""
    };

    handleNewPrice = async (event) => {
        event.preventDefault();
        let NewLifeTime = new BigNumber(this.state.newLifeTime);
        let MarketId = new BigNumber(this.state.marketId);
        await func.changeOffersLifeTime(this.props.contract, MarketId, NewLifeTime);
        this.setState({marketId: "", newLifeTime : ""});
        this.props.refresh();
    };

    render(){
        return (
            <div>
              <h4>Change Market offers life time</h4>
              <Form onSubmit={this.handleNewPrice} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
                        <Form.Control type="text" name="newLifeTime" placeholder="new life time" 
                            value={this.state.newLifeTime}
                            onChange={event => this.setState({ newLifeTime: event.target.value })}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Set New Life Time</button>  &nbsp;&nbsp;
                </Form>
            </div>
            
          );
    }
}


export default ChangeLifeTimeComponent;