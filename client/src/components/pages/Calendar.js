import React, { useEffect } from "react";
import "../../utilities.css";

const CLIENT_ID = "154522575589-2rkfiiho0carquu6j4suu809fsc5cnuc.apps.googleusercontent.com";
const API_KEY = "AIzaSyD07iJMXLq6nv2X8SANYJsNT_mTTL88OKQ";

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const Calendar = (props) => {
  let tokenClient;
  let gapiInited = false;
  let gisInited = false;

  useEffect(() => {
    document.getElementById("authorize_button");
    document.getElementById("signout_button");
  }, []);

  function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
  }

  function gisLoaded() {
    try {
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (resp) => {
          if (resp.error !== undefined) {
            throw resp;
          }
          document.getElementById("signout_button").disabled = false;
          document.getElementById("authorize_button").innerText = "Refresh";
          await listUpcomingEvents();
        },
      });
      gisInited = true;
      maybeEnableButtons();
    } catch (error) {
      console.error("Error initializing token client:", error);
    }
  }

  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      document.getElementById("authorize_button").disabled = false;
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    // Ensure tokenClient is initialized before setting the callback
    if (!tokenClient) {
      console.error("Token client is not initialized.");
      return;
    }

    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      document.getElementById("signout_button").disabled = false;
      document.getElementById("authorize_button").innerText = "Refresh";
      await listUpcomingEvents();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: "" });
    }
  }

  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken("");
      document.getElementById("content").innerText = "";
      document.getElementById("authorize_button").innerText = "Authorize";
      document.getElementById("signout_button").disabled = true;
    }
  }

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  async function listUpcomingEvents() {
    let response;
    try {
      const request = {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      };
      response = await gapi.client.calendar.events.list(request);
    } catch (err) {
      document.getElementById("content").innerText = err.message;
      return;
    }

    const events = response.result.items;
    if (!events || events.length === 0) {
      document.getElementById("content").innerText = "No events found.";
      return;
    }
    // Flatten to string to display
    const output = events.reduce(
      (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
      "Events:\n"
    );
    document.getElementById("content").innerText = output;
  }

  useEffect(() => {
    // Load Google API script
    const gapiScript = document.createElement("script");
    gapiScript.src = "https://apis.google.com/js/api.js";
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = gapiLoaded;
    document.body.appendChild(gapiScript);

    // Load Google Sign-In script
    const gsiScript = document.createElement("script");
    gsiScript.src = "https://accounts.google.com/gsi/client";
    gsiScript.async = true;
    gsiScript.defer = true;
    gsiScript.onload = gisLoaded;
    document.body.appendChild(gsiScript);

    // Cleanup: remove scripts when the component unmounts
    return () => {
      document.body.removeChild(gapiScript);
      document.body.removeChild(gsiScript);
    };
  }, []);

  return (
    <>
      <div>
        <body>
          <p>Google Calendar API Quickstart</p>

          <script async defer src="https://apis.google.com/js/api.js" onLoad={gapiLoaded}></script>
          <script
            async
            defer
            src="https://accounts.google.com/gsi/client"
            onLoad={gisLoaded}
          ></script>

          <button id="authorize_button" onClick={handleAuthClick}>
            Authorize
          </button>
          <button id="signout_button" onClick={handleSignoutClick}>
            Sign Out
          </button>

          <div id="content"></div>
        </body>
      </div>
    </>
  );
};

export default Calendar;
