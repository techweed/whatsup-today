import React, { memo } from "react";

import "./spinner.css";

export const Loader = () => (
  <div className="spinner">
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>
);

export const Spinner = () => (
  <div className="spinner-container">
    <Loader />
  </div>
);

export const SpinnerText = () => (
  <div className="spinner-container">
    <Loader />
    <span className="spinner-text">Scheduling In Progress.</span>
  </div>
);

export const SpinnerCenter = () => (
  <div className="spinner-center">
    <Loader />
  </div>
);

export default memo(Spinner);
