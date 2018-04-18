import indexOf from 'lodash.indexof';
import Sequelize from 'sequelize';

const DEFAULT_LIMIT = 20;

function filterType(key, value, options) {
  const optionKeys = Object.keys(options);

  if (indexOf(optionKeys, key) > -1) {
    const filterObject = {};
    const { type, col } = options;

    if (type === 'integer') {
      filterObject[key] = parseInt(value, 10);
    }

    if (type === 'minDate') {
      filterObject[col] = { $gte: new Date(value) };
    }

    if (type === 'maxDate') {
      filterObject[col] = { $lte: new Date(value) };
    }

    return filterObject;
  }

  return Sequelize.where(Sequelize.fn('lower', Sequelize.col(key)), {
    $like: value.toLowerCase(),
  });
}

export function filters(filtered, options = {}) {
  if (!filtered) return {};

  const filterArray = [];

  decodeURIComponent(filtered)
    .split(',')
    .map(filter => {
      const array = filter.split(':');

      return filterArray.push(
        filterType(array[0], decodeURIComponent(array[1]), options),
      );
    });

  return { $and: filterArray };
}

export function orderBy(sorted, defaultOrder = []) {
  if (!sorted) return [defaultOrder];

  return sorted.split(',').map(sort => sort.split(':'));
}

export function pageCount({ limit }, count) {
  return Math.ceil(count / (limit || DEFAULT_LIMIT));
}
