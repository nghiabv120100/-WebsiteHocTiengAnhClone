import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminEditCoursePage.css'
import { Link } from 'react-router-dom'
import { BiSave, BiReset } from "react-icons/bi";
import courseAction from "../../actions/courseAction"
import { connect } from 'react-redux';
import validator from 'validator';
import allActions from '../../actions/index'

class AdminEditCoursePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {   
            course: {
                id: this.props.match.params.id,
                name: '',
                image: '',
                introduce: ''
            },
            validationMsg: {},
            currentFile: '',
            previewImage: 'https://bitly.com.vn/p8elul',
            confirmDialog: false,
        }

    }
    componentDidMount() {
        this.props.onEditCourse(this.state.course.id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.course){
            var {course} = nextProps;
            this.setState({
                course: {...course},
                previewImage:course.image
            })
        }
    }

    selectFile(event) {
        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0])
        });
    }
    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            course: {
                ...this.state.course,
                [name]: value
            }
        })
    }
    resetForm(event) {
        event.preventDefault();
        this.setState({
            course: this.props.course,
            validationMsg: {},
            currentFile: undefined,
            previewImage: this.state.course.image,
            confirmDialog: false,
        }) 
    }
    editCourse = (event) => {
        event.preventDefault();
        var courseDto = {}
        courseDto.id = this.state.course.id;
        courseDto.name = this.state.course.name;
        courseDto.image = this.state.course.image;
        courseDto.introduce = this.state.course.introduce;

        window.history.back();
        this.props.onUpdateCourse(courseDto, this.state.currentFile)
    }
    validateAll = () => {
        const msg = {}

        console.log(this.state.course)
        // console.log(this.state.introduce)
        if (validator.isEmpty(this.state.course.name)) {
            msg.name = "Y??u c???u nh???p t??n kho?? h???c !"
        }
        if (validator.isEmpty(this.state.course.introduce)) {
            msg.introduce = "Y??u c???u nh???p gi???i thi???u v??? kho?? h???c !"
        }
        // if (!this.state.currentFile) {
        //     msg.image = "Y??u c???u th??m ???nh c???a kho?? h???c!"
        // }
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

                <div className="row container-admin-edit-course">
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
                                onClick={(event) => this.editCourse(event)} >
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
                        <h2>S???a kho?? h???c</h2>
                        <br></br>
                        <label htmlFor="name"><b>T??n kho?? h???c:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" 
                          value={this.state.course.name}  type="text" placeholder="T??n kho?? h???c" name="name" id="courseName" />
                        <p className="msg-error">{this.state.validationMsg.name}</p>
                        <br></br>
                        <label htmlFor="image"><b>???nh kho?? h???c:</b></label>
                        <input onChange={(event) => this.selectFile(event)} className="input-field" type="file"
                         placeholder="???nh kho?? h???c" name="image" id="image" />
                        <p className="msg-error">{this.state.validationMsg.image}</p>
                        {this.state.previewImage && (
                                        <div>
                                            <img className="preview" src={this.state.previewImage} alt="" style={{height: 150, width: 150}}/>
                                        </div>
                                    )}

                        <br></br>
                        <label htmlFor="introduce"><b>Gi???i thi???u:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" type="text"
                            value={this.state.course.introduce} placeholder="Gi???i thi???u v??? kho?? h???c" name="introduce" id="introduce" />
                        <p className="msg-error">{this.state.validationMsg.introduce}</p>
                        <br></br>
                        <div className="div-button-account">
                            <Link to="/admin/course">
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
        course: state.courseEditReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditCourse: (id) => {
            dispatch(allActions.courseAction.actGetCourseRequest(id))
        },

        onUpdateCourse: (courseDto, file) => {
            dispatch(allActions.courseAction.actUpdateCourseRequest(courseDto, file))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditCoursePage);