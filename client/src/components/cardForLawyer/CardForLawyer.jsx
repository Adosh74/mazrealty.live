import { Link } from "react-router-dom";
import "./cardForLawyer.scss";
import {Trash2,Eye,BookCheck} from "lucide-react";
import toast from "react-hot-toast";

function CardForLawyer({ item }) {
  
      const handelReject = async () => {
        toast.success('It has been rejected',{ style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },})
      }

      const handelAccept = async () => {
        toast.success('It has been accepted')
      }

  return (
    <div className="cardLawyer">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.img} alt="" />
      </Link>
      <div className="cardLeft">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    
      <div className="cardRight">
        <button onClick={handelReject} className="rejectButton"><div></div><Trash2 /></button> 
        <button onClick={handelAccept} className="acceptButton"><BookCheck /></button>
        <Link to={item.img}><button className="viewButton"><Eye /><span>view contract</span></button></Link>
      </div>
  </div>
    
  );
}

export default CardForLawyer;
