"use strict";

var React = require("react");
var Common = require("./../constants/Common");

var apiUrl = Common.APIUrl + "Question/";

var QuestionApi = {
    getString: function(){
        //debugger;
       return fetch(apiUrl, {mode: 'cors'});
    },

    saveQuestion: function(question){
        return fetch(apiUrl + "saveQuestion", 
        {
            method: 'post',
            body: JSON.stringify(question),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            return data;
        }).catch(function(err){
            console.log('my error:' + err);
        });
    },
    getQuestionById: function(questionId){
        return fetch(apiUrl + "GetQuestionById?questionId=" + questionId, 
        {
            mode: 'cors',
            method: 'GET',
            dataType: 'json',
            headers: {
            "Accept": "application/json"
            }
       }).then(function(response){
            return response.json();
        }).then(function(data){
            return data;
        }).catch(function(err){
            console.log('my error:' + err);
        });
    },

    deleteQuestion: function(questionId){
        return fetch(apiUrl + "DeleteQuestion?questionId=" + questionId, 
        {
            mode: 'cors',
            method: 'GET',
            dataType: 'json',
            headers: {
            "Accept": "application/json"
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            return data;
        }).catch(function(err){
            console.log('my error:' + err);
        });
    },

    getAllQuestions: function(){
          return fetch(apiUrl + "GetAllQuestions", 
            {
                mode: 'cors',
                method: 'GET',
                dataType: 'json',
                headers: {
                    "Accept": "application/json"
                 }
            }).then(function(response){
                return response.json();
            }).then(function(data){
                    return data;
            }).catch(function(err){
                console.log('my error:' + err);
            });
        }

};

module.exports = QuestionApi;

