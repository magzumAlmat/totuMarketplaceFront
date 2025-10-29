"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Phone, ShoppingCartOutlined, Menu as MenuIcon } from "@mui/icons-material";
import {
  getAllProductsAction,
  setSelectedMainTypeReducer,
  setSelectedTypeReducer,
} from "@/store/slices/productSlice";
import { logoutAction } from "@/store/slices/authSlice";
import logo from "/public/image/cable/logo.png";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

// Стилизованные компоненты
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "linear-gradient(90deg, rgba(215, 199, 184, 1) 42%, rgba(0, 184, 173, 1) 93%)",
  boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
  height: "100px", // Фиксированная высота, соответствующая логотипу
  [theme.breakpoints.down("sm")]: {
    height: "60px", // Уменьшенная высота для мобильных устройств
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: "100px", // Та же высота, что у AppBar
  minHeight: "100px !important", // Переопределяем стандартную высоту MUI
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    height: "60px",
    minHeight: "60px !important",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: "#333333",
  "& .MuiSelect-icon": {
    color: "#333333",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ADD8E6",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ADD8E6",
  },
  height: "40px", // Уменьшенная высота для выпадающих списков
  [theme.breakpoints.down("sm")]: {
    height: "32px",
  },
}));

const CartButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  padding: "6px 16px",
  textTransform: "none",
  backgroundColor: "#ADD8E6",
  color: "#333333",
  "&:hover": {
    backgroundColor: "#FFFACD",
  },
  height: "40px", // Высота кнопки корзины
  [theme.breakpoints.down("sm")]: {
    height: "32px",
    padding: "4px 12px",
  },
}));

const CategoryButton = styled(Button)(({ theme }) => ({
  color: "#333333",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  height: "40px", // Высота кнопок категорий
  [theme.breakpoints.down("sm")]: {
    height: "32px",
  },
}));

export default function Header() {
  console.log('Header rendering');
  const dispatch = useDispatch();
  const { host, userCart } = useSelector((state) => state.usercart);
  const cartItemCount = userCart.length;

  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { clickCount, allProducts, selectedMainType, selectedType } = useSelector(
    (state) => state.usercart
  );

  // Извлекаем все уникальные категории из allProducts
  const uniqueCategories = [
    ...new Set(
      allProducts
        .flatMap((item) => item.Categories)
        .map((category) => category.name)
    ),
  ];

  const uniqueTypes = selectedMainType
    ? [
        ...new Set(
          allProducts
            .filter((item) =>
              item.Categories.some((cat) => cat.name === selectedMainType)
            )
            .map((item) => item.type)
        ),
      ]
    : [];

  useEffect(() => {
    // Загружаем все товары только при монтировании, без фильтров
    dispatch(getAllProductsAction());
  }, [dispatch]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleNavItemClick = (mainType) => {
    dispatch(setSelectedMainTypeReducer(mainType === "Все товары" ? "" : mainType));
    dispatch(setSelectedTypeReducer(""));
    router.push("/katalog-tovarov");
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    dispatch(setSelectedTypeReducer(type === "Все типы" ? "" : type));
    router.push("/katalog-tovarov");
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push("/login");
  };

  const handleCategorySelect = (category) => {
    dispatch(setSelectedMainTypeReducer(category));
    dispatch(setSelectedTypeReducer(""));
    router.push("/katalog-tovarov");
    setMobileOpen(false); // Закрываем мобильное меню после выбора
  };

  // Мобильное меню
  const drawer = (
    <Box sx={{ width: 250, p: 2, backgroundColor: "#F5F5F5" }}>
      <List>
        <ListItem button key="home" onClick={() => { router.push("/"); setMobileOpen(false); }}>
          <ListItemText primary="Главная" />
        </ListItem>
        <ListItem button key="categories">
          <ListItemText primary="Каталог товаров"  onClick={() => { router.push("/katalog-tovarov"); setMobileOpen(false); }}/>
        </ListItem>
        {/* {uniqueCategories.map((category) => (
          <ListItem
            button
            key={category}
            onClick={() => handleCategorySelect(category)}
            sx={{ pl: 4 }}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))} */}
        <ListItem button key="about" onClick={() => { router.push("/about"); setMobileOpen(false); }}>
          <ListItemText primary="О бренде" />
        </ListItem>
        <ListItem button key="tips" onClick={() => { router.push("/tips"); setMobileOpen(false); }}>
          <ListItemText primary="Скидочные товары" />
        </ListItem>

         <ListItem button key="premium" onClick={() => { router.push("/premium"); setMobileOpen(false); }}>
          <ListItemText primary="Премиум" />
        </ListItem>

        <ListItem button key="promo" onClick={() => { router.push("/promo"); setMobileOpen(false); }}>
          <ListItemText primary="Распродажа" />
        </ListItem>
        <ListItem button key="contactpage" onClick={() => { router.push("/contactpage"); setMobileOpen(false); }}>
          <ListItemText primary="Контакты" />
        </ListItem>
        <ListItem button key="logout" onClick={() => { handleLogout(); setMobileOpen(false); }}>
          <ListItemText primary="Выход" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ bgcolor: "#F5F5F5", py: 1 }}>
        <Container maxWidth="lg"></Container>
      </Box>

      <StyledAppBar position="static">
        <Container maxWidth="lg">
          <StyledToolbar>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button onClick={() => router.push("/")} sx={{ p: 0 }}>
                <Image 
                  src={logo} 
                  alt="logo" 
                  width={180} // Уменьшенная ширина для реальной высоты
                  height={90} // Высота логотипа синхронизирована с AppBar
                  style={{ objectFit: "contain" }}
                />
              </Button>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
              <CategoryButton onClick={() => router.push("/katalog-tovarov")}>
                Каталог товаров
              </CategoryButton>
              <CategoryButton onClick={() => router.push("/about")}>
                О бренде
              </CategoryButton>
              <CategoryButton onClick={() => router.push("/promo")}>
                Хит продаж
              </CategoryButton>
              <CategoryButton onClick={() => router.push("/tips")}>
                Скидочные товары
              </CategoryButton>

               <CategoryButton onClick={() => router.push("/premium")}>
Премиум
              </CategoryButton>

              <CategoryButton onClick={() => router.push("/contactpage")}>
                Контакты
              </CategoryButton>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CartButton
                variant="contained"
                startIcon={<ShoppingBagOutlinedIcon sx={{ color: "#333333" }} />}
                onClick={() => router.push("/cart")}
              >
                {cartItemCount > 0 && (
                  <Badge badgeContent={cartItemCount} color="black" sx={{ ml: 1 }} />
                )}
              </CartButton>

              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" }, color: "#333333" }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { md: "none" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
}