import React, {useReducer} from 'react';

export default(reducer,actions, initialState) => {
    //actions--> state nesnesini nasıl değiştireceğimizi açıklar.'dispatch'ı  çağırırız'
    const Context = React.createContext(); //our context object // farklı bir kaynak türü yaratmamaız gerektiğinde createContexti kullanrız

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer,initialState);

        //actions==={addBlogPost: (dispatch) => { return()=> {} } }
        //Ve bu fonksiyon tam da burada value prop'una aktaracağımız şey.
        //Ve esas olarak, tüm alt bileşenlerimizin state nesnemizde değişiklikler yapmasına izin vereceğiz
        //Bu fonksiyondan dönen değeri value prop'una geçeceğiz
        
        //boundAction--> tüm actşonları işlediğimizi ve dispatch e bağlı olduğu için bu ismi veririz
        const boundActions = {};
        for(let key in actions) {
            //key === 'addBlogPost'
            //boundActions.addBlogPost === boundActions[key]
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{state:state,...boundActions }}>
                {children}
            </Context.Provider>
        );
    }

    return{Context,Provider};
};