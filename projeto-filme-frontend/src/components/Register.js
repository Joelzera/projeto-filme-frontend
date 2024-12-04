import { Grid } from "@mui/material"
import LoginAppRegister from "./LoginAppRegister"
import TabPainelRegister from "./TabRegister"


const Register = () => {
    return (
        <Grid container sx={{ background: 'linear-gradient(145deg, #851d86, #5c2a5b)', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <Grid item >
                <TabPainelRegister />
            </Grid>
            <Grid item xs={12} md={12} sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <LoginAppRegister />
            </Grid>
        </Grid>
    )
}

export default Register