import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
// MUI Components
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
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PersonIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// used like LINK
import { Link, useHistory } from 'react-router-dom';
import Container1 from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const navCategoryCol1 = [
  'African',
  'American',
  'Asian',
  'Chinese',
  'French',
  'Greek',
  'Indian',
];
const navCategoryCol2 = [
  'Italian',
  'Japanese',
  'Latin-American',
  'Mexican',
  'Middle-Eastern',
  'Spanish',
];
const navCategoryCol3 = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

// for MUI
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// for MUI
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// for MUI
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'blackit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Navbar() {
  let name = localStorage.getItem('name');
  let userId = localStorage.getItem('userId');
  // for drop downs
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // used for search bar to go to icon on smaller screens
  const [screenSize, setScreenSize] = useState(true);

  // login status
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  // Category menu
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  const [query, setQuery] = useState('');
  const history = useHistory();

  // Category menu
  const handleCategoryMenu = (event) => {
    setAnchorElCategory(event.currentTarget);
  };
  const handleCategoryClose = () => {
    setAnchorElCategory(null);
  };

  // Left side burger menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // ride side profile icon menu
  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // takes user to search page with results
  const handleSearch = async (event) => {
    event.preventDefault();
    history.push(`search?query=${query}`);
  };

  // get screen size at all time
  // want this to change look of nav bar if mobile
  useEffect(() => {
    let widthSize = window.innerWidth;

    if (widthSize < 572) {
      console.log('screen is small');
      setScreenSize(false);
    }
  }, []);

  const logoutHandler = () => {
    toast.success('You have logged out!👋👋👋', {
      position: toast.POSITION.TOP_CENTER,
    });
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <>
      {screenSize ? (
        <AppBar position="static" style={{ background: '#FFFFFF' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'serif',
                  fontWeight: 'bolder',
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                RecipeReel
              </Typography>

              {/* Burger menu */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="black"
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
                  {loggedIn ? (
                    <>
                      <Box
                        sx={{
                          width: '100%',
                          maxWidth: 360,
                          minWidth: 210,
                          bgcolor: 'background.paper',
                        }}
                      >
                        <nav aria-label="main mailbox folders">
                          <List>
                            <Link
                              to="/recipes"
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseNavMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <HomeIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="My Feed" />
                                </ListItemButton>
                              </ListItem>
                            </Link>

                            <Link
                              to="/post-recipe"
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseNavMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <AddBoxIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Create Post" />
                                </ListItemButton>
                              </ListItem>
                            </Link>

                            {/* <Link
                              to="/categories"
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseNavMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <FormatListBulletedIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Categories" />
                                </ListItemButton>
                              </ListItem>
                            </Link> */}
                            {/* <Link
                              to="/top-rated"
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseNavMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <StarIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Top Rated" />
                                </ListItemButton>
                              </ListItem>
                            </Link> */}
                          </List>
                        </nav>
                      </Box>
                    </>
                  ) : (
                    <>
                      {/* <Box
                        sx={{
                          width: '100%',
                          maxWidth: 360,
                          minWidth: 210,
                          bgcolor: 'background.paper',
                        }}
                      >
                        <nav aria-label="main mailbox folders">
                          <List>
                            <Link
                              to="/categories"
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseNavMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <FormatListBulletedIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Categories" />
                                </ListItemButton>
                              </ListItem>
                            </Link>

                             <Link
                              to="/top-rated"
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseNavMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <StarIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Top Rated" />
                                </ListItemButton>
                              </ListItem>
                            </Link> 
                          </List>
                        </nav>
                      </Box> */}
                    </>
                  )}
                </Menu>
              </Box>

              {/* Smaller screen Title */}
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'serif',
                  fontWeight: 'bolder',
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                RecipeReel
              </Typography>

              {/* next to website name */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {loggedIn ? (
                  <>
                    <Toolbar>
                      {/* <Button
                        sx={{ my: 2, color: 'black', display: 'block' }}
                        onClick={handleCategoryMenu}
                      >
                        Categories
                        <KeyboardArrowDownIcon />
                      </Button>
                     <Link to="/top-rated" style={{ textDecoration: 'none' }}>
                        <Button
                          sx={{ my: 2, color: 'black', display: 'block' }}
                        >
                          Top Rated
                        </Button>
                      </Link>  */}
                      <Link
                        to="/post-recipe"
                        style={{ textDecoration: 'none' }}
                      >
                        <Button
                          sx={{ my: 2, color: 'black', display: 'block' }}
                        >
                          Create Post
                        </Button>
                      </Link>
                    </Toolbar>

                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElCategory}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElCategory)}
                      onClose={handleCategoryClose}
                    >
                      <>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: 600,
                            minWidth: 210,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <Container1 fluid>
                            <Row>
                              <Col xs={8}>
                                <h3>Cuisines</h3>
                              </Col>
                              <Col xs={4}>
                                <h3>Time of Day</h3>
                              </Col>
                            </Row>

                            <Row>
                              <Col>
                                <Row>
                                  {navCategoryCol1.map((category) => (
                                    <Link
                                      to={`/${category}`}
                                      style={{ textDecoration: 'none' }}
                                      onClick={handleCategoryClose}
                                    >
                                      <ListItem disablePadding>
                                        <ListItemButton>
                                          <ListItemText primary={category} />
                                        </ListItemButton>
                                      </ListItem>
                                    </Link>
                                  ))}
                                </Row>
                              </Col>
                              <Col>
                                <Row>
                                  {navCategoryCol2.map((category) => (
                                    <Link
                                      to={`/${category}`}
                                      style={{ textDecoration: 'none' }}
                                      onClick={handleCategoryClose}
                                    >
                                      <ListItem disablePadding>
                                        <ListItemButton>
                                          <ListItemText primary={category} />
                                        </ListItemButton>
                                      </ListItem>
                                    </Link>
                                  ))}
                                </Row>
                              </Col>
                              <Col>
                                <Row>
                                  {navCategoryCol3.map((category) => (
                                    <Link
                                      to={`/${category}`}
                                      style={{ textDecoration: 'none' }}
                                      onClick={handleCategoryClose}
                                    >
                                      <ListItem disablePadding>
                                        <ListItemButton>
                                          <ListItemText primary={category} />
                                        </ListItemButton>
                                      </ListItem>
                                    </Link>
                                  ))}
                                </Row>
                              </Col>
                            </Row>
                          </Container1>
                        </Box>
                      </>
                    </Menu>
                  </>
                ) : (
                  <>
                    {/* <Toolbar>
                      <Button
                        sx={{ my: 2, color: 'black', display: 'block' }}
                        onClick={handleCategoryMenu}
                      >
                        Categories
                        <KeyboardArrowDownIcon />
                      </Button>
                      <Link to="/top-rated" style={{ textDecoration: 'none' }}>
                        <Button
                          sx={{ my: 2, color: 'black', display: 'block' }}
                        >
                          Top Rated
                        </Button>
                      </Link> 
                    </Toolbar> */}

                    {/* <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElCategory}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElCategory)}
                      onClose={handleCategoryClose}
                    >
                      <>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: 600,
                            minWidth: 210,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <Container1 fluid>
                            <Row>
                              <Col xs={8}>
                                <h3>Cuisines</h3>
                              </Col>
                              <Col xs={4}>
                                <h3>Time of Day</h3>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Row>
                                  {navCategoryCol1.map((category) => (
                                    <Link
                                      to={`/${category}`}
                                      style={{ textDecoration: 'none' }}
                                      onClick={handleCategoryClose}
                                    >
                                      <ListItem disablePadding>
                                        <ListItemButton>
                                          <ListItemText primary={category} />
                                        </ListItemButton>
                                      </ListItem>
                                    </Link>
                                  ))}
                                </Row>
                              </Col>
                              <Col>
                                <Row>
                                  {navCategoryCol2.map((category) => (
                                    <Link
                                      to={`/${category}`}
                                      style={{ textDecoration: 'none' }}
                                      onClick={handleCategoryClose}
                                    >
                                      <ListItem disablePadding>
                                        <ListItemButton>
                                          <ListItemText primary={category} />
                                        </ListItemButton>
                                      </ListItem>
                                    </Link>
                                  ))}
                                </Row>
                              </Col>
                              <Col>
                                <Row>
                                  {navCategoryCol3.map((category) => (
                                    <Link
                                      to={`/${category}`}
                                      style={{ textDecoration: 'none' }}
                                      onClick={handleCategoryClose}
                                    >
                                      <ListItem disablePadding>
                                        <ListItemButton>
                                          <ListItemText primary={category} />
                                        </ListItemButton>
                                      </ListItem>
                                    </Link>
                                  ))}
                                </Row>
                              </Col>
                            </Row>
                          </Container1>
                        </Box>
                      </>
                    </Menu> */}
                  </>
                )}
              </Box>

              {/* Right side of nav */}
              <Box sx={{ flexGrow: 0 }}>
                <Toolbar>
                  <form onSubmit={handleSearch}>
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Search>
                  </form>
                  <Tooltip title="Account">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="avatar"
                        src="https://recipereel.s3.us-west-1.amazonaws.com/profile.jff.png"
                      />
                    </IconButton>
                  </Tooltip>
                </Toolbar>
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
                  {/* Later on for login */}
                  {loggedIn ? (
                    <>
                      <Box
                        sx={{
                          width: '100%',
                          maxWidth: 360,
                          minWidth: 210,
                          bgcolor: 'background.paper',
                        }}
                      >
                        <nav aria-label="main mailbox folders">
                          <List>
                            <Link
                              to={`/profile/${name}`}
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseUserMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <PersonIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Profile" />
                                </ListItemButton>
                              </ListItem>
                            </Link>
                            <Link
                              to={`/following/${userId}`}
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseUserMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <DirectionsWalkIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Following" />
                                </ListItemButton>
                              </ListItem>
                            </Link>

                            <Link
                              to="/favorites"
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseUserMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <FavoriteIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Favorites" />
                                </ListItemButton>
                              </ListItem>
                            </Link>

                            <Link
                              to="/"
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseUserMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton onClick={logoutHandler}>
                                  <ListItemIcon>
                                    <LogoutIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Logout" />
                                </ListItemButton>
                              </ListItem>
                            </Link>
                          </List>
                        </nav>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          width: '100%',
                          maxWidth: 360,
                          minWidth: 210,
                          bgcolor: 'background.paper',
                        }}
                      >
                        <nav aria-label="main mailbox folders">
                          <List>
                            <Link
                              to="/login"
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseUserMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <LoginIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Login" />
                                </ListItemButton>
                              </ListItem>
                            </Link>

                            <Link
                              to="/register"
                              style={{ textDecoration: 'none' }}
                              onClick={handleCloseUserMenu}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <HowToRegIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Register" />
                                </ListItemButton>
                              </ListItem>
                            </Link>
                          </List>
                        </nav>
                      </Box>
                    </>
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <>
          <AppBar position="static" style={{ background: '#FFFFFF' }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'serif',
                    fontWeight: 'bolder',
                    letterSpacing: '.3rem',
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  RecipeReel
                </Typography>

                {/* Burger menu */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="black"
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
                    {loggedIn ? (
                      <>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: 360,
                            minWidth: 210,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <nav aria-label="main mailbox folders">
                            <List>
                              <Link
                                to="/recipes"
                                style={{ textDecoration: 'none' }}
                                onClick={handleCloseNavMenu}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="My Feed" />
                                  </ListItemButton>
                                </ListItem>
                              </Link>

                              <Link
                                to="/post-recipe"
                                style={{ textDecoration: 'none' }}
                                onClick={handleCloseNavMenu}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <AddBoxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Post" />
                                  </ListItemButton>
                                </ListItem>
                              </Link>

                              {/* <Link
                                to="/categories"
                                style={{ textDecoration: 'none' }}
                                onClick={handleCloseNavMenu}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <FormatListBulletedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Categories" />
                                  </ListItemButton>
                                </ListItem>
                              </Link> */}

                              {/* <Link
                                to="/top-rated"
                                style={{ textDecoration: 'none' }}
                                onClick={handleCloseNavMenu}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <StarIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Top Rated" />
                                  </ListItemButton>
                                </ListItem>
                              </Link> */}
                            </List>
                          </nav>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: 360,
                            minWidth: 210,
                            bgcolor: 'background.paper',
                          }}
                        >
                          {/* <nav aria-label="main mailbox folders">
                            <List>
                              <Link
                                to="/categories"
                                style={{ textDecoration: 'none' }}
                                onClick={handleCloseNavMenu}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <FormatListBulletedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Categories" />
                                  </ListItemButton>
                                </ListItem>
                              </Link>

                              <Link
                                to="/top-rated"
                                style={{ textDecoration: 'none' }}
                                onClick={handleCloseNavMenu}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <StarIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Top Rated" />
                                  </ListItemButton>
                                </ListItem>
                              </Link> 
                            </List>
                          </nav> */}
                        </Box>
                      </>
                    )}
                  </Menu>
                </Box>

                {/* Smaller screen Title */}
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'serif',
                    fontWeight: 'bolder',
                    letterSpacing: '.3rem',
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  RecipeReel
                </Typography>

                {/* next to website name */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {loggedIn ? (
                    <>
                      <Toolbar>
                        {/* <Button
                          sx={{ my: 2, color: 'black', display: 'block' }}
                          onClick={handleCategoryMenu}
                        >
                          Categories
                          <KeyboardArrowDownIcon />
                        </Button> */}
                        {/* <Link
                          to="/top-rated"
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            sx={{ my: 2, color: 'black', display: 'block' }}
                          >
                            Top Rated
                          </Button>
                        </Link> */}
                        <Link
                          to="/post-recipe"
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            sx={{ my: 2, color: 'black', display: 'block' }}
                          >
                            Create Post
                          </Button>
                        </Link>
                      </Toolbar>

                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElCategory}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElCategory)}
                        onClose={handleCategoryClose}
                      >
                        <>
                          <Box
                            sx={{
                              width: '100%',
                              maxWidth: 600,
                              minWidth: 210,
                              bgcolor: 'background.paper',
                            }}
                          >
                            <Container1 fluid>
                              <Row>
                                <Col xs={8}>
                                  <h3>Cuisines</h3>
                                </Col>
                                <Col xs={4}>
                                  <h3>Time of Day</h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Row>
                                    {navCategoryCol1.map((category) => (
                                      <Link
                                        to={`/${category}`}
                                        style={{ textDecoration: 'none' }}
                                        onClick={handleCategoryClose}
                                      >
                                        <ListItem disablePadding>
                                          <ListItemButton>
                                            <ListItemText primary={category} />
                                          </ListItemButton>
                                        </ListItem>
                                      </Link>
                                    ))}
                                  </Row>
                                </Col>
                                <Col>
                                  <Row>
                                    {navCategoryCol2.map((category) => (
                                      <Link
                                        to={`/${category}`}
                                        style={{ textDecoration: 'none' }}
                                        onClick={handleCategoryClose}
                                      >
                                        <ListItem disablePadding>
                                          <ListItemButton>
                                            <ListItemText primary={category} />
                                          </ListItemButton>
                                        </ListItem>
                                      </Link>
                                    ))}
                                  </Row>
                                </Col>
                                <Col>
                                  <Row>
                                    {navCategoryCol3.map((category) => (
                                      <Link
                                        to={`/${category}`}
                                        style={{ textDecoration: 'none' }}
                                        onClick={handleCategoryClose}
                                      >
                                        <ListItem disablePadding>
                                          <ListItemButton>
                                            <ListItemText primary={category} />
                                          </ListItemButton>
                                        </ListItem>
                                      </Link>
                                    ))}
                                  </Row>
                                </Col>
                              </Row>
                            </Container1>
                          </Box>
                        </>
                      </Menu>
                    </>
                  ) : (
                    <>
                      {/* <Toolbar>
                        <Button
                          sx={{ my: 2, color: 'black', display: 'block' }}
                          onClick={handleCategoryMenu}
                        >
                          Categories
                          <KeyboardArrowDownIcon />
                        </Button> 
                        <Link
                          to="/top-rated"
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            sx={{ my: 2, color: 'black', display: 'block' }}
                          >
                            Top Rated
                          </Button>
                        </Link> 
                      </Toolbar>

                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElCategory}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElCategory)}
                        onClose={handleCategoryClose}
                      >
                        <>
                          <Box
                            sx={{
                              width: '100%',
                              maxWidth: 600,
                              minWidth: 210,
                              bgcolor: 'background.paper',
                            }}
                          >
                            <Container1 fluid>
                              <Row>
                                <Col xs={8}>
                                  <h3>Cuisines</h3>
                                </Col>
                                <Col xs={4}>
                                  <h3>Time of Day</h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Row>
                                    {navCategoryCol1.map((category) => (
                                      <Link
                                        to={`/${category}`}
                                        style={{ textDecoration: 'none' }}
                                        onClick={handleCategoryClose}
                                      >
                                        <ListItem disablePadding>
                                          <ListItemButton>
                                            <ListItemText primary={category} />
                                          </ListItemButton>
                                        </ListItem>
                                      </Link>
                                    ))}
                                  </Row>
                                </Col>
                                <Col>
                                  <Row>
                                    {navCategoryCol2.map((category) => (
                                      <Link
                                        to={`/${category}`}
                                        style={{ textDecoration: 'none' }}
                                        onClick={handleCategoryClose}
                                      >
                                        <ListItem disablePadding>
                                          <ListItemButton>
                                            <ListItemText primary={category} />
                                          </ListItemButton>
                                        </ListItem>
                                      </Link>
                                    ))}
                                  </Row>
                                </Col>
                                <Col>
                                  <Row>
                                    {navCategoryCol3.map((category) => (
                                      <Link
                                        to={`/${category}`}
                                        style={{ textDecoration: 'none' }}
                                        onClick={handleCategoryClose}
                                      >
                                        <ListItem disablePadding>
                                          <ListItemButton>
                                            <ListItemText primary={category} />
                                          </ListItemButton>
                                        </ListItem>
                                      </Link>
                                    ))}
                                  </Row>
                                </Col>
                              </Row>
                            </Container1>
                          </Box>
                        </>
                      </Menu> */}
                    </>
                  )}
                </Box>

                {/* Right side of nav */}
                <Box sx={{ flexGrow: 0 }}>
                  <Toolbar>
                    <form onSubmit={handleSearch}>
                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search…"
                          inputProps={{ 'aria-label': 'search' }}
                        />
                      </Search>
                    </form>
                    <Tooltip title="Account">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="avatar"
                          src="https://recipereel.s3.us-west-1.amazonaws.com/profile.jff.png"
                        />
                      </IconButton>
                    </Tooltip>
                  </Toolbar>
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
                    {/* Later on for login */}
                    {loggedIn ? (
                      <>
                        <Box
                          sx={{
                            width: '100%',
                            maxWidth: 360,
                            minWidth: 210,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <nav aria-label="main mailbox folders">
                            <List>
                              <Link
                                to={`/profile/${name}`}
                                style={{ textDecoration: 'none' }}
                                onClick={handleCloseUserMenu}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                  </ListItemButton>
                                </ListItem>
                              </Link>

                              <Link
                                to={`/following/${userId}`}
                                style={{ textDecoration: 'none' }}
                                onClick={handleCloseUserMenu}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <DirectionsWalkIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Following" />
                                  </ListItemButton>
                                </ListItem>
                              </Link>

                              <Link
                                to="/favorites"
                                style={{ textDecoration: 'none' }}
                                onClick={handleCloseUserMenu}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <FavoriteIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Favorites" />
                                  </ListItemButton>
                                </ListItem>
                              </Link>

                              <Link
                                to="/"
                                style={{ textDecoration: 'none' }}
                                onClick={handleCloseUserMenu}
                              >
                                <ListItem disablePadding>
                                  <ListItemButton onClick={logoutHandler}>
                                    <ListItemIcon>
                                      <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                  </ListItemButton>
                                </ListItem>
                              </Link>
                            </List>
                          </nav>
                        </Box>
                      </>
                    ) : (
                      <></>
                    )}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </>
      )}
      <ToastContainer />
    </>
  );
}
export default Navbar;
