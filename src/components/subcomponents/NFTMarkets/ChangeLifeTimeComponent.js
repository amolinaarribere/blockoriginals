import React from 'react';
import { Form} from 'react-bootstrap';

const func = require("../../../functions/NFTMarketFunctions.js");


class ChangeLifeTimeComponent extends React.Component {
    state = {
        marketId : "",
        newLifeTime : ""
    };

    handleNewPrice = async (event) => {
        event.preventDefault();
        await func.changeOffersLifeTime(this.props.contract, this.state.marketId.trim(), this.state.newLifeTime.trim());
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
                        <Form.Control type="number" name="newLifeTime" min="0" step="1" placeholder="new life time" 
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