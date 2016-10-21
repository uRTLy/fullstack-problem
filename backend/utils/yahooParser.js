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
    const transformed =  transform(placeWithoutNulls);

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

const transform = object => {
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
  const parsedData = JSON.parse(data);
  return parsedData.query.results.channel;
};

module.exports = {
  transform,
  denullify,
  mapResponseToReadableObject,
  weatherResponseParser
};
