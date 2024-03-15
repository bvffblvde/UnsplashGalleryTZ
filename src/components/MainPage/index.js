import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import SectionWrapper from "../UI/SectionWrapper";
import Button from "@material-ui/core/Button";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: 20,
        border: '2px solid #90AFFF',
        borderRadius: '12px',
        transition: 'all 0.3s ease-out',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
            boxShadow: '0 0 10px rgba(144, 175, 255,0.7)',
            transform: 'scale(1.02)',
            '& $mediaOverlay': {
                opacity: 0.5,
            },
            '& $title': {
                opacity: 1,
            },
        }
    },
    media: {
        height: '40vh',
        width: '100%',
        transition: 'all 0.3s ease-out',
        [theme.breakpoints.down('sm')]: {
            height: '30vh',
        }
    },
    mediaOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0,
        transition: 'opacity 0.3s ease-out',
        borderRadius: '12px',
    },
    title: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#90AFFF',
        textTransform: 'uppercase',
        fontFamily: 'Inter-Bold',
        fontSize: '16px',
        fontWeight: 'bold',
        opacity: 0,
        transition: 'opacity 0.3s ease-out',
        textAlign: 'center',
    },
    author: {
        fontSize: '16px',
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontWeight: 700,
        textTransform: 'uppercase',
        flexShrink: 0,
        overflow: 'hidden',
        flex: '1',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    authorSection: {
        backgroundColor: '#90AFFF',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
    },
    button: {
        width: '100%',
        marginTop: 20,
        borderRadius: '12px',
        backgroundColor: '#90AFFF',
        border: '2px solid #90AFFF',
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontWeight: 700,
        fontSize: '16px',
        transition: 'all 0.3s ease-out',
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#90AFFF',
        }
    },
    likes: {
        fontSize: '16px',
        flex: '1',
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        width: 'calc(50% - 10px)',
        flexGrow: 1,
    }
}));


const ImageList = () => {
    const classes = useStyles();
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const perPage = 10;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://api.unsplash.com/photos', {
                    params: {
                        client_id: 'JzB_jrxvl8s29begx69UaZ3P4_08YGXSqyEPwnhTkZ0',
                        page: page,
                        per_page: perPage,
                        w: 1200,
                        h: 800,
                        fit: 'crop',
                    }
                });
                setImages(prevImages => [...prevImages, ...response.data]);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, [page]);

    const handleShowMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleImageClick = (image) => {
        console.log('Image clicked:', image);
    }


    return (
        <SectionWrapper paddingTop="20px">
            <div className={classes.container}>
                {images.map((image, index) => (
                    <Link to={{ pathname: `/image/${image.id}`, state: { image } }} key={image.id} className={classes.link}>
                        <Card key={image.id} className={classes.card} onClick={() => handleImageClick(image)}>
                            <CardMedia
                                className={classes.media}
                                image={image.urls.small}
                                title={image.alt_description}
                            />
                            <div className={classes.mediaOverlay}></div>
                            <Typography variant="body1" color="textPrimary" component="p" className={classes.title}>
                                {image.alt_description}
                            </Typography>
                            <CardContent className={classes.authorSection}>
                                <Typography variant="body2" color="textSecondary" component="p"
                                            className={classes.author}>
                                    {image.user.username}
                                </Typography>
                                <div className={classes.likes}>
                                    <FavoriteIcon className={classes.icon}/>
                                    {image.likes}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleShowMore}>
                Show more
            </Button>
        </SectionWrapper>
    );
};

export default ImageList;





