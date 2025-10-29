


"use client";
import { FixedSizeList } from 'react-window';
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Search, FilterList } from "@mui/icons-material";
import Link from "next/link";
import Slider from "react-slick";
import { motion } from "framer-motion";
import {
  getAllProductsAction,
  addToCartProductAction,
} from "@/store/slices/productSlice";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// В начале файла Products.js добавим утилиту для группировки
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
// Стилизация
const ProductCard = styled(Card)(({ theme }) => ({
  width: "18.75rem", // 300px / 16 = 18.75rem
  maxWidth: "18.75rem",
  minWidth: "18.75rem",
  height: "35rem", // Оставляем как есть
  display: "flex",
  flexDirection: "column",
  borderRadius: "0.9375rem", // 15px / 16 = 0.9375rem
  boxShadow: "0 0.25rem 0.75rem rgba(0,0,0,0.1)", // 4px и 12px
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-0.5rem)", // 8px / 16 = 0.5rem
    boxShadow: "0 0.5rem 1.25rem rgba(0,0,0,0.15)", // 8px и 20px
  },
  backgroundColor: "#FFFFFF",
  margin: "0 auto",
}));




const ProductItem = memo(({ item, imageErrors, setImageErrors, isInCart, dispatch}) => {



  const images = item.ProductImages || [];
  
  // Используем полный URL напрямую, если он есть
  const imageUrl = images.length > 0 
    ? images[0].imagePath 
    : "/placeholder-image.jpg";

  console.log('IMAGEURL=', imageUrl);




// http://89.207.250.180:8000/Uploads/1761719526522-943581731.jpg
  return (
    <ProductCard>
      {images.length > 0 ? (
        <Box sx={{ height: "200px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Image
            src={imageErrors[item.id] ? "/placeholder-image.jpg" : imageUrl}
            alt={item.name || "Продукт"}
            width={280}
            height={180}
            style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
            onError={() => setImageErrors((prev) => ({ ...prev, [item.id]: true }))}
            loading="lazy"
          />
        </Box>
      ) : (
        <Box
          sx={{
            height: "200px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#F5F5F5",
            borderRadius: "10px",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Нет фото
          </Typography>
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
        <Typography
          variant="h6"
          component={Link}
          href={`/product/${item.id}`}
          sx={{
            textDecoration: "none",
            color: "#333333",
            "&:hover": { color: "#ADD8E6" },
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.name || "Без названия"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.Categories?.length > 0
            ? item.Categories.map((cat) => cat.name).join(", ")
            : "Без категории"}
        </Typography>
        <Typography
          variant="body2"
          mt={1}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.description || "Без описания"}
        </Typography>
        <Typography variant="body2" mt={1}>
          Объем: {item.volume || "Не указан"}
        </Typography>
        <Typography variant="body2" mt={1}>
          Наличие: {item.stock || 0} шт.
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Typography variant="subtitle1" fontWeight="700">
          {parseFloat(item.price || 0).toLocaleString()} ₸
        </Typography>
        <StyledButton
          onClick={() => dispatch(addToCartProductAction(item))}
          disabled={isInCart(item)}
        >
          {isInCart(item) ? "В корзине" : "Добавить"}
        </StyledButton>
      </CardActions>
    </ProductCard>
  );
});


const Row = ({ index, style, data }) => {
  const rowItems = data.items[index];
  return (
    <div style={{ ...style, padding: '0.75rem 0 1.5rem 0' }}> {/* 12px сверху, 24px снизу */}
      <Grid container spacing={3} justifyContent="center">
        {rowItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <ProductItem
              item={item}
              imageErrors={data.imageErrors}
              setImageErrors={data.setImageErrors}
              isInCart={data.isInCart}
              dispatch={data.dispatch}
            />
          </Grid>
        ))}
        {rowItems.length < 4 &&
          Array.from({ length: 4 - rowItems.length }).map((_, idx) => (
            <Grid item xs={12} sm={6} md={3} key={`empty-${idx}`} />
          ))}
      </Grid>
    </div>
  );
};

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

const Banner = styled(Box)(({ theme }) => ({
  backgroundImage: "url('/images/podguz.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "15px",
  padding: theme.spacing(6),
  color: "#FFFFFF",
  textAlign: "center",
  marginBottom: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
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

const NaturalBadge = styled(Box)(({ theme }) => ({
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

export default function Products() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const itemsPerPage = 8;

  const { allProducts, userCart } = useSelector((state) => state.usercart);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllProductsAction()).then(() => setLoading(false));
  }, [dispatch]);

  const isInCart = (item) => userCart.some((cartItem) => cartItem.id === item.id);

  const categories = [
    "Все товары", 
    "Чехлы",
    "Премиум",
    "Зарядные устройства",
    "Зарядные устройства Iphone",
    "Зарядные устройства Samsung",
    "Держатели устойства",
    "Наушники беспроводные",
    "Наушники проводные",
    "Smart-часы и аксессуары",
    "Защитные стекла",
    "Портативная зарядка(Power Bank)",
    "Гидрогелевые пленки",
    "Штативы",
    "Фото-видео свет",
    "Чехлы для планшетов",
    "Внешник накопители",
    "Автомобильные аксессуары",
    "Петличный микрофон",
    "Переферийные устройства",
    "Сумки",
    "Другое",





  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Фильтрация по категории
    if (category && category !== "Все товары") {
      filtered = filtered.filter((product) =>
        product.Categories?.some((cat) => cat.name === category)
      );
    }

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтрация по цене
    if (minPrice) {
      filtered = filtered.filter(
        (product) => parseFloat(product.price || 0) >= parseFloat(minPrice)
      );
    }
    if (maxPrice) {
      filtered = filtered.filter(
        (product) => parseFloat(product.price || 0) <= parseFloat(maxPrice)
      );
    }

    // Сортировка
    if (sortBy) {
      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case "price_asc":
            return parseFloat(a.price || 0) - parseFloat(b.price || 0);
          case "price_desc":
            return parseFloat(b.price || 0) - parseFloat(a.price || 0);
          case "name_asc":
            return a.name?.localeCompare(b.name) || 0;
          case "name_desc":
            return b.name?.localeCompare(a.name) || 0;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [allProducts, category, searchTerm, minPrice, maxPrice, sortBy]);

  const featuredProducts = filteredProducts.slice(0, 5);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSortChange = (event) => setSortBy(event.target.value);
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setCurrentPage(1);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 960,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };



  const remToPixels = (rem) => {
    const baseFontSize = 16;
    return rem * baseFontSize;
  };
  
  const itemSizeInPixels = remToPixels(37.75); // 37.75rem * 16 = 604px
  const listHeight = itemSizeInPixels * chunkArray(currentItems, 4).length; // Динамическая высота

  return (
    <Container maxWidth="lg" sx={{ py: 6, fontFamily: "Montserrat, sans-serif" }}>
      {/* Баннер */}
     

   

      {/* Заголовок и поиск */}
      <Stack spacing={3} mb={4}>
        <Typography
          variant="h4"
          fontWeight="700"
          color="#333333"
          sx={{ textTransform: "uppercase" }}
        >
          Каталог продуктов
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
   

      <Box mb={6} position="relative">
  {loading && (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
    >
      <CircularProgress sx={{ color: "#ADD8E6" }} size={60} />
    </Box>
  )}
  {loading ? (
    <Grid container spacing={3} justifyContent="center">
      {[...Array(8)].map((_, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Skeleton
            variant="rectangular"
            height="35rem"
            sx={{ borderRadius: "0.9375rem", width: "18.75rem", margin: "0 auto" }}
          />
        </Grid>
      ))}
    </Grid>
  ) : currentItems.length === 0 ? (
    <Typography variant="body1" color="#666666" textAlign="center">
      Товары не найдены
    </Typography>
  ) : (
    <Grid container spacing={3} justifyContent="center">
      {currentItems.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.id}>
          <ProductItem
            item={item}
            imageErrors={imageErrors}
            setImageErrors={setImageErrors}
            isInCart={isInCart}
            dispatch={dispatch}
          />
        </Grid>
      ))}
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