import React from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles } from "@material-ui/core";
import colors from "../constants/colors";

const Block = ({block}) => {
    const classes = useStyles();

    return (
        <Grid className={classes.root} item xs={12}>
            <div className={classes.blockNumber}>00{block.attributes.index}</div>
            <div>{block.attributes.data}</div>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      margin: "3px 0",
      padding: "5px",
      backgroundColor: colors.blockBackground,
      borderRadius: '3px',
      },
    blockNumber: {
      color: colors.blockNumber,
      fontSize: theme.typography.pxToRem(10),
      fontWeight: 'bold',
    }
}));
  
Block.propTypes = {
    block: PropTypes.shape({
      attributes: PropTypes.string,
      index: PropTypes.number,
    }).isRequired
}  

export default Block;