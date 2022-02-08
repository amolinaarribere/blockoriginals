import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VoteForPropositionComponent from '../Vote/VoteForPropositionComponent.js';


class ListPendingPropositionComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

  async refresh() {
    await this.props.refresh();
  }

  state = {
    isPendingPropositionShown: false
  };


  togglePendingPropositionConfig = async () => {
    if(this.state.isPendingPropositionShown)this.setState({ isPendingPropositionShown: false })
    else this.setState({isPendingPropositionShown: true })
  };

  render(){
    return(
        <div>
          <button
                  className="btn btn-lg btn-warning center modal-button"
                  onClick={this.togglePendingPropositionConfig}>{this.props.text}</button>
          {this.state.isPendingPropositionShown ? (
                <div class="border border-warning border-5">
                  <Container style={{margin: '10px 50px 50px 50px' }}>
                      {this.props.headers.map(
                          (header, index) => (
                            <Row>
                                <Col><b>{header}</b></Col> 
                                <Col>{this.props.values[index]}</Col>
                            </Row>
                          )
                      )}
                    < br/>
                    <Row>
                        <Col><i>Proposer : </i></Col> 
                        <Col>{this.props.PropStatus[0]}</Col>
                    </Row>
                    <Row>
                        <Col><i>DeadLine : </i></Col> 
                        <Col>{(0 < this.props.PropStatus[1])? (new Date(this.props.PropStatus[1] * 1000)).toString() : "-"}</Col>
                    </Row>
                    <Row>
                        <Col><i>Threshold : </i></Col> 
                        <Col>{this.props.PropStatus[2]}</Col>
                    </Row>
                    <Row>
                        <Col><i>Votes For : </i></Col> 
                        <Col>{this.props.PropStatus[3]}</Col>
                    </Row>
                    <Row>
                        <Col><i>Votes Against : </i></Col> 
                        <Col>{this.props.PropStatus[4]}</Col>
                    </Row>
                    < br/>
                    <Row>
                        <Col><b>Your voting Rights : </b></Col> 
                        <Col>{this.props.RemainingVotes}</Col>
                    </Row>
                    < br/>
                    <Row>
                      <VoteForPropositionComponent contract={this.props.contract}
                        refresh={this.refresh}/>
                    </Row>
                  </Container>
                </div>) : null}      
        </div>
    
    );
    }
    
  }

  export default ListPendingPropositionComponent;