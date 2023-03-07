import totalUserJson from '../data/users.json'

const initCurrentUserInfo = localStorage.getItem('currentUserInfo') ? JSON.parse(localStorage.getItem('currentUserInfo')) : {}
const initTotalUserInfo = localStorage.getItem('totalUserInfo') ? JSON.parse(localStorage.getItem('totalUserInfo')) : null

const defaultState = {
    currentUserInfo:initCurrentUserInfo,
    totalUserInfo: initTotalUserInfo||totalUserJson,
}

export default (state = defaultState, action) => {
    if (action.type==='change_user_info'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.currentUserInfo = action.value; //state
        newState.totalUserInfo = newState.totalUserInfo.map((item)=>{
            if (item.id === action.value.id){
                item = action.value
            }
            return item
        }
        )
        localStorage.setItem('currentUserInfo', JSON.stringify(newState.currentUserInfo));
        localStorage.setItem('totalUserInfo', JSON.stringify(newState.totalUserInfo));

        return {
           ...newState
        }
    }

    if (action.type==='change_total_user_info'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.totalUserInfo = action.value;
        localStorage.setItem('totalUserInfo', JSON.stringify(newState.totalUserInfo));
        return {
            ...newState
        }
    }
    return state
}

/*                          JSON.parse()
* A common error encountered is not using JSON.parse(text) to clone an object
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
* localStorage.getItem('currentUserInfo') is a string, not an object, thus we cannot get the value of a property of it
* JSON.parse(localStorage.getItem('currentUserInfo')) is an JSON object
* */
