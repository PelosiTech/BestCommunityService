export const SET_USER = "SET_USER"
export const REMOVE_USER = "REMOVE_USER"


export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}



export const login = (id, email, name, type, services) => {

    return dispatch => {
        dispatch(setUser({id,email,name,type,services}));
    };
};

export const logout = () => async dispatch => {
    dispatch(removeUser())
}