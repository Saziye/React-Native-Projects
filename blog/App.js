import React from 'react'; //jsx kullanmak için
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
// import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import IndexScreen from './src/screens/IndexScreen';
// import {BlogProvider} from './src/context/BlogContext';
import {Provider} from './src/context/BlogContext';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';


const navigator = createStackNavigator({
  //Bir kullanıcının gidebileceği tüm olası ekranlar
  Index:IndexScreen,
  Show: ShowScreen,
  Create: CreateScreen,
  Edit: EditScreen
}, {
  //2.argüman->Stack Navigator için bazı yapılandırma seçenekleri olacak.
  initialRouteName: 'Index', //Başlangıç sayfası
  defaultNavigationOptions: { //varsayılan gezinme seçenekleri
    title: 'Blogs'
  }  
});

//export default createAppContainer(navigator); //navigator nesnesini dışa aktarır

const App = createAppContainer(navigator);

export default() => {
  return (
    // <BlogProvider><App/></BlogProvider>
    <Provider><App/></Provider> 
  );
};

