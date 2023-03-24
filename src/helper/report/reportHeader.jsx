import React from "react";
import behsazan from "../assets/img/behsazan.jpg";
import mellat from "../assets/img/mellat.jpg";
import { getCurrentDate } from "../utils/date";
import { Col, Row } from "react-bootstrap";

const ReportHeader = ({ hparam, param, name }) => {
  let arr = [];
  for (const [key, value] of Object.entries(param)) {
    arr.push(
      <p key={key}>
        <span className="mx-2">
          <strong>{key} :</strong>
        </span>
        <span className="text-muted">{value}</span>
      </p>
    );
  }
  return (
    <div className="mt-2">
      <Row className="d-flex justify-content-between">
        <Col>
          <img alt="behsazan" src={behsazan} />
        </Col>
        <Col md={8} sm={6}>
          <p className="row d-flex justify-content-center h3">
            سیستم پشتیبانی بانکداری متمرکز
          </p>
          <p></p>
          <p className="row d-flex justify-content-center h4">{name}</p>
        </Col>
        <Col>
          <img alt="mellat" src={mellat} />
        </Col>
      </Row>
      <div className="row mt-2">
        <div className="row">
          <div className="col-6">
            <p>
              <span className="mx-2">
                <strong>کاربر تهیه کننده گزارش:</strong>
              </span>
              <span className="text-muted">{hparam.userName}</span>
            </p>
            <p>
              <span className="mx-2">
                <strong>نقش کاربر تهیه کننده :</strong>
              </span>
              <span className="text-muted">{hparam.userRole}</span>
            </p>
            <p>
              <span className="mx-2">
                <strong>تاریخ تهیه گزارش:</strong>
              </span>
              <span className="text-muted">
                {getCurrentDate(true).format("jYYYY/jMM/jDD")}
              </span>
            </p>
            <p>
              <span className="mx-2">
                <strong>زمان تهیه گزارش :</strong>
              </span>
              <span className="text-muted">
                {getCurrentDate(true).format("hh:mm:ss")}
              </span>
            </p>
          </div>
          <div className="col-6">{arr}</div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
