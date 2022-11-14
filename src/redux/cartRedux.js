import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getListCartApi, deleteCartApi, updateCartApi, insertCartApi} from '../api/cartApi';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        status: 'idle',
        listCart: [],
        addItem: '',
        updateItem: '',
        deleteItem: ''
    },
    reducers: {
        getCartitems: (state, action) => {
            state.listCart = action.payload;
        },
        addCartitems: (state, action) => {
            state.addItem = action.payload
        },
        deleteCartitems: (state, action) => {
            state.deleteItem = action.payload
        },
        updateCartitems: (state, action) => {
            state.updateItem = action.payload
        },

    }
});

export const getAllCarts = async (dispatch, username) => {
    const res = await getListCartApi(username);
    if(res !== undefined && res !== null) {
        dispatch(getCartitems(res));
    }
}

export const deleteCartRedux = async (dispatch, username, itemId) => {
    const res = await deleteCartApi( username, itemId)
    console.log(res);
    if(res !== undefined) {
        dispatch(deleteCartitems(res))
    }
}

export const updateCartRedux = async (dispatch, username, itemId, item) =>{
    const res = await updateCartApi(username, itemId, item);
    if(res !== undefined)
        dispatch(updateCartitems(res));
}

export const insertCartRedux = async (dispatch, item, username, productId) => {
    const res = await insertCartApi(item, username, productId);
    if(res !== undefined){
        console.log(res);
        dispatch(addCartitems(res.data));
        return res.status
    }
}


// export const getAllCarts = createAsyncThunk('cart/getAllCarts', async (username) =>{
//     const res = await getListCartApi(username);
//     return res;
// })

export const { getCartitems, addCartitems, deleteCartitems, updateCartitems } = cartSlice.actions;
export default cartSlice.reducer;
