const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Alphacow_20",
  database: "airlinedatabase1",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ****  passengers function start **** 

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM passengers";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// this is for adding in new bookingpage2

app.post("/api/post", (req, res) => {
  const { firstname, lastname, phoneno, miles, tailnumber } = req.body;

  const sqlInsert =
    "INSERT INTO passengers (FirstName, Lastname, PhoneNumber, Miles_on_Passenger, `Tail Number`) VALUES (?, ?, ?, ?, ?)";
  
  db.query(sqlInsert, [firstname, lastname, phoneno, miles, tailnumber], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(200).json({ message: 'Passenger added successfully' });
  });
});



app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM passengers WHERE PassengerId = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM passengers WHERE PassengerId = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const {firstname, lastname, phoneno, miles } = req.body;
  const sqlUpdate = "UPDATE passengers SET FirstName = ?, Lastname = ?, PhoneNumber = ?,Miles_on_Passenger = ?  WHERE PassengerId = ?";
  db.query(sqlUpdate, [firstname, lastname, phoneno, miles ], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.get("/", (req, res) => 
{
// const sqlInsert = 
//               "INSERT INTO passengers (ï»¿FirstName, Lastname, PhoneNumber, PassengerId, Miles_on_Passenger ) VALUES ('Amy','May', 555555, 111111, 1200)";
// db.query(sqlInsert, (error, result)=>{
//   console.log("error", error);
//   console.log("result", result);
//   res.send("hELLO");
//   }); 
});

// ****  passenger function ends **** 

// ****  airplane function starts **** 

app.get("/api/get1", (req, res) => {
  const sqlGet = "SELECT * FROM airplanes";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post1", (req, res) => {
  const {arrivaltime, departuretime, destination, duration, tailnumber, airlineid, totalmiles } = req.body;
  const sqlInsert2 =
    "INSERT INTO airplanes (arrivaltime, departuretime, destination, duration, tailnumber, airlineid, totalmiles  ) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sqlInsert2, [arrivaltime, departuretime, destination, duration, tailnumber, airlineid, totalmiles], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/remove1/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove2 = "DELETE FROM airplanes WHERE  `Tail Number` = ?";
  db.query(sqlRemove2, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get1/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet2 = "SELECT * FROM airplanes WHERE `Tail Number` = ?";
  db.query(sqlGet2, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update1/:id", (req, res) => {
  const { id } = req.params;
  const {arrivaltime, departuretime, destination, duration, tailnumber, airlineid, totalmiles } = req.body;
  const sqlUpdate2 = "UPDATE airplanes SET arrivaltime = ?, departuretime = ?, destination = ?, duration = ?, tailnumber = ?, airlineid = ?, totalmiles = ?";
  db.query(sqlUpdate2, [arrivaltime, departuretime, destination, duration, tailnumber, airlineid, totalmiles ], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// ****  airplanes function ends **** 

//  **** airport function starts **** 
app.get("/api/get2", (req, res) => {
  const sqlGet = "SELECT * FROM airport";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post2", (req, res) => {
  const {airportID, airportname, city, city_code, state_or_country } = req.body;
  const sqlInsert =
    "INSERT INTO airport (airportID, airportname, city, city_code, state_or_country  ) VALUES (?, ?, ?, ?, ?)";
  db.query(sqlInsert, [airportID, airportname, city, city_code, state_or_country], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/remove2/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM airport WHERE airportID = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get2/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM airport WHERE airportID = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update2/:id", (req, res) => {
  const { id } = req.params;
  const {airportID, airportname, city, city_code, state_or_country } = req.body;
  const sqlUpdate = "UPDATE airport SET airportID = ?, airportname = ?, city = ?, city_code = ?, state_or_country = ?";
  db.query(sqlUpdate, [airportID, airportname, city, city_code, state_or_country ], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});
// ****  airport function ends **** 

// ****  ticket function starts **** 

app.get("/api/get3", (req, res) => {
  const sqlGet = "SELECT * FROM tickets";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post3", (req, res) => {
  const {cost, ticketID, source, destination, seat_number, departure_date, plane_class, cancels, booking_date, cancellation_fee   } = req.body;
  const sqlInsert =
    "INSERT INTO tickets (cost, ticketID, source, destination, seat_number, departure_date, plane_class, cancels, booking_date, cancellation_fee  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sqlInsert, [cost, ticketID, source, destination, seat_number, departure_date, plane_class, cancels, booking_date, cancellation_fee], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/remove3/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM tickets WHERE ticketID = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get3/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM tickets WHERE ticketID = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update3/:id", (req, res) => {
  const { id } = req.params;
  const {cost, ticketID, source, destination, seat_number, departure_date, plane_class, cancels, booking_date, cancellation_fee } = req.body;
  const sqlUpdate = "UPDATE tickets SET cost = ?, ticketID = ?, source = ?, destination = ?, seat_number = ?, departure_date = ?, plane_class = ?, cancels = ?, booking_date = ?, cancellation_fee = ?";
  db.query(sqlUpdate, [airportID, airportname, city, city_code, state_or_country ], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// ****  ticket function ends **** 



// **** destination retrival function ****

app.get("/api/getdestination", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT DISTINCT Destination as `List of Destinations` FROM airplanes ";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

//  **** booking  page function ****
app.get("/api/getdestination/:selectedDestination", (req, res) => {
  const { selectedDestination } = req.params;
  const sqlGet = "SELECT * FROM airplanes WHERE destination = ? ";
  db.query(sqlGet, selectedDestination, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});


//  **** my booking functionS ****


app.get("/api/getmyticket/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = `SELECT t.Cost,t.TicketID,t.BookingDate, t.\`Cancellation Fee\`,t.Class, t.Departure_Date, t.\`Seat Number\`,p.PassengerId,p.FirstName,p.Lastname,p.PhoneNumber,p.PassengerId,p.Miles_on_Passenger,p.\`Tail Number\` 
  FROM tickets as t JOIN passengers as p ON t.PassengerID = p.PassengerId WHERE t.TicketID = ?` ;
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});


app.delete("/api/deletebooking/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM passengers where PassengerId = ? ";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});


app.put("/api/updatebooking/:id", (req, res) => {
  const { id } = req.params;
  const { FirstName, Lastname, PhoneNumber, Miles_on_Passenger, Class, SeatNumber } = req.body;
  
  const sqlUpdate = `UPDATE passengers as p 
  JOIN tickets as t ON p.PassengerId = t.PassengerID 
  SET p.FirstName = ?,  p.Lastname = ?, p.PhoneNumber = ?, p.Miles_on_Passenger = ?, t.Class = ?, t.\`Seat Number\` = ? 
  WHERE t.TicketID = ?`;
  console.log("Received data:", req.body);
  console.log(req.params);
  db.query(sqlUpdate, [FirstName, Lastname, PhoneNumber, Miles_on_Passenger, Class, SeatNumber, id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ success: true, message: "Booking updated successfully" });
    }
  });
});




//  **** my booking end ****

//  **** Interesting Queries ****

//  **** Total Number of Tickets Sold by Airline: ****
app.get("/api/ticketssold", (req, res) => {
  const { id } = req.params;
  const sqlGet = `SELECT a.Airline, COUNT(DISTINCT p.PassengerID) AS TotalTicketsSold
  FROM airplanes AS a
  JOIN passengers AS p ON a.\`Tail Number\` = p.\`Tail Number\`
  GROUP BY a.Airline;
  `;
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});



//  **** Busiest Airports (Based on Departures): ****

app.get("/api/busiestairports", (req, res) => {
  const { id } = req.params;
  const sqlGet = `WITH DepartureCounts AS (
    SELECT
      a.Source AS DepartureAirport,
      COUNT(*) AS DepartureCount
    FROM
      airplanes AS a
    GROUP BY
      a.Source
  )
  SELECT
    DepartureAirport,
    COALESCE(SUM(dc.DepartureCount), 0) AS TotalDepartures
  FROM
    DepartureCounts AS dc
  GROUP BY
    DepartureAirport
  ORDER BY
    TotalDepartures DESC;`;
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});
//  **** Passenger Distribution by Class: ****

app.get("/api/passengerdistribution", (req, res) => {
  const { id } = req.params;
  const sqlGet = `SELECT
  a.\`Tail Number\` AS FlightTailNumber,
  t.Class,
  COUNT(t.PassengerId) AS PassengerCount
FROM
  tickets AS t
JOIN
  passengers AS p ON t.PassengerID = p.PassengerId
JOIN 
  airplanes AS a ON p.\`Tail Number\` = a.\`Tail Number\`
GROUP BY
  a.\`Tail Number\`, t.Class
ORDER BY
  a.\`Tail Number\`, t.Class;`; 
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });