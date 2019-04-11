"use strict";

var Dispatcher = require("../dispatcher/appDispatcher");
var ActionTypes = require("../constants/actionTypes");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var _ = require("lodash");

var CHANGE_EVENT = 'change';

var _questions = [];
var _question;

var QuestionStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },

    getAllQuestions: function(){
        console.log("getAllQuestions QuestionStore ");
        console.log(_questions);
        return _questions;
    },

    getQuestionById: function(Id){
        return _.find(_questions, {Id: parseInt(Id)});
    }
});


Dispatcher.register(function(action){
    //debugger;
    switch(action.actionType){
        case ActionTypes.INITIALIZE:
                action.initialData.questions.then(function(data){
                    _questions = data;
                    QuestionStore.emitChange();
                });
            break;
        case ActionTypes.CREATE_QUESTION:
                action.question.then(function(data){
                    var existingQuestion = _.find(_questions, {Id: parseInt(data.Id)});
                    var existingQuestionIndex = _.indexOf(_questions, existingQuestion);
                    if(existingQuestionIndex === -1){
                        _questions.push(data);
                    }else{
                        _questions.splice(existingQuestionIndex, 1, data);
                    }
                    QuestionStore.emitChange();
                });
            break;
        case ActionTypes.DELETE_QUESTION:
                action.question.then(function(data){
                    console.log(data.Id);
                    _.remove(_questions, function(question){
                        return parseInt(data.Id) === parseInt(question.Id);
                    });
                    QuestionStore.emitChange();
                });
            break;
        default:
            //no op
    }
});


module.exports = QuestionStore;