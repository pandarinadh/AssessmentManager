"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var Toastr = require("toastr");
var StudentAction = require("../../actions/studentActions");

var StudentListPage = React.createClass({
    deleteStudent: function(id, event){
        // debugger;
        event.preventDefault();
        if(confirm("Are you sure?")){
         StudentAction.deleteStudent(id);

         Toastr.success("student Deleted");
        }
     },


    render: function(){

        var createStudentRow = function(student){
            return (
                <tr key={student.Id}>
                     <td> <a href="#" onClick = {this.deleteStudent.bind(this, student.Id)}> Delete </a> </td>
                    <td><Link to="manageStudent" params={{id: student.Id}}> {student.Id} </Link></td>
                    <td>{student.Name}</td>
                    <td>{student.Address}</td>
                    <td>{student.City}</td>
                    <td>{student.State}</td>
                    <td>{student.Zip}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th>Delete</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                    </thead>
                    <tbody>
                        {this.props.students.map(createStudentRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = StudentListPage;