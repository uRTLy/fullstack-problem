import { Alert } from "react-bootstrap";
import React from "react";

const Notification = error => {
  return (
    <Alert bsStyle="danger">
      {error.message}
    </Alert>
  );
};

export default Notification;
