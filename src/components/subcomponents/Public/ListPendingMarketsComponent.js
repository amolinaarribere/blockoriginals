import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/PublicFunctions.js");

class ListPendingMarketsComponent extends React.Component{
  state = {
    isPendingMarketsAddShown: false,
  };

  togglePendingMarketsAdd = () => {
    if(this.state.isPendingMarketsAddShown)this.setState({ isPendingMarketsAddShown: false })
    else this.setState({ isPendingMarketsAddShown: true })
  };
    render(){
      var pendingMarkets = func.pendingMarkets;

      return(
        <div>
           <button
              className="btn btn-lg btn-warning center modal-button"
              onClick={this.togglePendingMarketsAdd}>Check Pending Markets to be Added</button>

           {this.state.isPendingMarketsAddShown ? (
                  <div class="border border-warning border-5">
                    <br />
                    <Container style={{margin: '10px 50px 50px 50px' }}>
                        {pendingMarkets.map(pendingMarket => (
                        <Row>
                          <Col key={pendingMarket[0]}> {pendingMarket[0]}</Col>
                          <Col>{pendingMarket[1]}</Col>
                        </Row>
                        ))}
                    </Container>
                  </div>) : null} 

            <br />
            <br />
        </div>
      );
 
    }
    
  }

export default ListPendingMarketsComponent;