import authReducer from "./authReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import appReducer from "./appReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import auttoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";


const commonConfig = {
    storage,
    stateReconciler: auttoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggerIn', 'token']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    post: postReducer,
    app: appReducer,
})

export default rootReducer