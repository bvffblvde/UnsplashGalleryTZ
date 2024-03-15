import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '100px 40px 100px 40px',
        paddingTop: ({ paddingTop }) => paddingTop,
        [theme.breakpoints.down('sm')]: {
            padding: '60px 20px 60px 20px'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '100px'
        },
        [theme.breakpoints.up('xl')]: {
            padding: '100px 150px 100px 150px'
        }
    },
}));

const SectionWrapper = ({ children, id, paddingTop }) => {
    const classes = useStyles({paddingTop});

    return (
        <Box id={id} className={classes.root}>
            {children}
        </Box>
    );
};

export default SectionWrapper;
