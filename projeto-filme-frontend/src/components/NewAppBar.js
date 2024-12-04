import { AppBar, Avatar, Box, Button, Select, Toolbar, Typography } from "@mui/material"
import SearchButton from "./SearchButton"
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from "axios";


const NewAppBar = () => {

  const navigate = useNavigate()
  const [age, setAge] = useState('')
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [image, setImage] = useState('')

  useEffect(() => {
    const idUser = localStorage.getItem('id')
    const getImg = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/img/${idUser}`)

        setImage(response.data[0].img)
        console.log(response.data[0].img)

      } catch (error) {
        console.log(error, 'nao foi possivel achar a imagem')
      }
    }
    getImg()
  }, [])



  const handleClickExit = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <LiveTvIcon sx={{ margin: 0.5 }} />
          <Typography variant="h5" fontFamily={"fantasy"} sx={{ flexGrow: 0.6, display: { xs: 'none', sm: 'block' } }}>
            MovieVerso
          </Typography>
          <Box flexGrow={0.5}>
            <Button variant="text" size="large" sx={{ color: '#fff' }} onClick={() => navigate('/')}>Inicio</Button>
            <Button variant="text" size="large" sx={{ color: '#fff' }} onClick={() => navigate('/favoritos')}>Favoritos</Button>
            <Button variant="text" size="large" sx={{ color: '#fff' }} onClick={() => navigate('/profile')}>Perfil</Button>
          </Box>
          <SearchButton />
          <Avatar variant="rounded" src={`http://localhost:4000/imagens/${image}`} sx={{ height: "4vh", marginLeft: 1 }} />
          <Box>
            <Select
              sx={{
                marginLeft: 2,
                height: 40,
                border: 'none', // Remove a borda
                backgroundColor: 'transparent', // Fundo transparente
                '& .MuiSelect-select': {
                  padding: 0, // Remove o padding padrão
                  display: 'flex', // Para alinhar o conteúdo
                  alignItems: 'center', // Centraliza o conteúdo
                },
                '.MuiSelect-icon': {
                  color: 'white',
                  fontSize: 30,
                },
                '.MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                marginRight: 5,
              }}
              value={age || ''}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#2a2a2a', // Cor de fundo do menu
                    borderRadius: 1,

                  },
                },
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                sx={{
                  padding: 2, // Adiciona padding para ocupar espaço                 
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ExitToAppIcon sx={{ color: 'white' }} />
                  <Button size="small" sx={{ color: 'white' }} onClick={handleClickExit}>
                    Sair
                  </Button>
                </Box>
              </Box>
            </Select>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default NewAppBar