import { MATCHINGSTR } from '../action/type';

const stateDefault = {
    text: 'no matchs',
}
const matchStr = (state = stateDefault, action) => {
    switch (action.type) {
      case MATCHINGSTR:
        return (
          {
            text: action.text,
          }
        )
        
      default:
        return state
    }
  }
  
  export default matchStr