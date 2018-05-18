"use strict";

var Dispatcher = require("../dispatcher/appDispatcher");
var AssessmentApi = require("../api/assessmentApi");
var ActionTypes = require("../constants/actionTypes");

var AssessmentActions = {
    saveAssessment: function(assessment){
     var newAssessment = AssessmentApi.saveAssessment(assessment);

     Dispatcher.dispatch({
        actionType: ActionTypes.CREATE_ASSESSMENT,
         assessment: newAssessment
     });
   },

   deleteAssessment: function(id){
    var deletedAssessment = AssessmentApi.deleteAssessment(id);

    Dispatcher.dispatch({
       actionType: ActionTypes.DELETE_ASSESSMENT,
        assessment: deletedAssessment
    });
  }
};

module.exports = AssessmentActions;