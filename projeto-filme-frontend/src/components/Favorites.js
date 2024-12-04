import { Box, Dialog, Fab, Grid, Typography } from "@mui/material"
import NewAppBar from "./NewAppBar"
import { useEffect, useState } from "react"
import axios from "axios"
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ButtonTrailer from "./ButtonTrailer";


const Favorites = () => {

    const [favorites, setFavorites] = useState([])
    const imagem = 'https://image.tmdb.org/t/p/w500/'
    const [open, setOpen] = useState(false)
    const [selectMovie, setSelectMovie] = useState(null)

    useEffect(() => {
        const idUser = localStorage.getItem('id')
        const fetchFavoriteMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/filmes-favoritos/${idUser}`)
                setFavorites(response.data)
            } catch (error) {
                console.error(error, 'nao foi encontrado os filmes favoritos')
            }
        }
        fetchFavoriteMovie()
    }, [])

    const handleClickFab = async (movie) => {
        const idUser = localStorage.getItem("id")
        if (!idUser) {
            console.error('erro na autenticação do usuario')
            return
        }
        try {
            if (checkIcon(movie.idFilme)) {
                await axios.delete('http://localhost:4000/filmes-favoritos/delete', {
                    data: {
                        idFilme: movie.idFilme,
                        idUser: idUser,
                    }
                })
                const deleteFilme = favorites.filter(favorite => favorite.idFilme !== movie.idFilme)
                setFavorites(deleteFilme)
            }
            else {
                await axios.post('http://localhost:4000/filmes-favoritos', {
                    idFilme: movie.idFilme,
                    idUser: idUser,
                    title: movie.title,
                    overview: movie.overview,
                    poster_path: movie.poster_path
                })

                setFavorites([...favorites, movie])
            }
        } catch (error) {
            console.error('erro ao favoritar o filme')
        }
    }

    const handleClickOpen = (movie) => {
        setSelectMovie(movie)

        setOpen(true)
    }

    const handleClickClose = () => {
        setSelectMovie(null)
        setOpen(false)
    }

    const checkIcon = (id) => {
        return favorites.some(favorite => favorite.idFilme === id)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container xs={12} md={12} sx={{ background: 'linear-gradient(145deg, #851d86, #5c2a5b)', height: '100%', minHeight: '100vh' }}>
                <Grid item xs={12} md={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginRight: 8 }}>
                        <Typography variant="h4" color='white' fontFamily='fantasy'>
                            Meus Filmes Favoritos
                        </Typography>
                    </Box>
                    <Box sx={{ margin: 2 }}>
                        <Grid container spacing={2} justifyContent='center'>
                            {favorites.map((movie) => (
                                <Grid item xs={12} sm={6} md={4} mt={4} key={movie.id} >
                                    <img
                                        key={movie.id}
                                        src={`${imagem}${movie.poster_path}`}
                                        alt={movie.id}
                                        height='auto'
                                        width='90%'
                                        onClick={() => handleClickOpen(movie)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box display='flex' alignItems='center' color='white' justifyContent='center' margin={5}>
                        <LiveTvIcon sx={{ margin: 0.5 }} fontSize="large" />
                        <Typography variant="h3" fontFamily={"fantasy"}>
                            MovieVerso
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={12} sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                    <NewAppBar />
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClickClose}
                PaperProps={{
                    style: {
                        width: '35%', // Ajuste a largura do diálogo
                        height: '95%', // Ajuste a altura do diálogo
                        overflow: 'hidden'
                    },
                }}
            >
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, padding: 2, boxSizing: 'border-box', backgroundColor: '#181818', minHeight: 300 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h4" color='white' fontFamily='fantasy'>{selectMovie?.title}</Typography>
                        <Fab aria-label="add" size="small" sx={{ marginLeft: 2 }} onClick={() => handleClickFab(selectMovie)}>
                            {checkIcon(selectMovie?.idFilme) ? <CheckIcon /> : <AddIcon />}
                        </Fab>
                    </Box>
                    <Typography variant="h6" color='white' mt={2} >{selectMovie?.overview}</Typography>
                    <ButtonTrailer idFilme={selectMovie?.idFilme} />
                </Box>
                <img
                    src={`${imagem}${selectMovie?.poster_path}`}
                    alt={selectMovie?.id}
                    width='100%'
                    height='auto'
                />
            </Dialog>
        </Box>
    )
}

export default Favorites