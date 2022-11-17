import menuController from '../../controllers/menuController.js';
import menuSchema from '../../docs/menu.js';
import { getFullPath } from '../config.js';

const menuRoutes = [
  {
    method: 'GET',
    url: getFullPath('/menu/queryAll'),
    schema: { ...menuSchema.queryAll },
    handler: menuController.queryAll
  },
  {
    method: 'POST',
    url: getFullPath('/menu/add'),
    schema: {
      ...menuSchema.add
    },
    handler: menuController.add
  },
  {
    method: 'PUT',
    url: getFullPath('/menu/edit'),
    schema: {
      ...menuSchema.edit
    },
    handler: menuController.edit
  },
  {
    method: 'DELETE',
    url: getFullPath('/menu/deleteById'),
    schema: {
      ...menuSchema.delete
    },
    handler: menuController.deleteMenu
  }
];

export default menuRoutes;