"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var StudentForm = React.createClass({
    render: function(){
    //debugger;
        var myStyle = this.props.showId ? 'inline' : 'none';

        return (
            <div>
                <div style= {{display: myStyle}}>
                    <div className="form-group">
                        <div>
                            <label htmlFor="student">Id </label>
                            <div className="field">
                                <input type="text" name="Text" readOnly value={this.props.student.Id} className="form-control" onChange={this.props.onChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="student">Name </label>
                        <div className="field">
                            <input type="text" name="Name" value={this.props.student.Name} className="form-control" onChange={this.props.onChange} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="description">Address</label>
                        <div className="field">
                            <input type="text" name="Address" value={this.props.student.Address} className="form-control" onChange={this.props.onChange} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="description">City</label>
                        <div className="field">
                            <input type="text" name="City" value={this.props.student.City} className="form-control" onChange={this.props.onChange} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="description">State</label>
                        <div className="field">
                            <input type="text" name="State" value={this.props.student.State} className="form-control" onChange={this.props.onChange} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label htmlFor="description">Zip</label>
                        <div className="field">
                            <input type="text" name="Zip" value={this.props.student.Zip} className="form-control" onChange={this.props.onChange} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Save Student" className="btn btn-default" onClick={this.props.onSave} />
                    <Link to="students" className="btn btn-default">Cancel</Link>
                </div>
            </div>
        );
    }
});

module.exports = StudentForm;
