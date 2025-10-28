"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "/src/app/globals.css";
import { styled } from "@mui/material/styles";
import { Carousel as RsCarousel } from "rsuite";
import "rsuite/dist/rsuite.min.css";

// Sample banner data (premium phone cases)
const banners = [
  {
    image: "/image/hdd.webp",
    title: "Искры роскоши",
    subtitle: "Эксклюзивные чехлы ручной работы от мировых брендов",
    cta: "Открыть коллекцию",
  },
  {
    image: "/image/ygreen.png",
    title: "Итальянская кожа",
    subtitle: "Изысканные чехлы для утонченного стиля",
    cta: "Посмотреть новинки",
  },
 
  {
    image: "/image/yesido.png",
    title: "Дизайнерская элегантность",
    subtitle: "Чехлы от ведущих модных домов",
    cta: "Выбрать свой стиль",
  },
   {
    image: "/image/kajsa.png",
    title: "Дизайнерская элегантност333ь",
    subtitle: "Чехлы от ведущих модн333ых домов",
    cta: "Выбрать свой 333стиль",
  },
];

// Sample product data (premium phone cases)
const products = [
  {
    title: "Кожаные чехлы",
    description: "Ручная работа из премиальной итальянской кожи",
    image: "/image/leather-case.jpg",
    alt: "Кожаные чехлы",
  },
  {
    title: "Карбоновые чехлы",
    description: "Легкие и прочные чехлы из углеродного волокна",
    image: "/image/carbon-case.jpg",
    alt: "Карбоновые чехлы",
  },
  {
    title: "Металлические чехлы",
    description: "Анодированный алюминий для максимальной защиты",
    image: "/image/metal-case.jpg",
    alt: "Металлические чехлы",
  },
  {
    title: "Дизайнерские чехлы",
    description: "Эксклюзивные модели от люксовых брендов",
    image: "/image/designer-case.jpg",
    alt: "Дизайнерские чехлы",
  },
];

// Custom Banner component
const Banner = styled(motion.div)(({ theme, bgImage }) => ({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover", // Changed to "cover" for better scaling
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: theme.spacing(6),
  color: "#FFFFFF",
  textAlign: "center",
  marginBottom: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "700px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)", // Darker overlay for text contrast
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
}));

// Custom BannerCarousel component
const BannerCarousel = styled(RsCarousel)({
   height: "43rem",
  borderRadius: "15px",
  overflow: "hidden",
  width: "100%",
  maxWidth: "1536px",
  margin: "0 auto",
  "& .rs-carousel-item": {
   
    width: "100%",
     height: "43rem",
  },
  "& .rs-carousel-slider": {
    borderRadius: "15px",
    height: "43rem",
  },
  "& .rs-carousel-btn-prev, & .rs-carousel-btn-next": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  },
  "& .rs-carousel-indicators button": {
    backgroundColor: "#ADD8E6",
    "&.rs-carousel-indicator-active": {
      backgroundColor: "#87CEEB",
    },
  },
});

// Custom BannerCta button
const BannerCta = styled("button")({
  background: "transparent",
  border: "2px solid #D4AF37",
  color: "#D4AF37",
  padding: "16px 32px",
  fontSize: "1.2rem",
  fontWeight: 600,
  borderRadius: "10px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "#D4AF37",
    color: "#121212",
    boxShadow: "0 6px 20px rgba(212, 175, 55, 0.5)",
  },
});

