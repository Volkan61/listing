import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  url: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});



class InteractiveList extends React.Component {
  state = {
      dense: false,
    secondary: false
  };



  render() {
    const posts = this.props.pos.map(
        post => {
          return  (<ListItem>
                      <ListItemAvatar>
                          <Avatar>
                              <FolderIcon />
                          </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                          primary={post.url}
                          secondary={secondary ? 'Secondary text' : null}
                      />
                      <ListItemSecondaryAction>
                          <IconButton aria-label="Delete">
                              <DeleteIcon />
                          </IconButton>
                      </ListItemSecondaryAction>
                   </ListItem>)
        }
    );
    const { classes } = this.props;
    const { dense, secondary } = this.state;

    return (
      <div className={classes.root}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={dense}
                onChange={event => this.setState({ dense: event.target.checked })}
                value="dense"
              />
            }
            label="Enable dense"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={secondary}
                onChange={event => this.setState({ secondary: event.target.checked })}
                value="secondary"
              />
            }
            label="Enable secondary text"
          />
        </FormGroup>

        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.url}>
              Avatar with text and icon
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                  {posts}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveList);
