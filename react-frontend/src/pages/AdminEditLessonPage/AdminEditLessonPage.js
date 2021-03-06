import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminEditLessonPage.css'
import { Link } from 'react-router-dom'
import { BiSave, BiReset } from "react-icons/bi";
import { connect } from 'react-redux';
import validator from 'validator';
import allActions from '../../actions';
import Dropzone from '../../components/DropZone'

class AdminEditLessonPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            lesson: {
                id:this.props.match.params.id,
                chapterId:-1,
                name: '',
                video:'',
                numPriority : -1,
                chapterName:'',
                courseName:''
            },
            videoFile:'',
            validationMsg: '',
            confirmDialog: false,
        }

    }

    componentDidMount() {
        this.props.onGetLessonById(this.state.lesson.id)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.lesson){
            var {lesson} = nextProps;
            this.setState({
                lesson: {...lesson}
            })
        }
    }

    isChangedVideo= (event) => {
        const value = event.target.files[0]
        this.setState({
            videoFile:value
        })
    }


    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        
        if (name === 'numPriority' && value < 0 || name === 'numPriority' && value > this.props.chapter.numOfLesson ) {
            return;
        }


        this.setState({
            lesson: {     
                ...this.state.lesson,
                [name]: value
            }
        })
    }
    resetForm(event) {
        event.preventDefault();
        this.setState({
            lesson: {
                ...this.state.lesson,
                name:this.props.lesson.name,
                video:this.props.lesson.video,
                number:this.props.number,
                chapterId: this.props.lesson.chapterId,
                chapterName: this.props.lesson.chapterName,
                courseName: this.props.lesson.courseName
            },
            videoFile:undefined,
            validationMsg: {},
            confirmDialog: false,
        }) 
    }
    updateLesson = (event) => {
        event.preventDefault();
        var lessonDto = {}
        lessonDto.id = this.state.lesson.id;
        lessonDto.name=this.state.lesson.name;
        lessonDto.chapterId=this.state.lesson.chapterId;
        lessonDto.chapterName=this.state.lesson.chapterName;
        lessonDto.courseName=this.state.lesson.courseName;
        lessonDto.numPriority=this.state.lesson.numPriority;
        lessonDto.video=this.state.lesson.video;
        
        window.history.back();
        this.props.onEditLesson(lessonDto,this.state.videoFile)
    }
    validateAll = () => {
        const msg = {}

        if (validator.isEmpty(this.state.lesson.name.trim())) {
            msg.name = "Y??u c???u nh???p t??n b??i h???c !"
        }
        this.setState({
            validationMsg: msg
        })
        if (Object.keys(msg).length > 0) return false
        return true;
    }
    handleConfirmationBox = (event) => {
        event.preventDefault();
        const isValid = this.validateAll()
        console.log("is Valid: ", isValid)
        if (!isValid) return
        else {
            if (!this.state.confirmDialog) {
                document.querySelector(".confirm-bg").style.display = "flex"
                document.querySelector(".container-dialog").style.display = "flex"
                this.setState({
                    confirmDialog: true
                })
            } else {
                document.querySelector(".confirm-bg").style.display = "none"
                document.querySelector(".container-dialog").style.display = "none"
                this.setState({
                    confirmDialog: false
                })
            }
        }
    }

    render() {
        return (
            <div>
                <h2>___________________________________________________________________________________________________________</h2>

                <div className="row container-admin-add-lesson">
                    <div className="container-dialog">
                        <div className="confirmation-text">
                            B???n c?? ch???c ch???n mu???n l??u ?
                        </div>
                        <div className="button-container">
                            <button
                                className="confirmation-button cancel-button"
                                onClick={(event) => this.handleConfirmationBox(event)}>
                                H???y
                            </button>
                            <button
                                className="confirmation-button btn-confirm"
                                onClick={(event) => this.updateLesson(event)} >
                                X??c nh???n
                            </button>
                        </div>
                    </div>
                    <div
                        className="confirm-bg"
                        onClick={(event) => this.handleConfirmationBox(event)}>
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <h2>Ch???nh s???a b??i h???c</h2>
                        <br></br>
                        <label htmlFor="name"><b>T??n kho?? h???c:</b></label>

                        <input  className="input-field" readOnly={true}
                          value={this.state.lesson.courseName}  type="text" placeholder="T??n kho?? h???c" name="nameCourse" id="nameCourse" />

                        <label htmlFor="chapterName"><b>T??n ch????ng:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" type="text" readOnly={true}
                            value={this.state.lesson.chapterName} placeholder="Nh???p t??n ch????ng" name="chapterName" id="chapterName" />
                        <p className="msg-error">{this.state.validationMsg.chapterName}</p>

                        <label htmlFor="name"><b>S??? th??? t???:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" type="number"
                            value={this.state.lesson.numPriority} placeholder="Nh???p t??n ch????ng" name="numPriority" id="numPriority" />
                        <p className="msg-error">{this.state.validationMsg.number}</p>
              
              
                        <label htmlFor="name"><b>T??n b??i h???c:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" type="text" 
                            value={this.state.lesson.name} placeholder="Nh???p t??n b??i h???c" name="name" id="name" />
                        <p className="msg-error">{this.state.validationMsg.name}</p>
                        <br></br>
                        <label htmlFor="name"><b>B??i gi???ng:</b></label>
                        {/* <Dropzone onChange = {(event)=>this.isChangedVideo(event)} value={this.state.lesson.video}/> */}
                        <input className="video" type="file" onChange = {(event)=>this.isChangedVideo(event)} />
                        {/* <video src={'x'} width="600" height="300" controls="controls" autoplay="true" /> */}
                        <div className="div-button-account">
                            <Link to="/admin/lesson">
                                <button onClick={(event) => this.handleConfirmationBox(event)}
                                    type="button" className="btn btn-success btn-save-account">L??u <BiSave /></button>
                            </Link>
                            <button onClick = {(event) => this.resetForm(event)}
                                type="reset" className="btn btn-warning" >Reset <BiReset /></button>
                        </div>

                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chapter: state.chapterEditReducer,
        lesson: state.lessonEditReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditLesson: (lessonDto, file) => {
            dispatch(allActions.lessonAction.actUpdateLessonRequest(lessonDto,file))
        },
        onGetCourseById: (chapterId) => {
            dispatch(allActions.chapterAction.actGetCourseRequest(chapterId))
        },
        onGetChapterById: (chapterId) => {
            dispatch(allActions.chapterAction.actGetChapterRequest(chapterId))
        },
        onGetLessonById: (id) => {
            dispatch(allActions.lessonAction.actGetLessonRequest(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditLessonPage);