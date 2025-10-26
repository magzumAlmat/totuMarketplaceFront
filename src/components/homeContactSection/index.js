
// import { useState } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   Paper,
//   TextField,
//   Button,
//   InputAdornment,
//   Link,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Image from "next/image";
// import { PersonOutline, PhoneOutlined } from "@mui/icons-material";

// // Стилизация
// const DarkStyledButton = styled(Button)(({ theme }) => ({
//   borderRadius: "12px",
//   padding: "12px 24px",
//   backgroundColor: "#003087",
//   color: "#FFFFFF",
//   textTransform: "none",
//   fontWeight: "600",
//   "&:hover": {
//     backgroundColor: "#002060",
//   },
//   fontFamily: "Montserrat, sans-serif",
//   width: "100%",
// }));

// const StyledTextField = styled(TextField)(({ theme }) => ({
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "10px",
//     backgroundColor: "#FFFFFF",
//     "& fieldset": {
//       borderColor: "#E0E0E0",
//     },
//     "&:hover fieldset": {
//       borderColor: "#ADD8E6",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#ADD8E6",
//     },
//   },
//   "& .MuiInputBase-input": {
//     padding: "12px",
//     fontFamily: "Montserrat, sans-serif",
//   },
// }));

// const CategoryCard = styled(Paper)(({ theme }) => ({
//   height: "200px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   textAlign: "center",
//   backgroundColor: "#FFFFFF",
//   borderRadius: "12px",
//   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-4px)",
//     boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
//   },
//   cursor: "pointer",
//   padding: theme.spacing(2),
// }));

// // Компонент секции
// const ContactSection = () => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", { name, phone });
//     // TODO: Implement actual submission logic (e.g., API call to your backend)
//     setName("");
//     setPhone("");
//   };

//   // Категории аксессуаров для телефонов
//   const categories = [
//     { name: "Cases", image: "/image/case.png" },
//     { name: "Chargers", image: "/image/charger.png" },
//     { name: "Headphones", image: "/image/headphones.png" },
//     { name: "Cables", image: "/image/cable.png" },
//     { name: "Screen Protectors", image: "/image/screen_protector.png" },
//     { name: "Power Banks", image: "/image/power_bank.png" },
//     "Все товары", 
//     "Чехлы",
//     "Зарядные устройства",
//     "Зарядные устройства Iphone",
//     "Зарядные устройства Samsung",
//     "Держатели устойства",
//     "Наушники беспроводные",
//     "Наушники проводные",
//     "Smart-часы и аксессуары",
//     "Защитные стекла",
//     "Портативная зарядка(Power Bank)",
//     "Гидрогелевые пленки",
//     "Шатативы",
//     "Фото-видео свет",
//     "Чехлы для планшетов",
//     "Внешник накопители",
//     "Автомобильные аксессуары",
//     "Петличный микрофон",
//     "Переферийные устройства",
//     "Сумки",
//     "Другое",
//     { name: "All Accessories", image: "/image/all_accessories.png" },
//   ];

