import {combineReducers} from 'redux';
import menuDetails from './menuDetails';
import checkOutDetails from './checkOutDetails';

const allReducers = combineReducers({
    MenuDetails: menuDetails,
    checkOutDetails: checkOutDetails
});

export default allReducers
