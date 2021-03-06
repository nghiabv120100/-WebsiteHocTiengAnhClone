import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminAddLessonPage.css'
import { Link } from 'react-router-dom'
import { BiSave, BiReset } from "react-icons/bi";
import { connect } from 'react-redux';
import validator from 'validator';
import allActions from '../../actions';
import Dropzone from '../../components/DropZone'
import LessonService from '../../services/LessonService';
import { usePromiseTracker } from "react-promise-tracker";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {Oval} from "react-loader-spinner";


class AdminAddLessonPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            lesson: {
                chapterId:this.props.match.params.chapterId,
                name: '',
                chapterName:'',
                numPriority : -1,
                courseName:'',
                video:null
            },
            validationMsg: {},
            confirmDialog: false,
        }

    }



    
    componentDidMount() {
        this.props.onGetChapterById(this.state.lesson.chapterId)
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.chapter) {
            const {chapter} = nextProps
            this.setState({
                    lesson: {
                    ...this.state.lesson,
                    chapterName: chapter.name,
                    courseName: chapter.courseName,
                    numPriority:chapter.numOfLesson
                }
            })
        }
    }

    isChangedVideo= (event) => {
        this.setState({
            lesson: {     
                ...this.state.lesson,
                video: event.target.files[0]
            }
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
                video:null,
                name: ''
            },
            validationMsg: {},
            confirmDialog: false,
        }) 
    }
    addLesson =async (event) => {
        event.preventDefault();
        var lessonDto = {}
        lessonDto.chapterId = this.state.lesson.chapterId;
        lessonDto.name = this.state.lesson.name;
        lessonDto.numPriority = this.state.lesson.numPriority;
        this.setState({
            confirmDialog: false
        })
        // {<Oval arialLabel="loading-indicator" />}
         await this.props.onAddLesson(lessonDto,this.state.lesson.video)
        window.history.back();
    }
    validateAll = () => {
        const msg = {}

        if (validator.isEmpty(this.state.lesson.name.trim())) {
            msg.name = "Y??u c???u nh???p t??n ch????ng !"
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
        // console.log("is Valid: ", isValid)
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
        console.log("Gia tri so bai0 " , this.state.lesson.numOfLesson)
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
                                onClick={(event) => this.addLesson(event)} >
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
                        <h2>Th??m b??i h???c</h2>
                        <br></br>
                        <label htmlFor="name"><b>T??n kho?? h???c:</b></label>

                        <input  className="input-field" readOnly={true}
                          value={this.state.lesson.courseName}  type="text" placeholder="T??n kho?? h???c" name="nameCourse" id="lessonName" />


                        <label htmlFor="name"><b>T??n ch????ng:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" type="text"
                            value={this.state.lesson.chapterName} placeholder="Nh???p t??n ch????ng" name="name" id="name" />
                        <p className="msg-error">{this.state.validationMsg.chapterName}</p>

                        <label htmlFor="name"><b>S??? th??? t???:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" type="number"
                            value={this.state.lesson.numPriority} placeholder="Nh???p t??n ch????ng" name="numPriority" id="numPriority" />
                        <p className="msg-error">{this.state.validationMsg.number}</p>
              
                        <label htmlFor="name"><b>T??n b??i h???c:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" type="text"
                            value={this.state.lesson.name} placeholder="Nh???p t??n ch????ng" name="name" id="name" />
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
                                type="reset" className="btn btn-warning" >L??m m???i <BiReset /></button>
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
        lesson: state.lessonReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddLesson: async (lessonDto, file) => {
            await dispatch(allActions.lessonAction.actAddLessonRequest(lessonDto,file))
        },
        onGetCourseById: (chapterId) => {
            dispatch(allActions.chapterAction.actGetCourseRequest(chapterId))
        },
        onGetChapterById: (chapterId) => {
            dispatch(allActions.chapterAction.actGetChapterRequest(chapterId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddLessonPage);