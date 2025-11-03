"use client";

import React, { useEffect, useState, useMemo, useCallback, useTransition } from "react";
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
  Checkbox,
  FormControlLabel,
  FormGroup,
  CircularProgress,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Search, FilterList, Clear } from "@mui/icons-material";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  getAllProductsAction,
  addToCartProductAction,
  setFiltersReducer as setFilters,
  resetFiltersReducer as resetFilters,
} from "@/store/slices/productSlice";
import Image from "next/image";
import debounce from "lodash/debounce";

// Custom MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#ADD8E6",
    },
    secondary: {
      main: "#FFB6C1",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h4: {
      fontWeight: 700,
      color: "#333333",
      textTransform: "uppercase",
    },
    body2: {
      color: "#666666",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
          background: "linear-gradient(45deg, #ADD8E6 30%, #87CEEB 90%)",
          color: "#333333",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          "&:hover": {
            background: "linear-gradient(45deg, #87CEEB 30%, #ADD8E6 90%)",
            transform: "scale(1.05)",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
          },
          "&:disabled": {
            background: "#E0E0E0",
            color: "#666666",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            background: "#FFFFFF",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
              boxShadow: "0 0 10px rgba(173, 216, 230, 0.5)",
            },
          },
          "& .MuiInputBase-input": {
            padding: "12px 16px",
            color: "#333333",
          },
          "& .MuiInputLabel-root": {
            color: "#666666",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          background: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          "& .MuiSelect-select": {
            padding: "12px 32px 12px 16px",
            color: "#333333",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            boxShadow: "0 0 10px rgba(173, 216, 230, 0.5)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          },
        },
      },
    },
  },
});

// Styled Components
const ProductCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "300px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FFFFFF",
  margin: "0 auto", // Центрирование карточки в Grid
}));

const FilterDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 320,
    padding: theme.spacing(3),
    background: "linear-gradient(135deg, #F8FAFC 0%, #E6F0FA 100%)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const CategoryButton = styled(Button)(({ theme, active }) => ({
  borderRadius: "25px",
  padding: "8px 20px",
  margin: "5px",
  fontWeight: 600,
  color: active ? "#333333" : "#666666",
  background: active
    ? "linear-gradient(45deg, #ADD8E6 30%, #87CEEB 90%)"
    : "#F5F5F5",
  boxShadow: active
    ? "0 4px 15px rgba(135, 206, 235, 0.5)"
    : "none",
  "&:hover": {
    background: "linear-gradient(45deg, #87CEEB 30%, #ADD8E6 90%)",
    color: "#333333",
    boxShadow: "0 4px 15px rgba(135, 206, 235, 0.5)",
  },
}));

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/store";
const BASE_URL='/api/'

