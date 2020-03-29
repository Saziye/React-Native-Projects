// import React,{useState} from 'react';
import React,{useReducer} from 'react';
////UseCreateDataContext 1
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

//Bunu ilk context nesnesini oluşturmak için kullanacağız.
//const BlogContext = React.createContext();

////REDUCER 3
const blogReducer = (state, action) => {
    switch(action.type) {
        case 'get_blogposts':
            return action.payload; //===[...state, action.payload]
        case 'edit_blogpost':
            return state.map ((blogPost)=> { ////bütün blogpostları teker teker alacağım 
                return blogPost.id === action.payload.id //if(blogPost.id === action.payload.id)
                    ? action.payload //if doğruysa-> güncellemek istediğim blogpostu buldum demektir->return action.payload;
                    //doğru blogpost'u bulduktan sonra eski blogpostu döndürmek istemiyorum bunun yerine düzenlenmiş olanı döndürmek istiyorum -> return action.payload
                    //eğer doğru blogpost'u bulamadıysak mevcur blogpost'u return ederiz. ->return blogPost
                    :blogPost; //else-> return blogPost;
            });
        case 'delete_blogpost':
            //filter işlevi state array içindeki tüm farklı ögeler arasında yineleme işlemi yapar
            //eğer eşit değilse silmek istiyoruz.
            //eğer bu karşılaştırma doğruysa; o blogPost'u yeni state array dizisi içine almak isiyoruz
            //Bu nedenle, dizideki her öğe için bu karşılaştırmayı yapacağız ve sonunda sonuçları döndüreceğiz. ve bu bizim yeni state arrayimiz olacak.
            return state.filter((blogPost)=> blogPost.id !== action.payload )
            
            /* //request kullanırken dispatch type'a artık ihtiyaç duymuyoruz o yüzden yeni blogpost eklerken bu case'i kullanmayız 
        case 'add_blogpost':
            return[
                ...state,
                { 
                    id:Math.floor(Math.random()*99999), 
                    // title: `Blog Post #${state.length + 1}`
                    title: action.payload.title,
                    content: action.payload.content
                }
            ]; //mevcut tüm blog yayınlarını alır ve bunları bu yeni diziye ekler
            */
        default:
            return state;    
    }
};

//Json Server'a request'te bulunmak için action function
const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        //response.data === [{}, {}, {}]a list of blog posts

        dispatch({type: 'get_blogposts', payload: response.data });
        //React otomatik olarak dispatch'deki objecti alır ve reducer'i çalıştırır
    };
};



////UseCreateDataContext 2
//Burada datamızı nasıl değiştirmek istediğimizi açıklayan bir fonksiyondan geçiyoruz.
//Bu fonksiyonu createDataContext'e 2. argüman olarak geçiyoruz.
//Bu fonksiyonu 'dispatch' fonksiyonu yapacağız
//Ama dispatch bu bileşende değil(BlogContext). createDataContext bileşenindeki Provider compenent'inde oluşturulur
//addBlogPost, state'imizin değerini değiştirmek için dispatch'e erişmesi gerekir
const addBlogPost = dispatch => { //bu fonksiyon 'dispatch'ile çağırılacak
 
    return async (title,content,callback) => { //yeni bir işlev döndürür   
       /*//request'ten önceki kullanım 
        dispatch({type: 'add_blogpost', payload:{title,content}}); //bu yeni işlev içinde dispatch'i arar
        //dispatch'i başarılı olarak yerine getirince callback'i çağırır
        */

       //2. argüman server'a göndermek istediğimiz information
       await jsonServer.post('/blogposts', {title,content} );
       if(callback) {
            callback();
        }
    };  
};


//Blog Post'u silmek için helper function
//silmeye çağıştığıımız blogPost un id'sini buraya parametre olarak veririz
//Bu nesne react ile alınacak ve ikinci argüman olarak blogReducer'a otomatik olarak sağlanacaktır.
const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        //buradaki type ve payload bizim kendi verdiğimiz isimler. 
        //actions object'i delete_blogpost. type yerine thingTodO ifadesi de kullanabilirdik
        //yükü(payload) id. payload yerine idOfPostToDelete ifadesi de kullanabiliriz
        dispatch({type: 'delete_blogpost', payload:id});
    }
};


