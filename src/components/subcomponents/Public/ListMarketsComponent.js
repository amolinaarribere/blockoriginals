import React from 'react';
import { Table } from 'react-bootstrap';

const func = require("../../../functions/PublicFunctions.js");

class ListMarketsComponent extends React.Component{
  state = {
    isMarketsAddShown: false,
  };

  toggleMarketsAdd = () => {
    if(this.state.isMarketsAddShown)this.setState({ isMarketsAddShown: false })
    else this.setState({ isMarketsAddShown: true })
  };
    render(){
      return(
        <div>
          <h3>NFT Markets</h3>
          <br />
           <button
              className="btn btn-lg btn-dark center modal-button"
              onClick={this.toggleMarketsAdd}>List of Markets</button>

              {this.state.isMarketsAddShown ? (
                  <div class="border border-warning border-5">
                    <br />
                    <Table responsive striped bordered hover size="sm" style={{margin: '0px 50px 50px 50px' }}>
                      <thead>
                        <tr>
                          <th><b>Market Id</b></th>
                          <th><b>Market Address</b></th>
                          <th><b>Owner</b></th>
                          <th><b>Name</b></th>
                          <th><b>Symbol</b></th>
                          <th><b>Fee Amount Perc</b></th>
                          <th><b>Fee Decimals</b></th>
                          <th><b>Payment Plan</b></th>
                          <th><b>Offer Life Time</b></th>
                        </tr>
                      </thead>
                      <tbody>
                      {func.Markets.map(Market => (
                        <tr>
                          <td>{Market[0]}</td>
                          <td>{Market[1]}</td>
                          <td>{Market[2]}</td>
                          <td>{Market[3]}</td>
                          <td>{Market[4]}</td>
                          <td>{Market[5]}</td>
                          <td>{Market[6]}</td>
                          <td>{Market[7]}</td>
                          <td>{Market[8]}</td>
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

export default ListMarketsComponent;