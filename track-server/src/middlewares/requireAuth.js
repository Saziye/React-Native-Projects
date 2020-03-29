const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    //authorization === 'Bearer 'sfsfsdfsdf(jwt)'
    //kullanıcının başarılı bir şekilde Jwt'si olduğunu belirlersek, next function'ı çağırırız
    //servera gelen request'lerdeki headerlar 'headers' property'sinin içine yerleştirilir
    //gelen istekte authorization header'ını arayacağız
    //isteğimizdeki header object Authorization otomatik olarak küçük harfli authorization'a dönüştürülür
    const {authorization} = req.headers; //'authorization' başlığını alırız
    
    if(!authorization) { //Eğer kullanıcı bir authorization headerı sağlamıyorsa tanımlı bir istek olamamalıdır
        return res.status(401).send({error: 'You must be logged in.'});
    }
    //kulanıcı kontrolü geçerse bir token'i olamalıdır. Bu token'i authorization başlığından çıkarmalıyız
    //Bearer'dan sonra 1 tane boşluk bırak
    //bu bize sadece token'i bırakır
    const token = authorization.replace('Bearer ', ''); //baerer ile boş dizi yer değiştirir

    //şimdi bu token'ı doğrulayacağız(jwt ile)
    //1. argüman-> doğrulamak istediğimiz token,
    //2. argüman-> key('MY_SECRET_KEY'),
    //3.argüman-> jwt bu token üzerinde doğrulama yaptıktan sonra çağrılacak olan callback function. Bu yüzden async function olmalı
    //Bu callback functionda-> doğrulama işleminde bir şeyler ters giderse hata çağırılır, her şey yolunda giderse payload alırız
    //payload->jwt'ya taktığımız her türlü information (userId)
    jwt.verify(token, 'MY_SECRET_KEY', async(err, payload)=> {
        if(err) {
            return res.status(401).send({err}, 'You must be logged in.');
        }
        //kullanıcının geçerli bir token sağladıpından emin olduktan sonra;
        const {userId} = payload;
        const user = await User.findById(userId); //MongoDB collection'a göz atar içinde verilen 'userId' ye sahip kullanıcı varsa 'user' değişkenşne atar
        
        //Şimdi, isteği tam olarak kimin yaptığını biliyoruz. Bu kullanıcıyı alıp req(request) nesnesimize atayacağız. Middleware gelen req ile çağırılır.
        req.user = user;
        next();
    });
};