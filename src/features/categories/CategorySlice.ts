import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { categoryType } from "../../constants/types";
import firebase from "firebase/app";
import { fetchCategoriesApi } from "./CategoryApi";

interface stateType{
    categories: any[];
    loading: boolean;
}

const initialState: stateType = {
    categories: [],
    loading: false 
}

export const fetchCategories = createAsyncThunk(
    "category/fetch_categories",
    async () => {
        const data = await fetchCategoriesApi();
        return data;
    }
)

const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<categoryType>) => {
                state.categories?.unshift(action.payload);
        },
        updateCategory: (state, action: PayloadAction<{data: categoryType, oldId: string}>) => {
            let indx:number = state.categories?.findIndex((item: categoryType) => item.id === action.payload.oldId);
            if( indx !== -1){
                 if (state.categories){
                     (state.categories[indx] as categoryType) = action.payload.data
                 }
            }
        },
        deleteCategory: (state, {payload} ) => {
            state.categories = state.categories.filter(item => item.id !== payload);
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchCategories.pending, state => {
            state.loading = true
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.loading = false
        })
    }
})

export const {addCategory, updateCategory, deleteCategory} = CategorySlice.actions;

export const selectCategories = (state:RootState) => state.categories.categories;

export default CategorySlice.reducer;