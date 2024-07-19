import { alpha, AppBar, Box, Button, Grid, InputBase, styled, Toolbar, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import teste from './img/image.jpg'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  


const Home = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={12}>
                    <img src={teste} alt="background" style={{ width: '100%', height: '100vh', objectFit: 'cover', position: 'absolute', zIndex: -1 }} />
                </Grid>
                <Grid item xs={12} md={12} sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                        <Toolbar>
                            <LiveTvIcon sx={{margin: 0.5}}/>
                            <Typography variant="h5" fontFamily={"fantasy"} sx={{ flexGrow: 0.5, display: { xs: 'none', sm: 'block' } }}>
                                MovieVerso
                            </Typography>
                            <Box flexGrow={0.5}>
                                <Button>home</Button>
                                <Button>Movies</Button>
                                <Button>Series</Button>
                            </Box>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase/>
                            </Search>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item sx={12} md={12}>
                    <Box sx={{ marginTop: '35%', marginLeft: '1%', color: 'white'}}>
                        <Typography variant="h1" fontFamily={"fantasy"}>
                            The Boys
                        </Typography>
                        <Typography>
                        A série The Boys, lançada em 2019, é uma obra original do Amazon Prime Video, 
                        com um total de três temporadas e 24 episódios, até o momento. A trama, desenvolvida por Eric Kripke, 
                        segue um grupo de vigilantes cujo único trabalho é vigiar e manter os super-heróis corrompidos sob controle. 
                        A produção norte-americana é baseada nas histórias em quadrinhos de mesmo nome, criadas por Garth Ennis e Darick Robertson.
                        </Typography>
                        <Button variant="contained" sx={{ backgroundColor: '#2a2a2a'}}>Assistir Trailer</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home;