import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ListGroup,
  ListGroupItem } from "react-bootstrap";

import { createStringFromObject } from "../../utils";

class AddCityForm extends Component {
  constructor () {
    super();
    this.state = {
      nameOrZip: ""
    };
  }
  validate () {
    return this.state.nameOrZip.length > 0;
  }
  cityPicked (city ) {
    this.props.addCity({ city });
    this.props.cancel()
  }
  renderCityForm () {
    const { nameOrZip } = this.state;
    const { city } = this.props;

    return (
      <form >
        <FormGroup
          validationState={(this.validate()) ? "success" : "warning"}
          >
          <h2> Add new city </h2>
          <ControlLabel>
            Enter name or zip
          </ControlLabel>
          <FormControl
            type="text"
            id="zipID"
            value={this.state.nameOrZip}
            onChange={e => this.setState({ nameOrZip: e.target.value })}
            placeholder={(this.props.city) ? city.zip : "Enter zip code"}
          />
        </FormGroup>
        <Button
          onClick={() => this.props.checkSimilarCities(nameOrZip)}
          disabled={!this.validate()}
          bsStyle="success">
          Confirm
        </Button>
        <Button
          onClick={() => this.props.cancel()}
          bsStyle="danger">
          Cancel
        </Button>
      </form>
    );
  }
  renderChooseCity () {

    const zipOrName = (zip.length) ? "zipcodes" : "names";
    return (
      <div>
        <h3>
          You've searched for {zipOrName}. There are many similar results , please pick the most precise one.
        </h3>
        <ListGroup>
          {this.props.similarCities.map((city, i) =>
            this.renderListItem(city, i))}
        </ListGroup>
      </div>
    );
  }
  renderListItem (city) {
    return ( <ListGroupItem
                 onClick={() => this.cityPicked(city)}
                  key={i}>
            <p>{createStringFromObject(city)}</p>
            </ListGroupItem>);
    }
  render () {
    return (
        <div>

        {!this.props.similarCities.length && this.renderCityForm() || null}
        {this.props.similarCities.length && this.renderChooseCity() || null}

        </div>
    );
  }
}

export default AddCityForm;
