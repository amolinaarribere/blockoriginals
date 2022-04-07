import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import drizzleOptions from './drizzleOptions';
import { DrizzleProvider} from 'drizzle-react';

import HomeComponent from './components/HomeComponent.js';
import PublicMarketsComponent from './components/PublicMarketsComponent.js';
import DividendsComponent from './components/DividendsComponent.js';
import SettingsComponent from './components/SettingsComponent.js';
import CurrentAddressComponent from './components/CurrentAddressComponent.js';
import ConnectDisconnectComponent from './components/ConnectDisconnectComponent.js';
import EventsComponent from './components/EventsComponent.js';
import PiggyBankComponent from './components/PiggyBankComponent.js';
import LoadingComponent from './components/subcomponents/LoadingComponent.js';


const originalsFunc = require("./functions/OriginalsFunctions.js");
const LoadFunc = require("./functions/LoadFunctions.js");
const BrowserStorageFunctions = require("./functions/BrowserStorageFunctions.js");
const AuxFunc = require("./functions/AuxiliaryFunctions.js");

const Home = "Home";
const Settings = "Settings";
const NFTMarkets = "NFT Markets";
const Dividends = "Dividends";
const Event = "Events";
const PiggyBank = "PiggyBank";



class Demo extends React.Component {
  async componentWillMount() {
    this.setState({loading: true})
    let currentTab = BrowserStorageFunctions.ReadKey(BrowserStorageFunctions.currentTabKey);
    if(currentTab){
      this.state.Component = currentTab
    }
    else this.state.Component = "Home"
    
    await LoadFunc.LoadBlockchain();
    let account = BrowserStorageFunctions.ReadKey(BrowserStorageFunctions.accountConnectedKey);
    if(account){
      await LoadFunc.ConnectNewAccount(account)
    }

    this.refresh = this.refresh.bind(this)
    this.setState({loading: false})
 }

  state = {
    value : 0,
    loading : false,
    Component : "",
    address : ""
  };

  async refresh(){
    this.setState({loading: true})
    this.setState({loading: false})
  }

  toggleMenu(newValue){
    BrowserStorageFunctions.WriteKey(BrowserStorageFunctions.currentTabKey, newValue);
    this.setState({Component: newValue});
  };

  
  render(){
    return (
      <div style={{backgroundColor: 'white'}}>
        <Navbar sticky="top" bg="primary" variant="dark" class="w-75">
            <Container>
              <Navbar.Brand onClick={() => this.toggleMenu(Home)}>Blockoriginals <i>({LoadFunc.Network})</i></Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link onClick={() => this.toggleMenu(Settings)}>{Settings}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(NFTMarkets)}>{NFTMarkets}</Nav.Link>
                {originalsFunc.isOwner ? (<Nav.Link onClick={() => this.toggleMenu(Dividends)}>{Dividends}</Nav.Link>):null}
                <Nav.Link onClick={() => this.toggleMenu(PiggyBank)}>{PiggyBank}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(Event)}>{Event}</Nav.Link>
              </Nav>
              {
                  (false == this.state.loading) ? <CurrentAddressComponent /> : <LoadingComponent />
              }&nbsp;&nbsp;
              {
                  (false == this.state.loading) ? <ConnectDisconnectComponent refresh={this.refresh} /> : <LoadingComponent />
              }
            </Container>
        </Navbar>
        <br />
        <div class="mx-auto w-75">
          {(() => {
                switch (this.state.Component) {
                  case Settings:
                      return (
                        ((false == this.state.loading) ? <SettingsComponent /> : <LoadingComponent />)
                      )
                  case NFTMarkets:
                      return (
                        ((false == this.state.loading) ? <PublicMarketsComponent /> : <LoadingComponent />)
                      )
                  case Dividends:
                      return (
                        ((false == this.state.loading) ? <DividendsComponent /> : <LoadingComponent />)
                      )
                 case PiggyBank:
                      return (
                        ((false == this.state.loading) ? <PiggyBankComponent /> : <LoadingComponent />)
                      )
                  case Event:
                      return (
                        ((false == this.state.loading) ? <EventsComponent /> : <LoadingComponent />)
                      )
                  default:
                      return (
                        <HomeComponent />
                      )
                }
            })()}
        </div>
        
      </div>
    );

  };
  
  
}

export default Demo;
