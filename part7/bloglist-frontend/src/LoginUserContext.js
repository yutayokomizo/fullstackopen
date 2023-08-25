import { createContext, useContext, useReducer } from 'react';

const loginUserReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'REMOVE':
      return null;
    default:
      return state;
  }
};

const LoginUserContext = createContext();

export const LoginUserContextProvider = (props) => {
  const [loginUser, loginUserDispatch] = useReducer(loginUserReducer, null);

  return (
    <LoginUserContext.Provider value={[loginUser, loginUserDispatch]}>
      {props.children}
    </LoginUserContext.Provider>
  );
};

export default LoginUserContext;

export const useLoginUserValue = () => {
  const loginUserAndDispatch = useContext(LoginUserContext);

  return loginUserAndDispatch[0];
};

export const useLoginUserDispatch = () => {
  const loginUserAndDispatch = useContext(LoginUserContext);

  return loginUserAndDispatch[1];
};
