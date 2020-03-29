const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema( {
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required:true
    }
});

//Bu bir user instance'ı db'ye kaydetmeden önce çalışacak bir function
// Fonksiyonu bu şekilde () => tanımlamamızın sebebi: bu fonksiyonun içinde user instance olması
userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')) { //eğer kullanıcı şifresini herhangi bir şekilde değiştirmediyse
        return next(); //bir sonraki
    }

    bcrypt.genSalt(10, (err,salt) => {
        //10-> üreteceğimiz salt'ın ne kadar karmaşık olacağına dair bir referans
        if(err) { //salt'ı üretme sürecinde bir hata olursa 
            return next(err);
        }
        //eğer başarılı bir şekilde salt'ı üretirsek(random strings of characters)
        //bcrypt ile hashing yapacağız
        bcrypt.hash(user.password, salt, (err,hash)=> {
            //user.password-> ilk kaydolduğu andaki password
            //salt-> ürettiğimiz salt 
            if(err) { //hata olursa
                return next(err);
            }
            //hata yoksa password'u güncelleyeceğiz.
            //hashlenmiş şifreyi password'un üzerine yazdık
            user.password = hash; 
            next(); //akydetme işlevine geçer
        });
    });
});

//automate password checkhing process
//kullanıcı login olmaya çalışırken girdiği password ile db'de kayıtlı password'u karşılaştıracağız
userSchema.methods.comparePassword = function(candidatePassword) {
    //candidate password-> kullanıcının giriş yapmaya çalıştığı şifre    
    const user= this; //bunun değeri üzerinde çalıştığımız kullanıcıya eşittir.(inside this function the value of this is equal to our user model)
    return new Promise((resolve,reject)=> {
        //yeni bir Promise oluşturacağız. 2 parametre alan callback function
        //reselve-> Buradaki kodlar beklendiği gibi davranırsa (Promise çözülür)
        //reject-> Burada bir şeyler ters giderse (Promise reddedilir)
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=> {
            //karşılaştırma işlemi için bcrypt library'i kullanacağız.
            //1.argüman-> oturum açmaya çalıştığımız şifre
            //2.argüman-> db'ye kaydettiğimiz şifre(salted and hashed password)
            //3.argüman-> callback function(call err object and boolean)
            //isMatch is true-> candidatePassword ile user.password aynı ise
            //isMatch is false-> candidatePassword ile user.password farklı ise
            if(err) {
                return reject(err);
            }
            if(!isMatch) {
                return reject(false);
            }
            resolve(true);
        });
    });
}


mongoose.model('User',userSchema);