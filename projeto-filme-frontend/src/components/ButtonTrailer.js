import { Box, Button, Dialog } from "@mui/material"
import axios from "axios";
import { useState } from "react";


const ButtonTrailer = ({ idFilme }) => {

    const apiKey = '' //colocar sua chave api, encontrado no TMDB do google
    const id = idFilme

    const [trailer, setTrailer] = useState('')
    const [openTrailer, setOpenTrailer] = useState(false)

    const handleClickCloseTrailer = () => {
        setOpenTrailer(false)
    }

    const fetchMoviesTrailer = async () => {

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=pt-BR`);
            const trailerKey = response.data.results.length > 0 ? response.data.results[0].key : null;
            setTrailer(trailerKey);
            if (trailerKey) {
                setOpenTrailer(true); // Abre o modal se houver trailer
            } else {
                console.log('Nenhum trailer encontrado');
            }
        } catch (error) {
            console.log('Erro ao encontrar o trailer');
        }
    };

    return (

        <Box mt={2}>
            <Button variant="contained" sx={{ color: '#181818', backgroundColor: 'white', fontFamily: 'fantasy' }} onClick={() => fetchMoviesTrailer()}> Assitir Trailer</Button>
            <Dialog
                open={openTrailer}
                onClose={handleClickCloseTrailer}
                PaperProps={{
                    style: {
                        width: '90%', // Ajuste a largura do diálogo para 90% da tela
                        height: '80vh', // Ajuste a altura do diálogo para 80% da altura da tela
                        maxWidth: 'none', // Desabilita o maxWidth padrão do Dialog
                        maxHeight: 'none', // Limita a altura máxima do Dialog
                    },
                }}
            >
                {trailer && (
                    <Box sx={{ backgroundColor: 'black', position: 'relative', width: '100%', height: '100%' }}>
                        <iframe
                            width="100%" // A largura do iframe ocupará 100% da largura do diálogo
                            height="100%" // A altura do iframe ocupará 100% da altura do diálogo
                            src={`https://www.youtube.com/embed/${trailer}`}
                            title="Trailer"
                            allowFullScreen
                            style={{
                                border: 'none',
                                position: 'absolute', // Permite que o iframe ocupe todo o espaço disponível
                                top: 0,
                                left: 0,
                            }}
                        ></iframe>
                    </Box>
                )}
            </Dialog>
        </Box>
    )
}

export default ButtonTrailer