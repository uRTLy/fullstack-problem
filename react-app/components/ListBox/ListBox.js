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

import DisplayResults from "../DisplayResults/DisplayResults";
import AddCityForm from "../AddCityForm/AddCityForm";
import EditCityForm from "../EditCityForm/EditCityForm";

import { createStringFromObject } from "../../utils";


const Header = Modal.Header;
const Body = Modal.Body;

const remove = (item, array) => array.filter(arrItem => arrItem !== item);

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
      editedCity: "",
      showAddCityForm: false
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
    selected = (isSelected) ? remove(city, selected) : [...selected, city];

    this.setState({ selected });
  }
  cancelModal () {
    this.setState({ showAddCityForm: false });
  }
  onSaveCity (city, oldIndex) {
    this.props.editCity(city, oldIndex);
    this.cancelEditForm();
  }
  showEditCityForm (event, city) {
    event.stopPropagation();
    this.setState({ showEditCityForm: true, editedCity: city });

  }
  cancelEditForm () {
    this.setState({ showEditCityForm: false, editedCity: null });
  }
  renderCity (city, i) {
    const { selected, editedCity } = this.state;
    return (
      <ListGroupItem
        onClick={() => this.selectOrUnselect(city)}
        key={i}
        active={(selected.includes(city))}>

        <p className="list-city">{createStringFromObject(city)}</p>

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
      <EditCityForm
        key={i}
        editedCity={city}
        onSaveCity={this.onSaveCity}
        cancel={this.cancelEditForm}
        />
    );
  }
  render () {
    const { selected, isLoading, editedCity, showAddCityForm, showEditCityForm } = this.state;
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
              <AddCityForm
                cancel={this.cancelModal}
                similarCities={this.props.similarCities}
                checkSimilarCities={this.props.checkSimilarCities}
                addCity={this.props.addCity}
                />
            </Body>
          </Modal>
        </Col>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const cities = state.cities;
  return { ...cities };
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onAppInit: () => getAllCitiesFromDB(),
    addCity: city => addCity(city),
    removeCity: id => deleteCity(id),
    editCity: (city, oldIndex) => editCity(city, oldIndex),
    updateDB: () => saveCitiesToDB(),
    checkSimilarCities: city => checkSimilarCities(city)
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListBox);