export default function PremiumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = products.findIndex((p) => p.image === selectedImage);
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % products.length
        : (currentIndex - 1 + products.length) % products.length;
    setSelectedImage(products[newIndex].image);
  };

  return (
    <>
      {/* Banner Carousel Section */}
      <section className="banner-section">
        <BannerCarousel autoplay autoplayInterval={3000} placement="bottom">
          {banners.map((banner, index) => (
            <Banner
              key={index}
              bgImage={banner.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            
            >
              {/* <Typography variant="h2" sx={{ fontWeight: 900, fontSize: "2.5rem", mb: 2 }}>
                {banner.title}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 400, mb: 3 }}>
                {banner.subtitle}
              </Typography>
              <Link href="/katalog-tovarov">
                <BannerCta>{banner.cta}</BannerCta>
              </Link> */}
            </Banner>
          ))}
        </BannerCarousel>
      </section>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Элитные чехлы для <span className="accent-text">вашего статуса</span>
            </h1>
            <p className="hero-description">
              Эксклюзивные чехлы от люксовых брендов, созданные для тех, кто ценит стиль и совершенство.
            </p>
            <Link href="/katalog-tovarov">
              <button className="cta-button">Открыть коллекцию</button>
            </Link>
          </div>
          <div className="hero-image">
            <div className="image-placeholder hero-placeholder">
              <Image
                src="/image/adds.jpg"
                alt="Элитные чехлы"
                width={600}
                height={400}
                style={{ objectFit: "cover", cursor: "pointer" }}
                priority={true}
                loading="eager"
                onClick={() => openModal("/image/premium-hero-case.jpg")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">О нашей коллекции</h2>
            <p className="about-text">
              Мы собрали лучшие чехлы от мировых брендов, использующих премиальные материалы: итальянскую кожу, углеродное волокно и анодированный алюминий.
            </p>
            <p className="about-text">
              Каждый чехол — это произведение искусства, созданное для защиты и подчеркивания вашего индивидуального стиля.
            </p>
            <div className="mission">
              <h3 className="mission-title">Наше видение</h3>
              <p className="mission-text">
                Переосмыслить защиту смартфона как символ роскоши и статуса.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {/* <section className="products-section">
        <div className="container">
          <h2 className="section-title">Премиальные чехлы</h2>
          <div className="products-grid">
            {products.map((product, index) => (
              <motion.div
                className="product-card"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="image-placeholder product-placeholder">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    width={350}
                    height={200}
                    style={{ objectFit: "cover", cursor: "pointer" }}
                    loading="lazy"
                    onClick={() => openModal(product.image)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Full-Screen Image Modal */}
      {isModalOpen && (
        <motion.div
          className="image-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <button className="modal-prev" onClick={() => navigateImage("prev")}>
              ←
            </button>
            <button className="modal-next" onClick={() => navigateImage("next")}>
              →
            </button>
            {selectedImage && (
              <TransformWrapper>
                <TransformComponent>
                  <Image
                    src={selectedImage}
                    alt="Full-screen preview"
                    fill
                    style={{ objectFit: "contain" }}
                    quality={90}
                  />
                </TransformComponent>
              </TransformWrapper>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Преимущества </h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-title">Элитные бренды</h3>
              <p className="feature-description">Сотрудничество с люксовыми производителями</p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Премиальные материалы</h3>
              <p className="feature-description">Кожа, карбон и металл высшего качества</p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Уникальный дизайн</h3>
              <p className="feature-description">Чехлы, созданные для эстетики и стиля</p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">VIP-доставка</h3>
              <p className="feature-description">Быстрая и надежная доставка по Казахстану</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ваш стиль, ваша роскошь</h2>
            <p className="cta-description">Ознакомьтесь с нашей эксклюзивной коллекцией чехлов</p>
            <div className="cta-buttons">
              <Link href="/contactpage">
                <button className="cta-button primary">Связаться с нами</button>
              </Link>
              <Link href="/katalog-tovarov">
                <button className="cta-button secondary">Открыть каталог</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');

        * {
          font-family: 'Montserrat', sans-serif;
          box-sizing: border-box;
        }

        /* Banner Section */
        .banner-section {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          background: linear-gradient(135deg, #121212 0%, #1E272E 100%);
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #121212 0%, #1E272E 100%);
          color: #F5F5F5;
          padding: 120px 20px;
          min-height: 700px;
          display: flex;
          align-items: center;
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-content {
          animation: fadeInUp 1.2s ease-out;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 25px;
          color: #F5F5F5;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
        }

        .accent-text {
          color: #D4AF37;
        }

        .hero-description {
          font-size: 1.4rem;
          line-height: 1.8;
          margin-bottom: 35px;
          color: #F5F5F5;
          opacity: 0.9;
        }

        .cta-button {
          background: #D4AF37;
          color: #121212;
          border: none;
          padding: 18px 36px;
          font-size: 1.2rem;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
        }

        .cta-button:hover {
          background: #B8972E;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.6);
        }

        .hero-image {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-placeholder {
          position: relative;
          width: 600px;
          height: 400px;
          border-radius: 15px;
          overflow: hidden;
          border: 2px solid #D4AF37;
          box-shadow: 0 6px 25px rgba(212, 175, 55, 0.3);
        }

        /* Modal Styles */
        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(18, 18, 18, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          position: relative;
          width: 90%;
          max-width: 1400px;
          height: 90vh;
          max-height: 900px;
          border-radius: 15px;
          overflow: hidden;
          border: 2px solid #D4AF37;
          box-shadow: 0 6px 25px rgba(212, 175, 55, 0.4);
        }

        .modal-close,
        .modal-prev,
        .modal-next {
          position: absolute;
          background: #D4AF37;
          color: #121212;
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          font-size: 1.8rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 1001;
        }

        .modal-close {
          top: 30px;
          right: 30px;
        }

        .modal-prev {
          top: 50%;
          left: 30px;
          transform: translateY(-50%);
        }

        .modal-next {
          top: 50%;
          right: 30px;
          transform: translateY(-50%);
        }

        .modal-close:hover,
        .modal-prev:hover,
        .modal-next:hover {
          background: #B8972E;
          transform: translateY(-50%) scale(1.1);
        }

        .modal-close:hover {
          transform: scale(1.1);
        }

        /* About Section */
        .about-section {
          background: #121212;
          padding: 80px 20px;
        }

        .about-content {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }

        .about-text {
          font-size: 1.3rem;
          line-height: 1.9;
          margin-bottom: 25px;
          color: #F5F5F5;
          opacity: 0.9;
        }

        .mission {
          background: #1E272E;
          padding: 35px;
          border-radius: 15px;
          margin-top: 40px;
          border: 2px solid #D4AF37;
          box-shadow: 0 6px 25px rgba(212, 175, 55, 0.3);
        }

        .mission-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: #D4AF37;
        }

        .mission-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: #F5F5F5;
        }

        /* Products Section */
        .products-section {
          padding: 80px 20px;
          background: #121212;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 900;
          text-align: center;
          margin-bottom: 50px;
          color: #F5F5F5;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }

        .product-card {
          background: #1E272E;
          padding: 30px;
          border-radius: 15px;
          border: 2px solid #D4AF37;
          box-shadow: 0 6px 25px rgba(212, 175, 55, 0.3);
          text-align: center;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
        }

        .product-title {
          font-size: 1.7rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #D4AF37;
        }

        .product-description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #F5F5F5;
          margin-bottom: 15px;
        }

        .product-placeholder {
          position: relative;
          width: 100%;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #D4AF37;
        }

        /* Features Section */
        .features-section {
          background: #121212;
          padding: 80px 20px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: #1E272E;
          padding: 30px;
          border-radius: 15px;
          border: 2px solid #D4AF37;
          box-shadow: 0 6px 25px rgba(212, 175, 55, 0.3);
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #D4AF37;
        }

        .feature-description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #F5F5F5;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #121212 0%, #1E272E 100%);
          color: #F5F5F5;
          padding: 80px 20px;
        }

        .cta-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 20px;
          color: #F5F5F5;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        }

        .cta-description {
          font-size: 1.3rem;
          line-height: 1.8;
          margin-bottom: 30px;
          color: #F5F5F5;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button.primary {
          background: #D4AF37;
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
          color: #121212;
        }

        .cta-button.secondary {
          background: transparent;
          border: 2px solid #D4AF37;
          color: #D4AF37;
        }

        .cta-button.secondary:hover {
          background: #D4AF37;
          color: #121212;
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 1536px) {
          /* Adjustments if needed */
        }

        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .hero-title {
            font-size: 2.8rem;
          }

          .hero-placeholder {
            width: 350px;
            height: 240px;
          }

          .section-title {
            font-size: 2.2rem;
          }

          .products-grid,
          .features-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-button {
            width: 100%;
            max-width: 300px;
          }

          .modal-content {
            width: 95%;
            height: 80vh;
          }
        }

        @media (max-width: 480px) {
          .hero-section,
          .about-section,
          .products-section,
          .features-section,
          .cta-section {
            padding: 60px 16px;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .hero-placeholder {
            width: 280px;
            height: 180px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .product-placeholder {
            height: 180px;
          }

          .modal-content {
            width: 100%;
            height: 70vh;
          }

          .modal-close,
          .modal-prev,
          .modal-next {
            width: 40px;
            height: 40px;
            font-size: 1.4rem;
          }
        }
      `}</style>
    </>
  );
}