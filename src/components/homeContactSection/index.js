import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { PersonOutline, PhoneOutlined } from "@mui/icons-material";

// Стилизация
const DarkStyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "12px 24px",
  backgroundColor: "#003087",
  color: "#FFFFFF",
  textTransform: "none",
  fontWeight: "600",
  "&:hover": {
    backgroundColor: "#002060",
  },
  fontFamily: "Montserrat, sans-serif",
  width: "100%",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    "& fieldset": {
      borderColor: "#E0E0E0",
    },
    "&:hover fieldset": {
      borderColor: "#ADD8E6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ADD8E6",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px",
    fontFamily: "Montserrat, sans-serif",
  },
}));

// Компонент секции
const ContactSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, phone });
    // TODO: Implement actual submission logic (e.g., API call to your backend)
    setName("");
    setPhone("");
  };



  return (
    <Box
      mt={8}
      py={6}
      sx={{
        backgroundColor: "#FFE5D9",
        backgroundImage: `url("/image/contact_bg.png")`, // Замените на реальный путь, например: `/image/contact_bg.png`
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 2px)",
          backgroundSize: "10px 10px",
          opacity: 0.5,
          zIndex: 1,
        },
      }}
    >
     


  фывфвы

    </Box>
  );
};

export default ContactSection;