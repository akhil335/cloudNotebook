import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { useNavigate } from "react-router-dom";

const logInpages = ['Home', 'About'];
const logOutpages = ['Sign Up', 'Sign In'];
const settings = ['Profile', 'Logout'];



export const Navbar = (props) =>{
   const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleLogout = () => {
      sessionStorage.removeItem("authToken")
      navigate("/SignIn")
      props.altertMessage(true, "You Have Sucessfully Log Out !");
    }

    return (
        <AppBar position="static">
        <Container maxWidth="xl" sx={{display: 'flex', justifyContent: 'space-evenly', padding: {xs: '0rem 0rem', sm: '0rem 1rem'}}}>
          <Toolbar disableGutters sx={{width: '100%'}}>
            <StickyNote2Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Cloud Notebook
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                 { !sessionStorage.getItem("authToken") && logOutpages.map((page) => (
                <Link to = {`/${page.split(' ').join('')}`}  key={page}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
                </Link>
              ))}
              { sessionStorage.getItem("authToken") && logInpages.map((page) => (
                <Link to = { `/${page==='Home' ? '/' : page.split(' ').join('')}`}  key={page}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
                </Link>
              ))}
              </Menu>
            </Box>
            <StickyNote2Icon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                fontSize: {xs: '1.1rem', sm: '1.3rem'},
                textDecoration: 'none',
                whiteSpace: 'nowrap'
              }}
            >
               Cloud Notebook
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent: 'flex-end'}}>
              { !sessionStorage.getItem("authToken") && logOutpages.map((page) => (
                <Link to = {`/${page.split(' ').join('')}`}  key={page}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
                </Link>
              ))}
              { sessionStorage.getItem("authToken") && logInpages.map((page) => (
                <Link to = { `/${page==='Home' ? '' : page.split(' ').join('')}`}  key={page}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
                </Link>
              ))}
            </Box>
  
            { sessionStorage.getItem("authToken") && <Box sx={{ flexGrow: 0, ml: 1}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: {xs: '12px', sm: '0px'} }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    { setting === 'Logout' ? <Typography textAlign="center" onClick={handleLogout}>{setting}</Typography> : <Typography textAlign="center">{setting}</Typography> }
                  </MenuItem>
                ))}
              </Menu>
            </Box>}
          </Toolbar>
        </Container>
      </AppBar>
    );
}

