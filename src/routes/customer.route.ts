import { Router } from 'express';
import controller from '../controllers/CustomerController/index';

const customerRoutes = Router();

customerRoutes.get('/', controller.getCustomerDetails);
customerRoutes.get('/get-customer/:id', controller.getCustomerById);
// customerRoutes.post('/create-customer', TODO);
customerRoutes.put('/update-customer', controller.updateCustomer);
customerRoutes.delete('/delete-customer', controller.deleteCustomer);

export default customerRoutes;
