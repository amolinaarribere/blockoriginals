import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VoteForMinOwnersComponent from './VoteForMinOwnersComponent.js';

const func = require("../../../functions/OwnerFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");

class ListPendingOwnersComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await this.props.refresh()
  }
  
  state = {
    isPendingMinOwnersShown: false,
    isPendingOwnersAddShown: false,
    isPendingOwnersRemoveShown: false
  };

  togglePendingMinOwners = () => {
    if(this.state.isPendingMinOwnersShown)this.setState({ isPendingMinOwnersShown: false })
    else this.setState({ isPendingMinOwnersShown: true })
  };
  togglePendingOwnersAdd = () => {
    if(this.state.isPendingOwnersAddShown)this.setState({ isPendingOwnersAddShown: false })
    else this.setState({ isPendingOwnersAddShown: true })
  };
  togglePendingOwnersRemove = () => {
    if(this.state.isPendingOwnersRemoveShown)this.setState({ isPendingOwnersRemoveShown: false })
    else this.setState({ isPendingOwnersRemoveShown: true })
  };

    render(){
      var minOwners = func.PendingMinOwners;
      var pendingOwnersAdd = func.pendingOwnersAdd;
      var pendingOwnersRemove = func.pendingOwnersRemove;

      return(
        <div>
          <button
              className="btn btn-lg btn-warning center modal-button"
              onClick={this.togglePendingMinOwners}>Check Pending Min Owners</button>

          {this.state.isPendingMinOwnersShown ? (
                  <div class="border border-warning border-5">
                    <br />
                    <Container style={{margin: '10px 50px 50px 50px' }}>
                      <Row>
                        <Col><b>Pending Min Owner :</b></Col>
                        <Col>{minOwners}</Col>
                      </Row>
                      < br/>
                      <Row>
                        <VoteForMinOwnersComponent contract={this.props.contract}
                          refresh={this.refresh}/>
                      </Row>
                    </Container>
                  </div>) : null} 

          <br />
          <br />

           <button
              className="btn btn-lg btn-warning center modal-button"
              onClick={this.togglePendingOwnersAdd}>Check Pending Owners to be Added</button>

           {this.state.isPendingOwnersAddShown ? (
                  <div class="border border-warning border-5">
                    <br />
                    <Container style={{margin: '10px 50px 50px 50px' }}>
                        {pendingOwnersAdd.map(pendingOwnerAdd => (
                        <Row key={pendingOwnerAdd}>{pendingOwnerAdd}</Row>
                        ))}
                    </Container>
                  </div>) : null} 

            <br />
            <br />

            <button
              className="btn btn-lg btn-warning center modal-button"
              onClick={this.togglePendingOwnersRemove}>Check Pending Owners to be Removed</button>

            {this.state.isPendingOwnersRemoveShown ? (
                  <div class="border border-warning border-5">
                    <br />
                    <Container style={{margin: '10px 50px 50px 50px' }}>
                      {pendingOwnersRemove.map(pendingOwnerRemove => (
                        <Row key={pendingOwnerRemove}>{pendingOwnerRemove}</Row>
                        ))}
                    </Container>
                  </div>) : null} 
        </div>
      );
 
    }
    
  }

  export default ListPendingOwnersComponent;