import React, { Component } from "react";
import JobPreview from "./JobPreview";
import "../css/styles.css";

const dummyJobs = [
  {
    name: "Graduation Portraits",
    date: "2019-04-29",
    time: "8am-9am",
    location: "Campus",
    compensation: "$102/hr"
  },
  {
    name: "Wong Headshots",
    date: "Friday, 2/1",
    time: "12pm-5pm",
    location: "Campus",
    compensation: "$51"
  },
  {
    name: "Junior Phi Beta Kappa Ceremony",
    date: "January 25th",
    time: "3-5pm",
    location: "Low Library Faculty Room",
    compensation: "$204"
  },
  {
    name: "CC Winter Festival",
    date: "December 5th",
    time: "5:30-7pm",
    location: "Campus",
    compensation: "$128"
  },
  {
    name: "Graduation Portraits",
    date: "2019-04-29",
    time: "8am-9am",
    location: "Campus",
    compensation: "$102/hr"
  },
  {
    name: "Wong Headshots",
    date: "Friday, 2/1",
    time: "12pm-5pm",
    location: "Campus",
    compensation: "$51"
  },
  {
    name: "Junior Phi Beta Kappa Ceremony",
    date: "January 25th",
    time: "3-5pm",
    location: "Low Library Faculty Room",
    compensation: "$204"
  },
  {
    name: "CC Winter Festival",
    date: "December 5th",
    time: "5:30-7pm",
    location: "Campus",
    compensation: "$128"
  }
];

export default class PhotographerPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uni: "",
      firstName: "",
      lastName: "",
      loading: true,
      jobs: []
    };
  }

  componentDidMount() {
    fetch("/api/getUser")
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .then(resJson => {
        this.setState({
          loading: false,
          uni: resJson.uni,
          firstName: resJson.firstName,
          lastName: resJson.lastName
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });

    this.setState({
      jobs: dummyJobs
    });
  }

  render() {
    return (
      <div className="container">
        <div className="portal">
          <div className="sidebar">
            <div className="user">
              <ul>
                <li className="fullName">{this.state.firstName} {this.state.lastName}</li>
                <li>Account Settings</li>
                <li>Logout</li>
              </ul>
            </div>
            <div className="logo">COLUMBIA PHOTOGRAPHY ASSOCIATION</div>
          </div>
          <div className="jobs">
            {this.state.jobs.map(job => <JobPreview job={job} uni={this.state.uni} />)}
          </div>
        </div>
      </div>
    );
  }
}
