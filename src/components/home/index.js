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
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Search,
  FilterList,
  ShoppingBagOutlined as ShoppingBagIcon,
  PersonOutline,
  PhoneOutlined,
  Star,
  Close,
  ZoomIn,
} from "@mui/icons-material";
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
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
  backgroundColor: "#FFFFFF",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },
}));

const ImageContainer = styled(Box)({
  position: "relative",
  height: "220px",
  width: "100%",
  overflow: "hidden",
  backgroundColor: "#f8f9fa",
  borderRadius: "16px 16px 0 0",
});

const StyledCarousel = styled(RsCarousel)({
  height: "100%",
  width: "100%",
  "& .rs-carousel-item": {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& img": {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
  },
});

const ZoomOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  borderRadius: "50%",
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  "& svg": {
    fontSize: "18px",
  },
}));

const ProductCardHover = styled(Box)({
  position: "absolute",
  inset: 0,
  "&:hover": {
    "& $ZoomOverlay": {
      opacity: 1,
    },
  },
});

const NaturalBadge = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  top: "12px",
  left: "12px",
  backgroundColor: "#E6F3E6",
  color: "#4A704A",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "11px",
  fontWeight: "600",
  zIndex: 3,
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  color: "#333333",
  fontSize: "1.1rem",
}));

const CartIconButton = styled(IconButton)(({ theme, inCart }) => ({
  backgroundColor: inCart ? "#E0E0E0" : "#ADD8E6",
  color: inCart ? "#666666" : "#333333",
  "&:hover": {
    backgroundColor: inCart ? "#E0E0E0" : "#87CEEB",
  },
  borderRadius: "50%",
  padding: "10px",
  width: 44,
  height: 44,
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
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#FFFFFF",
    "& fieldset": { borderColor: "#ADD8E6" },
    "&:hover fieldset": { borderColor: "#87CEEB" },
  },
}));

const DarkStyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "12px 24px",
  backgroundColor: "#003087",
  color: "#FFFFFF",
  textTransform: "none",
  fontWeight: "600",
  "&:hover": { backgroundColor: "#002060" },
}));

// === МОДАЛЬНОЕ ОКНО ===
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(6px)",
});

const ModalImageContainer = styled(Box)({
  position: "relative",
  maxWidth: "95vw",
  maxHeight: "95vh",
  backgroundColor: "#000",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
});

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: 16,
  right: 16,
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
  zIndex: 10,
});

// === ДАННЫЕ ===
const banners = [
  { image: "/image/kupanie.png" },
  { image: "/image/baner2.png",},
  { image: "/image/baner4.jpg",},
];

const categories = [
  "Все товары", "Чехлы", "Премиум", "Зарядные устройства", "Зарядные устройства Iphone",
  "Зарядные устройства Samsung", "Держатели устойства", "Наушники беспроводные", "Наушники проводные",
  "Smart-часы и аксессуары", "Защитные стекла", "Портативная зарядка(Power Bank)", "Гидрогелевые пленки",
  "Штативы", "Фото-видео свет", "Чехлы для планшетов", "Внешник накопители", "Автомобильные аксессуары",
  "Петличный микрофон", "Переферийные устройства", "Сумки", "Другое",
];

const reviews = [
  { id: 1, name: "Анна Смирнова", photo: "/image/customer1.jpg", review: "Отличные продукты! Кожа малыша мягкая и без раздражений.", rating: 5 },
  { id: 2, name: "Мария Иванова", photo: "/image/customer2.jpg", review: "Натуральные составы и приятный аромат. Рекомендую!", rating: 4 },
  { id: 3, name: "Екатерина Петрова", photo: "/image/customer3.jpg", review: "Органическая линейка — лучшее для ребёнка.", rating: 5 },
  { id: 4, name: "Ольга Кузнецова", photo: "/image/customer4.jpg", review: "Средства для мамы помогли восстановить кожу.", rating: 4 },
];

