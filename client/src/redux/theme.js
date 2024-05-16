import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: JSON.parse(window?.localStorage.getItem('theme')) ?? 'light'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action) {//setTheme is a reducer function responsible for updating the theme state
            state.theme = action.payload;
            localStorage.setItem('theme', JSON.stringify(action.payload));
        }
    }
})

export default themeSlice.reducer;

export function SetTheme(value){//The function SetTheme uses the dispatch method to dispatch an action of type setTheme, which is a reducer function in the themeSlice

    return(dispatch) => {
        dispatch(themeSlice.actions.setTheme(value));
    }

}