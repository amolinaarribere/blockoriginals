import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VoteForTransferComponent from './VoteForTransferComponent.js';

const func = require("../../../functions/AdminPiggyBankFunctions.js");

class PendingTransferComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

  async refresh() {
    await this.props.refresh();
  }

  state = {
    isPendingTransferShown: false
  };


  togglePendingPropositionConfig = async () => {
    if(this.state.isPendingTransferShown)this.setState({ isPendingTransferShown: false })
    else this.setState({isPendingTransferShown: true })
  };

  render(){
    return(
        <div>
          <button
                  className="btn btn-lg btn-warning center modal-button"
                  onClick={this.togglePendingPropositionConfig}>{this.props.text}</button>
          {this.state.isPendingTransferShown ? (
                <div class="border border-warning border-5">
                  <Container style={{margin: '10px 50px 50px 50px' }}>
                    <Row>
                        <Col><i>To : </i></Col> 
                        <Col>{func.TransferTo}</Col>
                    </Row>
                    <Row>
                        <Col><i>Amount : </i></Col> 
                        <Col>{func.TransferAmount}</Col>
                    </Row>
                    <Row>
                        <Col><i>Token : </i></Col> 
                        <Col>{func.TransferPaymentTokenSymbol}</Col>
                    </Row>
                    <Row>
                        <Col><i>Votes For : </i></Col> 
                        <Col>{func.TransferValidations}</Col>
                    </Row>
                    <Row>
                        <Col><i>Votes Against : </i></Col> 
                        <Col>{func.TransferRejections}</Col>
                    </Row>
                    < br/>
                    <Row>
                      <VoteForTransferComponent contract={this.props.contract}
                        refresh={this.refresh}/>
                    </Row>
                  </Container>
                </div>) : null}      
        </div>
    
    );
    }
    
  }

  export default PendingTransferComponent;