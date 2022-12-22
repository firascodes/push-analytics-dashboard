import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useRouter } from 'next/router';
import { Box, Button, useMediaQuery } from '@mui/material';
import Logo from 'components/Logo';
import styled, { useTheme } from 'styled-components';
import { useTheme as Theme } from 'contexts/ThemeContext';
import { useData } from 'contexts/DataContext';
import { ROUTES, CREDENTIALKEYS } from 'utils/constants';
import { Text } from '__pages__/dashboard/dashboard.styled';
import { ItemHV2, ItemVV2 } from 'theme/SharedStyling';
import { NavBarButtons } from './NavBarButtons';

export default function Navbar() {
  const { isDarkMode, darkModeToggle } = Theme();
  const { isLoggedIn, setIsLoggedIn, token } = useData();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:480px)');
  const isSmall = useMediaQuery('(max-width:1024px)');
  const { asPath } = useRouter();
  const [showSidebar, setShowSidebar] = React.useState<boolean>(false);

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.setItem(CREDENTIALKEYS.LOGINCHECK, '' + false);
    sessionStorage.setItem(CREDENTIALKEYS.TOKEN, '');
    router.push(ROUTES.LOGIN);
  };

  return (
    <NavbarContainer>
      <ItemHV2 alignItems="center" justifyContent="flex-start">
        <Logo
          src="./static/push-icon.svg"
          sx={{
            width: isMobile ? 38 : 54,
            height: isMobile ? 39 : 56,
            margin: isMobile ? '33px 10px 33px 0px' : '39px 10px 33px 0px',
          }}
        />
        <ItemVV2 alignItems="flex-start" justifyContent="center">
          <Text size={isMobile ? '24px' : '32px'} weight="500">
            Push Snapshots
          </Text>
          {!isMobile && (
            <Text size="15px" color={theme.text.secondary} weight="400">
              Explore trends, activity and track growth on the Push Network
            </Text>
          )}
        </ItemVV2>
      </ItemHV2>

      <ItemHV2 justifyContent="flex-end" alignItems="center">
        {asPath !== '/dashboard' && !isSmall && (
          <NavBarButtons logout={logout} isLoggedIn={isLoggedIn} />
        )}
        <Box
          sx={{
            border: '1px solid #BAC4D6',
            backgroundColor: theme.background.headerIcon,
            borderRadius: '50%',
            height: '50px',
            width: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={darkModeToggle}
            size={28}
            sunColor="#575D73"
            moonColor="#FFFFFF"
          />
        </Box>
        {asPath !== '/dashboard' && isSmall && (
          <ItemVV2
            alignItems="flex-end"
            margin="0px 0px 0px 20px"
            maxWidth="30px"
            cursor="pointer"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <HamburgerLine />
            <HamburgerLine />
            <HamburgerLine />
          </ItemVV2>
        )}
      </ItemHV2>

      <>
        {showSidebar && (
          <SidebarContainer>
            <Button
              variant="outlined"
              style={{
                marginRight: '5px',
                color: theme.text.primary,
                border: 'none',
              }}
              onClick={() => {
                router.push(ROUTES.DASHBOARD);
              }}
            >
              Dashboard
            </Button>
            <Button
              variant="outlined"
              style={{
                marginRight: '5px',
                color: theme.text.primary,
                border: 'none',
              }}
              onClick={() => router.push(ROUTES.ADMIN)}
            >
              Admin Panel
            </Button>
            {isLoggedIn ? (
              <Button
                variant="outlined"
                style={{
                  marginRight: '5px',
                  color: theme.text.primary,
                  border: 'none',
                }}
                onClick={() => logout()}
              >
                Logout
              </Button>
            ) : null}
          </SidebarContainer>
        )}
      </>
    </NavbarContainer>
  );
}

const NavbarContainer = styled(ItemHV2)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 50px;
  height: 100px;
  position: static;
  z-index: 10;
  @media (min-width: 310px) {
    padding: 0px 24px;
  }
  @media (min-width: 768px) {
    padding: 0px 50px;
  }
  @media (min-width: 1024px) {
    padding: 0px 50px;
  }
`;
const HamburgerLine = styled.div`
  height: 1px;
  width: 30px;
  border: 1px solid ${(props) => props.theme.text.primary};
  margin: 5px 0px;
`;

const SidebarContainer = styled(ItemVV2)`
  z-index: 10;
  justify-content: space-between;
  align-items: flex-start;
  width: 250px;
  height: auto;
  position: absolute;
  top: 95px;
  border: 1px solid white;
  border-radius: 28px;
  color: ${(props) => props.theme.text.secondary};
  background-color: ${(props) => props.theme.background.secondary};
  padding: 30px;
  @media (min-width: 310px) {
    right: 24px;
  }
  @media (min-width: 768px) {
    right: 50px;
  }
`;
