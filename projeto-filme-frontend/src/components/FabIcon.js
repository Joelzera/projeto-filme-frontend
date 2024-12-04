import { Fab } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import { useEffect, useState } from "react";


const FabIcon = ({ filme }) => {

    const movie = filme
    const [favorites, setFavorites] = useState([])

    const fetchFavoriteMovie = async () => {
        const idUser = localStorage.getItem('id')
        try {
            const response = await axios.get(`http://localhost:4000/filmes-favoritos/${idUser}`)
            setFavorites(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error, 'nao foi encontrado os filmes favoritos')
        }
    }
    useEffect(() => {
        fetchFavoriteMovie()
    }, [])

    const postFavoriteMovies = async () => {
        const idUser = localStorage.getItem('id')
        await axios.post('http://localhost:4000/filmes-favoritos', {
            idFilme: movie.id,
            idUser: idUser,
            title: movie.title,
            overview: movie.overview,
            poster_path: movie.poster_path
        })
        fetchFavoriteMovie()
    }

    const deleteFavoriteMovie = async () => {
        const idUser = localStorage.getItem('id')
        await axios.delete('http://localhost:4000/filmes-favoritos/delete', {
            data: {
                idFilme: movie.id,
                idUser: idUser,
            }
        })
        const deleteFilme = favorites.filter(favorite => favorite.idFilme !== movie.id)
        setFavorites(deleteFilme)
        fetchFavoriteMovie()
    }

    const handleClickFab = async (movie) => {
        const idUser = localStorage.getItem("id")
        if (!idUser) {
            console.error('erro na autenticação do usuario')
            return
        }
        try {
            if (checkIcon(movie.id)) {
                deleteFavoriteMovie()
                fetchFavoriteMovie()
            }
            else {
                postFavoriteMovies()
                fetchFavoriteMovie()
            }

        } catch (error) {
            console.error('erro ao favoritar o filme')
        }
    }

    const checkIcon = (id) => {
        return favorites.some(favorite => favorite.idFilme === id)

    }

    return (
        <Fab aria-label="add" size="small" sx={{ marginLeft: 2 }} onClick={() => handleClickFab(movie)}>
            {checkIcon(movie?.id) ? <CheckIcon /> : <AddIcon />}
        </Fab>
    )
}

export default FabIcon