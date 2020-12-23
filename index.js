const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

exports.nodelist = async(req, res) => {
  if (req.method != 'GET') {
    // console.log(`${req.method} requests are not allowed.`);
    return res.status(403).send(`Method ${req.method} is not allowed.`);
  }

  console.log('Retrieving list of nodes');
  const snapshot = await db.collection(`netprobe`)
    .limit(10)
    .get();

  let data = [];
  snapshot.forEach(doc => {
    data.push(doc.data());
  });

  return res.status(200).send(data);
};
