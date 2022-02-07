import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/PropositionFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");
const SignatureFunc = require("../../../functions/SignatureFunctions.js");

class SignVoteComponent extends React.Component{

  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

    state = {
        nonceToCheck: "",
        nonceValid: "",
        nonceChecked: "",

        nonce: "",
        date: "",
        time: "",
  
        voter_2 : "",
        propId_2: "",
        vote_2: false,
        nonce_2: "",
        date_2: "",
        time_2: "",
        signature_2: "",
        
        signatureDisplayed : false,
        displayVoter: "",
        displayPropID: "",
        displayVote: "",
        displayNonce: "",
        displayDeadline: "",
        displaySignature: ""
      };

    async refresh(){
      await this.props.refresh();
    }
  
    resetState() {
      this.setState({ date: "", time: "", nonceToCheck: "", nonce: "",
      voter_2: "",  propId_2: "", vote_2: false, signature_2: "",  date_2: "", time_2: "", nonce_2: ""})
    }

    handleSubmitSignature = async (event) => {
        event.preventDefault();
        let deadline = Math.ceil(new Date(this.state.date_2 + " " + this.state.time_2) / 1000);
      await func.VotePropositionOnBehalfOf(this.state.voter_2, 
          this.state.propId_2, 
          (this.state.vote_2 == "true"),
          this.state.nonce_2,
          deadline,
          this.state.signature_2,
          this.props.contract);
      this.resetState()
      await this.refresh();
    };

    async SignVote(vote){
      try{
        let from = Aux.account;
        let Deadline = Math.ceil(new Date(this.state.date + " " + this.state.time) / 1000);
        let Nonce = this.state.nonce;
        await func.RetrievePropositionID(this.props.contract)
 
        let config = await SignatureFunc.retrieveContractConfig(this.props.contract);
        let Domain = await SignatureFunc.Domain(config[0], this.props.contract._address, config[1]);
        let Message = SignatureFunc.VoteOnBehalfOfMessage(from, func.CurrentPropositionID, vote, Nonce, Deadline)

        let params = [from, SignatureFunc.VoteMsgParams(Domain, Message)];
        let method = SignatureFunc.method;
        let signature = await Aux.web3.currentProvider.send({method,params,from}, 
          (err, result) => {
            if (err) window.alert("error " + err)
            else if (result.error)  window.alert("result error " + result.error)
            else return result.result
          });

        if(signature != null && signature != "undefined"){
          this.state.displayVoter = Aux.account;
          this.state.displayPropID = func.CurrentPropositionID;
          this.state.displayVote = vote;
          this.state.displayNonce = this.state.nonce;
          this.state.displayDeadline = (new Date(this.state.date + " " + this.state.time)).toString();
          this.state.displaySignature = signature;
          this.state.signatureDisplayed = true
        }
        
      }
      catch(e){
        window.alert("error : " + e)
      }
      
      this.resetState()
    }
  
    handleSignVoteFor = async (event) => {
      event.preventDefault();
      await this.SignVote(true);
    }

    handleSignVoteAgainst = async (event) => {
      event.preventDefault();
      await this.SignVote(false);
    }
    
    checkNonce = async (event) => {
      event.preventDefault();
      let result = await SignatureFunc.retrieveNonce(this.props.contract, Aux.account, this.state.nonceToCheck);
      this.setState({nonceValid: result, nonceChecked: this.state.nonceToCheck});
    }

