let instance = null;

const toFeathersData = data => Object.keys(data).map(prop => getFeathersObject(data, prop));

const getFeathersObject = (data, prop) => {
  const { rules } = instance;
  console.log(prop, rules.hasOwnProperty(prop));
  if (rules.hasOwnProperty(prop)) {
    const key = Object.keys(rules[prop])[0];
    console.log(key);
    console.log(key.startsWith("$") && !key.startsWith("$other"));
    if (key.startsWith("$") && !key.startsWith("$other")) {
      return getFeahtersArray(rules[prop], data[prop], key);
    }
  }
  return rules;
};

let i = 0;

const getFeahtersArray = (data, rules = instance.rules) => {
  console.log(i++, rules);
  let a = Object.entries(data).map(([id, value]) => {
    console.log(id);
    if (rules.hasOwnProperty(id)) {
      Object.keys(rules[id]).forEach(key => {
        if (key.startsWith("$") && !key.startsWith("$other")) {
          return {
            id,
            ...getFeahtersArray(data[key], rules[id])
          };
        }
      });
      return {
        ...id,
        value
      };
    }
  });
  // console.log(a)
  return a;
};


const getObj = (data, rules = instance.rules, prevName) => {
  const firstKey = Object.keys(rules)[0];
  if (firstKey.startsWith("$") && !firstKey.startsWith("$other")) {
    return Object.entries(data).map(([k, v]) => ({
      id: k,
      [prevName]: getObj(v, rules[firstKey], k)
    }));
  }
  if (rules.hasOwnProperty(".validate") && Object.keys(rules).length <= 1) {
    return data;
  }
  const obj = {};
  Object.entries(rules).map(([k, v]) => {
    if (data.hasOwnProperty(k)) {
      obj[k] = getObj(data[k], v, k);
    }
  });
  return obj;
};

const toFirebaseData = data => {};

module.exports = {
  init: rules => {
    if (!instance) {
      instance = { rules };
    }
  },
  toFeathersData,
  toFirebaseData,
  getFeathersObject,
  getFeahtersArray,
  // getArray,
  getObj
};
