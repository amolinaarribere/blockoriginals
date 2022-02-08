import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/OwnerFunctions.js");

class ListOwnersComponent extends React.Component{
    render(){
      var Owners = func.Owners;
      var MinOwners = func.MinOwners;

      return(
          <div class="border border-0">
            <h3>Owners</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              {Owners.map(Owner => (
                        <Row class="border-0" key={Owner}>{Owner}</Row>
                        ))} 
                <br />
                 <Row>
                  <Col><b>Min Owners :</b></Col>
                  <Col>{MinOwners}</Col>
                </Row>
            </Container>
        </div>
      );
       
    }
    
  }

export default ListOwnersComponent;