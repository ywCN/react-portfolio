import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/CounterActions';
import { Link } from 'react-router';

/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
export default class Home extends Component {
  
  render() {
    const { actions, projects } = this.props;
    
    let projectLinks = projects.map((project, index) => {
      return ( <li className="project-list-item" key={index}>
        <Link to={`/projects/${project.url}`}>
          <div className="project-link-image" style={{backgroundImage: `url(${project.desktop_image})`}}>
          </div>
          {project.title}

        </Link>
      </li> );

    });


    // we can use ES6's object destructuring to effectively 'unpack' our props
    return (
        <div>
          <h1>Hello I am John</h1>
          <p>Here is some info about me</p>
          <div>
            <div className="main-app-nav">Selected Projects</div>
            <ul className="project-list">
              {projectLinks}
            </ul>
          </div>
        </div>
    );
  }
}

Home.propTypes = {
  projects: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
function mapStateToProps(state) {
  return {
    projects: state.projects
  };
}

/**
 * Turns an object whose values are 'action creators' into an object with the same
 * keys but with every action creator wrapped into a 'dispatch' call that we can invoke
 * directly later on. Here we imported the actions specified in 'CounterActions.js' and
 * used the bindActionCreators function Redux provides us.
 *
 * More info: http://redux.js.org/docs/api/bindActionCreators.html
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CounterActions, dispatch)
  };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
