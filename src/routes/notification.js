const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../few-tn-firebase-adminsdk-cdl0t-01a6a0cb00.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firebase-adminsdk-cdl0t@few-tn.iam.gserviceaccount.com"
});

const firebaseToken ='eO6_3LFL71D3Dc3Lb2aXEy:APA91bHiApGQHO70deLgO3tWoe0Ta1jtujFLgtiaXoXOUlpDexxANQW2ToqiW3Hg_Un2fp3GRMz8jTNZ2A5fEp_C2Ljk9EZOu03RMwUbbTsEpmGZBVgBWubzAbk2xW6kb71FDz6UCS5z'

const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24, // 1 day
};


router.post("/", (req,res)=>{
  const payload = {
    notification: {
      title: req.body.title,
      body: req.body.body,
    }
  };

  admin.messaging().sendToDevice(firebaseToken, payload , options)
    .then((response)=>{
      console.log('Send Message success!!!', response)
    }).catch((err)=>{
    console.log('Send Message error!!!', err)
  });
});

module.exports = router;
