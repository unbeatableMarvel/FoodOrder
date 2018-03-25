export default function (state=0, action) {
	
    switch (action.type) {
        case 'GET_MENU_DETAILS':
            return action.payload;
            break;
    }
    return state;
}