//   return (
//     <Box
//       mt={8}
//       py={6}
//       sx={{
//         backgroundColor: "#E0F2F7",
//         backgroundImage: `url("/image/accessory_bg.png")`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         position: "relative",
//         "&:before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background:
//             "radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 2px)",
//           backgroundSize: "10px 10px",
//           opacity: 0.5,
//           zIndex: 1,
//         },
//       }}
//     >
//       {/* Секция категорий аксессуаров */}
//       <Box sx={{ mb: 6, position: "relative", zIndex: 2 }}>
//         <Typography
//           variant="h4"
//           fontWeight="700"
//           color="#333333"
//           textAlign="center"
//           mb={4}
//           sx={{ textTransform: "uppercase" }}
//         >
//           Phone Accessories Categories
//         </Typography>
//         <Grid container spacing={3} justifyContent="center">
//           {categories.map((category) => (
//             <Grid
//               item
//               xs={12}
//               sm={6}
//               md={3}
//               key={category.name}
//               sx={{ display: "flex", justifyContent: "center" }}
//             >
//               <Link href={`/products?category=${encodeURIComponent(category.name)}`} passHref>
//                 <CategoryCard
//                   component="a"
//                   sx={{
//                     textDecoration: "none",
//                     color: "#333333",
//                     "&:hover": {
//                       textDecoration: "none",
//                     },
//                   }}
//                 >
//                   <Box sx={{ position: "relative", width: "100%", height: "120px" }}>
//                     <Image
//                       src={category.image}
//                       alt={category.name}
//                       fill
//                       style={{ objectFit: "contain" }}
//                       sizes="(max-width: 600px) 100vw, 25vw"
//                       priority={false}
//                       loading="lazy"
//                     />
//                   </Box>
//                   <Typography
//                     variant="h6"
//                     fontWeight="600"
//                     mt={2}
//                     sx={{ fontSize: "1rem", fontFamily: "Montserrat, sans-serif" }}
//                   >
//                     {category.name}
//                   </Typography>
//                 </CategoryCard>
//               </Link>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       {/* Форма обратной связи */}
//       {/* <Box
//         component={Paper}
//         elevation={0}
//         sx={{
//           p: 4,
//           maxWidth: "800px",
//           mx: "auto",
//           backgroundColor: "rgba(255, 255, 255, 0.9)",
//           borderRadius: "15px",
//           position: "relative",
//           zIndex: 2,
//         }}
//       >
//         <Typography variant="h5" fontWeight="700" color="#333333" mb={2}>
//           Request a Call About Phone Accessories
//         </Typography>
//         <Typography variant="body1" color="#666666" mb={3}>
//           Leave your details, and our experts will contact you soon to assist with your accessory needs.
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <StyledTextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Your Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonOutline sx={{ color: "#ADD8E6" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <StyledTextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Your Phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PhoneOutlined sx={{ color: "#ADD8E6" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <DarkStyledButton type="submit">Submit Request</DarkStyledButton>
//             </Grid>
//           </Grid>
//         </form>
//       </Box> */}
//     </Box>
//   );
// };

// export default ContactSection;











import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  InputAdornment,
  Link,
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

const CategoryCard = styled(Paper)(({ theme }) => ({
  height: "200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  },
  cursor: "pointer",
  padding: theme.spacing(2),
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

  // Нормализованный массив категорий аксессуаров для телефонов
  const categories = [
    { name: "Cases", image: "/image/case.png" },
    { name: "Chargers", image: "/image/charger.png" },
    { name: "Headphones", image: "/image/headphones.png" },
    { name: "Cables", image: "/image/cable.png" },
    { name: "Screen Protectors", image: "/image/screen_protector.png" },
    { name: "Power Banks", image: "/image/power_bank.png" },
    { name: "Все товары", image: "/image/all_accessories.png" },
    { name: "Чехлы", image: "/image/case.png" },
    { name: "Зарядные устройства", image: "/image/charger.png" },
    { name: "Зарядные устройства iPhone", image: "/image/iphone_charger.png" },
    { name: "Зарядные устройства Samsung", image: "/image/samsung_charger.png" },
    { name: "Держатели устройства", image: "/image/holder.png" },
    { name: "Наушники беспроводные", image: "/image/wireless_headphones.png" },
    { name: "Наушники проводные", image: "/image/wired_headphones.png" },
    { name: "Smart-часы и аксессуары", image: "/image/smartwatch.png" },
    { name: "Защитные стекла", image: "/image/glass_protector.png" },
    { name: "Портативная зарядка (Power Bank)", image: "/image/power_bank.png" },
    { name: "Гидрогелевые пленки", image: "/image/hydrogel_film.png" },
    { name: "Штативы", image: "/image/tripod.png" },
    { name: "Фото-видео свет", image: "/image/photo_light.png" },
    { name: "Чехлы для планшетов", image: "/image/tablet_case.png" },
    { name: "Внешние накопители", image: "/image/external_drive.png" },
    { name: "Автомобильные аксессуары", image: "/image/car_accessory.png" },
    { name: "Петличный микрофон", image: "/image/lavalier_mic.png" },
    { name: "Переферийные устройства", image: "/image/peripheral.png" },
    { name: "Сумки", image: "/image/bag.png" },
    { name: "Другое", image: "/image/default.png" },
    { name: "All Accessories", image: "/image/all_accessories.png" },
  ];

  return (
    <Box
      mt={8}
      py={6}
      sx={{
        backgroundColor: "#E0F2F7",
        backgroundImage: `url("/image/accessory_bg.png")`,
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
      {/* Секция категорий аксессуаров */}
      <Box sx={{ mb: 6, position: "relative", zIndex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="700"
          color="#333333"
          textAlign="center"
          mb={4}
          sx={{ textTransform: "uppercase" }}
        >
          Phone Accessories Categories
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((category) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={category.name}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Link href={`/products?category=${encodeURIComponent(category.name)}`} passHref>
                <CategoryCard
                  component="a"
                  sx={{
                    textDecoration: "none",
                    color: "#333333",
                    "&:hover": {
                      textDecoration: "none",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", width: "100%", height: "120px" }}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 600px) 100vw, 25vw"
                      priority={false}
                      loading="lazy"
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    mt={2}
                    sx={{ fontSize: "1rem", fontFamily: "Montserrat, sans-serif" }}
                  >
                    {category.name}
                  </Typography>
                </CategoryCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Форма обратной связи (восстановлена для полноты) */}
      <Box
        component={Paper}
        elevation={0}
        sx={{
          p: 4,
          maxWidth: "800px",
          mx: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "15px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography variant="h5" fontWeight="700" color="#333333" mb={2}>
          Request a Call About Phone Accessories
        </Typography>
        <Typography variant="body1" color="#666666" mb={3}>
          Leave your details, and our experts will contact you soon to assist with your accessory needs.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                variant="outlined"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline sx={{ color: "#ADD8E6" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                variant="outlined"
                placeholder="Your Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlined sx={{ color: "#ADD8E6" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DarkStyledButton type="submit">Submit Request</DarkStyledButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default ContactSection;
