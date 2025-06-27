import React from "react";
import "./Card.css";

const Card = ({data}) => {
  return (
    <>
    <div className="container-fluid">
    <div className="row">
     {data?.length && data?.map((item,index) => {
        return(
            <div key={index} className="col-lg-3 col-md-4 col-sm-12" style={{marginBottom: "20px"}}>
            <div className="card" id={item.id} style={{width: "100%",height: "450px"}}>
        <img src={item.image} className="card-img-top" style={{height: "350px",objectFit: "contain"}} alt="..." />
        <div className="card-body" style={{height: "100px"}}>
          <a href="#" className="btn card-title-btn ">
          <h5 className="card-title">{item.title}</h5>
          </a>
        </div>
      </div>
      </div>
        )
     } )}
    </div>
    </div>
    </>
  );
};

export default Card;
