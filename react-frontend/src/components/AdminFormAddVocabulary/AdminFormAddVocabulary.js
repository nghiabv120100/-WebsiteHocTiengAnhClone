import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from "react-bootstrap"
import allActions from '../../actions'
import ReactAudioPlayer from 'react-audio-player'

class AdminFormAddVocabulary extends Component {

    constructor(props){
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.selectFileAudio = this.selectFileAudio.bind(this);


        this.state = {
            currentFile: undefined,
            previewImage: undefined,
            previewAudio: undefined,
            currentFileAudio: undefined,
            vocaDto : {
                content: '',
                transcribe: '',
                mean_example_vocabulary: '',
                mean: '',
                explain_vocabulary: '',
                example_vocabulary: '',
                idVocabularyTopic: this.props.idTopic
            }
        }
    }

    selectFileAudio(event) {
        this.setState({
            currentFileAudio: event.target.files[0],
            previewAudio: URL.createObjectURL(event.target.files[0])
        });
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
            vocaDto: {
                ...this.state.vocaDto,
                [name]:value
            }
        });
    }

    handleAddVoca = (e) => {
        const {currentFile, currentFileAudio, vocaDto} = this.state
        e.preventDefault();
        this.props.onAddVocabulary(vocaDto, currentFileAudio, currentFile)
    }

    render() {
        const {
            previewImage,
            previewAudio
        } = this.state;
        return (
            <Form onSubmit={(e) => this.handleAddVoca(e)}>
                <Form.Group>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        placeholder="N???i dung t??? *"
                        name="content"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Form.Group style={{marginBottom: 20}}>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        as="textarea" 
                        rows={3}
                        placeholder="Gi???i th??ch *"
                        name="explain_vocabulary"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                            className="form-add-topic-vocabulary"
                            type="text"
                            placeholder="T??? lo???i *"
                            name="mean"
                            onChange={(event) => this.isChange(event)}
                            required
                        />
                </Form.Group>
                <Form.Group style={{marginBottom: 20}}>
                    <Form.Control
                            className="form-add-topic-vocabulary"
                            type="text"
                            placeholder="V?? d??? *"
                            as="textarea" 
                            rows={3}
                            name="example_vocabulary"
                            onChange={(event) => this.isChange(event)}
                            required
                        />
                </Form.Group>                    
                <Form.Group style={{marginBottom: 20}}>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        as="textarea" 
                        rows={3}
                        placeholder="D???ch ngh??a v?? d??? *"
                        name="mean_example_vocabulary"
                        onChange={(event) => this.isChange(event)}
                        required
                    />    
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Ch???n file audio *
                    </Form.Label>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="file"
                        accept="audio/*"
                        placeholder="File nghe c???a t??? *"
                        name="file_audio"
                        onChange={this.selectFileAudio}
                        required
                    />
                    {previewAudio && <ReactAudioPlayer
                        src={previewAudio}
                        controls
                    />}   
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Ch???n h??nh ???nh m?? t??? *
                    </Form.Label>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="file"
                        accept="image/*"
                        placeholder="H??nh ???nh m?? t??? *"
                        name="file_image"
                        onChange={this.selectFile}
                        required
                    />
                    {previewImage && (
                        <div>
                            <img className="preview" src={previewImage} alt="" style={{height: 150, width: 150}}/>
                        </div>
                    )}
                </Form.Group>
                <Button variant="success" type="submit" className="button-add-topic-vocabulary">
                    Th??m
                </Button>
            </Form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        // prop: state.prop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddVocabulary: (vocaDto, file_audio, file_image) => {
            dispatch(allActions.vocabularyAction.actAddVocaForTopicRequest(vocaDto, file_audio, file_image))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminFormAddVocabulary);


