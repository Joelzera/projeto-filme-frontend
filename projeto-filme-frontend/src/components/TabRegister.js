import { Alert, Box, Button, Card, CardContent, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const TabPainelRegister = () => {

  const [register, setRegister] = useState({ name: '', email: '', password: '' })
  const [openAlert, setOpenAlert] = useState(false)
  const [openAlertError, setOpenAlertError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleCloseAlert = () => {
    setOpenAlert(false)

  }

  const handleCloseAlertError = () => {
    setOpenAlertError(false)
  }

  const onSubmitRegister = async (e) => {
    e.preventDefault()
    console.log('submit', register)
    try {
      const response = await axios.post('http://localhost:4000/user', register, {
        headers: { 'Content-type': 'application/json', },
      })

      console.log(response.data)
      setOpenAlert(true)
    } catch (error) {
      console.log(error, 'usuario nao registrado')
      setOpenAlertError(true)
    }

  }

  return (
    <>
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
            Cadastrar
          </Typography>
          <Typography variant="h5" color='white'>
            Digite seu nome, endereço de e-mail e senha para criar sua conta no MovieVerso
          </Typography>
          <Box sx={{ marginTop: 5, textAlign: 'initial' }}>
            <form onSubmit={onSubmitRegister}>
              <Typography color='white'>Nome</Typography>
              <TextField focused id="name" required
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
                }} onInput={e => setRegister({ ...register, name: e.target.value })} />

              <Typography color='white' marginTop={2}>Endereço de e-mail</Typography>
              <TextField focused id="email" required
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
                }} onInput={e => setRegister({ ...register, email: e.target.value })} />

              <Typography color='white' marginTop={2}>Senha</Typography>
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
                }} onInput={e => setRegister({ ...register, password: e.target.value })} />
              <Button sx={{ marginTop: 2 }} variant="contained" size="large" type="submit">Cadastrar-se</Button>
            </form>
          </Box>
        </CardContent>
      </Card>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} sx={{ marginTop: 5 }}>
        <Alert severity="success" variant="filled">
          Cadastro feito com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={openAlertError} autoHideDuration={3000} onClose={handleCloseAlertError} sx={{ marginTop: 5 }}>
        <Alert severity="error" variant="filled">
          Cadastro não realizado, email ou senha ja existente!
        </Alert>
      </Snackbar>
    </>
  )
}

export default TabPainelRegister