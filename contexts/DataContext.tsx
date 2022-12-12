import React, { useState, useContext, createContext, useEffect } from 'react';
import { CREDENTIALKEYS } from 'utils/constants';

const DataContext = createContext<any>({});

const DataProvider = ({ children }: { children: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');

  const [updateTracker, setUpdateTracker] = useState<boolean>(false);
  const timeFilterOptions = [
    { time: '1D' },
    { time: '7D' },
    { time: '1M' },
    { time: '1Y' },
    { time: 'YTD' },
    { time: 'ALL' },
  ];

  const chainList = [
    {
      image: './static/ethereum.svg',
      chain: 'Ethereum Network',
      value: 'ETH_TEST_GOERLI',
    },
    {
      image: './static/polygon.svg',
      chain: 'Polygon Network',
      value: 'POLYGON_TEST_MUMBAI',
    },
  ];

  useEffect(() => {
    if (Boolean(sessionStorage.getItem(CREDENTIALKEYS.LOGINCHECK))) {
      setToken(String(sessionStorage.getItem(CREDENTIALKEYS.TOKEN)));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setToken('');
    }
  }, []);
  console.log({ token });

  return (
    <DataContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        timeFilterOptions,
        chainList,
        updateTracker,
        setUpdateTracker,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
