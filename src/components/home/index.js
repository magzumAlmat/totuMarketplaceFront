"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Pagination,
  Stack,
  Box,
  TextField,
  InputAdornment,
  Paper,
  Drawer,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Search, FilterList, ShoppingBagOutlined as ShoppingBagIcon, PersonOutline, PhoneOutlined } from "@mui/icons-material";
import Link from "next/link";
import Slider from "react-slick";
import { motion } from "framer-motion";
import {
  getAllProductsAction,
  addToCartProductAction,
} from "@/store/slices/productSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel as RsCarousel } from "rsuite"; // Correct import alias
import "rsuite/dist/rsuite-no-reset.min.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Стили
const ProductCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "280px",
  minWidth: "240px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  },
  backgroundColor: "#FFFFFF",
}));

const NaturalBadge = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#E6F3E6",
  color: "#4A704A",
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  color: "#333333",
  fontSize: "1rem",
}));

const CartIconButton = styled(IconButton)(({ theme, inCart }) => ({
  backgroundColor: inCart ? "#E0E0E0" : "#ADD8E6",
  color: inCart ? "#666666" : "#333333",
  "&:hover": {
    backgroundColor: inCart ? "#E0E0E0" : "#87CEEB",
  },
  borderRadius: "50%",
  padding: "8px",
}));

const FilterDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 320,
    padding: theme.spacing(3),
    backgroundColor: "#F8FAFC",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  padding: "10px 24px",
  backgroundColor: "#ADD8E6",
  color: "#333333",
  textTransform: "none",
  fontWeight: "600",
  "&:hover": {
    backgroundColor: "#87CEEB",
  },
  "&:disabled": {
    backgroundColor: "#E0E0E0",
    color: "#666666",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    "& fieldset": {
      borderColor: "#ADD8E6",
    },
    "&:hover fieldset": {
      borderColor: "#87CEEB",
    },
  },
}));

const Banner = styled(motion.div)(({ theme, bgImage }) => ({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: theme.spacing(6),
  color: "#FFFFFF",
  textAlign: "center",
  marginBottom: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "400px",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
}));

const BannerCarousel = styled(RsCarousel)({
  borderRadius: "15px",
  overflow: "hidden",
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  "& .rs-carousel-item": {
    height: "400px",
  },
  "& .rs-carousel-slider": {
    borderRadius: "15px",
  },
  [`.rs-carousel-btn-prev, .rs-carousel-btn-next`]: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  },
  [`.rs-carousel-indicators button`]: {
    backgroundColor: "#ADD8E6",
    "&.rs-carousel-indicator-active": {
      backgroundColor: "#87CEEB",
    },
  },
});

const StyledCarousel = styled(RsCarousel)({ // Changed from Carousel to RsCarousel
  borderRadius: "10px",
  overflow: "hidden",
  "& .rs-carousel-item": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "240px",
  },
});

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

// Баннеры и другие данные
const banners = [
  {
    image: "/image/kupanie.png",
    title: "Забота с первых дней",
    subtitle: "Продукция Biolane — это мягкость и натуральность для нежной кожи вашего малыша.",
  },
  {
    image: "/image/baner2.png",
    title: "Нежность природы",
    subtitle: "Органические средства для ухода за всей семьёй.",
  },
  {
    image: "/image/baner4.jpg",
    title: "97% натуральных ингредиентов",
    subtitle: "Доверяйте лучшее для вашего ребёнка.",
  },
  {
    image: "/image/baner5.jpg",
    title: "97% натуральных ингредиентов",
    subtitle: "Доверяйте лучшее для вашего ребёнка.",
  },
  {
    image: "/image/baner6.jpg",
    title: "97% натуральных ингредиентов",
    subtitle: "Доверяйте лучшее для вашего ребёнка.",
  },
];

const BASE_URL = "http://localhost:8000";

const categories = [
  "Все товары",
  "Купание",
  "Уход",
  "Защита",
  "Средства для мамы",
  "Органическая линейка",
  "Атопический дерматит",
];

