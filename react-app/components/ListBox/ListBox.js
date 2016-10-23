import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  getAllCitiesFromDB,
  addCity,
  deleteCity,
  editCity,
  checkSimilarCities } from "../../actions/citiesActions";
import { fetchWeather } from "../../actions/weatherActions";

import {
  Button,
  ListGroup,
  ListGroupItem,
  Col,
  Glyphicon,
  Modal } from "react-bootstrap";

import DisplayResults from "../DisplayResults/DisplayResults";
import AddCityForm from "../AddCityForm/AddCityForm";
import EditCityForm from "../EditCityForm/EditCityForm";
import Notification from "../Notification/Notification";

import { createStringFromObject } from "../../utils";

const Body = Modal.Body;

const remove = (item, array) => array.filter(arrItem => arrItem !== item);

class ListBox extends Component {
  constructor () {
    super();
    this.state = {
      selected: [],
      editedCity: "",
      showAddCityForm: false,
      showEditCityForm: false
    };
    this.cancelModal = this.cancelModal.bind(this);
    this.cancelEditForm = this.cancelEditForm.bind(this);
    this.onSaveCity = this.onSaveCity.bind(this);

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
  onSaveCity (city) {
    this.props.editCity(city);
    this.cancelEditForm();
  }
  onRemoveCity (event, woeid) {
    event.stopPropagation();
    this.props.removeCity(woeid);
  }
  showEditCityForm (event, city) {
    event.stopPropagation();
    this.setState({ showEditCityForm: true, editedCity: city });
  }
  cancelEditForm () {
    this.setState({ showEditCityForm: false, editedCity: null });
  }
  cancelModal () {
    this.setState({ showAddCityForm: false });
  }
  onFetchWeather () {
    const arrayOfWOEIDs = this.state.selected.map(city => city.woeid);
    this.props.getWeather(arrayOfWOEIDs);
    this.setState({ selected: [] });
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
          onClick={event => this.onRemoveCity(event, city.woeid)}
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
    const { selected, editedCity, showAddCityForm, showEditCityForm } = this.state;
    const { weatherForecasts, notification } = this.props;
    return (
      <div>
        {this.props.failureNotification
         && <Notification error={notification}/>}
          <Col md={12} xs={12}>
            <ListGroup>
              {!!this.props.cities.length && this.props.cities.map((city, i) => {
                return (editedCity === city) ? this.renderEditCity(city, i) : this.renderCity(city, i);
              })}
            </ListGroup>

            <Button
              disabled={!selected.length}
              bsSize="large"
              bsStyle="success"
              ref="getWeatherBtn"
              block
              onClick={() => this.onFetchWeather()}>
              Get the weather.
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


          <Col xs={12}>
            {weatherForecasts && weatherForecasts.map((forecast, i)=> {
              return <DisplayResults key={i} weather={forecast}/>;
            })}
          </Col>
        </Col>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { cities } = state;
  const { weather } = state;
  return { ...cities, ...weather };
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onAppInit: () => getAllCitiesFromDB(),
    addCity: city => addCity(city),
    removeCity: woeid => deleteCity(woeid),
    editCity: (city) => editCity(city),
    checkSimilarCities: city => checkSimilarCities(city),
    getWeather: placeOrPlaces => fetchWeather(placeOrPlaces)
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListBox);
