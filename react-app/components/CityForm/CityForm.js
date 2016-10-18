import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ListGroup,
  ListGroupItem } from "react-bootstrap";

class AddCityForm extends Component {
  constructor () {
    super();
    this.state = {
      name: "",
      zip: ""
    };
  }
  validateZip () {
    const { zip } = this.state;

    return (!!zip.length && !isNaN(parseInt(zip, 10)));
  }
  validateName () {
    return this.state.name.length > 0;
  }
  disableButton () {
    const isZipInvalid = !this.validateZip();
    const isNameInvalid = !this.validateName();
    return (isNameInvalid && isZipInvalid);
  }
  renderCityForm () {
    const { name, zip } = this.state;
    const { city } = this.props;

    return (
      <form >
        <FormGroup
          validationState={(name.length) ? "success" : "warning"}
          >

          <ControlLabel>
            {(city) ? "Edit city name" : "Enter new city name"}
          </ControlLabel>

          <FormControl
            type="text"
            id="nameID"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder={(this.props.city) ? city.name : "Enter city name"}
          />
        </FormGroup>
        <FormGroup
          validationState={(this.validateZip()) ? "success" : "warning"}
          >

          <ControlLabel>
            {(city) ? "Edit city zip code" : "Enter new city zip code"}
          </ControlLabel>
          <FormControl
            type="text"
            id="zipID"
            value={this.state.zip}
            onChange={e => this.setState({ zip: e.target.value })}
            placeholder={(this.props.city) ? city.zip : "Enter zip code"}
          />
        </FormGroup>
        <Button
          onClick={() => this.props.onConfirm(this.state)}
          disabled={this.disableButton()}
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
    const { zip, name } = this.state;
    const zipOrName = (zip.length) ? "zipcodes" : "names";
    return (
      <div>
        <h2>
          There are many similar {zipOrName} to {zip || name}, please pick more precisely.
        </h2>
        <ListGroup>
          {this.props.similarCities.map(this.renderListItem)}
        </ListGroup>
      </div>
    );
  }
  renderListItem (city, i) {
    return ( <ListGroupItem
                 onPress={() => this.props.onChooseCity(city)}
                  key={i}>
            <p>{city.country},
             {city.region},
              {city.district},
              {city.city || null}</p>
            </ListGroupItem>);
    }
  render () {
    return (
        <div>

        {!this.props.similarCities.length && this.renderCityForm()}
        {this.props.similarCities.length && this.renderChooseCity()}

        </div>
    );
  }
}


export default AddCityForm;
