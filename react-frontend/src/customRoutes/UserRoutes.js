import React, { Component, Fragment } from 'react'
import {
    Switch,
    Route,
    Redirect,
    BrowserRouter
} from "react-router-dom";
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ContentPage from '../pages/ContentPage';
import UserCoursePage from '../pages/UserHomePage/UserCoursePage'
import UserLearningPage from '../pages/UserHomePage/UserLearningPage';
import UserTopicVocabulary from '../pages/UserTopicVocabulary/UserTopicVocabulary'
import UserDetailTopicVocabulary from '../pages/UserDetailTopicVocabulary/UserDetailTopicVocabulary'
import UserGrammar from '../pages/UserGrammar/UserGrammar'
import UserEditInfomation from '../pages/UserEditInfo/UserEditInfo';

export default class UserRoutes extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={UserTopicVocabulary}/> 
                    <Route exact path="/user/topic-vocabulary" component={UserTopicVocabulary}/>
                    <Route exact path="/user/topic-vocabulary/:idTopic/:nameTopicVoca" component={UserDetailTopicVocabulary}/>
                    <Route exact path="/user/grammar" component={UserGrammar}/>    
                    <Route exact path="/user/courses" component={UserCoursePage}/>   
                    <Route exact path="/user/learning/:id" component={UserLearningPage}/>
                    <Route exact path="/user/account/edit/:id" component={UserEditInfomation}/>   
                    {/* <Route exact path="/" component={ContentPage} />
                    <Route path="*" component={NotFoundPage} /> */}
                </Switch>   
            </Fragment>
        )
    }
}
