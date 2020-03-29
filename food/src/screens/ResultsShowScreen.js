import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen =  ({navigation}) => {
    const id = navigation.getParam ('id');
    // console.log(id);

    const [result,setResult] = useState(['']);
    //console.log(result);

    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data); //verileri alır.
        //Ve bu verileri aldıktan sonra, bileşenimizi yeniden oluşturmamız ve verilerin içindeki görüntülerin listesini almamız ve bunları ekranda göstermemiz gerekir.
    };

    //getResult fonksiyonunu 1 kez çalıştırmak için useEffect hook'unu kullanırız
    useEffect( () => {
        getResult(id);
    }, [] );

    if(!result) { //eğer result boşsa (null)
        return null;
    }

    return (
        <View style={{flex:1}}>
            <Text> {result.name}</Text>
            <FlatList
                data = {result.photos}
                keyExtractor = {(photo) => photo}
                renderItem= {({item}) => {
                    return <Image style = {styles.image} source = {{uri: item}}/>
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 300
    }   
});

export default ResultsShowScreen;
