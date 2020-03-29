import  {useState, useEffect} from 'react';
import yelp from '../api/yelp';

//Bu işlevin içine, Yelp API'sına bir istekte bulunmamız için gereken tüm kodu ekleyeceğiz.
export default () => {
    //yelp apiden geri dönmesi için usestate kullanacağız
    const [results, setResults] =useState([]);

    //ekranda hata mesaji göstermek için başka bir state tanımladık
    //errorMessage--> jsx bloğu içinde referans veririz, çünkü ekranda gösterilecek. bu kısım sadece hata varsa ekranda gösterilir
    //setMessage--> catch bloğu içinde referans veririz
    const [errorMessage, setErrorMessage] = useState('');
    
    //Bu fonksiyonu çağırdığımda isteği başlatacak
    const searchApi = async SearchTerm => {
       // console.log('Hi there!');
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit:50, //its mean '/search?limit=50'
                    term: SearchTerm,
                    location: 'san jose'
                }
             }); 
            //Http request gönderir parantez içinde belirtilen yola
            //2. argüman--> Aradığınız anahtar / değer çiftlerini isteğinize otomatik olarak eklenecektir. Yelp API'sına yaptığımız isteği tam olarak nasıl özelleştirmemiz gerektiği ile ilgilidir.
                //yelp dökümantasyonundaki parameters ile doğrudan ilişkilidir
            //yelp.js dosyasındaki baseUrl'in sonuna birleşir. 
            //yelp searchten arama almak için bekler
            //bu istekten ger, aldığımız yanıtı response değişkeni tutar
            //response.data -->API'den dönen jason datalarıdır. Yelp dökümantasyonundaki büyük data objesidir
            setResults (response.data.businesses);
        } catch(err) {
            // requestle ilgili bir sorun olursa, bu catch bloğuna gireceğiz
            //console.log(err); //hata mesajını terminalde gösterir
            setErrorMessage('Something get wrong');
        }
    };

    //call searchApi When componenet is first rendered (componenet ilk oluştupunda searchApi'yi çağıracağım)
    //searchApi('pasta'); THIS IS BAD CODE!!!! Because running that search to the Yelp API many many times!!!

    //useEfect'i kullanacağız:
    useEffect( () => {
        searchApi('pasta');
    }, []);

    return [searchApi, results, errorMessage];
};