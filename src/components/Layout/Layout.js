import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Activities from "../../pages/activities/Activities";
import Activity from "../../pages/activity/Activity";
import NewActivity from "../../pages/new_activity/NewActivity";
import EditActivity from "../../pages/edit_activity/EditActivity";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route exact path="/app/activities" component={Activities} />
            <Route exact path="/app/activities/new" component={NewActivity} />
            <Route exact path="/app/activities/:id" component={Activity} />
            <Route
              exact
              path="/app/activities/:id/edit"
              component={EditActivity}
            />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
