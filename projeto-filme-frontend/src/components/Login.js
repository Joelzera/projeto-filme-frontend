import Grid from '@mui/material/Grid';
import LabTabs from './TabPanel';

const Login = () => {
    return (
        <>
            <Grid container sx={{ backgroundColor: '#2a2a2a', maxWidth: '100%', maxHeight: '100%', display: 'flex', justifyContent: 'center'}}>
                <Grid item>
                    <LabTabs/>
                </Grid>
            </Grid>
        </>
    )
}

export default Login;