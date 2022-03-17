import React from 'react';
import ListBaseEventsComponentTemplate from './ListBaseEventsComponentTemplate.js';
import { Form } from 'react-bootstrap';


const EventsFunc = require("../../../functions/EventsFunctions.js");
const Contracts = require("../../../functions/Contracts.js");
const NFTMarketFunctions = require("../../../functions/NFTMarketFunctions.js");
const BrowserStorageFunctions = require("../../../functions/BrowserStorageFunctions.js");

class ListEventsComponent extends React.Component {
  async componentWillMount() {
    await this.refresh();
  }

  async refresh() {
    let NFTMarket = BrowserStorageFunctions.ReadKey(BrowserStorageFunctions.nftmarketKey);
    if(NFTMarket){
      let nftmarketContract = await NFTMarketFunctions.RetrieveNFTMarketContract(Contracts.publicPool, NFTMarket);
      if(nftmarketContract) {
        Contracts.setNFTMarket(nftmarketContract);
      }
    }
    this.setState({block : this.props.block, currentmarketId : NFTMarket})
  }

    state = {
      block: this.props.block,
      blockChecked: 0,
      EventsActivated: false,
      marketId : "",
      currentmarketId : ""
    };

    handleStopEvents = async (event) => {
      event.preventDefault();
      await EventsFunc.StopEvents();
      this.setState({ EventsActivated: false });
    }

    handleStartEvents = async (event) => {
      event.preventDefault();
      let success = await EventsFunc.StartEvents(this.state.block.trim());
      if(true == success)this.setState({ EventsActivated: true,  blockChecked: this.state.block});
      else this.setState({ EventsActivated: false,  blockChecked: 0});
    }

    choosenftMarket = async (event) => {
      event.preventDefault();
      let nftmarketContract = await NFTMarketFunctions.RetrieveNFTMarketContract(Contracts.publicPool, this.state.marketId.trim());
      if(nftmarketContract) {
        Contracts.setNFTMarket(nftmarketContract);
        BrowserStorageFunctions.WriteKey(BrowserStorageFunctions.nftmarketKey ,this.state.marketId.trim());
        this.setState({ currentmarketId: this.state.marketId.trim(), marketId: ""});
      }
    }

    render(){
      return (
        <div>
          <h3>Events</h3> 
          <Form onSubmit={this.handleStartEvents} style={{margin: '50px 50px 50px 50px' }}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="integer" name="Block" placeholder="block for events"
                    onChange={event => this.setState({ block: event.target.value })}/>
            </Form.Group>
              <button
                  type="submit"
                  disabled={this.state.EventsActivated}
                  className="btn btn-lg btn-secondary center modal-button">Start Events</button> &nbsp;&nbsp;
              <button
                  type="button"
                  disabled={! this.state.EventsActivated}
                  className="btn btn-lg btn-secondary center modal-button"
                  onClick={this.handleStopEvents}>Stop Events</button>
            </Form>

            {(this.state.EventsActivated)?(
              <div>
                <b>Block <i>{this.state.blockChecked}</i></b>
              </div>
            )
            :null}
          
          <br/>
          <br/>
          <br/>
          <ListBaseEventsComponentTemplate 
            SCName="Manager"
            ContractId={EventsFunc.ManagerId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Public Pool"
            ContractId={EventsFunc.publicPoolId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Treasury"
            ContractId={EventsFunc.TreasuryId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Originals Token"
            ContractId={EventsFunc.OriginalsTokenId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Proposition"
            ContractId={EventsFunc.PropositionSettingsId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Admin Piggy Bank"
            ContractId={EventsFunc.AdminPiggyBankId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Markets Credits"
            ContractId={EventsFunc.MarketsCredits}
            />

          <Form onSubmit={this.choosenftMarket} style={{margin: '50px 50px 50px 50px' }}>
            <Form.Group  className="mb-3"> 
              <Form.Control type="text" name="MarketId" placeholder="market id" 
                            value={this.state.marketId}
                            onChange={event => this.setState({ marketId: event.target.value })}/>
            </Form.Group>
                <button
                  type="submit"
                  className="btn btn-lg btn-secondary center modal-button">Display Market Events</button> &nbsp;&nbsp;
          </Form>

          {(Contracts.nftMarket == "")?
            <div></div> :
            <ListBaseEventsComponentTemplate 
              SCName={"NFT Market " + this.state.currentmarketId}
              ContractId={EventsFunc.nftMarketId}
            />
          }

        </div>
      );
    }
  }
  
export default ListEventsComponent;