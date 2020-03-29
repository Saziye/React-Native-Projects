const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

//Bir router bazı root handlers ile ilişkilendirmemizi sağlayan küçük bir nesnedir.
const router = express.Router();

router.post('/signup', async (req,res) => { //kayıt olmak için yapılan istek
    
    const {email, password} = req.body; //body içinden parse edilen email ve password alınır
    try {
        const user= new User({email,password}); //yukarıda aldığımız password ve maili yeni bir User oluşturmak için kullandık
        await user.save(); //kaydetmenin tamamlanmasını bekleyeceğim
    
        //Bir token oluşturutoruz. 
        //1.argüman-> token'in içine koymak istediğim bilgiler
        //2. argüman-> key(token'i üretecek) 
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY' )
        //Token'i ürettikten sonra kullanıcıya geri göndereceğiz
        res.send({token});
        //token içinde encoded bilgiler var.İstekte bulunan kişiyi doğrulamak ve söylediği kişi olduğundan emin olmak için kullanırız
    } catch(err) {
        return res.status(422).send(err.message);
    }  
});

//Birisi 'signin' yolunu çağırdığında burası çalışır
router.post('/signin',async(req,res) => {
    const {email, password} = req.body;
    if(!email || !password) { //email veya şifre yoksa
        return res.status(422).send({erros: 'Must provide email and password'});
    }
    
    //verilen email ile db'den bir kullanıcı seçmeliyiz. Bunu User model ile yapabiliriz.
    //User model MongoDB de depolanan tüm kullanıcılarla etkileşim kurar.
    //await çünkü -> Mongoose'un MongoDB'ye ulaşması biraz zaman alır. await i kullandığım için async
    const user = await User.findOne({email});
    if(!user) { //eğer kullanıcı bulunmadıysa (db'deki hiçbir kullanıcı tarafından kullanılmayan email ise)
        return res.status(404).send({error: 'Email not found'});
    }
    
    try { //karşılaştırma işleminde şifreler eşleşmezse promise reject olarak döner 
        //eğer email kullanılan bir email ise: password karşılaştırması yaparız
        await user.comparePassword(password); //User.js'deki comparePassword metodunu kullanır.
        //başarılı olarak şifre karşılaştırma yaptıysak, jwt oluşturacağız ve kullanıcıya geri göndererek
        //, kullanıcının gelecekteki isteklerinde kimlik doğrulaması yapabilmesini sağlamak istiyoruz.
        const token = jwt.sign({userId:user._id}, 'MY_SECRET_KEY');
        res.send({token});

    }catch(err) {
        return res.status(422).send({error: 'Invalid password or email'});
    }
});

module.exports = router;