// === КОНФИГ ===
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/store";

// === КАРТОЧКА С ФОТО И МОДАЛКОЙ ===
const ProductCardWithImages = memo(({ item, isInCart, dispatch }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = item.ProductImages || [];
  const baseUrl = BASE_URL.replace(/\/api\/store$/, "");
  const imageUrls = images.map(img => `${baseUrl}${img.imagePath}`);

  const handleImageClick = (e, src) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedImage(src);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <>
      <ProductCard component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Link href={`/product/${item.id}`} passHref style={{ textDecoration: "none", color: "inherit" }}>
          <ImageContainer>
            <ProductCardHover>
              {imageUrls.length > 0 ? (
                <StyledCarousel autoplay={imageUrls.length > 1} autoplayInterval={8000}>
                  {imageUrls.map((src, idx) => (
                    <Box
                      key={idx}
                      sx={{ position: "relative", height: "100%", width: "100%" }}
                      // onClick={(e) => handleImageClick(e, src)}
                    >
                      <Image
                        src={src}
                        alt={`${item.name} - ${idx + 1}`}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 600px) 100vw, 280px"
                        priority={idx === 0}
                        unoptimized
                      />
                      <ZoomOverlay>
                        <ZoomIn />
                      </ZoomOverlay>
                    </Box>
                  ))}
                </StyledCarousel>
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f5f5f5",
                  }}
                >
                  <Typography variant="body2" color="#999">
                    Нет фото
                  </Typography>
                </Box>
              )}
           
            </ProductCardHover>
          </ImageContainer>
        </Link>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Link href={`/product/${item.id}`} passHref>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: "1rem",
                color: "#333",
                "&:hover": { color: "#ADD8E6" },
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.name}
            </Typography>
          </Link>
          <Typography variant="body2" color="#666" sx={{ fontSize: "0.85rem", mt: 0.5 }}>
            {item.Categories?.length > 0 ? item.Categories.map(c => c.name).join(", ") : "Без категории"}
          </Typography>
          <Typography
            variant="body2"
            color="#666"
            sx={{
              fontSize: "0.8rem",
              mt: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.description?.length > 70 ? `${item.description.slice(0, 70)}...` : item.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ p: 2, justifyContent: "space-between", alignItems: "center" }}>
          <PriceTypography>
            {parseFloat(item.price)?.toLocaleString() || "0"} ₸
          </PriceTypography>
          <CartIconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(addToCartProductAction(item));
            }}
            disabled={isInCart(item)}
            inCart={isInCart(item)}
          >
            <ShoppingBagIcon sx={{ fontSize: "22px" }} />
          </CartIconButton>
        </CardActions>
      </ProductCard>

      {/* Модальное окно */}
      {/* <StyledModal open={openModal} onClose={handleCloseModal}>
        <ModalImageContainer>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Увеличенное фото"
              fill
              style={{ objectFit: "contain" }}
              unoptimized
            />
          )}
          <CloseButton onClick={handleCloseModal}>
            <Close fontSize="large" />
          </CloseButton>
        </ModalImageContainer>
      </StyledModal> */}
    </>
  );
});

