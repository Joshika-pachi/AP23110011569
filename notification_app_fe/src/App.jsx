import { useEffect } from "react";
import Log from "../log"

function App() {
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      await Log("frontend", "info", "api", "Fetching notifications");

      const res = await fetch(
        "http://20.207.122.201/evaluation-service/notifications",
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqb3NoaWthX3BhY2hpZ3VsbGFAc3JtYXAuZWR1LmluIiwiZXhwIjoxNzc3NzAxMzkxLCJpYXQiOjE3Nzc3MDA0OTEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkM2VhOGEzNy1lNTE4LTRkMzYtODRjMC1mNzA3NTg2NWQ0ZWIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJqb3NoaWthIiwic3ViIjoiMWViNzZhOWQtYTZkMy00OWUxLWE4YWEtMTNlNGQxYTVhNWYwIn0sImVtYWlsIjoiam9zaGlrYV9wYWNoaWd1bGxhQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJqb3NoaWthIiwicm9sbE5vIjoiYXAyMzExMDAxMTU2OSIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjFlYjc2YTlkLWE2ZDMtNDllMS1hOGFhLTEzZTRkMWE1YTVmMCIsImNsaWVudFNlY3JldCI6InZzRFBYWnBKS1VqenNWYlQifQ.GPy95vqh0ueYiI-oHM1V4q47XS_bR1iznPfHuoVKXVw"
          }
        }
      );

      const data = await res.json();

if (!data.notifications) {
  console.error("No notifications received", data);
  return;
}

const notifications = data.notifications;

      // Priority mapping
      const priorityMap = {
        Placement: 3,
        Result: 2,
        Event: 1
      };

      // Sort by priority + recency
      const sorted = notifications.sort((a, b) => {
        if (priorityMap[b.Type] !== priorityMap[a.Type]) {
          return priorityMap[b.Type] - priorityMap[a.Type];
        }
        return new Date(b.Timestamp) - new Date(a.Timestamp);
      });

      const top10 = sorted.slice(0, 10);

      await Log("frontend", "info", "state", "Top 10 notifications selected");

      console.log("Top 10 Notifications:", top10);

    } catch (err) {
      await Log("frontend", "error", "api", "Error fetching notifications");
      console.error(err);
    }
  };

  return <h1>Check console for Stage 1 output</h1>;
}

export default App;