export default function KatalogComponent() {
  const dispatch = useDispatch();
  const {
    allProducts,
    userCart,
    selectedMainType,
    selectedType,
    filters,
    status,
    error,
    total,
  } = useSelector((state) => state.usercart);
  const [isPending, startTransition] = useTransition();
  const [minLoadingTimeMet, setMinLoadingTimeMet] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const itemsPerPage = 8;
  const categories = [
    "Все товары",
    "Купание",
    "Уход",
    "Защита",
    "Средства для мамы",
    "Органическая линейка",
    "Другое",
  ];

  // Debounced filter updates
  const debouncedSetFilters = useCallback(
    debounce((newFilters) => {
      startTransition(() => {
        dispatch(setFilters({ ...newFilters }));
      });
    }, 300),
    [dispatch]
  );

  // Minimum loading time to prevent flickering
  useEffect(() => {
    const timer = setTimeout(() => setMinLoadingTimeMet(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch products on mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllProductsAction());
    }
  }, [dispatch, status]);

  const isInCart = (item) => userCart.some((cartItem) => cartItem.id === item.id);

  // Client-side filtering
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by categories
    if (filters.selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.Categories.some((cat) => filters.selectedCategories.includes(cat.name))
      );
    }

    // Filter by search term (name)
    if (filters.searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Filter by price
    if (filters.minPrice) {
      filtered = filtered.filter(
        (product) => parseFloat(product.price) >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (product) => parseFloat(product.price) <= parseFloat(filters.maxPrice)
      );
    }

    // Filter by volume
    if (filters.minVolume) {
      filtered = filtered.filter(
        (product) => parseFloat(product.volume) >= parseFloat(filters.minVolume)
      );
    }
    if (filters.maxVolume) {
      filtered = filtered.filter(
        (product) => parseFloat(product.volume) <= parseFloat(filters.maxVolume)
      );
    }

    // Filter by stock
    if (filters.minStock) {
      filtered = filtered.filter(
        (product) => product.stock >= parseInt(filters.minStock)
      );
    }
    if (filters.maxStock) {
      filtered = filtered.filter(
        (product) => product.stock <= parseInt(filters.maxStock)
      );
    }

    // Filter by description
    if (filters.descriptionKeyword) {
      filtered = filtered.filter((product) =>
        product.description.toLowerCase().includes(filters.descriptionKeyword.toLowerCase())
      );
    }

    // Filter by features
    if (filters.featuresKeyword) {
      filtered = filtered.filter((product) =>
        product.features.toLowerCase().includes(filters.featuresKeyword.toLowerCase())
      );
    }

    // Sorting
    if (filters.sortBy) {
      filtered = filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "price_asc":
            return parseFloat(a.price) - parseFloat(b.price);
          case "price_desc":
            return parseFloat(b.price) - parseFloat(a.price);
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "volume_asc":
            return parseFloat(a.volume) - parseFloat(b.volume);
          case "volume_desc":
            return parseFloat(b.volume) - parseFloat(a.volume);
          case "stock_asc":
            return a.stock - b.stock;
          case "stock_desc":
            return b.stock - a.stock;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [allProducts, filters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (filters.page - 1) * itemsPerPage,
    filters.page * itemsPerPage
  );

  const handleSortChange = (event) => {
    debouncedSetFilters({ ...filters, sortBy: event.target.value });
  };

  const handleCategoryChange = (cat) => {
    const newCategories = cat === "Все товары"
      ? []
      : filters.selectedCategories.includes(cat)
        ? filters.selectedCategories.filter((c) => c !== cat)
        : [...filters.selectedCategories, cat];
    debouncedSetFilters({ ...filters, selectedCategories: newCategories, page: 1 });
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setFilterOpen(false);
  };

  const isLoading = status === "loading" || !minLoadingTimeMet || isPending;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 6, bgcolor: "transparent" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 4, textAlign: "left", fontSize: { xs: "1.8rem", md: "2.5rem" } }}
          >
            {selectedMainType || "Каталог товаров"}
          </Typography>
        </motion.div>

        {/* Search and Filters */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "background.paper",
            borderRadius: "20px",
            mb: 4,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
              <TextField
                fullWidth
                placeholder="Поиск по названию..."
                value={filters.searchTerm}
                onChange={(e) => debouncedSetFilters({ ...filters, searchTerm: e.target.value, page: 1 })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                  endAdornment: filters.searchTerm && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => debouncedSetFilters({ ...filters, searchTerm: "", page: 1 })}>
                        <Clear sx={{ color: "primary.main" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl fullWidth={{ xs: true, sm: false }} sx={{ minWidth: { sm: 200 } }}>
                <Select
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  displayEmpty
                  renderValue={(value) => (value ? value : "Сортировка")}
                >
                  <MenuItem value="">Сортировка</MenuItem>
                  <MenuItem value="price_asc">Цена: по возрастанию</MenuItem>
                  <MenuItem value="price_desc">Цена: по убыванию</MenuItem>
                  <MenuItem value="name_asc">Название: А-Я</MenuItem>
                  <MenuItem value="name_desc">Название: Я-А</MenuItem>
                  {/* <MenuItem value="volume_asc">Объем: по возрастанию</MenuItem>
                  <MenuItem value="volume_desc">Объем: по убыванию</MenuItem> */}
                  <MenuItem value="stock_asc">Наличие: по возрастанию</MenuItem>
                  <MenuItem value="stock_desc">Наличие: по убыванию</MenuItem>
                </Select>
              </FormControl>
              {/* <IconButton
                onClick={() => setFilterOpen(true)}
                sx={{
                  bgcolor: "primary.main",
                  color: "#333333",
                  borderRadius: "50%",
                  p: 1.5,
                  "&:hover": {
                    bgcolor: "#87CEEB",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <FilterList />
              </IconButton> */}
            </Stack>
            {/* <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
              {categories.map((cat) => (
                <CategoryButton
                  key={cat}
                  active={
                    cat === "Все товары"
                      ? filters.selectedCategories.length === 0
                      : filters.selectedCategories.includes(cat)
                      ? 1
                      : 0
                  }
                  onClick={() => handleCategoryChange(cat)}
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat}
                </CategoryButton>
              ))}
            </Box> */}
            {(filters.searchTerm ||
              filters.sortBy ||
              filters.minPrice ||
              filters.maxPrice ||
              filters.minVolume ||
              filters.maxVolume ||
              filters.minStock ||
              filters.maxStock ||
              filters.descriptionKeyword ||
              filters.featuresKeyword ||
              filters.selectedCategories.length > 0) && (
              <Box sx={{ textAlign: "center" }}>
                <Button onClick={handleResetFilters}>
                  Сбросить фильтры
                </Button>
              </Box>
            )}
          </Stack>
        </Paper>

        {/* Error Message */}
        {error && (
          <Box textAlign="center" mb={2}>
            <Typography color="error">Ошибка загрузки товаров: {error}</Typography>
            <Button
              onClick={() => dispatch(getAllProductsAction())}
              disabled={isPending}
              startIcon={isPending ? <CircularProgress size={20} /> : null}
              sx={{ mt: 1 }}
            >
              Повторить
            </Button>
          </Box>
        )}

        {/* Product Grid */}
       {/* Product Grid */}
<Box mb={6}>
  <Grid container spacing={2} justifyContent="center">
    {isLoading ? (
      [...Array(8)].map((_, idx) => (
        <Grid item xs={6} sm={6} md={4} lg={3} key={idx}>
          <Skeleton
            variant="rectangular"
            height={380}
            sx={{
              borderRadius: "16px",
              bgcolor: "rgba(255,255,255,0.1)",
            }}
          />
        </Grid>
      ))
    ) : currentItems.length === 0 ? (
      <Grid item xs={12}>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Товары не найдены.
        </Typography>
      </Grid>
    ) : (
      currentItems.map((item) => {
        const images = item.ProductImages || [];
        const imageUrl = images.length > 0
          ? `${BASE_URL.replace(/\/api\/store$/, "")}${images[0].imagePath.replace(/^\/api\/store/, "")}`
          : "/placeholder-image.jpg";

        return (
          <Grid item xs={6} sm={6} md={4} lg={3} key={item.id}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              sx={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                bgcolor: "#1A1A1A",
                color: "white",
                height: "100%",
                minHeight: { xs: 360, md: 400 },
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Иконка сердца */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  bgcolor: "rgba(0,0,0,0.3)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
                  zIndex: 2,
                }}
              >
                <FavoriteBorder />
              </IconButton>

              {/* Фото */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 200, md: 220 },
                  bgcolor: "#2D2D2D",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={imageErrors[item.id] ? "/placeholder-image.jpg" : imageUrl}
                  alt={item.name}
                  fill
                  style={{
                    objectFit: "contain",
                    maxWidth: "90%",
                    maxHeight: "90%",
                  }}
                  onError={() => setImageErrors((prev) => ({ ...prev, [item.id]: true }))}
                  unoptimized
                />
              </Box>

              {/* Контент */}
              <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                {/* Название */}
                <Typography
                  variant="h6"
                  component={Link}
                  href={`/product/${item.id}`}
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.3,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "white",
                    textDecoration: "none",
                    mb: 1,
                    "&:hover": { color: "#ADD8E6" },
                  }}
                >
                  {item.name}
                </Typography>

                {/* Доставка */}
                <Typography
                  variant="caption"
                  sx={{
                    color: "#4ADE80",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 1.5,
                  }}
                >
                  <LocalShipping fontSize="small" />
                  Отправим завтра
                </Typography>

                {/* Нижняя часть: цена + кнопка */}
                <Box
                  sx={{
                    mt: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "white",
                      fontSize: { xs: "1.4rem", md: "1.6rem" },
                    }}
                  >
                    {parseFloat(item.price)?.toLocaleString() || "0"} ₸
                  </Typography>

                  <Button
                    onClick={() => dispatch(addToCartProductAction(item))}
                    disabled={isInCart(item)}
                    sx={{
                      bgcolor: "#ADD8E6",
                      color: "#1A1A1A",
                      fontWeight: 600,
                      borderRadius: "12px",
                      px: 2,
                      py: 1,
                      minWidth: "auto",
                      "&:hover": { bgcolor: "#87CEEB" },
                      "&:disabled": {
                        bgcolor: "#666",
                        color: "#999",
                      },
                    }}
                    startIcon={isInCart(item) ? <Check /> : <ShoppingCart />}
                  >
                    {isInCart(item) ? "" : "Добавить"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        );
      })
    )}
  </Grid>
</Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Stack spacing={2} alignItems="center" mt={4}>
            <Pagination
              count={totalPages}
              page={filters.page}
              onChange={(e, page) => debouncedSetFilters({ ...filters, page })}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "primary.main",
                },
                "& .Mui-selected": {
                  background: "linear-gradient(45deg, #ADD8E6 30%, #87CEEB 90%)",
                  color: "#333333",
                  boxShadow: "0 2px 8px rgba(135, 206, 235, 0.5)",
                },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Показано {currentItems.length} из {filteredProducts.length} товаров
            </Typography>
          </Stack>
        )}

        {/* Filter Drawer */}
        <FilterDrawer
          anchor="right"
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          component={motion.div}
          initial={{ x: "100%" }}
          animate={{ x: filterOpen ? 0 : "100%" }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" gutterBottom fontWeight={700}>
            Фильтры
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Категории</Typography>
            <FormGroup>
              {categories.slice(1).map((cat) => (
                <FormControlLabel
                  key={cat}
                  control={
                    <Checkbox
                      checked={filters.selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                      sx={{ color: "primary.main" }}
                    />
                  }
                  label={cat}
                />
              ))}
            </FormGroup>
            <Typography variant="subtitle1" mt={2}>Цена</Typography>
            <TextField
              label="Минимальная цена"
              type="number"
              fullWidth
              value={filters.minPrice}
              onChange={(e) => debouncedSetFilters({ ...filters, minPrice: e.target.value, page: 1 })}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Максимальная цена"
              type="number"
              fullWidth
              value={filters.maxPrice}
              onChange={(e) => debouncedSetFilters({ ...filters, maxPrice: e.target.value, page: 1 })}
              sx={{ mt: 2 }}
            />
            {/* <Typography variant="subtitle1" mt={2}>Объем</Typography> */}
            {/* <TextField
              label="Минимальный объем"
              type="number"
              fullWidth
              value={filters.minVolume}
              onChange={(e) => debouncedSetFilters({ ...filters, minVolume: e.target.value, page: 1 })}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Максимальный объем"
              type="number"
              fullWidth
              value={filters.maxVolume}
              onChange={(e) => debouncedSetFilters({ ...filters, maxVolume: e.target.value, page: 1 })}
              sx={{ mt: 2 }}
            /> */}
            <Typography variant="subtitle1" mt={2}>Наличие</Typography>
            <TextField
              label="Минимальное наличие"
              type="number"
              fullWidth
              value={filters.minStock}
              onChange={(e) => debouncedSetFilters({ ...filters, minStock: e.target.value, page: 1 })}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Максимальное наличие"
              type="number"
              fullWidth
              value={filters.maxStock}
              onChange={(e) => debouncedSetFilters({ ...filters, maxStock: e.target.value, page: 1 })}
              sx={{ mt: 2 }}
            />
            <Typography variant="subtitle1" mt={2}>Описание</Typography>
            <TextField
              label="Ключевое слово в описании"
              fullWidth
              value={filters.descriptionKeyword}
              onChange={(e) => debouncedSetFilters({ ...filters, descriptionKeyword: e.target.value, page: 1 })}
              sx={{ mt: 2 }}
            />
            <Typography variant="subtitle1" mt={2}>Особенности</Typography>
            <TextField
              label="Ключевое слово в особенностях"
              fullWidth
              value={filters.featuresKeyword}
              onChange={(e) => debouncedSetFilters({ ...filters, featuresKeyword: e.target.value, page: 1 })}
              sx={{ mt: 2 }}
            />
          </Box>
          <Button fullWidth sx={{ mt: 3 }} onClick={() => setFilterOpen(false)}>
            Применить
          </Button>
        </FilterDrawer>
      </Container>
    </ThemeProvider>
  );
}




