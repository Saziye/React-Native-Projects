import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchScreen from './src/screens/SearchScreen'; //SearchScreen sayfasını import ettik
import ResultsShowScreen from './src/screens/ResultsShowScreen'
//navigasyon nesnesini oluşturacağız. StackNavigator farklı ekranlara otomatik olarak gider.Otomatik olarak her ekranın üst kısmında bir başlık gösterilir.
//ilk argüman -->projenin sahip olduğu tüm farklı rotaları listeleyecek argüman
//ikinci argüman --> uygulamamız her başlatıldığında göstermek istediğimiz varsayılan rota(default root) olacaktır.
const navigator = createStackNavigator(
  {
    Search: SearchScreen, //SearchScreen sayfasına ulaşmak için kullanacağımız anahtar --> 'Search'
    ResultsShow: ResultsShowScreen
  }, 
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: { //uygulamada her farklı ekranın üstünde görüntülenen başlığı özelleştirmek için defaultNavigationOptions nesnesini kullanabiliriz
      title: 'Business Search'
    }
  }
);

export default createAppContainer(navigator);

//Uygulamamız ilk kez başlatıldığında, bu dosyadan dışa aktardığımız herhangi bir şey yerel tepkiyle alınacak ve otomatik olarak cihazın ekranında gösterilecektir.
//Bu yüzden her zaman neyi göstermek zorunda olursak olalım, her zaman bir reaksiyon bileşenini bu dosyadan dışa aktarmak zorundayız.
//Ancak bu durumda gerçek bir bileşene sahip değiliz.
//Bunun yerine navigasyon dediğimiz bir şey var.
//'createAppContainer' fonksiyonunun işlevi aslında varsayılan bir uygulama bileşeni(default app component) veya gerçek bir React bileşeni(React component) oluşturur ve
//gezgin(navigator) bu bileşenin içinde ürettiği içeriği görüntüler.
//bir başka deyişle-->sadece gerçek bir bileşenin bu dosyadan dışa aktarıldığından emin olur.

