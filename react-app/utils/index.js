const isSpecified = string => !string.includes("not specified");

const createStringFromObject = (city) => {
  let toString = [];
  for (let prop in city ) {
    if (prop !== "id" && prop !=="woeid" && isSpecified(city[prop])) {
      toString.push(city[prop]);
    }
  }
  return toString.join(', ');
}


export { isSpecified, createStringFromObject};
