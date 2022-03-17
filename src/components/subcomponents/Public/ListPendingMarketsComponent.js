import React from 'react';
import { Table } from 'react-bootstrap';
import {PaymentsPlans} from '../../../config.js';

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
                    <Table responsive striped bordered hover size="sm" style={{margin: '0px 50px 50px 50px' }}>
                      <thead>
                        <tr>
                          <th><b>Market Id</b></th>
                          <th><b>Owner</b></th>
                          <th><b>Name</b></th>
                          <th><b>Symbol</b></th>
                          <th><b>Fee Amount Perc</b></th>
                          <th><b>Fee Decimals</b></th>
                          <th><b>Payment Plan</b></th>
                        </tr>
                      </thead>
                      <tbody>
                      {pendingMarkets.map(pendingMarket => (
                        <tr>
                          <td>{pendingMarket[0]}</td>
                          <td>{pendingMarket[1]}</td>
                          <td>{pendingMarket[2]}</td>
                          <td>{pendingMarket[3]}</td>
                          <td>{pendingMarket[4]}</td>
                          <td>{pendingMarket[5]}</td>
                          <td>{PaymentsPlans[pendingMarket[6]]}</td>
                        </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>) : null} 

            <br />
            <br />
        </div>
      );
 
    }
    
  }

export default ListPendingMarketsComponent;