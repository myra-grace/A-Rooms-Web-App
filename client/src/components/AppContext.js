import React, { createContext, useEffect, useState } from 'react';

// import withFirebaseAuth from 'react-with-firebase-auth';
// import * as firebase from 'firebase';
// import 'firebase/auth';

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;