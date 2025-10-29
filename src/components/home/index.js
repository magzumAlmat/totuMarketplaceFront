"use client";

import React, { useEffect, useState, useMemo, memo } from "react";
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
  CircularProgress,
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Search, FilterList, ShoppingBagOutlined as ShoppingBagIcon, PersonOutline, PhoneOutlined, Star, Close } from "@mui/icons-material";
import Link from "next/link";
import Slider from "react-slick";
import { motion } from "framer-motion";
import {
  getAllProductsAction,
  addToCartProductAction,
} from "@/store/slices/productSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel as RsCarousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";

// === СТИЛИ ===
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
    "& fieldset": { borderColor: "#ADD8E6" },
    "&:hover fieldset": { borderColor: "#87CEEB" },
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
  "& > *": { position: "relative", zIndex: 2 },
}));

const BannerCarousel = styled(RsCarousel)({
  borderRadius: "15px",
  overflow: "hidden",
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
  "& .rs-carousel-item": { height: "400px" },
});

const StyledCarousel = styled(RsCarousel)({
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
  "&:hover": { backgroundColor: "#002060" },
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

// === МОДАЛЬНОЕ ОКНО ===
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(4px)",
});

const ModalImageContainer = styled(Box)({
  position: "relative",
  maxWidth: "95vw",
  maxHeight: "95vh",
  backgroundColor: "#000",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
});

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: 12,
  right: 12,
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
  zIndex: 10,
});

// === ДАННЫЕ ===
const banners = [
  { image: "/image/kupanie.png", title: "Забота с первых дней", subtitle: "Продукция Biolane — это мягкость и натуральность." },
  { image: "/image/baner2.png", title: "Нежность природы", subtitle: "Органические средства для ухода за всей семьёй." },
  { image: "/image/baner4.jpg", title: "97% натуральных ингредиентов", subtitle: "Доверяйте лучшее для вашего ребёнка." },
  { image: "/image/baner5.jpg", title: "97% натуральных ингредиентов", subtitle: "Доверяйте лучшее для вашего ребёнка." },
  { image: "/image/baner6.jpg", title: "97% натуральных ингредиентов", subtitle: "Доверяйте лучшее для вашего ребёнка." },
];

const categories = [
  "Все товары", "Чехлы", "Премиум", "Зарядные устройства", "Зарядные устройства Iphone",
  "Зарядные устройства Samsung", "Держатели устойства", "Наушники беспроводные", "Наушники проводные",
  "Smart-часы и аксессуары", "Защитные стекла", "Портативная зарядка(Power Bank)", "Гидрогелевые пленки",
  "Штативы", "Фото-видео свет", "Чехлы для планшетов", "Внешник накопители", "Автомобильные аксессуары",
  "Петличный микрофон", "Переферийные устройства", "Сумки", "Другое",
];

const reviews = [
  { id: 1, name: "Анна Смирнова", photo: "/image/customer1.jpg", review: "Отличные продукты! Использую для своего малыша...", rating: 5 },
  { id: 2, name: "Мария Иванова", photo: "/image/customer2.jpg", review: "Натуральные составы и приятный аромат...", rating: 4 },
  { id: 3, name: "Екатерина Петрова", photo: "/image/customer3.jpg", review: "Понравилась органическая линейка...", rating: 5 },
  { id: 4, name: "Ольга Кузнецова", photo: "/image/customer4.jpg", review: "Средства для мамы помогли...", rating: 4 },
];

// === КОНФИГ ===
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/store";

