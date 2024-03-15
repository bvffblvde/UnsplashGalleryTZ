import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import {useLocation} from 'react-router-dom';
import {Box, CircularProgress, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SectionWrapper from "../SectionWrapper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    likes: {
        fontSize: '16px',
        color: '#90AFFF',
        fontFamily: 'Inter-Bold',
        fontWeight: 700,
        display: 'flex',
    },
    icon: {
        marginRight: '5px',
    },
    media: {
        width: '100%',
        height: '70vh',
        objectFit: 'cover',
        borderRadius: '12px',
        marginBottom: '20px',
    },
    name: {
        fontSize: '20px',
        color: '#90AFFF',
        fontFamily: 'Inter-Bold',
        fontWeight: 700,
        textTransform: 'uppercase',
    },
    headerSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    iconButton: {
        color: '#90AFFF',
        padding: '0',
        marginRight: '10px',
    }
}));

const ImageView = () => {
    const classes = useStyles();
    const location = useLocation();
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const imageId = location.pathname.split('/').pop();

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get(`https://api.unsplash.com/photos/${imageId}`, {
                    params: {
                        client_id: 'JzB_jrxvl8s29begx69UaZ3P4_08YGXSqyEPwnhTkZ0',
                    },
                });
                setImageData(response.data);
            } catch (error) {
                console.error('Error fetching image data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImageData();
    }, [imageId]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}>
                <CircularProgress color="primary"/>
            </div>
        );
    }

    const handleGoBack = () => {
        window.history.back();
    };

    if (!imageData) {
        return <div>Image not found</div>;
    }

    return (
        <SectionWrapper paddingTop="0">
            <Box className={classes.headerSection}>
                <IconButton onClick={handleGoBack} className={classes.iconButton}>
                    <ArrowBackIcon/>
                </IconButton>

                <Typography variant="h5" className={classes.name}>{imageData.alt_description}</Typography>
            </Box>
            <img src={imageData.urls.full} alt={imageData.alt_description} className={classes.media}/>
            <Box className={classes.content}>
                <Typography variant="body1" className={classes.name}>{imageData.user.username}</Typography>
                <div className={classes.likes}>
                    <FavoriteIcon className={classes.icon}/>
                    {imageData.likes}
                </div>
            </Box>
        </SectionWrapper>
    );
};

export default ImageView;



