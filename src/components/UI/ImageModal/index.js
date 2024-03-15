import React, {useEffect, useState} from 'react';
import { makeStyles, Dialog, AppBar, Toolbar, IconButton, Typography, Slide, CardMedia, CardContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        fontFamily: 'Inter-Bold',
        fontWeight: 700,
        color: '#90AFFF',
        textTransform: 'uppercase',
        fontSize: '20px',
    },
    media: {
        height: '75vh',
        position: 'relative',
    },
    toolBar: {
        backgroundColor: '#1E1E1E',
        boxShadow: 'none',
    },
    textContent: {
        flex: '1 0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
    },
    icon: {
        color: '#90AFFF',
    },
    userName: {
        fontFamily: 'Inter-Bold',
        fontWeight: 700,
        color: '#90AFFF',
        textTransform: 'uppercase',
        fontSize: '20px',
    },
    likes: {
        fontSize: '16px',
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenImage = ({ open, handleClose, image }) => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(open);

    useEffect(() => {
        setModalOpen(open);
    }, [open]);

    useEffect(() => {
        const handleScroll = (e) => {
            if (modalOpen) {
                e.preventDefault();
            }
        };

        if (modalOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('scroll', handleScroll);
        } else {
            document.body.style.overflow = 'auto';
            window.removeEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [modalOpen]);

    return (
        <Dialog fullScreen open={modalOpen} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon className={classes.icon}/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {image.alt_description}
                    </Typography>
                </Toolbar>
            </AppBar>
            {image && (
                <CardMedia
                    className={classes.media}
                    image={image.urls.full}
                    title={image.alt_description}
                />
            )}
            <CardContent className={classes.textContent}>
                <Typography variant="body1" color="textSecondary" component="p" className={classes.userName}>
                    {image.user.username}
                </Typography>
                <div className={classes.likes}>
                    <FavoriteIcon className={classes.icon} />
                    {image.likes}
                </div>
            </CardContent>
        </Dialog>
    );
};

export default FullScreenImage;




