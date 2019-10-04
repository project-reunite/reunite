import apiRequests from './apiRequests';
import featureList from './feature-list';

const getPersonsInNameOrder = async () => {
  const persons = await apiRequests.getPersonsWithNFeatures();
  return persons.sort((person1, person2) => (person1.name > person2.name ? 1 : -1));
};

const generateDataForFaceChart = name => [...name].map(char => (
  { A: (Number(char)) }));

const generateDataForFacePredictionChart = prediction => prediction.map((x, index) => (
  { feature: featureList[index], data: x }));

export {
  getPersonsInNameOrder,
  generateDataForFaceChart,
  generateDataForFacePredictionChart,
};
