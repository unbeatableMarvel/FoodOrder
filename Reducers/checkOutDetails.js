export default function (state = 0, action) {
	
    switch (action.type) {
        case 'CHECKOUT_DETAILS':
            return action.payload;
            break;
    }
    return state;
}