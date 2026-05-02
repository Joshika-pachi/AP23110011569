import { useEffect, useState } from "react";
import Log from "../log";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Stack,
  GlobalStyles,
  CircularProgress,
  Alert,
  Grid
} from "@mui/material";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [topN, setTopN] = useState(5);
  const [viewed, setViewed] = useState(new Set());
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, [page, filter]);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      await Log("frontend", "info", "api", "Fetching notifications");

      let url = `/api/notifications?page=${page}&limit=${limit}`;
      if (filter) url += `&notification_type=${filter}`;

      const res = await fetch(url, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqb3NoaWthX3BhY2hpZ3VsbGFAc3JtYXAuZWR1LmluIiwiZXhwIjoxNzc3NzA2NjU3LCJpYXQiOjE3Nzc3MDU3NTcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxN2U5NjU3NS1hYTVkLTQ0OTAtYTE1MS1lMzg3ZTU3Y2Y0MzYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJqb3NoaWthIiwic3ViIjoiMWViNzZhOWQtYTZkMy00OWUxLWE4YWEtMTNlNGQxYTVhNWYwIn0sImVtYWlsIjoiam9zaGlrYV9wYWNoaWd1bGxhQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJqb3NoaWthIiwicm9sbE5vIjoiYXAyMzExMDAxMTU2OSIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjFlYjc2YTlkLWE2ZDMtNDllMS1hOGFhLTEzZTRkMWE1YTVmMCIsImNsaWVudFNlY3JldCI6InZzRFBYWnBKS1VqenNWYlQifQ.14x3kCaIV8CdFknRSVFxaT3h7A6hzKbmzanJRhHFyLQ"
        }
      });

      const data = await res.json();

      if (!data.notifications) return;

      setNotifications(data.notifications);

      await Log("frontend", "info", "state", "Notifications loaded");
    } catch (err) {
      await Log("frontend", "error", "api", "Fetch failed");
      console.error(err);
      setError("Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
  };

  const priorityMap = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  const sorted = [...notifications].sort((a, b) => {
    if (priorityMap[b.Type] !== priorityMap[a.Type]) {
      return priorityMap[b.Type] - priorityMap[a.Type];
    }
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  const topNotifications = sorted.slice(0, topN);

  const markViewed = (id) => {
    setViewed((prev) => new Set(prev).add(id));
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Placement": return "#2563eb";
      case "Result": return "#10b981";
      case "Event": return "#f59e0b";
      default: return "#94a3b8";
    }
  };

  const NotificationCard = ({ n }) => {
    const isViewed = viewed.has(n.ID);
    const typeColor = getTypeColor(n.Type);

    return (
      <Card
        onClick={() => markViewed(n.ID)}
        sx={{
          mb: 2,
          cursor: "pointer",
          background: isViewed ? "#f1f5f9" : "#fff",
          borderLeft: isViewed ? "4px solid transparent" : `6px solid ${typeColor}`,
          opacity: isViewed ? 0.7 : 1,
          boxShadow: isViewed ? 0 : 2,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.01)",
            boxShadow: isViewed ? 1 : 4,
          }
        }}
      >
        <CardContent sx={{ pb: "16px !important" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                label={n.Type}
                size="small"
                sx={{
                  bgcolor: `${typeColor}1a`,
                  color: typeColor,
                  fontWeight: 600
                }}
              />
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                {new Date(n.Timestamp).toLocaleString()}
              </Typography>
            </Box>
            {isViewed ? (
              <Chip label="Viewed" size="small" variant="outlined" sx={{ color: "text.secondary", borderColor: "divider" }} />
            ) : (
              <Chip label="New" size="small" sx={{ bgcolor: "#eff6ff", color: "#2563eb", fontWeight: 600 }} />
            )}
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: isViewed ? 400 : 500,
              color: isViewed ? "text.secondary" : "text.primary",
              mt: 1
            }}
          >
            {n.Message}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fb", py: 4 }}>
      <GlobalStyles styles={{ body: { backgroundColor: "#f5f7fb", margin: 0 } }} />
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 4, color: "#1e293b" }}>
          Notification System
        </Typography>

        {/* Controls */}
        <Card sx={{ mb: 4, boxShadow: 1, borderRadius: 2 }}>
          <CardContent>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Filter Type</InputLabel>
                <Select
                  value={filter}
                  label="Filter Type"
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Event">Event</MenuItem>
                  <MenuItem value="Result">Result</MenuItem>
                  <MenuItem value="Placement">Placement</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Top N"
                type="number"
                size="small"
                value={topN}
                onChange={(e) => setTopN(e.target.value)}
                sx={{ width: 100 }}
              />

              <Box flexGrow={1} />
            </Stack>
          </CardContent>
        </Card>

        {/* States & Notifications */}
        {loading ? (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : notifications.length === 0 ? (
          <Box textAlign="center" py={6}>
            <Typography variant="h6" color="text.secondary">
              No notifications available
            </Typography>
          </Box>
        ) : (
          <>
            {/* Priority Notifications */}
            {topNotifications.length > 0 && (
              <Box mb={4}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: "#334155" }}>
                  Priority Notifications
                </Typography>
                {topNotifications.map((n) => (
                  <NotificationCard key={n.ID} n={n} />
                ))}
              </Box>
            )}

            <Divider sx={{ my: 4 }} />

            {/* All Notifications */}
            <Box mb={4}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: "#334155" }}>
                All Notifications
              </Typography>
              {notifications.map((n) => (
                <NotificationCard key={`all-${n.ID}`} n={n} />
              ))}
            </Box>

            {/* Bottom Pagination */}
            <Box display="flex" justifyContent="center" alignItems="center" mt={2} mb={4} gap={2}>
              <Button
                variant="outlined"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Previous
              </Button>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Page {page}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setPage((p) => p + 1)}
                disabled={notifications.length < limit}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Next
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}

export default App;