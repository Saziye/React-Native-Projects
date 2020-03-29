import React from 'react';
import {View, Text, StyleSheet,FlatList, TouchableOpacity} from 'react-native';
import {withNavigation } from 'react-navigation';
import ResultsDetails from './ResultsDetails';

const ResultsList = ({title,results,navigation}) => {
    
    if(!results.length) { //eğer result uzunluğu yoksa
        return null; //hiçbir şey gösterme
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{title}</Text>
            {/* <Text>Results: {results.length}</Text> */}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator = {false}
                data = {results}
                keyExtractor = {result => result.id}
                renderItem = {({item})=> {
                    // return <Text> {item.name} </Text>
                    return (
                        <TouchableOpacity onPress={()=> navigation.navigate('ResultsShow', {id: item.id})}>
                        <ResultsDetails result = {item}/>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize:18,
        fontWeight: 'bold',
        margin: 15,
        marginBottom:5

    },
    container: {
        marginBottom:10
    }
});

export default withNavigation(ResultsList);