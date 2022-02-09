import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/PublicFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class ManageMarketsComponent extends React.Component{
    state = {
      MarketId : "",
      isManageMarketsShown: false
    };

    handleValidateMarket = async (event) => {
      event.preventDefault();
      await func.ValidateMarket(this.state.MarketId, this.props.contract)
      await this.refresh();
    };
    handleRejecMarket = async (event) => {
      event.preventDefault();
      await func.RejectMarket(this.state.MarketId, this.props.contract)
      await this.refresh();
    };

    async refresh() {
      this.setState({ MarketId: ""})
      await loadFunc.LoadPublicFunc(this.props.contract);
      await this.props.refresh();
    }

    toggleManageMarkets = () => {
      if(this.state.isManageMarketsShown)this.setState({ isManageMarketsShown: false })
      else this.setState({ isManageMarketsShown: true })
    };
  
    render(){
        return(
            <div>
            <button
                className="btn btn-lg btn-primary center modal-button"
                onClick={this.toggleManageMarkets}>Manage Market</button>
            
            {this.state.isManageMarketsShown ? (
                        <div class="border border-primary border-5">
                          <Form onSubmit={this.handleValidateProviderPool} style={{margin: '50px 50px 50px 50px' }}>
                            <Form.Group  className="mb-3">
                                      <Form.Control type="text" name="MarketId" placeholder="market id" 
                                          value={this.state.MarketId}
                                          onChange={event => this.setState({ MarketId: event.target.value })}/>  
                              </Form.Group>
                            <button type="submit" class="btn btn-success">Validate Market</button> &nbsp;&nbsp;
                            <button type="button" class="btn btn-danger" onClick={this.handleRejectProviderPool}>Reject Market</button>
                        </Form>
                        <br/>
                        </div>) : null}
            </div>
        );
    }
  }

  export default ManageMarketsComponent;