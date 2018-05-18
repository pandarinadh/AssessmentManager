"use strict";

var Dispatcher = require("../dispatcher/appDispatcher");
var StudentApi = require("../api/studentApi");
var ActionTypes = require("../constants/actionTypes");

var StudentActions = {
    saveStudent: function(student){
     var newStudent = StudentApi.saveStudent(student);

     Dispatcher.dispatch({
        actionType: ActionTypes.CREATE_STUDENT,
         student: newStudent
     });
   },

   deleteStudent: function(id){
    var deletedStudent = StudentApi.deleteStudent(id);

    Dispatcher.dispatch({
       actionType: ActionTypes.DELETE_STUDENT,
        student: deletedStudent
    });
  }
};

module.exports = StudentActions;