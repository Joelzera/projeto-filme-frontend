import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useNavigate } from "react-router-dom";


const LoginApp = () => {

  const navigate = useNavigate()

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <LiveTvIcon sx={{ margin: 0.5 }} />
        <Typography variant="h5" fontFamily={"fantasy"} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          MovieVerso
        </Typography>
        <Box>
          <Button variant="text" size="large" sx={{ color: '#fff' }} onClick={() => navigate('/login/register')}>Cadastre-se Agora</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default LoginApp