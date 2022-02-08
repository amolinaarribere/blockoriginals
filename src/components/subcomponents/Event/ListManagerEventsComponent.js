import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const EventsFunc = require("../../../functions/EventsFunctions.js");

class ListManagerEventsComponent extends React.Component {
    state = {
     isManagerEventsShown: false,
     ManagerEventBlock : 0,
     listingManagerEvents: false,
     ManagerEvents: []
    };

    toggleManagerEvents = () => {
      if(this.state.isManagerEventsShown)this.setState({ isManagerEventsShown: false })
      else this.setState({ isManagerEventsShown: true })
    };


    handleManagerEvents = async (event) => {
      event.preventDefault();
      if(!this.state.listingManagerEvents){
        this.setState({ listingManagerEvents: true });
      }
      this.setState({ ManagerEvents: EventsFunc.eventlogs[EventsFunc.ManagerId] });
    }


    render(){
      return (
        <div>
         <button
            className="btn btn-lg btn-primary center modal-button"
            onClick={this.toggleManagerEvents}>Manager Events</button>

          {(this.state.isManagerEventsShown) ? (

                  <div class="border border-primary border-5">
                  <Form onSubmit={this.handleManagerEvents} style={{margin: '50px 50px 50px 50px' }}>
                      <button class="btn btn-secondary">{(this.state.listingManagerEvents) ? "Refresh" : "List Events"}</button>
                  </Form>
                
                  <br />

                  {(this.state.listingManagerEvents  && 
                        this.state.ManagerEvents != null) ? (
                  <Container style={{margin: '10px 50px 50px 50px' }}>
                     <div>
                      <Row>
                        <Col><h2>New Contracts</h2></Col>
                      </Row>

                      {(this.state.ManagerEvents[EventsFunc.NewContractsId] != null) ? (
                        <div>
                            {(this.state.ManagerEvents[EventsFunc.NewContractsId]).map(NewContracts => (
                                <div>
                                    <Row>
                                      <p>
                                        <b>Public </b>{NewContracts.Public} &nbsp;
                                        <b>Certis</b> {NewContracts.Certis} &nbsp;
                                        <b>Treasury</b> {NewContracts.Treasury} &nbsp;
                                        <b>Private Factory : </b>{NewContracts.PrivateFactory} &nbsp;
                                        <b>Private : </b>{NewContracts.Private} &nbsp;
                                        <b>Provider Factory : </b>{NewContracts.ProviderFactory} &nbsp;
                                        <b>Provider : </b>{NewContracts.Provider} &nbsp;
                                        <b>Price Converter : </b>{NewContracts.PriceConverter}
                                      </p>
                                    </Row>
                                    <br />  
                                  </div>
                            ))}
                          </div>
                        ):null}

                      <br />  
                      <hr class="bg-secondary"/>
                      <br />
                    </div>

                     <div>
                      <Row>
                        <Col><h2>Added Proposition</h2></Col>
                      </Row>

                      {(this.state.ManagerEvents[EventsFunc.AddedPropositionId] != null) ? (
                        <div>
      
                          {(this.state.ManagerEvents[EventsFunc.AddedPropositionId]).map(AddedProposition => (
                                <div>
                                  <Row>
                                    <p>
                                        <b>ID </b>{AddedProposition[0]} &nbsp;
                                        <b>Proposer</b> {AddedProposition[1]} &nbsp;
                                        <b>DeadLine</b> {AddedProposition[2]} &nbsp;
                                        <b>Threshold : </b>{AddedProposition[3]} 
                                    </p>
                                  </Row>
                                  <br />
                                </div>
                          ))}
                          
                          </div>
                        ):null}

                      <br />  
                      <hr class="bg-secondary"/>
                      <br />
                    </div>
                  </Container>) : null}
                  </div>

              ) : null}

          <hr class="bg-secondary"/>
        </div>
      );
    }
  }
  
export default ListManagerEventsComponent;