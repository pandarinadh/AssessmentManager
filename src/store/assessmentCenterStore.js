"use strict";

var Dispatcher = require("../dispatcher/appDispatcher");
var ActionTypes = require("../constants/actionTypes");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var _ = require("lodash");

var CHANGE_EVENT = 'change';

var _studentAssessments = [];
var _studentAssessment;

var AssessmentCenterStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },

    getAllStudentAssessments: function(){
        console.log("getAllAssessments AssessmentCenterStore ");
        console.log(_studentAssessments);
        return _studentAssessments;
    },

    getStudentAssessmentsById: function(Id){
        return _.find(_studentAssessments, {Id: parseInt(Id)});
    },

    getStudentAssessmentByAssessmentId: function(Id){
        var localStudentAssessment = this.getStudentAssessmentsById(1);
        console.log("localStudentAssessment:");
        console.log(localStudentAssessment);
        return localStudentAssessment ? _.find(localStudentAssessment.Student.Assessments, {Id: parseInt(Id)}) : null;
    }
});


Dispatcher.register(function(action){
    //debugger;
    switch(action.actionType){
        case ActionTypes.INITIALIZE:
                action.initialData.studentAssessments.then(function(data){
                    _studentAssessments = data;
                    AssessmentCenterStore.emitChange();
                });
            break;
        case ActionTypes.CREATE_STUDENT_ASSESSMENT:
            action.studetnAssessment.then(function(data){
                var existing = _.find(_studentAssessments, {Id: parseInt(data.Id)});
                var existingIndex = _.indexOf(_studentAssessments, existing);
                if(existingIndex === -1){
                    _studentAssessments.push(data);
                }else{
                    _studentAssessments.splice(existingIndex, 1, data);
                }
                AssessmentCenterStore.emitChange();
            });
        break;
        default:
            //no op
    }
});


module.exports = AssessmentCenterStore;