//blogPost'u güncellemek için yeni fonksiyon
//dispatch ile çağırılacak ve yeni bir fonksiyon döndürecek
//buradaki inner fonksiyon(return'in içindeki fonksiyon) bizim componentimiz içinde çalışacak fonksiyon(örneğin editscreen'de)
//inner fonksiyon ile yeni title ve contenti ve güncellemek istediğimiz blogpost'un id'sini çağıracağız
const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title,content});
        dispatch({
            type: 'edit_blogpost', 
            payload: { id, title, content}
        });
        if(callback) {
            callback();
        }
    };
};
 

////UseCreateDataContext 3
export const {Context, Provider} = createDataContext(
    blogReducer,
    {addBlogPost, deleteBlogPost,editBlogPost, getBlogPosts },
    []
);



// export const BlogProvider = ({children}) => {
//     //Bir bileşene bağlam değişkeni(context) eklemek için kullanabileceğimiz bir kanca(hook).
//     //Bu durumda blog gönderilerinin statik listesini( static list of blog posts) oluşturmak yerine;
//     //BlogPostProvider içinde yeni bir durum değişkeni başlatacağım(new state variable->blog posts)
//     // const [blogPosts,setBlogPosts] = useState([]);
//     //uygulamamız ilk başlatıldığında boş bir diziye sahip olmak istiyorum çünkü varsayılan olarak herhangi bir blogPost olmayacak.
//     //setter-> blogPosts listesini tamamen günceller

//     ////REDUCER 1
//     //ilk argüman-> reducer'ı kullanabileceğimiz fonksiyon
//     //2.argüman -> initial state object(bu uygulamada array, default değeri empty)
//     const [blogPosts,dispatch] = useReducer(blogReducer,[]);

// /*
//     //Bu fonksiyonun amacı->blogPosts değişkenimize yeni bir blogPost eklemek için setter kullanmak
//     const addBlogPost = () => {
//         //orjinal blogPost değerini hiç değiştirmiyoruz.
//         // buraya yeni bir dizi eklerken esasen sıfırdan yeni bir dizi oluşturuyorum ve orijinali değiştirmiyorum 
//         //o zaman içeride var olan tüm blog gönderilerini alacağım ve yeni oluşturduğum bu yeni Diziye ekleyeceğim.
//         setBlogPosts([...blogPosts,{ title: `Blog Post #${blogPosts.length+1}` }]);  //kod tek başına yeni bir dizi oluşturmak anlamına gelir ve yeni Array'ın içinde var olan tüm blog gönderilerini alıp yeni Array'a ekleyin.
//         //daha sonra buraya eklemek istediğim blogPost'u eklemek için yeni bir nesne oluşturacağım
//         //Bu eklediğimiz yepyeni bir blogPost  olacak.
//         //title'da her bir blogPost'un başlığı olacak.blogPosts'un bir dizi olduğunu hatırla.
//         //Şu anda sahip olduğumuz blogPosts sayısını alacağım ve sadece bir tane ekleyeceğim.
//     };
//     //bu state değişkenini güncellediğimiz anda, blogProvider, uygulamamızdaki diğer tüm bileşenleri gösterdiğinden, blog sağlayıcısında bileşenimiz tam olarak yeniden oluşturulacaktır.(rerender)
//     //Bu gerçekleştiğinde tüm uygulamamız güncellenecektir.
//     //Daha sonra yeni blog yayınları listesini(lists of blog post) içeriğimize(context) aktaracağız.
//     //Bu, blog yayınlarının yeni listesinin IndexScreen'e akacağı anlamına geliyor
// */

//     //Blog post listesini düz liste bileşeninin içinde göstermek istiyorum.
//     //yeni blogPosts listesi oluşturacağım ve her nesnenin bir blog postu temsil ettiği bir dizi nesne oluşturacağız.
//     // const blogPosts = [
//     //     {title: 'Blog Post #1'},
//     //     {title: 'Blog Post #2'},
//     // ];

//     ////REDUCER 4
//     const addBlogPost = () => {
//         dispatch({type: 'add_blogpost'});

//     };
//     return (
//         // <BlogContext.Provider value={blogPosts}>
//         //     {children}
//         // </BlogContext.Provider>

//         //state ile kullanımı
//         // <BlogContext.Provider value={{data:blogPosts, addBlogPost: addBlogPost}}>
//         //     {children}
//         // </BlogContext.Provider>

//         ////REDUCER 2
//         <BlogContext.Provider value={{data:blogPosts,addBlogPost}}>
//         {children}
//         </BlogContext.Provider>
//     );
// }


//Üst düzey bileşenden bazı bilgileri iç içe geçmiş bir çocukla paylaşmak istersem
//Burada BlogContext.Provider içine value prop'u vereceğim.
//export default BlogContext;
