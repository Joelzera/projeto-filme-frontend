import { Box, Dialog, Grid, Typography } from "@mui/material"
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useEffect, useState } from "react";
import axios from 'axios'
import LiveTvIcon from '@mui/icons-material/LiveTv';
import NewAppBar from "./NewAppBar";
import ButtonTrailer from "./ButtonTrailer";
import FabIcon from "./FabIcon";


const Home = () => {

  const apiKey = '' //colocar sua chave api, encontrado no TMDB do google
  const imagem = 'https://image.tmdb.org/t/p/w500/'
  const url1 = 'https://api.themoviedb.org/3/movie/now_playing'
  const url2 = 'https://api.themoviedb.org/3/movie/popular'
  const url3 = 'https://api.themoviedb.org/3/tv/popular'
  const url4 = 'https://api.themoviedb.org/3/movie/top_rated'

  const [movies, setMovies] = useState([])
  const [movies2, setMovies2] = useState([])
  const [series, setSeries] = useState([])
  const [topMovies, setTopMovies] = useState([])
  const [open, setOpen] = useState(false)
  const [selectMovie, setSelectMovie] = useState(null)

  const handleClickOpen = (movie) => {
    setSelectMovie(movie)
    console.log(movie)
    setOpen(true)
  }

  const handleClickClose = () => {
    setSelectMovie(null)
    setOpen(false)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await axios.get(url1,
        {
          params: {
            api_key: apiKey, // Substitua com sua chave de API
            language: 'pt-BR',
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: false,
            page: 1,
          },
        }
      );
      setMovies(response.data.results);
      const response2 = await axios.get(url2,
        {
          params: {
            api_key: apiKey,
            language: 'pt-BR',
          }
        }
      )
      setMovies2(response2.data.results)
      const response3 = await axios.get(url4, {
        params: {
          api_key: apiKey,
          language: 'pt_BR'
        }
      }
      )
      setTopMovies(response3.data.results)
      const response4 = await axios.get(url3,
        {
          params: {
            api_key: apiKey,
            language: 'pt-BR',
          }
        }
      )
      setSeries(response4.data.results)
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3  // opcional, padrão 1. 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2  // opcional, padrão 1. 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1  // opcional, padrão 1. 
    }
  };

  const responsiveFilme = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      slidesToSlide: 8  // opcional, padrão 1. 
    },
    desktop2: {
      breakpoint: { max: 1440, min: 1095 },
      items: 6,
      slidesToSlide: 6  // opcional, padrão 1. 
    },
    tablet: {
      breakpoint: { max: 1024, min: 876 },
      items: 4,
      slidesToSlide: 4  // opcional, padrão 1. 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2  // opcional, padrão 1. 
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container  >
        <Grid item xs={12} md={12} sx={{ background: 'linear-gradient(145deg, #851d86, #5c2a5b)', height: '100%' }}>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {movies.map((movie) => (
              <Box key={movie.id} sx={{ position: 'relative', width: '100%', overflow: 'hidden', height: '90vh' }}>
                <img
                  key={movie.id}
                  src={`${imagem}${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  onClick={() => handleClickOpen(movie)}
                />
              </Box>
            ))}
          </Carousel>
          <Typography variant="h4" color='white' fontFamily='fantasy' margin={1}> Filmes Recomendados</Typography>
          <Carousel
            responsive={responsiveFilme}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {movies2.map((movie2) => (
              <Box key={movie2.id} marginLeft={1}>
                <img
                  key={movie2.id}
                  src={`${imagem}${movie2.poster_path}`}
                  alt={movie2.title}
                  height='300px'
                  width='90%'
                  onClick={() => handleClickOpen(movie2)}
                />
              </Box>
            ))}
          </Carousel>
          <Typography variant="h4" color='white' fontFamily='fantasy' margin={1}>Series</Typography>
          <Carousel
            responsive={responsiveFilme}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {series.map((serie) => (
              <Box key={serie.id} marginLeft={1}>
                <img
                  key={serie.id}
                  src={`${imagem}${serie.poster_path}`}
                  alt={serie.title}
                  height='300px'
                  width='90%'
                  onClick={() => handleClickOpen(serie)}
                />
              </Box>
            ))}
          </Carousel>
          <Typography variant="h4" color='white' fontFamily='fantasy' margin={1}>Aclamados pela Critica</Typography>
          <Carousel
            responsive={responsiveFilme}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {topMovies.map((topmovie) => (
              <Box key={topmovie.id} marginLeft={1}>
                <img
                  key={topmovie.id}
                  src={`${imagem}${topmovie.poster_path}`}
                  alt={topmovie.title}
                  height='300px'
                  width='90%'
                  onClick={() => handleClickOpen(topmovie)}
                />
              </Box>
            ))}
          </Carousel>
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
            width: '60%', // Ajuste a largura do diálogo
            height: '95%', // Ajuste a altura do diálogo
            overflow: 'hidden'
          },
        }}
      >
        <img
          src={`${imagem}${selectMovie?.poster_path}`}
          alt={selectMovie?.title}
          width='100%'
          height='100%'
        />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, padding: 2, boxSizing: 'border-box', backgroundColor: '#181818', minHeight: 300 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" color='white' fontFamily='fantasy'>{selectMovie?.title || selectMovie?.name}</Typography>
            <FabIcon filme={selectMovie} />
          </Box>
          <Typography variant="h6" color='white' mt={2} >{selectMovie?.overview}</Typography>
          <ButtonTrailer idFilme={selectMovie?.id} />
        </Box>
      </Dialog>
    </Box>
  )
}

export default Home;