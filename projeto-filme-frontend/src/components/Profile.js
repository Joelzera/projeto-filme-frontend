import { Alert, Avatar, Box, Button, Card, CardContent, Grid, Snackbar, TextField, Typography } from "@mui/material"
import NewAppBar from "./NewAppBar"
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import axios from "axios";


const Profile = () => {

    const [image, setImage] = useState('')
    const [dataUpdate, setDataUpdate] = useState({ name: '', email: '' })
    const [openAlert, setOpenAlert] = useState(false)
    const [openAlertError, setOpenAlertError] = useState(false)


    const handleCloseAlert = () => {
        setOpenAlert(false)
    }
    const handleCloseAlertError = () => {
        setOpenAlertError(false)
    }


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



    const handleChangeFiles = async (e) => {
        const files = e.target.files[0];
        const idUser = localStorage.getItem('id')
        console.log(files)

        if (!files) {
            console.log('nenhum aquivo encontrado')
            return
        }
        const form = new FormData()
        form.append('file', files)
        console.log(Array.from(form))

        try {
            const response = await axios.post(`http://localhost:4000/user/${idUser}`, form)
            console.log(response.data)
            console.log('deu certo')
            window.location.reload(true)

        } catch (error) {
            console.log(error, 'imagem nao encontrada')
        }
    };



    const userData = async () => {
        const idUser = localStorage.getItem('id')
        try {
            const response = await axios.get(`http://localhost:4000/user/${idUser}`)
            console.log(response.data)
            setDataUpdate({
                name: response.data[0].name,
                email: response.data[0].email
            })
        } catch (error) {
            console.log(error, 'usuario nao encontrado')
        }
    }

    useEffect(() => {
        userData()
    }, [])

    const onSubmitUpdateData = async (e) => {
        e.preventDefault()
        const idUser = localStorage.getItem('id')
        try {
            const result = await axios.post(`http://localhost:4000/user/email`)
            const dataEmail = result.data
            const emailExistente = dataEmail.some(user => user.email === dataUpdate.email)
            if (emailExistente) {
                console.log('email ja existente')
                setOpenAlertError(true)
                return
            }
            const response = await axios.patch(`http://localhost:4000/user/${idUser}`, dataUpdate)
            console.log(response.data)
            setOpenAlert(true)
        } catch (error) {
            console.log('erro', error)
        }
    }

    return (

        <Grid container xs={12} md={12} sx={{ background: 'linear-gradient(145deg, #851d86, #5c2a5b)', height: '100%', minHeight: '100vh' }}>
            <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }} xs={12} md={12}>
                <Card sx={{
                    width: {
                        xs: 450,    //  para telas pequenas (xs)
                        sm: 500,    // para telas pequenas médias (sm)
                        md: 500,    // para telas médias (md)
                        lg: 500,    //  para telas grandes (lg)
                    },
                    height: 800,
                    mt: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#1a1a1a',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}>
                    <CardContent sx={{ mt: 10 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 10 }}>
                            <Avatar variant="rounded" src={`http://localhost:4000/imagens/${image}`} sx={{ marginRight: 2, width: 100, height: 100 }}></Avatar>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 5 }}>
                                <EditIcon sx={{ color: 'white' }} />
                                <label htmlFor="file-upload-button">
                                    <Button component="span" sx={{ color: 'white' }} size="small">
                                        Alterar Foto
                                    </Button>
                                    <input
                                        id="file-upload-button"
                                        type="file"
                                        name="imagem"
                                        onChange={(e) => {
                                            console.log('Input changed:', e.target.files);
                                            handleChangeFiles(e);
                                        }}
                                        accept="image/*"
                                        style={{ display: 'none' }} // Oculta o input
                                    />
                                </label>
                            </Box>
                        </Box>
                        <form onSubmit={onSubmitUpdateData}>
                            <Typography color='white'>Nome</Typography>
                            <TextField focused
                                value={dataUpdate.name}
                                onChange={(e) => setDataUpdate({ ...dataUpdate, name: e.target.value })}
                                sx={{
                                    mb: 5,
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
                                }}></TextField>
                            <Typography color='white'>Email</Typography>
                            <TextField focused
                                value={dataUpdate.email}
                                onChange={(e) => setDataUpdate({ ...dataUpdate, email: e.target.value })}
                                sx={{
                                    mb: 5,
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
                                }}></TextField>
                            <Button variant="contained" type="submit">Salvar</Button>
                        </form>
                    </CardContent>
                    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} >
                        <Alert severity="success" variant="filled">
                            Atualizado com sucesso!
                        </Alert>
                    </Snackbar>
                    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openAlertError} autoHideDuration={3000} onClose={handleCloseAlertError} >
                        <Alert severity="error" variant="filled">
                            Email ja existente, por favor tente outro!
                        </Alert>
                    </Snackbar>
                </Card>
            </Grid>
            <Grid item xs={12} md={12} sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <NewAppBar />
            </Grid>
        </Grid>

    )
}

export default Profile