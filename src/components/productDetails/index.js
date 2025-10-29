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
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import Image from "next/image";
import Head from "next/head";
import { ShoppingCartOutlined, Close } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";

// Стилизованные компоненты
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "25px",
  padding: "10px 20px",
  backgroundColor: "#ADD8E6",
  color: "#333333",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#87CEEB",
  },
  "&:disabled": {
    backgroundColor: "#D3D3D3",
    color: "#666666",
  },
}));

const StyledCarousel = styled(Carousel)({
  borderRadius: "10px",
  overflow: "hidden",
  "& .rs-carousel-item": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
  },
});

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalImageContainer = styled(Box)({
  position: "relative",
  maxWidth: "90vw",
  maxHeight: "90vh",
  backgroundColor: "#000",
  borderRadius: "10px",
  overflow: "hidden",
});

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: 10,
  right: 10,
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});

// Базовый URL для API
const BASE_URL = "http://89.207.250.180:8000";

export default function ProductDetailPage({ params = {} }) {
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const userCart = useSelector((state) => state.usercart.userCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!params.id) {
      setError("ID продукта не указан");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/api/store/product/${params.id}`);
        const productData = response.data;

        console.log("Информация о продукте:", productData);

        setProduct(productData);
        const imagesData = productData.ProductImages || [];
        setImages(imagesData.sort((a, b) => (b.isPrimary ? 1 : -1)));
      } catch (err) {
        console.warn("Ошибка запроса:", err.response?.status, err.message);
        if (err.response?.status === 404) {
          setError("Продукт не найден");
        } else {
          setError(err.message || "Ошибка загрузки данных");
        }
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const isInCart = (item) => {
    return userCart.some((cartItem) => cartItem.id === item.id);
  };

  const handleAddToCart = (item) => {
    dispatch(addClickCountReducer());
    dispatch(addToCartProductAction(item));
    toast.success("Добавлено в корзину!");
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error || "Продукт не найден"}
        </Typography>
      </Container>
    );
  }

  const price = parseFloat(product.price);

  return (
    <>
      <Head>
        <title>{product.name} - SCVolokno.kz</title>
        <meta
          name="description"
          content={
            product.description?.slice(0, 160) || "Подробное описание продукта"
          }
        />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4, fontFamily: "Montserrat, sans-serif" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          {/* Секция с изображениями */}
          <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "50%" } }}>
            {images.length > 0 ? (
              <StyledCarousel autoplay>
                {images.map((img, index) => {
                  const imageSrc = img.imagePath
                    ? `${BASE_URL}${img.imagePath}`
                    : "/placeholder.jpg";
                  return (
                    <Box
                      key={img.id || index}
                      sx={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
                      onClick={() => handleImageClick(imageSrc)}
                    >
                      <Image
                        src={imageSrc}
                        alt={`Product image ${index}`}
                        width={600}
                        height={400}
                        style={{ objectFit: "contain" }}
                        priority={index === 0}
                        onError={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                      />
                    </Box>
                  );
                })}
              </StyledCarousel>
            ) : (
              <Box
                sx={{
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F5F5F5",
                  borderRadius: "10px",
                }}
              >
                <Typography variant="body1" color="#666666">
                  Нет фото
                </Typography>
              </Box>
            )}
          </Box>

          {/* Секция с информацией */}
          <Box sx={{ flex: 1 }}>
            {/* Категории */}
            {product.Categories?.length > 0 && (
              <Box sx={{ mb: 2 }}>
                {product.Categories.map((category) => (
                  <Chip
                    key={category.id || category.name}
                    label={category.name}
                    size="small"
                    sx={{ mr: 1, backgroundColor: "#FFFFE0", color: "#333333" }}
                  />
                ))}
              </Box>
            )}

            {/* Название */}
            <Typography variant="h4" sx={{ fontWeight: "700", color: "#333333", mb: 1 }}>
              {product.name}
            </Typography>

            {/* Наличие */}
            <Typography variant="body2" color="#666666" sx={{ mb: 2 }}>
              Наличие: {product.stock > 0 ? `${product.stock} шт.` : "Нет в наличии"}
            </Typography>

            {/* Цена и кнопка */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: "700", color: "#333333" }}>
                {price.toLocaleString()} ₸
              </Typography>
              <StyledButton
                startIcon={<ShoppingCartOutlined />}
                onClick={() => handleAddToCart(product)}
                disabled={isInCart(product) || product.stock === 0}
              >
                {isInCart(product) ? "В корзине" : product.stock === 0 ? "Нет в наличии" : "В корзину"}
              </StyledButton>
            </Box>

            {/* Описание */}
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#333333", mb: 1 }}>
              Описание
            </Typography>
            <Typography
              variant="body1"
              color="#666666"
              dangerouslySetInnerHTML={{
                __html: product.description?.replace(/\n/g, "<br />") || "Описание отсутствует",
              }}
            />

            {/* Характеристики, если есть */}
            {product.features && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ color: "#333333", mb: 1 }}>
                  Характеристики
                </Typography>
                <Typography
                  variant="body1"
                  color="#666666"
                  dangerouslySetInnerHTML={{
                    __html: product.features.replace(/\n/g, "<br />"),
                  }}
                />
              </>
            )}
          </Box>
        </Box>
      </Container>

      {/* Модальное окно для полноэкранного просмотра */}
      <StyledModal open={openModal} onClose={handleCloseModal}>
        <ModalImageContainer>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Full screen product image"
              width={1200}
              height={800}
              style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
            />
          )}
          <CloseButton onClick={handleCloseModal}>
            <Close />
          </CloseButton>
        </ModalImageContainer>
      </StyledModal>
    </>
  );
}