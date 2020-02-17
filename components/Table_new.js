import MUIDataTable from 'mui-datatables';

export default function EnhancedTable() {
  const columns = ['Name', 'Company', 'City', 'State','Name', 'Company', 'City', 'State','Name', 'Company', 'City', 'State'];
  const data = [
    ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
    ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
    ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
    ['James Houston', 'Test Corp', 'Dallas', 'TX'],
  ];

  const options = {
    filterType: 'checkbox',
    serverSide: true,
    fixedHeaderOptions: {
      xAxis: false,
      yAxis: true
    },
  };
  return (<MUIDataTable
    title={'Employee List'}
    data={data}
    columns={columns}
    options={options}
  />);
}



