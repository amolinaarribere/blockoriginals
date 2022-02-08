import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const EventsFunc = require("../../../functions/EventsFunctions.js");

class ListPublicEventsComponent extends React.Component {
    state = {
     isPublicEventsShown: false,
     PublicEventBlock : 0,
     listingPublicEvents: false,
     PublicEvents: []
    };

    togglePublicEvents = () => {
      if(this.state.isPublicEventsShown)this.setState({ isPublicEventsShown: false })
      else this.setState({ isPublicEventsShown: true })
    };


    handlePublicEvents = async (event) => {
      event.preventDefault();
      if(!this.state.listingPublicEvents){
        this.setState({ listingPublicEvents: true });
      }
      this.setState({ PublicEvents: EventsFunc.eventlogs[EventsFunc.PublicId] });
    }


    render(){
      return (
        <div>
         <button
            className="btn btn-lg btn-primary center modal-button"
            onClick={this.togglePublicEvents}>Public Events</button>

          {(this.state.isPublicEventsShown) ? (

                  <div class="border border-primary border-5">
                  <Form onSubmit={this.handlePublicEvents} style={{margin: '50px 50px 50px 50px' }}>
                      <button class="btn btn-secondary">{(this.state.listingPublicEvents) ? "Refresh" : "List Events"}</button>
                  </Form>
                
                  <br />

                  {(this.state.listingPublicEvents  && 
                        this.state.PublicEvents != null) ? (
                  <Container style={{margin: '10px 50px 50px 50px' }}>
                    <div>
                      <Row>
                        <Col><h2>New Proposals</h2></Col>
                      </Row>

                      {(this.state.PublicEvents[EventsFunc.NewProposalId] != null) ? (
                        <div>
                          
                          {(this.state.PublicEvents[EventsFunc.NewProposalId]).map(NewProposal => (
                                <div>
                                    <Row>
                                      <p>
                                        <b>Account </b>{NewProposal.Provider} &nbsp;
                                        <b>Info</b> {NewProposal.Info}
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
                        <Col><h2>Add Certificates</h2></Col>
                      </Row>

                      {(this.state.PublicEvents[EventsFunc.AddCertificateId] != null) ? (
                        <div>
      
                          {(this.state.PublicEvents[EventsFunc.AddCertificateId]).map(AddCertificateId => (
                                <div>
                                  <Row>
                                      <p>
                                        <b>Provider </b>{AddCertificateId.Provider} &nbsp;
                                        <b>Holder</b> {AddCertificateId.Holder} &nbsp;
                                        <b>Certificate</b> {AddCertificateId.Certificate}
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
                        <Col><h2>Add Item Rejection</h2></Col>
                      </Row>

                      {(this.state.PublicEvents[EventsFunc.AddItemRejectionId] != null) ? (
                        <div>
      
                          {(this.state.PublicEvents[EventsFunc.AddItemRejectionId]).map(AddItemRejectionId => (
                                <div>
                                  <Row>
                                      <p>
                                        <b>Type </b>{AddItemRejectionId.ItemType} &nbsp;
                                        <b>Item </b> {AddItemRejectionId.Item} &nbsp;
                                        <b>Info </b> {AddItemRejectionId.Info}
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
                        <Col><h2>Add Item Validation</h2></Col>
                      </Row>

                      {(this.state.PublicEvents[EventsFunc.AddItemValidationId] != null) ? (
                        <div>
      
                          {(this.state.PublicEvents[EventsFunc.AddItemValidationId]).map(AddItemValidationId => (
                                <div>
                                  <Row>
                                      <p>
                                        <b>Type </b>{AddItemValidationId.ItemType} &nbsp;
                                        <b>Item </b> {AddItemValidationId.Item} &nbsp;
                                        <b>Info </b> {AddItemValidationId.Info}
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
                        <Col><h2>Remove Item Rejection</h2></Col>
                      </Row>

                      {(this.state.PublicEvents[EventsFunc.RemoveItemRejectionId] != null) ? (
                        <div>
      
                          {(this.state.PublicEvents[EventsFunc.RemoveItemRejectionId]).map(RemoveItemRejectionId => (
                                <div>
                                  <Row>
                                      <p>
                                        <b>Type </b>{RemoveItemRejectionId.ItemType} &nbsp;
                                        <b>Item </b> {RemoveItemRejectionId.Item} &nbsp;
                                        <b>Info </b> {RemoveItemRejectionId.Info}
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
                        <Col><h2>Remove Item Validation</h2></Col>
                      </Row>

                      {(this.state.PublicEvents[EventsFunc.RemoveItemValidationId] != null) ? (
                        <div>
      
                          {(this.state.PublicEvents[EventsFunc.RemoveItemValidationId]).map(RemoveItemValidationId => (
                                <div>
                                  <Row>
                                      <p>
                                        <b>Type </b>{RemoveItemValidationId.ItemType} &nbsp;
                                        <b>Item </b> {RemoveItemValidationId.Item} &nbsp;
                                        <b>Info </b> {RemoveItemValidationId.Info}
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
  
export default ListPublicEventsComponent;