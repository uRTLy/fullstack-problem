import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ListGroup,
  ListGroupItem } from "react-bootstrap";

import shortid from "shortid";

class EditCityForm extends Component {
  constructor () {
    super();
    this.state = {};

  }
  validate (string) {
    return string.length > 0;
  }
  componentWillMount () {
    const { editedCity } = this.props;
    this.setState({ ...editedCity });
    console.log(this.state);
  }
  renderEditForms () {
    const { editedCity } = this.props
    let editForms = [];
    for (let prop in editedCity) {
      if (prop === "id" || prop === "woeid" || prop === "zip") { continue; }

    let form = (
      <FormGroup
        key={shortid.generate()}
        validationState={(this.validate(this.state[prop])) ? "success" : "warning"}
        >
        <ControlLabel>
          {`Enter ${prop}`}
        </ControlLabel>
        <FormControl

          type="text"
          id="zipID"
          value={this.state[prop]}
          onChange={e => this.setState({ [[prop]]: e.target.value })}
          placeholder={(prop.includes("not specified")) ? `Enter ${prop}` : ""}
        />
      </FormGroup>
    );
      editForms.push(form);
    }

    return editForms;
  }

  render () {
    return (
      <form >
        <h3> Edit your place details.
        <small>
          Changing the entire city won't have any
          effect on the weather results.
        </small>
        </h3>

        {this.renderEditForms()}

        <Button
          bsSize="lg"
          onClick={() => this.props.onSaveCity(this.state)}
          bsStyle="success">
          Save city
        </Button>
        <Button
          onClick={() => this.props.cancel()}
          bsStyle="danger">
          Cancel
        </Button>


      </form>
    );
  }
}


export default EditCityForm;
