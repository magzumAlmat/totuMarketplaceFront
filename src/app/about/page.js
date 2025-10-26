"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import "/src/app/globals.css";

// Sample banner data
const banners = [
  {
    image: "/image/banner1.jpg",
    title: "TOTU — Стильные аксессуары",
    subtitle: "Качественные чехлы, наушники и многое другое для ваших устройств",
  },
  {
    image: "/image/banner2.jpg",
    title: "Новинки от TOTU",
    subtitle: "Ознакомьтесь с последними трендами в аксессуарах",
  },
  {
    image: "/image/banner3.jpg",
    title: "Акции и скидки",
    subtitle: "Сэкономьте на покупке стильных аксессуаров",
  },
];

// Sample product data
const products = [
  {
    title: "Чехлы и защита",
    description: "Прочные чехлы и защитные стекла для любых моделей смартфонов",
    image: "/image/cheholandsafe.jpg",
    alt: "Чехлы и защита",
  },
  {
    title: "Автоаксессуары",
    description: "Удобные держатели и зарядные устройства для авто",
    image: "/image/auto.jpg",
    alt: "Автоаксессуары",
  },
  {
    title: "Аудио",
    description: "Беспроводные наушники и аудиоаксессуары",
    image: "/image/audio.jpeg",
    alt: "Аудиоаксессуары",
  },
  {
    title: "Охлаждение",
    description: "Вентиляторы для охлаждения смартфонов и планшетов",
    image: "/image/freeze.jpg",
    alt: "Охлаждение",
  },
  {
    title: "Освещение",
    description: "Портативные лампы для фото и видео",
    image: "/image/light.jpg",
    alt: "Освещение",
  },
  {
    title: "Петлички",
    description: "Петличные и студийные микрофоны для контента",
    image: "/image/mics.jpg",
    alt: "Микрофоны",
  },
];

