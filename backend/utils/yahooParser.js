const yahooPropertiesTranslator = {
  "country": "country",
  "admin1" : "region",
  "admin2" : "district",
  "admin3" : "county",
  "locality1": "city"
};

const mapResponseToReadableObject = places => {
  const placesTransformed = places.map(place => {

    const placeWithoutNulls = denullify(place);
    const transformed =  transformToFriendlyJSONResponse(placeWithoutNulls);

    return transformed;
  });

return placesTransformed;
};

const denullify = object => {
  let withoutNulls = {};
  for (let property in object) {
    if (!!object[property]) {
      withoutNulls[property] = object[property];
    }
  }
  return withoutNulls;
};

const transformToFriendlyJSONResponse = object => {
  const transformed = {};
  const ypt = yahooPropertiesTranslator;

  for (let property in object) {
    let propertyName = ypt[property];
    if (!!propertyName) {
      transformed[propertyName] = object[property].content;
      transformed["woeid"] = object[property].woeid;
    }
  }
  return transformed;
};


const weatherResponseParser = data => {
  return JSON.parse(data).query.results.channel;
};

module.exports = {
  transformToFriendlyJSONResponse,
  denullify,
  mapResponseToReadableObject,
  weatherResponseParser
};
