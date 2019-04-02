let instance = null;

const toFeathersData = (data) => {
  const checkRulesHaveArrayNext = rules => {
    const firstKey = Object.keys(rules)[0];
    return checkKeyHasArrayNext(firstKey);
  };

  const checkKeyHasArrayNext = key => key.startsWith("$") && !key.startsWith("$other");

  const checkRulesHavePureValueNext = rules => rules.hasOwnProperty(".validate") && Object.keys(rules).length <= 1;

  const getArray = (rules, data, prevName) => {
    const firstKey = Object.keys(rules)[0];
    const nextRules = rules[firstKey];
    if (checkKeyHasArrayNext(prevName) || !checkRulesHaveArrayNext(nextRules)) {
      return Object.entries(data).map(([k, v]) => ({
        id: k,
        ...getObj(v, rules[firstKey], firstKey)
      }));
    }
    return Object.entries(data).map(([k, v]) => ({
      id: k,
      [prevName]: getObj(v, nextRules, firstKey)
    }));
  };

  const getObj = (data, rules = instance.rules, prevName) => {
    if (checkRulesHaveArrayNext(rules)) {
      return getArray(rules, data, prevName);
    }
    if (checkRulesHavePureValueNext(rules)) {
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

  return getObj(data)
};

const toFirebaseData = () => {};

module.exports = {
  init: rules => {
    if (!instance) {
      instance = { rules };
    }
  },
  toFeathersData,
  toFirebaseData,
};
