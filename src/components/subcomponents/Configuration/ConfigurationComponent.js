import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


class ConfigurationComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await this.props.refresh()
  }
    
    render(){
      return (
        <div>
          <div class="border border border-0">
            <h3>{this.props.text}</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
                {this.props.names.map(
                (name, index) => (
                    <Row>
                        <Col><b>{name} : </b></Col> 
                        <Col>{this.props.values[index]}</Col>
                </Row>
                )
                )}                 
            </Container>
          </div>
        </div>
      );
    }
  }
  
export default ConfigurationComponent;