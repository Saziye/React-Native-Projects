const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }

});

const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //MongoDV içinde saklanan başka bir nesneye referanstır.
        ref: 'User' //burada tanımladığım 'userId', User.js dosyasında tanımladığım gibi(mongoose.model('User',userSchema)) User örneğine eşit olduğuna işaret eder
    },
    name: {
        type: String,
        default: ''
    },
    locations: [pointSchema]
});

mongoose.model('Track', trackSchema);