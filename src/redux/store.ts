import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';
import quizSlice from './slices/quizSlice';

const reducer = combineReducers({
  quiz: quizSlice.reducer
})

const store = configureStore({
  reducer
})

export const useSelector: TypedUseSelectorHook<ReturnType<typeof reducer>> = useAppSelector

export default store
