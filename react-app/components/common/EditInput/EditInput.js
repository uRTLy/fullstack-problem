import React, { Component } from "react";

import shortid from "shortid";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

export default class EditInput extends Component {
  constructor () {
    super();
    this.state = {
      value: ""
    };
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ value: nextProps.value });
  }
  render () {
    const { cityProperty } = this.props;
    return (
      <FormGroup
        validationState={(this.props.validate(this.props.value)) ? "success" : "warning"}
        >
        <ControlLabel>
          {`Enter ${cityProperty}`}
        </ControlLabel>
        <FormControl
          key={this.props.keyV}
          type="text"
          value={this.props.value}
          onChange={e => this.props.edit(e.target.value, cityProperty)}
          placeholder={(cityProperty.includes("not specified")) ? `Enter ${cityProperty}` : ""}
        />
      </FormGroup>
    );
  }
}
