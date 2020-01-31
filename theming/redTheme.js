import { createMuiTheme } from '@material-ui/core/styles';
//import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f7f7f7',
    },
  },
  root: {
    flexGrow: 1,
    height: '100%'
  },
});

export default theme;