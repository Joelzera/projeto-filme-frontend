import { Box, Button, Card, CardContent, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const TabPainel = () => {

  const [login, setLogin] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const onSubmitLogin = async (e) => {
    e.preventDefault()
    console.log('login', login)

    const response = await axios.post('http://localhost:4000/user/login', login, {
      headers: {
        'Content-type': 'application/json',

      },

    })
    if (response.status === 200) {
      const data = response.data
      console.log(data.token)
      localStorage.setItem("token", data.token)
      localStorage.setItem("id", data.id)
      const token = localStorage.getItem("token")
      const id = localStorage.getItem("id")
      if (typeof id === "string" && id !== "undefined" && typeof token === "string" && token !== "undefined") navigate('/')
      return null
    }
  }


  return (

    <Card sx={{
      minWidth: 275,
      width: {
        xs: 450,    //  para telas pequenas (xs)
        sm: 500,    // para telas pequenas médias (sm)
        md: 700,    // para telas médias (md)
        lg: 800,    //  para telas grandes (lg)
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#1a1a1a', // Fundo branco com 50% de opacidade
      backdropFilter: 'blur(10px)', // Adiciona um efeito de desfoque no fundo
      borderRadius: 2, // Adiciona bordas arredondadas
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }}>
      <CardContent sx={{ textAlign: 'center', margin: 5, width: '60%' }}> {/* Centraliza o texto */}
        <Typography variant="h4" color='white'>
          Entrar
        </Typography>
        <Typography variant="h5" color='white'>
          Digite o endereço de e-mail e senha da sua conta MovieVerso
        </Typography>
        <Box sx={{ marginTop: 5, textAlign: 'initial' }}>
          <form onSubmit={onSubmitLogin}>
            <Typography color='white'>Endereço de e-mail</Typography>
            <TextField focused id="email"
              sx={{
                width: '100%',
                '& .MuiInputBase-root': {
                  color: 'white', // Cor do texto dentro do TextField
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Cor da borda do TextField
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Cor da borda ao passar o mouse
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Cor da borda quando o TextField está focado
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'white', // Cor do texto da etiqueta
                },
                '& .MuiInputLabel-shrink': {
                  color: 'white', // Cor da etiqueta quando está encolhida
                },
              }} onInput={e => setLogin({ ...login, email: e.target.value })} />

            <Typography color='white'>Senha</Typography>

            <TextField
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'hide password' : 'show password'}
                      onClick={handleClickShowPassword}
                      edge="end"
                    >

                      {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: '100%',
                '& .MuiInputBase-root': {
                  color: 'white', // Cor do texto dentro do TextField
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Cor da borda do TextField
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Cor da borda ao passar o mouse
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Cor da borda quando o TextField está focado
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'white', // Cor do texto da etiqueta
                },
                '& .MuiInputLabel-shrink': {
                  color: 'white', // Cor da etiqueta quando está encolhida
                },
              }} onInput={e => setLogin({ ...login, password: e.target.value })}
            />

            <Button sx={{ marginTop: 2 }} variant="contained" size="large" type="submit">Entrar</Button>
          </form>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TabPainel