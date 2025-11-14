import React, { useEffect, useState } from "react";
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";

const API = "http://localhost:5500/api/events";

const EventForm = ({ onEventAdded, editingEvent, onCancelEdit }) => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    description: "",
    category: "General",
    location: "",
  });

  useEffect(() => {
    if (editingEvent) {
      setEventData({
        title: editingEvent.title || "",
        date: editingEvent.date || "",
        description: editingEvent.description || "",
        category: editingEvent.category || "General",
        location: editingEvent.location || "",
      });
    }
  }, [editingEvent]);

  const handleChange = (e) => setEventData({ ...eventData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingEvent && editingEvent._id) {
      await axios.put(`${API}/${editingEvent._id}`, eventData);
      onCancelEdit && onCancelEdit();
    } else {
      await axios.post(API, eventData);
    }
    setEventData({ title: "", date: "", description: "", category: "General", location: "" });
    onEventAdded();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
      <TextField name="title" label="Title" value={eventData.title} onChange={handleChange} required />
      <TextField name="date" label="Date" type="date" InputLabelProps={{ shrink: true }} value={eventData.date} onChange={handleChange} required />
      <TextField name="location" label="Location" value={eventData.location} onChange={handleChange} />
      <TextField name="description" label="Description" multiline rows={3} value={eventData.description} onChange={handleChange} />
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select name="category" value={eventData.category} label="Category" onChange={handleChange}>
          <MenuItem value="General">General</MenuItem>
          <MenuItem value="Technical">Technical</MenuItem>
          <MenuItem value="Cultural">Cultural</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
        </Select>
      </FormControl>

      <Box display="flex" gap={2}>
        <Button variant="contained" type="submit">{editingEvent ? "Update Event" : "Add Event"}</Button>
        {editingEvent && <Button variant="outlined" onClick={() => { onCancelEdit(); setEventData({ title: "", date: "", description: "", category: "General", location: "" }); }}>Cancel</Button>}
      </Box>
    </Box>
  );
};

export default EventForm;
