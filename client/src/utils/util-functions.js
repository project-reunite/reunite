import ages from './ages';

function getAgeQueryString(age) {
  if (age === ages.BABY) return 'minAge=0&maxAge=4';
  if (age === ages.CHILD) return 'minAge=5&maxAge=18';
  if (age === ages.ADULT) return 'minAge=19&maxAge=60';
  if (age === ages.ELDERLY) return 'minAge=61&maxAge=100';
  return '';
}

export default {
  getAgeQueryString,
};
