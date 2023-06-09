import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from 'redux'
//import { configureStore } from '@reduxjs/toolkit'
import { logger } from 'redux-logger'
import { rootReducer } from "./root-reducer";

const middleWares = [logger]
const composeEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, composeEnhancers)