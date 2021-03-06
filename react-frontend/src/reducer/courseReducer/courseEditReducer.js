import { EDIT_COURSE} from '../../constants/ActionTypes'

const course = {
    id: -1,
    name:'',
    introduce:'',
    chapters: []
}

const courseEditReducer = (state=course, action) => {
    const {course} = action
    switch(action.type) {
        case EDIT_COURSE:
            return course
        default:
            return state
    }
}

export default courseEditReducer;