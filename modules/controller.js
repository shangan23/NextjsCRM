import users from './users';
import customers from './customers';
import vendors from './vendors';
import items from './items';
import subItems from './subItems';
export default function columns(module, settings) {
  let columns = [];
  switch (module) {
    case 'users':
      columns = users(module, settings);
      break;
    case 'customers':
      columns = customers(module, settings);
      break;
    case 'vendors':
      columns = vendors(module, settings);
      break;
    case 'items':
      columns = items(module, settings);
      break;
    case 'subItems':
      columns = subItems(module, settings);
      break;
  }
  return columns;
}