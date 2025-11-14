import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const EventList = ({ events, onDelete, onEdit }) => {
  return (
    <Stack spacing={3}>
      {events.map((event) => (
        <Card
          key={event._id}
          sx={{
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "18px",
            padding: 1,
            transition: "0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
              background: "rgba(255, 255, 255, 0.2)", // no hiding, instead brightens
            },
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {event.title}
                </Typography>

                <Typography variant="body2">
                  📅 {event.date} • {event.category}
                </Typography>

                <Typography sx={{ mt: 1.2 }}>{event.description}</Typography>

                {event.location && (
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    📍 {event.location}
                  </Typography>
                )}
              </Box>

              <Box>
                <IconButton onClick={() => onEdit(event)}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  onClick={() => onDelete(event._id)}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default EventList;
