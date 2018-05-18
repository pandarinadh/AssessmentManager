"use strict";

var React = require("react");
var Common = require("./../constants/Common");

var apiUrl = Common.APIUrl + "student/";

var StudentApi = {
    getString: function(){
        //debugger;
       return fetch(apiUrl, {mode: 'cors'});
    },

    saveStudent: function(student){
        return fetch(apiUrl + "saveStudent", 
        {
            method: 'post',
            body: JSON.stringify(student),
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
    getStudentById: function(studentId){
        return fetch(apiUrl + "GetStudentById?studentId=" + studentId, 
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

    deleteStudent: function(studentId){
        return fetch(apiUrl + "DeleteStudent?studentId=" + studentId, 
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

    getAllStudents: function(){
          return fetch(apiUrl + "GetAllStudents", 
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

module.exports = StudentApi;

