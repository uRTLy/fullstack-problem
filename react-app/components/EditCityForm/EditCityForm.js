import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ListGroup,
  ListGroupItem } from "react-bootstrap";

import { isSpecified } from "../../utils";

class EditCityForm extends Component {
  constructor () {
    super();
    this.state = {};
    this.propsToOmit = ["id", "woeid", "zip"];
  }
  validate (string) {
    return string.length > 0;
  }
  componentWillMount () {
    const { editedCity } = this.props;
    this.setState({ ...editedCity });

  }
  renderEditForms () {
      const { editedCity } = this.props
      const editForms = Object.keys(editedCity)
        .filter(prop => !this.propsToOmit.includes(prop))
        .map((prop, i) => {
          if (!isSpecified(editedCity[prop])) { return; }
          return (
          <FormGroup
            key={i}
            validationState={(this.validate(this.state[prop])) ? "success" : "warning"}
            >
            <ControlLabel>
              {`Enter ${prop}`}
            </ControlLabel>
            <FormControl
              type="text"
              value={this.state[prop]}
              onChange={event => this.setState({ [prop]: event.target.value })}
              placeholder={`Enter ${prop}`}
            />
          </FormGroup>);
        });

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
