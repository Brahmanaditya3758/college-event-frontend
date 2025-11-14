import React, { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";
import AuthForm from "./components/AuthForm";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Navbar from "./components/Navbar";
import { initAuth, setAuthToken } from "./auth";

const API = "http://localhost:5500/api/events";

function App() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(API);
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  const token = initAuth();
  if (token) {
    setUser({ loggedIn: true }); // ANY value works
  }
  fetchEvents();
  }, []);

  const handleLogout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  if (!user) return <AuthForm onSuccess={(usr) => setUser(usr)} />;

  return (
    <>
      <Navbar onLogout={handleLogout} />

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          
          {/* Left Side: Form */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, borderRadius: 3 }}>
              <EventForm
                onEventAdded={fetchEvents}
                editingEvent={editingEvent}
                clearEditing={() => setEditingEvent(null)}
              />
            </Paper>
          </Grid>

          {/* Right Side: Event List */}
          <Grid item xs={12} md={8}>
            <EventList
              events={events}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}

export default App;
