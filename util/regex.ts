export const encodeName: Regex = name => {
  return name.replace(/ /g, '_').concat('_' + Date.now());
};

export const decodeName: Regex = name => {
  return name.replace(/[\_][0-9]+$/, '').replace(/\_/g, ' ');
};
