import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  getAllCitiesFromDB,
  addCity,
  deleteCity,
  editCity,
  saveCitiesToDB,
  checkSimilarCities } from "../../actions/citiesActions";

import {
  Button,
  ListGroup,
  ListGroupItem,
  Col,
  Glyphicon,
  Fade,
  Modal,
  OverlayTrigger,
  Tooltip } from "react-bootstrap";

import shortid from "shortid";

import DisplayResults from "../DisplayResults/DisplayResults";
import CityForm from "../CityForm/CityForm";

const Header = Modal.Header;
const Body = Modal.Body;

const tooltip = (
  <Tooltip id="infoTooltip">
  You have to select atleast one city before proceding further
  </Tooltip>
);


class ListBox extends Component {
  constructor () {
    super();
    this.state = {
      selected: [],
      editedCity: ""
    };
    this.cancelModal = this.cancelModal.bind(this);
    this.cancelEditForm = this.cancelEditForm.bind(this);
  }
  componentWillMount () {
    this.props.onAppInit();
  }
  selectOrUnselect (city) {
    let { selected } = this.state;
    const isSelected = (selected.includes(city));
    selected = (isSelected) ? selected.filter(citySEL => citySEL !== city) : [...selected, city];

    this.setState({ selected });
  }
  cancelModal () {
    this.setState({ showAddCityForm: false });
  }
  onEditCity (city, oldIndex) {
    this.props.editCity(city, oldIndex);
    this.setState({ showEditCityForm: false, editedCity: null });
  }
  showEditCityForm (event, city) {
    event.stopPropagation();
    const { showEditCityForm } = this.state;

  }
  cancelEditForm () {

  }
  renderCity (city, i) {
    const { selected, editedCity } = this.state;
    return (
      <ListGroupItem
        onClick={() => this.selectOrUnselect(city)}
        key={i}
        active={(selected.includes(city))}>
        {city.name} {city.zip}

        <Glyphicon
          onClick={() => this.props.removeCity(city)}
          glyph="trash"
          className="icon"
          />

        <Glyphicon
          glyph="edit"
          onClick={(e) => this.showEditCityForm(e, city)}
          className={(editedCity === city) ? "icon activeIcon" : "icon"}
          />
      </ListGroupItem>
    );
  }
  renderEditCity (city, i) {
    return (
      <CityForm
        key={i}
        index={i}
        city={city}
        onConfirm={this.onEditCity}
        cancel={this.cancelEditForm}
        />
    );
  }
  render () {
    const { selected, isLoading, editedCity, showAddCityForm, showEditCityForm } = this.state;
    console.log(editedCity);
    return (
      <div>
          <Col md={12} xs={12}>
            <ListGroup>
              {this.props.cities.map((city, i) => {
                return (editedCity === city) ? this.renderEditCity(city, i) : this.renderCity(city, i);
              })}
            </ListGroup>

            <Button
              disabled={!selected.length || isLoading}
              bsSize="large"
              bsStyle="success"
              ref="getWeatherBtn"
              block
              onClick={() => console.log(this.props)}>
              {(isLoading) ? "Loading..." : "Get The Weather"}
            </Button>

          <Button
            onClick={() => this.setState({ showAddCityForm: !showAddCityForm })}
            bsStyle="info">
            Add new city
          </Button>

          <Modal show={showAddCityForm}>
            <Body>
              <CityForm
                onConfirm={this.props.checkSimilarCities}
                onChooseCity={this.props.addCity}
                cancel={this.cancelModal}
                similarCities={this.props.similarCities}
                />
            </Body>
          </Modal>
        </Col>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { similarCities, fetchFromDbError, saveToDbError, cities } = state.cities;
  return {
    cities: cities,
    similarCities: similarCities,
    fetchFromDbError: fetchFromDbError,
    saveToDbError: saveToDbError
  };
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onAppInit: () => getAllCitiesFromDB(),
    addCity: city => addCity(city),
    removeCity: city => deleteCity(city),
    editCity: (city, oldIndex) => editCity(city, oldIndex),
    updateDB: () => saveCitiesToDB(),
    checkSimilarCities: city => checkSimilarCities(city)
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListBox);