    ExportFile = (event) => {
      event.preventDefault();
      const element = document.createElement("a");
      const content = "Voter : " + this.state.displayVoter + "\r\n" +
              "Proposition ID : " + this.state.displayPropID + "\r\n" +
              "Vote : " + this.state.displayVote + "\r\n" +
              "Nonce : " + this.state.displayNonce + "\r\n" +
              "Deadline : " + this.state.displayDeadline + "\r\n" +
              "Signature : " + this.state.displaySignature;

      const file = new Blob([content], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "Signature_" + this.props.contract._address + ".txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }

    captureFile = (event) => {
      event.stopPropagation();
      event.preventDefault();
      const file = event.target.files[0];
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => this.convertToBuffer(reader);
    };

    convertToBuffer = async (reader) => {
      const buffer = await Buffer.from(reader.result);
      let content = buffer.toString().split("\r\n")

      let d = new Date(content[4].split("Deadline : ")[1]);

      let day = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      let hour = d.getHours();
      let minutes = d.getMinutes();

      let ExtractedDate = year + "-" + ((10 > month) ? "0" : "") + month + "-" + ((10 > day) ? "0" : "") + day;
      let ExtractedTime = ((10 > hour) ? "0" : "") + hour + ":" + ((10 > minutes) ? "0" : "") + minutes;

      this.setState({ voter_2: content[0].split(":")[1].trim(), 
        propId_2: content[1].split(":")[1].trim(),  
        vote_2: content[2].split(":")[1].trim(),
        nonce_2: content[3].split(":")[1].trim(), 
        date_2: ExtractedDate, 
        time_2: ExtractedTime, 
        signature_2: content[5].split(":")[1].trim()})
    };
  
    render(){
        return (
          <div>
            <Form onSubmit={this.checkNonce} style={{margin: '50px 0px 50px 0px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="integer" name="Nonce" placeholder="nonce" 
                    value={this.state.nonceToCheck}
                    onChange={event => this.setState({ nonceToCheck: event.target.value })}/>
              </Form.Group>
                 <button type="submit" class="btn btn-secondary">Check Nonce</button> &nbsp;&nbsp;
            </Form>

            {("" != this.state.nonceChecked)?(
              <div>
                <b>Nonce <i>{this.state.nonceChecked}</i> {(false == this.state.nonceValid)? "is valid" : "is NOT valid !!!!"} </b>
              </div>
            )
            :null}

            <Form onSubmit={this.handleSignVoteFor} style={{margin: '50px 0px 50px 0px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="integer" name="Nonce" placeholder="nonce" 
                    value={this.state.nonce}
                    onChange={event => this.setState({ nonce: event.target.value })}/>
                <Row>
                  <Col>
                    <Form.Control type="date" name="date" placeholder="date" 
                      value={this.state.date}
                      onChange={event => this.setState({ date: event.target.value })}/>
                  </Col>
                  <Col>
                    <Form.Control type="time" name="time" placeholder="time"
                      value={this.state.time}
                      onChange={event => this.setState({ time: event.target.value })}/>
                  </Col>
                </Row>
              </Form.Group>
                 <button type="submit" class="btn btn-success">Sign Validation</button> &nbsp;&nbsp;
                 <button type="button" onClick={this.handleSignVoteAgainst} class="btn btn-danger">Sign Rejection</button> 
            </Form>

            {(this.state.signatureDisplayed)? 
              <Container style={{margin: '10px 50px 50px 50px' }}>
                <Row>
                  <Col><b>Voter :</b></Col> 
                  <Col>{this.state.displayVoter}</Col>
                </Row>
                <Row>
                  <Col><b>Proposition ID :</b></Col> 
                  <Col>{this.state.displayPropID}</Col>
                </Row>
                <Row>
                  <Col><b>Vote :</b></Col> 
                  <Col>{this.state.displayVote.toString()}</Col>
                </Row>
                <Row>
                  <Col><b>Nonce :</b></Col> 
                  <Col>{this.state.displayNonce}</Col>
                </Row>
                <Row>
                  <Col><b>Deadline :</b></Col> 
                  <Col>{this.state.displayDeadline}</Col>
                </Row>
                <Row>
                  <Col><b>Signature :</b></Col> 
                  <Col>{this.state.displaySignature}</Col>
                </Row>
                <Form onSubmit={this.ExportFile} style={{margin: '50px 0px 50px 0px' }}>
                    <button type="submit" class="btn btn-secondary">Extract File</button> &nbsp;&nbsp;
                </Form>
              </Container>
            : null}
            

            <Form onSubmit={this.handleSubmitSignature}  style={{margin: '50px 0px 50px 0px' }}>
              <Form.Control type="file" onChange={this.captureFile} />
              <Form.Group className="mb-3">
                <Form.Control type="text" name="voter_2" placeholder="Voter" 
                      value={this.state.voter_2}
                      onChange={event => this.setState({ voter_2: event.target.value })}/>
                <Form.Control type="integer" name="PropID_2" placeholder="Proposition ID" 
                      value={this.state.propId_2}
                    onChange={event => this.setState({ propId_2: event.target.value })}/>
                <Form.Control type="integer" name="nonce_2" placeholder="nonce" 
                    value={this.state.nonce_2}
                    onChange={event => this.setState({ nonce_2: event.target.value })}/>
                <Form.Control as="select" name="vote_2" placeholder="vote"
                  value={this.state.vote_2}
                  onChange={event => this.setState({ vote_2: event.target.value })}>
                    <option value="true">Validate</option>
                    <option value="false">Reject</option>
                </Form.Control>
                <Row>
                  <Col>
                      <Form.Control type="date"  name="date_2" placeholder="date" 
                          value={this.state.date_2}
                          onChange={event => this.setState({ date_2: event.target.value })}/>
                  </Col>
                  <Col>
                      <Form.Control type="time" name="time_2" placeholder="time"
                          value={this.state.time_2}
                          onChange={event => this.setState({ time_2: event.target.value })}/>
                  </Col>  
                </Row>
                <Form.Control type="text" name="Signature_2" placeholder="signature" 
                    value={this.state.signature_2}
                    onChange={event => this.setState({ signature_2: event.target.value })}/>
              </Form.Group>
            
              <button type="submit" class="btn btn-primary" >Submit Signature</button> &nbsp;&nbsp;
            </Form>

          </div>
        );
    }
  }

  export default SignVoteComponent;