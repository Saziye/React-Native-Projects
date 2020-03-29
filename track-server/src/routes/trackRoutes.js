const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth); //kullanıcının oturum açtığından emin olmak için

//kullanıcının şimdiye kadar oluşturduğu tüm farklı trackları almasına izin vermek için
router.get('/tracks', async(req,res)=> {
    const tracks = await Track.find({userId: req.user._id});
    res.send(tracks);
});

router.post('/tracks', async(req,res)=> {
    const {name,locations} = req.body;

    if(!name || !locations) {
        return res
            .status(422)
            .send({error: 'You must provide a name and locations'});
    }
    try {
        //name ve location boş değilse track'i alırız
        const track = new Track({name, locations,userId: req.user._id});
        await track.save(); //Db'ye kaydeder
        res.send(track);
    } catch(err) {
        res.status(422).send({error: err.message});
    }
});


module.exports = router;


