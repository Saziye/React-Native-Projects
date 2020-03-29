import React, {useContext,useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    FlatList,
    Button,
    TouchableOpacity
} from 'react-native';
// import BlogContext from '../context/BlogContext';
////use createDataContext1
import {Context} from '../context/BlogContext';
import {Feather} from '@expo/vector-icons';


const IndexScreen = ({navigation}) => {
    // const blogPosts = useContext(BlogContext);
    // const {data, addBlogPost} = useContext(BlogContext);
    
    ////use createDataContext1 ---BlogContext'den, Context export ettiğimiz için
    //CreateDataContext'de Provider'da state objesi kullandığımız için data yerine state yazdık
    const {state, deleteBlogPost, getBlogPosts} = useContext(Context);

    useEffect(()=> {
        getBlogPosts(); //IndexScreen ilk kez oluştuğunda 1 kez çalışır

        //IndexScreenin odak kazandığı zamanalarda çalışır.
        const listener = navigation.addListener('didFocus', ()=> {
            getBlogPosts();
        });

        //IndexScreen gösterilmesi tamamen durduğunda çalışır.
        return () => {
            listener.remove(); //listener'i temizler
        };
    }, []);

    return (
        <View>
            {/* <Button title="Add Post" onPress={addBlogPost}/> */}
            {/* <Text>{value}</Text> */}
            <FlatList
                // data = {blogPosts}
                // data = {data}
                data = {state}
                keyExtractor={(blogPost)=>blogPost.title} //dizimizin içindeki her nesne ile çağrılacak bir işlev 
                //sadece blogPost diyecekleri bir argümanla çağrılacak tek bir nesneyi alacağım. Daha sonra anahtar çıkarıcıdan, bizim durumumuzda bir anahtar olarak kullanılacak bir String'i geri döndürmek zorundayız. 
                //burada benzersiz bir dize->Her blog yazısının başlığı.
                renderItem= {({item}) => {
                    return (
                        <TouchableOpacity onPress={()=> navigation.navigate('Show',{id: item.id})}> 
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress={()=>deleteBlogPost(item.id)}>                     
                                    <Feather style={styles.icon} name = "trash"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                                            
                    );
                }}
            />
        </View> 
    );
};


IndexScreen.navigationOptions = ({navigation}) => {
    return { 
        headerRight: (<TouchableOpacity onPress={()=>navigation.navigate('Create')}>
            <Feather name="plus" size={30}/>
        </TouchableOpacity> )
    };
};

const styles = StyleSheet.create({
    //View ögesine uygulanacak stil
    row: {
        flexDirection:'row', //Text ve Feather ögeleri aynı satırda gösterilecek
        justifyContent: 'space-between', //View içindeki ögeler arasında boşluk bırakır
        paddingVertical:20, //dikey boşluk (aşağı-yukarı)
        paddingHorizontal:10, //yatay boşluk(sağ ve sol)
        borderTopWidth:1, //yukarı çerçeve
        borderBottomWidth:1, //aşağı çerçeve
        borderColor: 'gray', //çerçeve rengi 
    },
    //Text için uygulanacak stil
    title: {
        fontSize:18, //yazı büyüklüğünü ayarlar

    },
    //icon için uygulanacak stil
    icon: {
        fontSize: 24, //icon büyüklüğünü ayarlar
    }

});

export default IndexScreen;

