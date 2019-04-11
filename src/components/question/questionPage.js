"use strict";

var React = require("react");
var Link = require("react-router").Link;
var QuestionList = require("./questionList");
var QuestionStore = require("../../flux/store/questionStore");

var questionPage = React.createClass({

    getInitialState: function() {
        console.log('getInitialState in questionPage');
        return {
            questions: QuestionStore.getAllQuestions(),
            errors: {},
            dirty: false,
            checkBoxFlag: false
        };
    },

    componentWillMount: function() {
        //debugger;
        console.log('componentWillMount in questionPage');
        QuestionStore.addChangeListener(this._onChange);
    },
 
    componentWillUnmount: function() {
      //  debugger;
      console.log('componentWillUnmount in questionPage');
      QuestionStore.removeChangeListener(this._onChange);
    },
    
    _onChange: function(){
        //debugger;
        console.log('onchange in questionPage');
        this.setState({questions: QuestionStore.getAllQuestions() });
    },
    

    render: function(){
        return (
            <div>
                <h1>Question Page </h1>
                <div>
                    <p><Link to="addQuestion" className = "btn btn-default" > Add Question </Link> </p>
                    <QuestionList questions = {this.state.questions} checkBoxFlag = {this.state.checkBoxFlag} />
                </div>
            </div>
        );
    }
});

module.exports = questionPage;




  /*  componentWillMount: function(){
      
        var currentComponent = this;
         QuestionApi.getAllQuestions().then(function(data){
            console.log(data);
            currentComponent.setState({ questions: data });
         });
       
        */

      /*  promise.then(function(response){
           return response.json();
        }).then(function(data){
            currentComponent.setState({ questions: data });
            console.log('componentWillMount: ' + currentComponent.state.questions);
           return data;
        })
        .catch(function(err){
            console.log('my error:' + err);
        });*/
   
  
//},
/*
    componentDidMount: function() {
        console.log('componentDidMount');
        if(this.isMounted()){
        var currentComponent = this;
       
        QuestionApi.getAllQuestions().then(function(data){
            //console.log(data);
            currentComponent.setState({ questions: data });
         });*/
        
       /* var promise = QuestionApi.getAllQuestions();
        
        promise.then(function(response){
           return response.json();
        }).then(function(data){
            currentComponent.setState({ questions: data });
            console.log('componentDidMount: ' + currentComponent.state.questions);
           return data;
        })
        .catch(function(err){
            console.log('my error:' + err);
        });*/
   // }
  //  },