// === КАРТОЧКА С КАРУСЕЛЬЮ И МОДАЛКОЙ ===
const ProductCardWithImages = memo(({ item, isInCart, dispatch }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const images = item.ProductImages || [];
  const baseUrl = BASE_URL.replace(/\/api\/store$/, "");
  const imageUrls = images.map(img => `${baseUrl}${img.imagePath}`);

  const handleImageClick = (src) => {
    setSelectedImage(src);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <>
      <ProductCard
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={`/product/${item.id}`} passHref>
          <Box sx={{ position: "relative", height: "260px" }}>
            {imageUrls.length > 0 ? (
              <StyledCarousel autoplay={imageUrls.length > 1} autoplayInterval={12000}>
                {imageUrls.map((src, idx) => (
                  <Box
                    key={idx}
                    sx={{ cursor: "pointer", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                    onClick={(e) => { e.preventDefault(); handleImageClick(src); }}
                  >
                    <Image
                      src={imageErrors[`${item.id}-${idx}`] ? "/placeholder.jpg" : src}
                      alt={`${item.name} - ${idx + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 600px) 100vw, 280px"
                      priority={idx === 0}
                      unoptimized
                      onError={() => setImageErrors(prev => ({ ...prev, [`${item.id}-${idx}`]: true }))}
                    />
                  </Box>
                ))}
              </StyledCarousel>
            ) : (
              <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#F5F5F5" }}>
                <Typography variant="body1" color="#666666">Нет фото</Typography>
              </Box>
            )}
            {item.natural && (
              <NaturalBadge initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
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
                "&:hover": { textDecoration: "underline", color: "#ADD8E6" },
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.name}
            </Typography>
          </Link>
          <Typography variant="body2" color="#666666" sx={{ mt: 0.5, fontSize: "0.85rem" }}>
            Категория: {item.Categories?.length > 0 ? item.Categories.map(c => c.name).join(", ") : "Без категории"}
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
            {item.description?.length > 80 ? `${item.description.slice(0, 80)}...` : item.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ p: 2, justifyContent: "space-between", alignItems: "center" }}>
          <PriceTypography variant="subtitle1">
            {parseFloat(item.price)?.toLocaleString() || "0"} ₸
          </PriceTypography>
          <CartIconButton
            onClick={() => dispatch(addToCartProductAction(item))}
            disabled={isInCart(item)}
            inCart={isInCart(item)}
          >
            <ShoppingBagIcon sx={{ fontSize: "24px" }} />
          </CartIconButton>
        </CardActions>
      </ProductCard>

      {/* Модальное окно */}
      <StyledModal open={openModal} onClose={handleCloseModal}>
        <ModalImageContainer>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Увеличенное фото"
              width={1400}
              height={900}
              style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
              unoptimized
            />
          )}
          <CloseButton onClick={handleCloseModal}>
            <Close fontSize="large" />
          </CloseButton>
        </ModalImageContainer>
      </StyledModal>
    </>
  );
});

export default function Products() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { allProducts, host, userCart, selectedMainType, selectedType } = useSelector(state => state.usercart);

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
    dispatch(getAllProductsAction({ page: currentPage, limit: itemsPerPage }))
      .then(() => setLoading(false))
      .catch(err => {
        console.error("Ошибка загрузки:", err);
        setError("Не удалось загрузить продукты");
        setLoading(false);
      });
  }, [dispatch, currentPage]);

  const debouncedSearch = debounce((value) => setSearchTerm(value), 300);

  const isInCart = (item) => userCart.some(cartItem => cartItem.id === item.id);

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(item => selectedMainType && selectedMainType !== "Все товары" ? item.Categories?.some(c => c.name === selectedMainType) : true)
      .filter(item => selectedType ? item.type === selectedType : true)
      .filter(item => category ? item.Categories?.some(c => c.name === category) : true)
      .filter(item => !searchTerm || [
        item.name, item.volume, item.description, item.features,
        ...(item.Categories?.map(c => c.name) || [])
      ].some(field => field?.toLowerCase().includes(searchTerm.toLowerCase())))
      .filter(item => {
        const price = parseFloat(item.price) || 0;
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        return price >= min && price <= max;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price_asc": return parseFloat(a.price) - parseFloat(b.price);
          case "price_desc": return parseFloat(b.price) - parseFloat(a.price);
          case "name_asc": return a.name.localeCompare(b.name);
          case "name_desc": return b.name.localeCompare(a.name);
          default: return 0;
        }
      });
  }, [allProducts, selectedMainType, selectedType, category, searchTerm, minPrice, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value === "Все товары" ? "" : e.target.value);

  const validateForm = () => {
    const errors = {};
    if (!name.trim() || name.trim().length < 2) errors.name = "Имя обязательно (мин. 2 символа)";
    const phoneRegex = /^(?:\+7|8)\d{10}$/;
    if (!phone.trim() || !phoneRegex.test(phone.trim())) errors.phone = "Введите корректный номер (+77001234567)";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const message = `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}`;
    window.open(`https://wa.me/+77080880188?text=${encodeURIComponent(message)}`, "_blank");
    setName(""); setPhone("");
  };

  const sliderSettings = {
    dots: true, infinite: true, speed: 500, slidesToShow: 4, slidesToScroll: 1,
    autoplay: !loading, autoplaySpeed: 3000,
    responsive: [{ breakpoint: 960, settings: { slidesToShow: 3 } }, { breakpoint: 600, settings: { slidesToShow: 1 } }],
  };

  const recentProducts = useMemo(() => 
    [...allProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    [allProducts]
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6, fontFamily: "Montserrat, sans-serif" }}>
      {/* Баннеры */}
      <BannerCarousel autoplay autoplayInterval={3000} placement="bottom">
        {banners.map((b, i) => (
          <Banner key={i} bgImage={b.image}>
            <Typography variant="h4" fontWeight={700}>{b.title}</Typography>
            <Typography variant="h6" mt={1}>{b.subtitle}</Typography>
          </Banner>
        ))}
      </BannerCarousel>

      {/* Новинки */}
      <Box mb={6}>
        <Typography variant="h5" fontWeight={700} mb={3}>Новинки</Typography>
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(4)].map((_, i) => (
              <Grid item xs={12} sm={6} md={3} key={i} sx={{ display: "flex", justifyContent: "center" }}>
                <Skeleton variant="rectangular" width={280} height={400} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Slider {...sliderSettings}>
            {recentProducts.map(item => (
              <Box key={item.id} px={1} sx={{ display: "flex", justifyContent: "center" }}>
                <ProductCardWithImages item={item} isInCart={isInCart} dispatch={dispatch} />
              </Box>
            ))}
          </Slider>
        )}
      </Box>

      {/* Заголовок + поиск */}
      <Stack spacing={3} mb={4}>
        <Typography variant="h4" fontWeight="700" color="#333333" sx={{ textTransform: "uppercase" }}>
          {selectedMainType || "Каталог продукции"}
        </Typography>
        <Paper elevation={0} sx={{ p: 2, backgroundColor: "#F8FAFC", borderRadius: "15px" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <StyledTextField fullWidth placeholder="Поиск товаров..." onChange={e => debouncedSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: "#ADD8E6" }} /></InputAdornment> }} />
            <FormControl sx={{ minWidth: 200 }}>
              <Select value={sortBy} onChange={handleSortChange} displayEmpty sx={{ borderRadius: "10px" }}>
                <MenuItem value="">Сортировка</MenuItem>
                <MenuItem value="price_asc">Цена: по возрастанию</MenuItem>
                <MenuItem value="price_desc">Цена: по убыванию</MenuItem>
                <MenuItem value="name_asc">Название: А-Я</MenuItem>
                <MenuItem value="name_desc">Название: Я-А</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={() => setFilterOpen(true)}><FilterList sx={{ color: "#ADD8E6" }} /></IconButton>
          </Stack>
        </Paper>
      </Stack>

      {/* Сетка товаров */}
      <Box mb={6}>
        {error ? (
          <Typography color="error" textAlign="center">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {loading ? [...Array(8)].map((_, i) => (
              <Grid item xs={12} sm={6} md={3} key={i} sx={{ display: "flex", justifyContent: "center" }}>
                <Skeleton variant="rectangular" width={280} height={400} />
              </Grid>
            )) : currentItems.length === 0 ? (
              <Grid item xs={12}><Typography textAlign="center" color="#666666">Товары не найдены.</Typography></Grid>
            ) : currentItems.map(item => (
              <Grid item xs={12} sm={6} md={3} key={item.id} sx={{ display: "flex", justifyContent: "center" }}>
                <ProductCardWithImages item={item} isInCart={isInCart} dispatch={dispatch} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Пагинация */}
      {totalPages > 1 && (
        <Stack spacing={2} alignItems="center" mt={4}>
          <Pagination count={totalPages} page={currentPage} onChange={(e, p) => setCurrentPage(p)}
            sx={{ "& .Mui-selected": { backgroundColor: "#ADD8E6", color: "#333" } }} />
          <Typography variant="caption" color="#666666">
            Показано {currentItems.length} из {filteredProducts.length} товаров
          </Typography>
        </Stack>
      )}

      {/* Форма консультации */}
      <Box mt={8} py={6} sx={{ backgroundColor: "#F8FAFC" }}>
        <Box component={Paper} elevation={0} sx={{ p: 4, maxWidth: 800, mx: "auto", borderRadius: "15px" }}>
          <Typography variant="h5" fontWeight={700} mb={2}>Нужна консультация?</Typography>
          <Typography color="#666666" mb={3}>Оставьте заявку — мы свяжемся с вами.</Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledTextField fullWidth name="name" value={name} onChange={e => { setName(e.target.value); setFormErrors(prev => ({ ...prev, name: "" })); }}
                  error={!!formErrors.name} helperText={formErrors.name}
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutline sx={{ color: "#ADD8E6" }} /></InputAdornment> }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField fullWidth name="phone" value={phone} onChange={e => { setPhone(e.target.value); setFormErrors(prev => ({ ...prev, phone: "" })); }}
                  error={!!formErrors.phone} helperText={formErrors.phone}
                  InputProps={{ startAdornment: <InputAdornment position="start"><PhoneOutlined sx={{ color: "#ADD8E6" }} /></InputAdornment> }} />
              </Grid>
              <Grid item xs={12}><DarkStyledButton type="submit">Оставить заявку</DarkStyledButton></Grid>
            </Grid>
          </form>
        </Box>
      </Box>

      {/* Отзывы */}
      <Box mt={8} py={6} sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={4} sx={{ textTransform: "uppercase" }}>
          Отзывы наших клиентов
        </Typography>
        <Slider dots infinite speed={500} slidesToShow={3} slidesToScroll={1} autoplay autoplaySpeed={5000}
          responsive={[{ breakpoint: 960, settings: { slidesToShow: 2 } }, { breakpoint: 600, settings: { slidesToShow: 1 } }]}>
          {reviews.map(r => (
            <Box key={r.id} px={2} sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: 360, mx: "auto", borderRadius: "12px", p: 2, backgroundColor: "#F8FAFC" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Box sx={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", mx: "auto", mb: 2 }}>
                    <Image src={r.photo} alt={r.name} width={80} height={80} style={{ objectFit: "cover" }} />
                  </Box>
                  <Typography variant="h6" fontWeight={600}>{r.name}</Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} sx={{ color: i < r.rating ? "#FFD700" : "#E0E0E0", fontSize: "1.2rem" }} />
                    ))}
                  </Box>
                  <Typography variant="body2" color="#666666" sx={{ fontSize: "0.9rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {r.review}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Фильтры */}
      <FilterDrawer anchor="right" open={filterOpen} onClose={() => setFilterOpen(false)}>
        <Typography variant="h6" fontWeight={700} gutterBottom>Фильтры</Typography>
        <Box mt={2}>
          <Typography variant="subtitle1">Категория</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Select value={category} onChange={handleCategoryChange} displayEmpty sx={{ borderRadius: "10px" }}>
              {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1">Цена</Typography>
          <StyledTextField label="Мин. цена" type="number" fullWidth value={minPrice} onChange={e => setMinPrice(e.target.value)} sx={{ mt: 2 }} />
          <StyledTextField label="Макс. цена" type="number" fullWidth value={maxPrice} onChange={e => setMaxPrice(e.target.value)} sx={{ mt: 2 }} />
        </Box>
        <StyledButton fullWidth sx={{ mt: 3 }} onClick={() => setFilterOpen(false)}>Применить</StyledButton>
      </FilterDrawer>
    </Container>
  );
}