export default function Products() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { allProducts, host, userCart, selectedMainType, selectedType } = useSelector(
    (state) => state.usercart
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState({ name: "", phone: "" });
  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    dispatch(getAllProductsAction())
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Ошибка загрузки продуктов:", err);
        setError("Не удалось загрузить продукты");
        setLoading(false);
      });
  }, [dispatch]);

  const isInCart = (item) => userCart.some((cartItem) => cartItem.id === item.id);

  const filteredProducts = allProducts
    .filter((item) => {
      if (selectedMainType && selectedMainType !== "Все товары") {
        return item.Categories.some((cat) => cat.name === selectedMainType);
      }
      return true;
    })
    .filter((item) => {
      if (selectedType) {
        return item.type === selectedType;
      }
      return true;
    })
    .filter((item) => {
      if (category) {
        return item.Categories.some((cat) => cat.name === category);
      }
      return true;
    })
    .filter((item) => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        (item.name && item.name.toLowerCase().includes(search)) ||
        (item.volume && item.volume.toLowerCase().includes(search)) ||
        (item.description && item.description.toLowerCase().includes(search)) ||
        (item.features && item.features.toLowerCase().includes(search)) ||
        (item.Categories &&
          item.Categories.some((cat) => cat.name.toLowerCase().includes(search)))
      );
    })
    .filter((item) => {
      const price = parseFloat(item.price) || 0;
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return price >= min && price <= max;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price_desc":
          return parseFloat(b.price) - parseFloat(a.price);
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSortChange = (event) => setSortBy(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "name") setName(value);
    else if (name === "phone") setPhone(value);
  };

  const validateForm = () => {
    const newErrors = { name: "", phone: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Имя обязательно";
      isValid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
      isValid = false;
    }

    const phoneRegex = /^(?:\+7|8)\d{10}$/;
    if (!phone.trim()) {
      newErrors.phone = "Телефон обязателен";
      isValid = false;
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = "Введите корректный номер (например, +77001234567)";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = `Новая заявка на консультацию:\nИмя: ${name}\nТелефон: ${phone}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+77080880188?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    setName("");
    setPhone("");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6, fontFamily: "Montserrat, sans-serif" }}>
      {/* Баннер-карусель */}
      {/* <BannerCarousel autoplay autoplayInterval={3000} placement="bottom">
        {banners.map((banner, index) => (
          <Banner
            key={index}
            bgImage={banner.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h4" fontWeight="700" sx={{ mb: 2 }}>
              {banner.title}
            </Typography>
            <Typography variant="body1">{banner.subtitle}</Typography>
          </Banner>
        ))}
      </BannerCarousel> */}

  <BannerCarousel autoplay autoplayInterval={3000} placement="bottom">
        {banners.map((banner, index) => (
          <Banner
            key={index}
            bgImage={banner.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h4"
              fontWeight="700"
              sx={{
                mb: 2,
                color: "#fff",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                textAlign: "center",
              }}
            >
              {banner.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                textAlign: "center",
                maxWidth: "80%",
                margin: "0 auto",
              }}
            >
              {banner.subtitle}
            </Typography>
          </Banner>
        ))}
      </BannerCarousel>

      
      {/* Новинки Biolane */}
      <Box mb={6}>
        <br />
        <br />
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(4)].map((_, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={idx}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Skeleton variant="rectangular" width={280} height={400} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Slider {...sliderSettings}>
            {allProducts
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((item) => {
                const images = item.ProductImages || [];
                const primaryImage = images.find((img) => img.isPrimary) || images[0];
                return (
                  <Box key={item.id} px={1} sx={{ display: "flex", justifyContent: "center" }}>
                    <ProductCard
                      component={motion.div}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: item.id * 0.1 }}
                      sx={{ mx: "auto" }}
                    >
                      <Link href={`/product/${item.id}`} passHref>
                        <Box sx={{ position: "relative", height: "260px" }}>
                          {primaryImage ? (
                            <Image
                              src={`${BASE_URL}${primaryImage.imagePath}`}
                              alt={item.name}
                              fill
                              style={{ objectFit: "contain" }}
                              sizes="(max-width: 600px) 100vw, 280px"
                              priority={false}
                              loading="lazy"
                            />
                          ) : (
                            <Box
                              sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#F5F5F5",
                              }}
                            >
                              <Typography variant="body1" color="#666666">
                                Нет фото
                              </Typography>
                            </Box>
                          )}
                          {item.natural && (
                            <NaturalBadge
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              97% натуральных
                            </NaturalBadge>
                          )}
                        </Box>
                      </Link>
                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Link href={`/product/${item.id}`} passHref>
                          <Typography
                            variant="h6"
                            sx={{
                              textDecoration: "none",
                              color: "#333333",
                              fontWeight: "700",
                              fontSize: "1rem",
                              "&:hover": {
                                textDecoration: "underline",
                                color: "#ADD8E6",
                              },
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Link>
                        <Typography
                          variant="body2"
                          color="#666666"
                          sx={{ mt: 0.5, fontSize: "0.85rem" }}
                        >
                          {item.Categories.length > 0
                            ? item.Categories.map((cat) => cat.name).join(", ")
                            : "Без категории"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="#666666"
                          sx={{
                            mt: 1,
                            fontSize: "0.85rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.description.length > 100
                            ? `${item.description.slice(0, 100)}...`
                            : item.description}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{ p: 2, justifyContent: "space-between", alignItems: "center" }}
                      >
                        <PriceTypography variant="subtitle1">
                          {parseFloat(item.price)?.toLocaleString() || "0"} ₸
                        </PriceTypography>
                        <CartIconButton
                          onClick={() => dispatch(addToCartProductAction(item))}
                          disabled={isInCart(item)}
                          inCart={isInCart(item)}
                          aria-label={isInCart(item) ? "Товар в корзине" : "Добавить в корзину"}
                        >
                          <ShoppingBagIcon sx={{ fontSize: "24px" }} />
                        </CartIconButton>
                      </CardActions>
                    </ProductCard>
                  </Box>
                );
              })}
          </Slider>
        )}
      </Box>

      {/* Заголовок и поиск */}
      <Stack spacing={3} mb={4}>
        <Typography
          variant="h4"
          fontWeight="700"
          color="#333333"
          sx={{ textTransform: "uppercase" }}
        >
          {selectedMainType || "Каталог продукции"}
        </Typography>
        <Paper elevation={0} sx={{ p: 2, backgroundColor: "#F8FAFC", borderRadius: "15px" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <StyledTextField
              fullWidth
              variant="outlined"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#ADD8E6" }} />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                displayEmpty
                sx={{
                  borderRadius: "10px",
                  color: "#333333",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ADD8E6",
                  },
                }}
              >
                <MenuItem value="">Сортировка</MenuItem>
                <MenuItem value="price_asc">Цена: по возрастанию</MenuItem>
                <MenuItem value="price_desc">Цена: по убыванию</MenuItem>
                <MenuItem value="name_asc">Название: А-Я</MenuItem>
                <MenuItem value="name_desc">Название: Я-А</MenuItem>
              </Select>
            </FormControl>
            <IconButton color="primary" onClick={() => setFilterOpen(true)}>
              <FilterList sx={{ color: "#ADD8E6" }} />
            </IconButton>
          </Stack>
        </Paper>
      </Stack>

      {/* Сетка продуктов */}
      <Box mb={6}>
        {error ? (
          <Typography variant="body1" color="error" textAlign="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {loading ? (
              [...Array(8)].map((_, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={idx}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Skeleton variant="rectangular" width={280} height={400} />
                </Grid>
              ))
            ) : currentItems.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" color="#666666" textAlign="center">
                  Товары не найдены.
                </Typography>
              </Grid>
            ) : (
              currentItems.map((item) => {
                const images = item.ProductImages || [];
                const primaryImage = images.find((img) => img.isPrimary) || images[0];
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={item.id}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <ProductCard
                      component={motion.div}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: item.id * 0.1 }}
                    >
                      <Link href={`/product/${item.id}`} passHref>
                        <Box sx={{ position: "relative", height: "260px" }}>
                          {primaryImage ? (
                            <Image
                              src={`${BASE_URL}${primaryImage.imagePath}`}
                              alt={item.name}
                              fill
                              style={{ objectFit: "contain" }}
                              sizes="(max-width: 600px) 100vw, 280px"
                              priority={false}
                              loading="lazy"
                            />
                          ) : (
                            <Box
                              sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#F5F5F5",
                              }}
                            >
                              <Typography variant="body1" color="#666666">
                                Нет фото
                              </Typography>
                            </Box>
                          )}
                          {item.natural && (
                            <NaturalBadge
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              97% натуральных
                            </NaturalBadge>
                          )}
                        </Box>
                      </Link>
                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Link href={`/product/${item.id}`} passHref>
                          <Typography
                            variant="h6"
                            sx={{
                              textDecoration: "none",
                              color: "#333333",
                              fontWeight: "600",
                              fontSize: "1rem",
                              "&:hover": {
                                textDecoration: "underline",
                                color: "#ADD8E6",
                              },
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Link>
                        <Typography
                          variant="body2"
                          color="#666666"
                          sx={{ mt: 0.5, fontSize: "0.85rem" }}
                        >
                          Категория: {item.Categories.length > 0
                            ? item.Categories.map((cat) => cat.name).join(", ")
                            : "Без категории"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="#666666"
                          sx={{
                            mt: 1,
                            fontSize: "0.85rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          Описание: {item.description.length > 80
                            ? `${item.description.slice(0, 80)}...`
                            : item.description}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{ p: 2, justifyContent: "space-between", alignItems: "center" }}
                      >
                        <PriceTypography variant="subtitle1">
                          {parseFloat(item.price)?.toLocaleString() || "0"} ₸
                        </PriceTypography>
                        <CartIconButton
                          onClick={() => dispatch(addToCartProductAction(item))}
                          disabled={isInCart(item)}
                          inCart={isInCart(item)}
                          aria-label={isInCart(item) ? "Товар в корзине" : "Добавить в корзину"}
                        >
                          <ShoppingBagIcon sx={{ fontSize: "24px" }} />
                        </CartIconButton>
                      </CardActions>
                    </ProductCard>
                  </Grid>
                );
              })
            )}
          </Grid>
        )}
      </Box>

      {/* Пагинация */}
      {totalPages > 1 && (
        <Stack spacing={2} alignItems="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#ADD8E6",
              },
              "& .Mui-selected": {
                backgroundColor: "#ADD8E6",
                color: "#333333",
              },
            }}
          />
          <Typography variant="caption" color="#666666">
            Показано {currentItems.length} из {filteredProducts.length} товаров
          </Typography>
        </Stack>
      )}

      {/* Секция контактов */}
      <Box
        mt={8}
        py={6}
        sx={{
          backgroundColor: "#F8FAFC",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 2px)",
            backgroundSize: "10px 10px",
            opacity: 0.5,
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ mb: 6, position: "relative", zIndex: 2 }}>
          {/* <Typography
            variant="h4"
            fontWeight="700"
            color="#333333"
            textAlign="center"
            mb={4}
            sx={{ textTransform: "uppercase" }}
          >
            Категории продукции
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {categories.map((category) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={category}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Link href={`/products?category=${encodeURIComponent(category)}`} passHref>
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
                        src={`/image/${category.toLowerCase().replace(/ /g, "_")}.png`}
                        alt={category}
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
                      {category}
                    </Typography>
                  </CategoryCard>
                </Link>
              </Grid>
            ))}
          </Grid> */}
        </Box>

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
            Нужна консультация специалиста?
          </Typography>
          <Typography variant="body1" color="#666666" mb={3}>
            Оставьте заявку, и наши специалисты свяжутся с вами в ближайшее время.
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  placeholder="Ваше имя"
                  name="name"
                  value={name}
                  onChange={handleFormChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
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
                  placeholder="Ваш телефон"
                  name="phone"
                  value={phone}
                  onChange={handleFormChange}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
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
                <DarkStyledButton type="submit">Оставить заявку</DarkStyledButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>

      {/* Боковая панель фильтров */}
      <FilterDrawer anchor="right" open={filterOpen} onClose={() => setFilterOpen(false)}>
        <Typography variant="h6" gutterBottom color="#333333" fontWeight="700">
          Фильтры
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#333333">
            Категория
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              displayEmpty
              sx={{
                borderRadius: "10px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ADD8E6",
                },
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat === "Все товары" ? "" : cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" color="#333333">
            Цена
          </Typography>
          <StyledTextField
            label="Минимальная цена"
            type="number"
            fullWidth
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            sx={{ mt: 2 }}
          />
          <StyledTextField
            label="Максимальная цена"
            type="number"
            fullWidth
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            sx={{ mt: 2 }}
          />
        </Box>
        <StyledButton fullWidth sx={{ mt: 3 }} onClick={() => setFilterOpen(false)}>
          Применить
        </StyledButton>
      </FilterDrawer>
    </Container>
  );
}