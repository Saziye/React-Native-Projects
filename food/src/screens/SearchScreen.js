import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
    // define my new piece of state so I'll call it search term.
    //'setTerm' esas olarak Yelp API'sını birlikte arayacağımız terim olacak
    //default value of 'empty string'.
    const[term,setTerm] = useState('');
    //Böylece, şu andaki term'i ve değiştirmek için geri arama yapacağımızı arama çubuğu bileşenimize aktarabiliriz

    //useResult'ı kullanmak için
    const [searchApi, results, errorMessage] = useResults();

    //gruplama görevi yapacak yardımcı fonksiyon tanımladık.parametre olarak price alır. Buradaki fikir, filtre sonuçlarını üç kez fiyata göre arayacağız
    const filterResultsByPrice = (price) => {
        //price === '$' || '$$' || '$$$'
        //results'ları filtreleyeceğiz. results dizisindeki her bir sonuç için result.price'ın price'a eşit olup olmadığını sorar

        return results.filter(result => {
            return result.price === price;
        });
    };

    return (
        <View style={{flex:1}}> 
            {/* newTerm adlı bir argüman alıyoruz ve bunu mevcut terim parçamızı güncellemek için kullanacağım. */}
            <SearchBar 
                term = {term} 
                onTermChange = {(newTerm =>setTerm(newTerm))} 
                onTermSubmit = {()=> searchApi()}
                // onTermChange = {setTerm} 
                // onTermSubmit = {searchApi}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            {/* <Text>We have found {results.length} results.</Text> */}
            <ScrollView>
                <ResultsList 
                    results={filterResultsByPrice('$')} 
                    title = "Cost Effective"
                    // navigation = {navigation}
                />
                <ResultsList 
                    results={filterResultsByPrice('$$')} 
                    title = "Big Pricier"
                    // navigation = {navigation}

                />
                <ResultsList 
                    results={filterResultsByPrice('$$$')} 
                    title = "Big Spender"
                    // navigation = {navigation}

                />
            </ScrollView>
            

        </View>
    );
};

const styles = StyleSheet.create({});

export default SearchScreen;
