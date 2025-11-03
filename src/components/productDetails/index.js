"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addClickCountReducer,
  addToCartProductAction,
} from "@/store/slices/productSlice";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Chip,
  Divider,
  Modal,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// === СТИЛИ ===
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "25px",
  padding: "10px 20px",
  backgroundColor: "#ADD8E6",
  color: "#333333",
  textTransform: "none",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#87CEEB",
  },
  "&:disabled": {
    backgroundColor: "#D3D3D3",
    color: "#666666",
  },
}));

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
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  zIndex: 10,
});

// === КОНФИГ ===
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/store";
const BASE_URL='/api'

export default function ProductDetailPage({ params = {} }) {
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const userCart = useSelector((state) => state.usercart.userCart);
  const dispatch = useDispatch();

  // === Загрузка продукта ===
  useEffect(() => {
    if (!params.id) {
      setError("ID продукта не указан");
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://totu.kz/api/api/store/product/${params.id}`);
        console.log('response= ',response)
        const data = response.data;

        setProduct(data);

        // Сортируем: primary → first
        const sortedImages = (data.ProductImages || []).sort((a, b) => (b.isPrimary ? 1 : -1));
        setImages(sortedImages);
      } catch (err) {
        console.error("Ошибка загрузки продукта:", err);
        setError(err.response?.status === 404 ? "Продукт не найден" : "Ошибка загрузки");
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // === Вспомогательные функции ===
  const isInCart = (item) => userCart.some((cartItem) => cartItem.id === item.id);

  const handleAddToCart = (item) => {
    dispatch(addClickCountReducer());
    dispatch(addToCartProductAction(item));
    toast.success("Добавлено в корзину!");
  };

  const handleImageClick = (src) => {
    setSelectedImage(src);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  // === Генерация URL изображения ===
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.jpg";
    const base = BASE_URL.replace(/\/api\/store$/, "");
    return `${base}${imagePath}`;
  };

  // === Рендер ===
  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress size={60} sx={{ color: "#ADD8E6" }} />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error || "Продукт не найден"}
        </Typography>
        <Button variant="contained" onClick={() => window.history.back()}>
          Назад
        </Button>
      </Container>
    );
  }

  const price = parseFloat(product.price) || 0;

  return (
    <>
      <Head>
        <title>{product.name} - totu.kz</title>
        <meta name="description" content={product.description?.slice(0, 160) || "Подробности о товаре"} />
      </Head>

      <Container maxWidth="lg" sx={{ py: 6, fontFamily: "Montserrat, sans-serif" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 5 }}>
          {/* === ЛЕВАЯ ЧАСТЬ: ФОТО === */}
          <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "50%" } }}>
            {images.length > 0 ? (
              <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
                {images.map((img, index) => {
                  const src = getImageUrl(img.imagePath);
                  const errorKey = `${product.id}-${index}`;

                  return (
                    <Box
                      key={img.id || index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "zoom-in",
                        height: "100%",
                      }}
                      onClick={() => handleImageClick(src)}
                    >
                      <Image
                        src={imageErrors[errorKey] ? "/placeholder.jpg" : src}
                        alt={`${product.name} - фото ${index + 1}`}
                        width={600}
                        height={400}
                        style={{
                          objectFit: "contain",
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                        priority={index === 0}
                        unoptimized
                        onError={() => setImageErrors((prev) => ({ ...prev, [errorKey]: true }))}
                      />
                    </Box>
                  );
                })}
              </Slider>
            ) : (
              <Box
                sx={{
                  height: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#f8f9fa",
                  borderRadius: "12px",
                  border: "2px dashed #ddd",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Нет фотографий
                </Typography>
              </Box>
            )}
          </Box>

          {/* === ПРАВАЯ ЧАСТЬ: ИНФО === */}
          <Box sx={{ flex: 1 }}>
            {/* Категории */}
            {product.Categories?.length > 0 && (
              <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {product.Categories.map((cat) => (
                  <Chip
                    key={cat.id || cat.name}
                    label={cat.name}
                    size="small"
                    sx={{
                      backgroundColor: "#e6f3e6",
                      color: "#2e7d32",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>
            )}

            {/* Название */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#333",
                mb: 1,
                lineHeight: 1.2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              {product.name}
            </Typography>

            {/* Наличие */}
            <Typography
              variant="body1"
              sx={{
                color: product.stock > 0 ? "#2e7d32" : "#d32f2f",
                fontWeight: 600,
                mb: 2,
              }}
            >
              {product.stock > 0 ? `В наличии: ${product.stock} шт.` : "Нет в наличии"}
            </Typography>

            {/* Цена + кнопка */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 3,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#333", fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                {price.toLocaleString()} ₸
              </Typography>
              <StyledButton
                startIcon={<ShoppingCartOutlined />}
                onClick={() => handleAddToCart(product)}
                disabled={isInCart(product) || product.stock === 0}
                size="large"
              >
                {isInCart(product)
                  ? "В корзине"
                  : product.stock === 0
                  ? "Нет в наличии"
                  : "В корзину"}
              </StyledButton>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Описание */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  color: "#333",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              >
                Описание
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.7, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                dangerouslySetInnerHTML={{
                  __html:
                    product.description?.replace(/\n/g, "<br />") ||
                    "Описание отсутствует.",
                }}
              />
            </Box>

            {/* Характеристики */}
            {product.features && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: "#333",
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  }}
                >
                  Характеристики
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                  dangerouslySetInnerHTML={{
                    __html: product.features.replace(/\n/g, "<br />"),
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* === МОДАЛЬНОЕ ОКНО === */}
      <StyledModal open={openModal} onClose={handleCloseModal}>
        <ModalImageContainer>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Увеличенное фото"
              width={1400}
              height={900}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
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
}