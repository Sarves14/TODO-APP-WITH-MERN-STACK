import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import reducer from './demoReducer.js';
import logger from './middleware/logger';


const store = configureStore({ reducer, middleware: [...getDefaultMiddleware(), logger] });
export default store;