export default function Products() {
  const dispatch = useDispatch();
  const { allProducts, userCart, selectedMainType, selectedType } = useSelector(state => state.usercart);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState({ name: "", phone: "" });

  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    dispatch(getAllProductsAction({ page: currentPage, limit: itemsPerPage }))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, currentPage]);

  const debouncedSearch = debounce((value) => setSearchTerm(value), 300);
  const isInCart = (item) => userCart.some(i => i.id === item.id);

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(item => selectedMainType && selectedMainType !== "Все товары" ? item.Categories?.some(c => c.name === selectedMainType) : true)
      .filter(item => selectedType ? item.type === selectedType : true)
      .filter(item => category ? item.Categories?.some(c => c.name === category) : true)
      .filter(item => !searchTerm || [item.name, item.description, ...(item.Categories?.map(c => c.name) || [])].some(f => f?.toLowerCase().includes(searchTerm.toLowerCase())))
      .filter(item => {
        const p = parseFloat(item.price) || 0;
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        return p >= min && p <= max;
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

  const recentProducts = useMemo(() =>
    [...allProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    [allProducts]
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, fontFamily: "Montserrat, sans-serif" }}>
      {/* Баннеры */}
      <Box sx={{ borderRadius: "16px", overflow: "hidden", mb: 6 }}>
        <RsCarousel autoplay autoplayInterval={9000}>
          {banners.map((b, i) => (
            <Box key={i} sx={{ position: "relative", height: { xs: 300, md: 400 } }}>
              <Image src={b.image} alt={b.title} fill style={{ objectFit: "cover" }} />
              <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff", p: 3 }}>
                {/* <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.5rem", md: "2.2rem" } }}>
                  {b.title}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, fontSize: { xs: "1rem", md: "1.3rem" } }}>
                  {b.subtitle}
                </Typography> */}
              </Box>
            </Box>
          ))}
        </RsCarousel>
      </Box>

      {/* Новинки */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight={700} mb={3}>Новинки</Typography>
        {loading ? (
          <Grid container spacing={2}>
            {[...Array(4)].map((_, i) => (
              <Grid item xs={6} sm={6} md={3} key={i}>
                <Skeleton variant="rectangular" width="100%" height={380} sx={{ borderRadius: "16px" }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Slider dots infinite speed={500} slidesToShow={4} slidesToScroll={1} autoplay autoplaySpeed={3000}
            responsive={[
              { breakpoint: 1200, settings: { slidesToShow: 3 } },
              { breakpoint: 900, settings: { slidesToShow: 2 } },
              { breakpoint: 600, settings: { slidesToShow: 1 } },
            ]}>
            {recentProducts.map(item => (
              <Box key={item.id} px={1}>
                <ProductCardWithImages item={item} isInCart={isInCart} dispatch={dispatch} />
              </Box>
            ))}
          </Slider>
        )}
      </Box>

      {/* Заголовок + поиск */}
      <Stack spacing={3} mb={2}>
        <Typography variant="h4" fontWeight={700} color="#333" sx={{ textTransform: "uppercase" }}>
          {selectedMainType || "Каталог продукции"}
        </Typography>
        <Paper elevation={0} sx={{ p: 2, backgroundColor: "#F8FAFC", borderRadius: "16px" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <StyledTextField fullWidth placeholder="Поиск товаров..." onChange={e => debouncedSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: "#ADD8E6" }} /></InputAdornment> }} />
            <FormControl sx={{ minWidth: { xs: "100%", sm: 180 } }}>
              <Select value={sortBy} onChange={e => setSortBy(e.target.value)} displayEmpty sx={{ borderRadius: "12px" }}>
                <MenuItem value="">Сортировка</MenuItem>
                <MenuItem value="price_asc">Цена: по возрастанию</MenuItem>
                <MenuItem value="price_desc">Цена: по убыванию</MenuItem>
                <MenuItem value="name_asc">Название: А-Я</MenuItem>
                <MenuItem value="name_desc">Название: Я-А</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={() => setFilterOpen(true)} sx={{ bgcolor: "#ADD8E6", color: "#333", "&:hover": { bgcolor: "#87CEEB" } }}>
              <FilterList />
            </IconButton>
          </Stack>
        </Paper>
      </Stack>

      {/* Сетка товаров */}
      <Grid container spacing={{ xs: 2, md: 3 }} mb={6}>
        {loading ? [...Array(8)].map((_, i) => (
          <Grid item xs={6} sm={6} md={3} key={i}>
            <Skeleton variant="rectangular" width="100%" height={380} sx={{ borderRadius: "16px" }} />
          </Grid>
        )) : currentItems.length === 0 ? (
          <Grid item xs={12}>
            <Typography textAlign="center" color="#666">Товары не найдены.</Typography>
          </Grid>
        ) : currentItems.map(item => (
          <Grid item xs={6} sm={6} md={3} key={item.id}>
            <ProductCardWithImages item={item} isInCart={isInCart} dispatch={dispatch} />
          </Grid>
        ))}
      </Grid>

      {/* Пагинация */}
      {totalPages > 1 && (
        <Stack spacing={2} alignItems="center" mt={4}>
          <Pagination count={totalPages} page={currentPage} onChange={(e, p) => setCurrentPage(p)}
            sx={{ "& .Mui-selected": { bgcolor: "#ADD8E6", color: "#333" } }} />
          <Typography variant="caption" color="#666">
            Показано {currentItems.length} из {filteredProducts.length}
          </Typography>
        </Stack>
      )}

      {/* Форма */}
      <Box mt={8} py={6} sx={{ bgcolor: "#F8FAFC", borderRadius: "16px" }}>
        <Box component={Paper} elevation={0} sx={{ p: 4, maxWidth: 800, mx: "auto", borderRadius: "16px" }}>
          <Typography variant="h5" fontWeight={700} mb={2}>Нужна консультация?</Typography>
          <Typography color="#666" mb={3}>Оставьте заявку — мы свяжемся с вами.</Typography>
          <form onSubmit={e => { e.preventDefault(); /* ваш код */ }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledTextField fullWidth name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя"
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutline sx={{ color: "#ADD8E6" }} /></InputAdornment> }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField fullWidth name="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ваш телефон"
                  InputProps={{ startAdornment: <InputAdornment position="start"><PhoneOutlined sx={{ color: "#ADD8E6" }} /></InputAdornment> }} />
              </Grid>
              <Grid item xs={12}>
                <DarkStyledButton type="submit" fullWidth>Оставить заявку</DarkStyledButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>

      {/* Отзывы */}
      <Box mt={8} py={6} sx={{ bgcolor: "#fff", borderRadius: "16px" }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={4} sx={{ textTransform: "uppercase" }}>
          Отзывы клиентов
        </Typography>
        <Slider dots infinite speed={500} slidesToShow={3} slidesToScroll={1} autoplay autoplaySpeed={5000}
          responsive={[{ breakpoint: 960, settings: { slidesToShow: 2 } }, { breakpoint: 600, settings: { slidesToShow: 1 } }]}>
          {reviews.map(r => (
            <Box key={r.id} px={2}>
              <Card sx={{ maxWidth: 360, mx: "auto", borderRadius: "16px", p: 2, bgcolor: "#F8FAFC" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Box sx={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", mx: "auto", mb: 2 }}>
                    <Image src={r.photo} alt={r.name} width={80} height={80} style={{ objectFit: "cover" }} />
                  </Box>
                  <Typography variant="h6" fontWeight={600}>{r.name}</Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} sx={{ color: i < r.rating ? "#FFD700" : "#E0E0E0", fontSize: "1.2rem" }} />)}
                  </Box>
                  <Typography variant="body2" color="#666" sx={{ fontSize: "0.9rem" }}>{r.review}</Typography>
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
            <Select value={category} onChange={e => setCategory(e.target.value)} sx={{ borderRadius: "12px" }}>
              {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <Box mt={3}>
          <Typography variant="subtitle1">Цена</Typography>
          <StyledTextField label="Мин. цена" type="number" fullWidth value={minPrice} onChange={e => setMinPrice(e.target.value)} sx={{ mt: 2 }} />
          <StyledTextField label="Макс. цена" type="number" fullWidth value={maxPrice} onChange={e => setMaxPrice(e.target.value)} sx={{ mt: 2 }} />
        </Box>
        <StyledButton fullWidth sx={{ mt: 3 }} onClick={() => setFilterOpen(false)}>Применить</StyledButton>
      </FilterDrawer>
    </Container>
  );
}