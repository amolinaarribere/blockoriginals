import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

/*import HomeComponent from './components/HomeComponent.js';
import PublicComponent from './components/PublicComponent.js';
import DividendsComponent from './components/DividendsComponent.js';
import SettingsComponent from './components/SettingsComponent.js';
import CurrentAddressComponent from './components/CurrentAddressComponent.js';
import ConnectDisconnectComponent from './components/ConnectDisconnectComponent.js';
import EventsComponent from './components/EventsComponent.js';
import PiggyBankComponent from './components/PiggyBankComponent.js';
import LoadingComponent from './components/subcomponents/LoadingComponent.js';


const certFunc = require("./functions/CertisFunctions.js");
const LoadFunc = require("./functions/LoadFunctions.js");
const BrowserStorageFunctions = require("./functions/BrowserStorageFunctions.js");
const AuxFunc = require("./functions/AuxiliaryFunctions.js");*/

const Home = "Home";
const Settings = "Settings";
const Public = "Public";
const Dividends = "Dividends";
const Event = "Events";
const PiggyBank = "PiggyBank";



class Demo extends React.Component {
  async componentWillMount() {
    this.state.loading = true;
    /*let currentTab = BrowserStorageFunctions.ReadKey(BrowserStorageFunctions.currentTabKey);
    if(currentTab){
      this.state.Component = currentTab
    }
    else this.state.Component = "Home"
    
    await LoadFunc.LoadBlockchain();

    let account = BrowserStorageFunctions.ReadKey(BrowserStorageFunctions.accountConnectedKey);
    if(account){
      await LoadFunc.ConnectNewAccount(account)
    }

    this.refresh = this.refresh.bind(this)*/
    this.state.loading = false;
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
    //BrowserStorageFunctions.WriteKey(BrowserStorageFunctions.currentTabKey, newValue);
    this.setState({Component: newValue});
  };

  
  render(){
    return (
      <div style={{backgroundColor: 'white'}}>
        <Navbar bg="primary" variant="dark" class="w-75">
            <Container>
              <Navbar.Brand onClick={() => this.toggleMenu(Home)}>Blockoriginals <i>(test)</i></Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link onClick={() => this.toggleMenu(Settings)}>{Settings}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(Public)}>{Public}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(Dividends)}>{Dividends}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(Event)}>{Event}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(PiggyBank)}>{PiggyBank}</Nav.Link>
              </Nav>
            </Container>
        </Navbar>
        <br />
        <div class="mx-auto w-75">
      </div>
        
      </div>
    );

  };
  
  
}

export default Demo;
