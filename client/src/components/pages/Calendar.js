import React from "react";
import ApiCalendar from "react-google-calendar-api";
import { SyntheticEvent, useState } from "react";

const config = {
  clientId: "154522575589-2rkfiiho0carquu6j4suu809fsc5cnuc.apps.googleusercontent.com",
  apiKey: "AIzaSyD07iJMXLq6nv2X8SANYJsNT_mTTL88OKQ",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
};

const apiCalendar = new ApiCalendar(config);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(true);

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  //const [calendars, setCalendars] = useState([]);

  const handleItemClick = (event, name) => {
    if (name === "sign-in") {
      apiCalendar
        .handleAuthClick()
        .then(() => {
          setShow(!show);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (name === "sign-out") {
      apiCalendar.handleSignoutClick();
      setShow(!show);
    }
  };

  return (
    <div>
      <div style={{ padding: "0.5em" }}>
        {show ? (
          <button onClick={(e) => handleItemClick(e, "sign-in")}>sign-in</button>
        ) : (
          <div>
            <button onClick={(e) => handleItemClick(e, "sign-out")}>sign-out</button>
            <div style={{ padding: "0.5em" }}>
              <button
                onClick={(e) => {
                  const eventFromNow = {
                    summary: "Hey!",
                    start: {
                      dateTime: new Date("January 28 2024 2:43").toISOString(),
                      timeZone: "EST",
                    },
                    end: {
                      dateTime: new Date(
                        new Date("January 28 2024 14:43").getTime() + 3600000
                      ).toISOString(),
                      timeZone: "EST",
                    },
                  };

                  apiCalendar
                    .createEvent(eventFromNow)
                    .then((result) => {
                      console.log(result);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                Create Event from now
              </button>
            </div>
            <div style={{ padding: "0.5em" }}>
              <button
                onClick={(e) => {
                  apiCalendar.listUpcomingEvents(10).then(({ result }) => {
                    console.log("result.items= ", result.items);
                    setEvents(result.items);
                  });
                }}
              >
                List upcoming events
              </button>
              <div>
                <h4>Events</h4>
                {events.length === 0 && <p>No events to show</p>}
                {events.map((event) => (
                  <p key={event.id}>
                    {`${event.summary} (${event.start.dateTime || event.start.date})\n`}
                  </p>
                ))}
              </div>
            </div>
            <div style={{ padding: "0.5em" }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
