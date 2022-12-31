import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useReducer,
} from "react";
import app from "./../../firebase/firebase.config";
import {
    sendSignInLinkToEmail,
    signInWithEmailLink,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";

const AuthContext = createContext();
const auth = getAuth(app);

export const useAuth = () => {
    return useContext(AuthContext);
};

const authUserReducer = (state, action) => {
    switch (action.type) {
        case "LOG_IN_USER":
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const initialState = {
    user: null,
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authUserReducer, initialState);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            let user = auth.currentUser;
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                dispatch({
                    type: "LOG_IN_USER",
                    payload: {
                        token: idTokenResult.token,
                        email: user.email,
                    },
                });
            } else {
                dispatch({
                    type: "LOG_IN_USER",
                    payload: null,
                });
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const sendForSignInLinkToEmail = (email, actionCodeSettings) => {
        setLoading(true);
        return sendSignInLinkToEmail(auth, email, actionCodeSettings);
    };

    const createUser2 = (email) => {
        setLoading(true);
        return signInWithEmailLink(auth, email, window.location.href);
    };

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const userProfileUpdate = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    };
    const loginWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const registerAndLoginWithProvider = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const values = {
        user,
        setUser,
        auth,
        loading,
        state,
        dispatch,
        sendForSignInLinkToEmail,
        createUser2,
        userProfileUpdate,
        setLoading,
        createUser,
        logOut,
        loginWithEmailAndPassword,
        registerAndLoginWithProvider,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
