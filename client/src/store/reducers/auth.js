import ActionTypes from './../actions'; 

const initialState = {
    isLoggedIn: (Boolean(localStorage.getItem('isLoggedIn')))||false,
    currentUser: JSON.parse(localStorage.getItem('userInfo'))||{}
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case ActionTypes.LOGIN_USER: 
            localStorage.setItem('isLoggedIn', 'true'); 
            localStorage.setItem('userInfo',JSON.stringify(action.currentUser)); 
            return { 
                ...state, 
                isLoggedIn: true, 
                currentUser: action.currentUser 
            };  
        case ActionTypes.LOGOUT_USER:
            localStorage.removeItem('isLoggedIn'); 
            localStorage.removeItem('userInfo');
             return { 
                 ...state, 
                isLoggedIn: false, 
                currentUser: {} 
            }; 

        default:
            return {...state};
    }
}
export default authReducer;