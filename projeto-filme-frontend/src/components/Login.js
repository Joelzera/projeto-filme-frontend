import Grid from '@mui/material/Grid';
import TabPainel from './TabPainel';
import LoginApp from './LoginApp';


const Login = () => {
    return (
        <>
            <Grid container sx={{ background: 'linear-gradient(145deg, #851d86, #5c2a5b)', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                <Grid item>
                    <TabPainel />
                </Grid>
                <Grid item xs={12} md={12} sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                    <LoginApp />
                </Grid>
            </Grid>
        </>
    )
}

export default Login;