import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons'; //ikon kullanmak için Feather kütüphanesini import ettik


const SearchBar = ({term,onTermChange, onTermSubmit}) => { //metin girişimizi yönetmek için bu iki desteği kullanabiliriz
    return (
        <View style = {styles.backgroundStyle}>
            <Feather name="search" style = {styles.iconStyle} /> 
            {/* Feather kütüphanesinden name'i search olan ikonu kullandık */}
            <TextInput
                autoCapitalize="none"
                autoCorrect = {false}  
                style = {styles.inputStyle}
                placeholder= "Search" //soluk metin-kullanıcı rama metni girmeye başlayabileciğini anlar
                value = {term} //TextInput'a tam değerinin ne olması gerektiği söylenecek.
                onChangeText = {newTerm => onTermChange(newTerm)}
                //kullanıcı text'i değiştirdiğinde onTermChange fonksiyonu çağrılır. onTermChange parent component'ten aktarılır.
                //kullanıcının girdiği yeni terimi veya kullanıcının yeni girdiği yeni dizeyi (newTerm) aktarırız.

                //ok butonuna veya enter'a basıldığında çalışır
                onEndEditing = {() => onTermSubmit()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        //backgroundColor: '#F0EEEE', //gri arkaplan 
        marginTop:10, //yukarıya 10 marj boşluk bırakır
        backgroundColor: 'white',
        height:50, //yüksekliği
        borderRadius: 5, //yuvarlak köşeler
        marginHorizontal: 15, //kenar boşluğu
        flexDirection: 'row', //iconu ve textinputu yatay olarak(aynı satırda) sıralar
        //justifyContent: ''
        marginBottom:10
    },
    //bu metin girişinin tam kapsamının ne olduğunu gerçekten anlamamız gerekiyor
    //bu stil ile(inputStyle) kenarlığı eklememin tek nedeni, bu metin girişinin tüm uzantılarının ne olduğunu anlayabilmemdir.
    inputStyle: {
        // borderColor: 'black',
        // borderWidth:1,
        flex:1, //yatay yönde mümkün oladuğunca yer kapla demek
        // kenarlığın arama çubuğunun tüm genişliğini ve yüksekliğini genişlettiğini görüyorum
        fontSize:18
    },
    iconStyle: {
        fontSize: 35,
        //yalnızca tek bir ögenin düzenni kontrol etmek için --> alignSelf kullanılır.
        alignSelf: 'center', //iconu center'a yerleştirir
        marginHorizontal:15, //icon'un sağ ve sol tarafına boşluk ekler
    }
});

export default SearchBar;
