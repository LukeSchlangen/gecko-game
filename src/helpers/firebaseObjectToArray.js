// converts a firebase snapshot (object of objects)
// to an array of objects
const firebaseObjectToArray = (snapshot) => {
  const snapshotValue = snapshot.val();
  const arrayOfObjects = Object.keys(snapshotValue).map(key => ({ ...snapshotValue[key], id: key }));
  return arrayOfObjects;
};

export default firebaseObjectToArray;

