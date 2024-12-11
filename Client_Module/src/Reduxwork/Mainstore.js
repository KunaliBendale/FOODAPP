import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import { persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"
import cartreducer from "./Cartslice";
import userReducer,{isLogout} from "./UserSlice";

const timeoutMiddleware = store => next => action => {
    const result = next(action);
    if (action.type === '/') {
        setTimeout(() => {
            store.dispatch(isLogout());
        }, 3000);
    }
    return result;
}

const persistConfig = {
    key: "user",
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartreducer, 
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const MainStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(timeoutMiddleware)
})

// const Mainstore = configureStore({
//     reducer: {
//         cart: cartreducer,
//         user: userReducer
//     }
// })


export default MainStore