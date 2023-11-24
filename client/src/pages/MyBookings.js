import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./BookingPage.css";


const MyBookings = () => {
  const navigate = useNavigate();
  const [ticketId, setTravelInfotId] = useState("");
  const [ticketInfo, setTravelInfo] = useState(null);
  const [cancellation, setCancellation] = useState(false);
  const [update, setupdate] = useState(false);

  const handleTicketIdChange = (e) => {
    setTravelInfotId(e.target.value);
  };
  const handleupdate = () => {
    setupdate(!update);
  };
  const handleCancellation = () => {
    setCancellation(!cancellation);
  };
  const handleDelete = () => {
    const passengerId = ticketInfo.PassengerId;
    const apiUrl = `http://localhost:5000/api/deletebooking/${passengerId}`;
    
    toast.success("Ticket deleted successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    axios.delete(apiUrl)
      .then((response) => {
        // Handle success, e.g., navigate to another page or update the UI
        console.log("Booking deleted successfully", response);
        
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
      });
  };
  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history
  };

  const handleRetrieveInfo = () => {
    const apiUrl = `http://localhost:5000/api/getmyticket/${ticketId}`;

    axios.get(apiUrl)
      .then((response) => {
        setTravelInfo(response.data[0]);
      })
      .catch((error) => {
        console.error("Error retrieving travel information:", error);
      });
  };

  return (
    <div className="container">
      <h2 style={{ fontSize: "30px"}} className="heading">My Bookings</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleRetrieveInfo(); }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: "22px", marginBottom: "10px", display: "flex", flexDirection: "row", alignItems: "center" }}>
          <label >
            Enter Ticket ID:
            <input type="text" value={ticketId} onChange={handleTicketIdChange} style={{fontSize: "22px", width: "200px" }} />
          </label>
        </div>
        <button className="btn btn-confirm" style={{ margin: "20px", padding: "10px", fontSize: "18px" }} onClick={handleRetrieveInfo}>
          Retrieve Travel Information
        </button>
      </form>

      {ticketInfo && (
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "22px"  }}>
          {/* Booking Details Column */}
          <div style={{ width: "45%"}}>
            <h3 style={{ fontSize: "30px"}}>Booking Details</h3>
            <p>Ticket ID: {ticketInfo.TicketID}</p>
            <p>Cost: {ticketInfo.Cost}</p>
            <p>Booking Date: {ticketInfo.BookingDate}</p>
            <p>Cancellation Fee: {ticketInfo["Cancellation Fee"]}</p>
            <p>Class: {ticketInfo.Class}</p>
            <p>Departure Date: {ticketInfo.Departure_Date}</p>
            <p>Seat Number: {ticketInfo["Seat Number"]}</p>
          </div>

          {/* Passenger Details Column */}
          <div style={{ width: "45%"}}>
            <h3 style={{ fontSize: "30px"}}>Passenger Details</h3>
            <p>First Name: {ticketInfo.FirstName}</p>
            <p>Last Name: {ticketInfo.Lastname}</p>
            <p>Phone Number: {ticketInfo.PhoneNumber}</p>
            <p>Miles on Passenger: {ticketInfo.Miles_on_Passenger}</p>
            <p>Tail Number: {ticketInfo["Tail Number"]}</p>
          </div>
        </div>
      )}

      {ticketInfo && cancellation && (
        <div style={{ marginTop: "20px", textAlign: "center",fontSize: "22px" }}>
          <p style={{ marginBottom: "20px" }}>Do you want to delete this booking? You might be charged a cancellation fee.</p>
          <div style={{ alignItems: "center" }}>
          <p style={{ marginBottom: "20px" }}>Your Cancellation Fee would be: {ticketInfo["Cancellation Fee"]}</p>
          </div>
          <Link to="/">
            <button className="btn btn-confirm" style={{ margin: "20px", padding: "15px", fontSize: "18px" }}onClick={handleDelete} >Continue</button>
          </Link>
          <button className="btn btn-confirm" style={{ margin: "20px", padding: "15px", fontSize: "18px" }} onClick={handleCancellation}>Go Back</button>
        </div>
      )}
      {ticketInfo && update && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p style={{ marginBottom: "20px", fontSize: "18px" }}>Do you want to update this booking?</p>
          <Link to="/BookingPage2">
            <button className="btn btn-confirm" style={{ margin: "20px", padding: "15px", fontSize: "18px" }}>Continue</button>
          </Link>
          <button className="btn btn-confirm" style={{ margin: "20px", padding: "15px", fontSize: "18px" }} onClick={handleupdate}>Go Back</button>
        </div>
      )}

      {ticketInfo && !cancellation && !update && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p style={{ marginBottom: "20px", fontSize: "18px" }}>Do you want to delete or update this booking? </p>
          <button className="btn btn-confirm" style={{ marginTop: "20px",marginRight:"20px", padding: "15px", fontSize: "18px" }} onClick={handleupdate} >
          Update Booking
          </button>
          <button className="btn btn-confirm" style={{ marginTop: "20px",marginLeft:"20px", padding: "15px", fontSize: "18px" }} onClick={handleCancellation} >
            Delete Booking 
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;