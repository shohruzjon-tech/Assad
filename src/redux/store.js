import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import thunk from 'redux-thunk';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";


const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: middlewares,
  });

  sagaMiddleware.run(rootSaga);
  
export const persistor = persistStore(store);
  
export default { store, persistor };