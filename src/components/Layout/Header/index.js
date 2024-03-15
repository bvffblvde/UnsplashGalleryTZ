import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Box} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: '#1E1E1E',
        boxShadow: 'none',
        transition: "all 0.3s ease-out",
    },
    toolbar: {
        padding: '10px 30px',
        margin: '20px 40px',
        borderRadius: '12px',
        border: '2px solid #90AFFF',
        [theme.breakpoints.down('sm')]: {
            margin: '20px',
            display: 'flex',
            justifyContent: 'center',
            padding: '0',
        },
        [theme.breakpoints.up('lg')]: {
            margin: '20px 100px'
        },
        [theme.breakpoints.up('xl')]: {
            margin: '20px 150px'
        }
    },
    logoBlock: {
        fontSize: '24px',
        fontWeight: 700,
        fontFamily: 'Inter-Bold',
        color: '#90AFFF',

    }
}));

function Header() {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Box>
                    <Typography className={classes.logoBlock}>
                            Unsplash Gallery
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;