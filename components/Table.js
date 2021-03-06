import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { RecordsPerPage } from '../config';

import Toolbar from './Table/Toolbar';
import ToolbarSelectRows from './Table/ToolbarSelectRows';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  empty: {
    height: theme.padding
  }
}));

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MuiTypography: {
      h6: {
        fontSize: '1.2em'
      }
    }
  }
});

export default function RespTable(columns, list, module,createLink) {
  const classes = useStyles();

  module = columns['module'];
  list = columns['list'].rows;
  let listCount = columns['list'].count;
  createLink = columns['createLink'];
  columns = columns['columns'];

  const options = {
    serverSide: true,
    filter: true,
    download: false,
    print: false,
    viewColumns: true,
    filterType: 'dropdown',
    search: false,
    selectToolbarPlacement: 'replace',
    count: listCount,
    page: 0,
    rowsPerPage: RecordsPerPage,
    rowsPerPageOptions: [5, 10, 15],
    fixedHeader: true,
    displayMode: 'vertical',
    tableBodyHeight: '100%',
    onChangePage: (currentPage) => {
      let page = (Router.router.query.limit) ? `?limit=${Router.router.query.limit}&page=${currentPage}` : `?limit=${RecordsPerPage}&page=${currentPage}`;
      Router.push(`${Router.router.route}${page}`);
    },
    onChangeRowsPerPage: (numberOfRows) => {
      let limit = `?limit=${numberOfRows}&page=0`;
      Router.push(`${Router.router.route}${limit}`);
    },
    setTableProps: () => {
      return {
        padding: 'none',
        size: 'small',
      };
    },
    customToolbar: () => {
      return (
        <Toolbar module={module} createLink={createLink}/>
      );
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <ToolbarSelectRows selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} module={module} />
    ),
    onRowsDelete: (rowsDeleted) => {
      const idsToDelete = rowsDeleted.data.map(d => list[d.dataIndex].id);
      console.log(idsToDelete);
    }
  };
  return (<Box width="100%">
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        elevation={0}
        title={<Typography color='primary' variant="h6"> {module.toUpperCase()} </Typography>}
        data={list}
        columns={columns}
        options={options}
      /></MuiThemeProvider>
  </Box>);
}





