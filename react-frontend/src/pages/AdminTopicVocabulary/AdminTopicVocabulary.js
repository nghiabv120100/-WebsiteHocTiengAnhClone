import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button} from 'react-bootstrap';
import AdminFormAddTopicVocabulary from '../../components/AdminFormAddTopicVocabulary/AdminFormAddTopicVocabulary';
import { connect } from 'react-redux';
import allActions from '../../actions';
import AdminItemVocabularyTopic from '../../components/AdminItemVocabularyTopic/AdminItemVocabularyTopic';
import './AdminTopicVocabulary.css';
import { AiOutlineFileAdd } from "react-icons/ai";
import AdminFormEditTopicVocabulary from '../../components/AdminFormEditTopicVocabulary/AdminFormEditTopicVocabulary';

class AdminTopicVocabulary extends Component {

    constructor(props){
        super(props);

        this.state = {
            term: '',
            showForm: false,
            showFormEdit: false
        }
    }

    componentDidMount() {
        this.props.getAllVocaTopics();
    }
    

    showItemTopicVoca (topics) {
        var result = null;
        if(topics.length > 0 ){
            result = topics.map((topic, key) => {
                return (
                    <AdminItemVocabularyTopic 
                        key={key}
                        id={topic.id}
                        name={topic.name}
                        image={topic.image}
                    />
                )
            })
        }
        return result;
    }

    handleShow = (event) => {
        event.preventDefault();
        this.props.onFormAddVocaTopic();
    }

    handleClose = () => {
        this.props.offFormAddVocaTopic();
    }

    handleCloseEdit = () => {
        this.props.offFormEditVocaTopic();
    }
    
    callback = (term) => {
        this.setState({
            term: term
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.statusFormAddVocaTopic){
            let {statusFormAddVocaTopic} = nextProps
            this.setState({
                showForm: statusFormAddVocaTopic.openFormAddVocaTopic,
                showFormEdit: statusFormAddVocaTopic.openFormEditVocaTopic
            })
        }
    }
    

    render() {
        const dataSearch = this.state.term;
        const dataTable = this.props.vocabularyTopics;
        const resultSearch = []
        dataTable.forEach((item) => {
            let idSearch = item.id.toString();
            if(idSearch.indexOf(dataSearch) !== -1 || item.name.indexOf(dataSearch) !== -1){
                resultSearch.push(item);
            }
        })

        return (
            <div className="container-fluid content-admin-voca-topic">
                <div className="row">
                    <div className="col-12">
                        <div style={{marginTop: 10}}>
                            <div className="jumbotron manager-voca-topic">
                                <h2>Danh s??ch ch??? ?????</h2>  
                            </div>
                            
                            <Link to="#" style={{textDecoration:"none"}} onClick={this.handleShow}>
                                <button type="button" className="btn btn-success btn-add-voca-topic">Th??m m???i<AiOutlineFileAdd color={"white"} className="iconAddVocaTopic"/></button> 
                            </Link>
                         
                            <input onChange={(event) => this.callback(event.target.value)}
                            type="text" name="search" placeholder="T??m ki???m ..." className="searchTopic" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped table-inverse table-hover">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>ID</th>
                                    <th>T??n ch??? ?????</th>
                                    <th>???nh ch??? ?????</th>
                                    <th>Ch???c n??ng</th>
                                </tr>
                            </thead>
                            <tbody>
                               {this.showItemTopicVoca(resultSearch)}
                            </tbody>
                            <tfoot className="thead-inverse">
                                <tr>
                                    <th>ID</th>
                                    <th>T??n ch??? ?????</th>
                                    <th>???nh ch??? ?????</th>
                                    <th>Ch???c n??ng</th>
                                </tr>
                            </tfoot>        
                        </table>
                    </div>

                </div>
                <Modal show={this.state.showFormEdit} onHide={() => this.handleCloseEdit()}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Ch???nh s???a ch??? ????? t??? v???ng
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AdminFormEditTopicVocabulary />
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary"  onClick={() => this.handleCloseEdit()}>
                                H???y
                            </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showForm} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Th??m ch??? ????? t??? v???ng
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AdminFormAddTopicVocabulary />
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary"  onClick={() => this.handleClose()}>
                                H???y
                            </Button>
                    </Modal.Footer>
                </Modal>
            </div>          
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        vocabularyTopics: state.vocabularyTopics,
        statusFormAddVocaTopic: state.statusFormAddVocaTopic
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllVocaTopics: () => {
            dispatch(allActions.vocabularyTopicAction.actFetchVocaTopicsRequest());
        },
        onFormAddVocaTopic: () => {
            dispatch(allActions.openFormAddVocaTopic.changeFormAddVocaTopicOn());
        },
        offFormAddVocaTopic: () => {
            dispatch(allActions.openFormAddVocaTopic.changeFormAddVocaTopicOff());
        },
        offFormEditVocaTopic: () => {
            dispatch(allActions.openFormAddVocaTopic.chagneFormEditVocaTopicOff());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminTopicVocabulary);
