import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const EventsFunc = require("../../../functions/EventsFunctions.js");

class ListBaseEventsComponentTemplate extends React.Component {
    state = {
     isEventsShown: false,
     EventBlock : 0,
     listingEvents: false,
     Events: [],
     EventsName: []
    };

    toggleEvents = () => {
      if(this.state.isEventsShown)this.setState({ isEventsShown: false })
      else this.setState({ isEventsShown: true })
    };

    handleEvents = async (event) => {
      event.preventDefault();
      if(!this.state.listingEvents)this.setState({ listingEvents: true });
      this.setState({ Events: EventsFunc.eventlogs[this.props.ContractId], EventsName: EventsFunc.eventNames[this.props.ContractId]});
    }

    render(){
      return (
        <div>
         <button
            className="btn btn-lg btn-primary center modal-button"
            onClick={this.toggleEvents}>{this.props.SCName} Events</button>

          {(this.state.isEventsShown) ? (

                  <div class="border border-primary border-5">
                  <Form onSubmit={this.handleEvents} style={{margin: '50px 50px 50px 50px' }}>
                      <button class="btn btn-secondary">{(this.state.listingEvents) ? "Refresh" : "List Events"}</button>
                  </Form>
                
                  <br />

                  {(this.state.listingEvents  && 
                        this.state.Events != null) ? (
                  <Container style={{margin: '10px 50px 50px 50px' }}>

                    {this.state.EventsName.map( 
                      (eventname, index) => (
                                  <div>
                                        <Row>
                                          <Col><h2>{eventname}</h2></Col>
                                        </Row>
                                        {(this.state.Events[index] != null) ? (
                                            <div>
                                                {(this.state.Events[index]).map(
                                                   EventLog => (
                                                    <div>
                                                      {(EventLog != null) ? (
                                                              <div>
                                                                <b>Block Number : </b>{EventLog.blockNumber} <b>Transaction Number : </b>{EventLog.transactionIndex}
                                                                {(Object.keys(EventLog.returnValues).map(
                                                                   (key, i) => (
                                                                     (i >= Object.keys(EventLog.returnValues).length / 2) ? (
                                                                            <div>
                                                                              <b>{key} </b>{EventLog.returnValues[key]} &nbsp;
                                                                            </div>)
                                                                            : null
                                                                )))}
                                                                <br />
                                                              </div>
                                                      ):null}     
                                                    </div>
                                                ))}
                                            </div>
                                        ):null}

                                        <br />  
                                        <hr class="bg-secondary"/>
                                        <br />
                                  </div>
                                )
                            )}

                  </Container>) : null}
                  </div>

              ) : null}

          <hr class="bg-secondary"/>
        </div>
      );
    }
  }
  
export default ListBaseEventsComponentTemplate;