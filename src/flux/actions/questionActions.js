"use strict";

var Dispatcher = require("../flux/dispatcher/appDispatcher");
var QuestionApi = require("../api/questionApi");
var ActionTypes = require("../constants/actionTypes");

var QuestionActions = {
    saveQuestion: function(question){
     var newQuestion = QuestionApi.saveQuestion(question);

     Dispatcher.dispatch({
        actionType: ActionTypes.CREATE_QUESTION,
         question: newQuestion
     });
   },

   deleteQuestion: function(id){
    var deletedQuestion = QuestionApi.deleteQuestion(id);

    Dispatcher.dispatch({
       actionType: ActionTypes.DELETE_QUESTION,
        question: deletedQuestion
    });
  }
};

module.exports = QuestionActions;