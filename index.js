const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

exports.nodelist = async(req, res) => {
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET');

  if (req.method != 'GET') {
    // console.log(`${req.method} requests are not allowed.`);
    return res.status(403).send(`Method ${req.method} is not allowed.`);
  }

  console.log('Retrieving list of nodes');
  const snapshot = await db.collection(`netprobe`)
    .listDocuments();

  let data = [];
  snapshot.forEach(doc => {
    data.push(doc.id);
  });

  return res.status(200).send(data);
};
