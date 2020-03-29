import React, {useContext} from 'react';
import { StyleSheet} from 'react-native';
import {Context} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({navigation}) => {
    const id = navigation.getParam('id');
    const {state, editBlogPost} = useContext(Context);

    //bütün farklı blogPostları gezer ve id'si navigation ile alınana id ile eşit olanı bulur
    //blogPost nesnesi editlemek istediğimiz nesnedir
    const blogPost = state.find(
        (blogPost)=> blogPost.id === id
    );

    // const [title, setTitle] = useState(blogPost.title);
    // const [content, setContent] = useState(blogPost.content);
    
    //Burada title ve content verilerini alıp blogpostformuna initialValues olarak aktarmamız gerek
    //blogpostform bu title ve content değerini alır
    return (
        <BlogPostForm 
            initialValues = {{title:blogPost.title, content:blogPost.content}}
            onSubmit={(title,content)=> {
                editBlogPost(id, title, content, ()=> navigation.pop());
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default EditScreen;