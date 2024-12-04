import { Box, Dialog, Grid, Typography } from "@mui/material"
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NewAppBar from "./NewAppBar";
import ButtonTrailer from "./ButtonTrailer";
import FabIcon from "./FabIcon";


const Search = () => {

    const search = 'https://api.themoviedb.org/3/search/movie'
    const apiKey = '' //colocar sua chave api, encontrado no TMDB do google
    const imagem = 'https://image.tmdb.org/t/p/w500/'

    const [buscar] = useSearchParams()
    const query = buscar.get('q') || ''
    const [searchMovies, setSearchMovies] = useState([])
    const [open, setOpen] = useState(false)
    const [selectMovie, setSelectMovie] = useState(null)

    const handleClickOpen = (movie) => {
        setSelectMovie(movie)
        console.log(movie.id)
        setOpen(true)
    }

    const handleClickClose = () => {
        setSelectMovie(null)
        setOpen(false)
    }

    useEffect(() => {
        const fetchSearchMovie = async () => {
            if (!query) return
            try {
                const response = await axios.get(search, {
                    params: {
                        api_key: apiKey,
                        language: 'pt-BR',
                        query: query
                    }
                }
                )
                console.log(response.data.results)
                setSearchMovies(response.data.results)
            } catch (error) {
                console.error('erro na busca dos filmes', error)
            }
        }
        fetchSearchMovie()
    }, [query])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container xs={12} md={12} sx={{ background: 'linear-gradient(145deg, #851d86, #5c2a5b)', height: '100%', width: '100%' }}>
                <Grid item xs={12} md={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginRight: 8 }}>
                        <Typography variant="h4" color='white' fontFamily='fantasy'>
                            Resultados para : {query}
                        </Typography>
                    </Box>
                    <Box sx={{ margin: 2 }}>
                        <Grid container justifyContent="center">
                            {searchMovies.map((movie) => (
                                <Grid item xs={12} sm={6} md={4} mt={4} key={movie.id}>
                                    <img
                                        key={movie.id}
                                        src={`${imagem}${movie.poster_path}`}
                                        alt={movie.title}
                                        height='auto'
                                        width='90%'
                                        onClick={() => handleClickOpen(movie)}
                                    />
                                </Grid>

                            ))}
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
                                    <FabIcon filme={selectMovie} />
                                </Box>
                                <Typography variant="h6" color='white' mt={2} >{selectMovie?.overview}</Typography>
                                <ButtonTrailer idFilme={selectMovie?.id} />
                            </Box>
                            <img
                                src={`${imagem}${selectMovie?.poster_path}`}
                                alt={selectMovie?.title}
                                width='100%'
                                height='auto'
                            />
                        </Dialog>
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
        </Box>
    )
}

export default Search