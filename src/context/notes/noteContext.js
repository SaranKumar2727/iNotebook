import {createContext} from 'react';

const noteContext=createContext(
    {state: {},
  update: () => {},}
);


export default noteContext;