// Custom BannerCarousel component
const BannerCarousel = ({ children, autoplay = true, autoplayInterval = 3000, placement = "bottom" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = children.length;

  // Autoplay logic
  useState(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval, totalSlides]);

  return (
    <div className="carousel-container">
      <motion.div
        className="carousel-inner"
        initial={{ x: 0 }}
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
      {placement === "bottom" && (
        <div className="carousel-dots">
          {children.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Custom Banner component
const Banner = ({ bgImage, children }) => {
  return (
    <div className="banner">
      <Image
        src={bgImage}
        alt="Banner"
        fill
        style={{ objectFit: "cover" }}
        priority={true}
        quality={85}
      />
      <div className="banner-content">{children}</div>
    </div>
  );
};

export default function AboutPage() {
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

  return (
    <>
      {/* Banner Carousel Section */}
      {/* <section className="banner-section">
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
      </section> */}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              TOTU — аксессуары для <span className="accent-text">вашего стиля</span>
            </h1>
            <p className="hero-description">
              Официальный представитель бренда TOTU в Казахстане. Качественные и стильные аксессуары для смартфонов и не только.
            </p>
            <Link href="/katalog-tovarov">
              <button className="cta-button">Перейти в каталог</button>
            </Link>
          </div>
          <div className="hero-image">
            <div className="image-placeholder hero-placeholder">
              <Image
                src="/image/accessoires.jpg"
                alt="Аксессуары TOTU"
                width={500}
                height={350}
                style={{ objectFit: "cover" }}
                priority={true}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">О компании</h2>
            <p className="about-text">
              TOTU — это маркетплейс стильных и надежных аксессуаров для мобильных устройств. Мы являемся официальным дистрибьютором бренда TOTU в Казахстане, предлагая широкий выбор товаров для смартфонов, планшетов и других устройств.
            </p>
            <p className="about-text">
              Мы следим за новыми технологиями и трендами, чтобы наши клиенты получали только актуальные и качественные продукты. TOTU — это идеальное сочетание дизайна, функциональности и доступной цены.
            </p>
            <div className="mission">
              <h3 className="mission-title">Наша миссия</h3>
              <p className="mission-text">
                Делать технологии стильными и доступными для каждого.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Наш ассортимент</h2>
          <div className="products-grid">
            {products.map((product, index) => (
              <div className="product-card" key={index}>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Screen Image Modal */}
      {isModalOpen && (
        <div className="image-modal">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Full-screen preview"
                fill
                style={{ objectFit: "contain" }}
                quality={90}
              />
            )}
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Почему выбирают TOTU</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-title">Официальный дистрибьютор</h3>
              <p className="feature-description">Прямые поставки от бренда TOTU</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3 className="feature-title">Широкий выбор</h3>
              <p className="feature-description">Аксессуары для всех популярных устройств</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Доступные цены</h3>
              <p className="feature-description">Конкурентные цены на весь ассортимент</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3 className="feature-title">Быстрая доставка</h3>
              <p className="feature-description">Доставка по всему Казахстану</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Готовы выбрать аксессуары?</h2>
            <p className="cta-description">Свяжитесь с нами или посетите каталог для заказа</p>
            <div className="cta-buttons">
              <Link href="/contactpage">
                <button className="cta-button primary">Связаться с нами</button>
              </Link>
              <Link href="/katalog-tovarov">
                <button className="cta-button secondary">Посмотреть каталог</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

        * {
          font-family: 'Roboto', sans-serif;
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
        }

        .carousel-container {
          width: 100%;
          height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .carousel-inner {
          display: flex;
          width: ${banners.length * 100}%;
          height: 100%;
          transition: transform 0.5s ease-in-out;
        }

        .banner {
          width: 100%;
          height: 100vh;
          position: relative;
          flex: 0 0 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .banner-content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }

        .carousel-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 2;
        }

        .dot {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .dot.active {
          background: #00C4B4;
        }

        .dot:hover {
          background: #00A69A;
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1e1e1e 100%);
          color: white;
          padding: 100px 20px;
          min-height: 500px;
          display: flex;
          align-items: center;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .hero-content {
          animation: fadeInUp 1s ease-out;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 20px;
        }

        .accent-text {
          color: #00C4B4;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.7;
          margin-bottom: 30px;
          color: #d0d0d0;
        }

        .cta-button {
          background: #00C4B4;
          color: white;
          border: none;
          padding: 14px 28px;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 196, 180, 0.3);
        }

        .cta-button:hover {
          background: #00A69A;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 196, 180, 0.4);
        }

        .hero-image {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-placeholder {
          position: relative;
          width: 500px;
          height: 350px;
          border-radius: 10px;
          overflow: hidden;
        }

        /* Modal Styles */
        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          position: relative;
          width: 90%;
          max-width: 1200px;
          height: 90vh;
          max-height: 800px;
          border-radius: 10px;
          overflow: hidden;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #00C4B4;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 1001;
        }

        .modal-close:hover {
          background: #00A69A;
          transform: scale(1.1);
        }

        /* About Section */
        .about-section {
          background: #f9f9f9;
          padding: 60px 20px;
        }

        .about-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .about-text {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 20px;
          color: #4a4a4a;
        }

        .mission {
          background: white;
          padding: 28px;
          border-radius: 12px;
          margin-top: 32px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
        }

        .mission-title {
          font-size: 1.4rem;
          font-weight: 500;
          margin-bottom: 12px;
          color: #00C4B4;
        }

        .mission-text {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #4a4a4a;
        }

        /* Products Section */
        .products-section {
          padding: 60px 20px;
          background: #f9f9f9;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 2.2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 40px;
          color: #1a1a1a;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .product-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          text-align: center;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .product-title {
          font-size: 1.4rem;
          font-weight: 500;
          margin-bottom: 10px;
          color: #1a1a1a;
        }

        .product-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #6c757d;
          margin-bottom: 12px;
        }

        .product-placeholder {
          position: relative;
          width: 100%;
          height: 200px;
          border-radius: 10px;
          overflow: hidden;
        }

        /* Features Section */
        .features-section {
          background: #f9f9f9;
          padding: 60px 20px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .feature-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          text-align: center;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 12px;
        }

        .feature-title {
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 10px;
          color: #1a1a1a;
        }

        .feature-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #6c757d;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1e1e1e 100%);
          color: white;
          padding: 60px 20px;
        }

        .cta-content {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 14px;
          color: white;
        }

        .cta-description {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 28px;
          color: #d0d0d0;
        }

        .cta-buttons {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button.primary {
          background: #00C4B4;
          box-shadow: 0 2px 10px rgba(0, 196, 180, 0.3);
        }

        .cta-button.secondary {
          background: transparent;
          border: 2px solid #00C4B4;
          color: #00C4B4;
        }

        .cta-button.secondary:hover {
          background: #00C4B4;
          color: white;
          box-shadow: 0 2px 10px rgba(0, 196, 180, 0.3);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .banner-section,
          .carousel-container,
          .banner {
            height: 70vh;
          }

          .hero-container {
            grid-template-columns: 1fr;
            gap: 30px;
            text-align: center;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .hero-placeholder {
            width: 300px;
            height: 200px;
          }

          .section-title {
            font-size: 1.8rem;
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
            max-width: 280px;
          }

          .banner-content {
            padding: 15px;
          }

          .modal-content {
            width: 95%;
            height: 80vh;
          }
        }

        @media (max-width: 480px) {
          .banner-section,
          .carousel-container,
          .banner {
            height: 60vh;
          }

          .hero-section,
          .about-section,
          .products-section,
          .features-section,
          .cta-section {
            padding: 50px 16px;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .hero-placeholder {
            width: 250px;
            height: 160px;
          }

          .section-title {
            font-size: 1.6rem;
          }

          .product-placeholder {
            height: 160px;
          }

          .modal-content {
            width: 100%;
            height: 70vh;
          }

          .modal-close {
            width: 36px;
            height: 36px;
            font-size: 1.2rem;
          }

          .carousel-dots {
            bottom: 10px;
            gap: 8px;
          }

          .dot {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
    </>
  );
}