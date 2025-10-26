"use client";

import { useState } from "react";
import "/src/app/globals.css";
import Header from "@/components/header";
import Link from "next/link";
import Image from "next/image";

export default function PromoPage() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Open modal with selected image
  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Хиты продаж <span className="accent-text">TOTU</span>
            </h1>
            <p className="hero-description">
              Самые востребованные аксессуары от Apple и Samsung — оригиналы, проверенные миллионами пользователей.
            </p>
            <Link href="/katalog-tovarov">
              <button className="cta-button">Перейти в каталог</button>
            </Link>
          </div>
          <div className="hero-image">
            <div className="image-placeholder hero-placeholder">
              <Image
                src="/image/saleshit.jpg"
                alt="Хиты продаж TOTU"
                width={550}
                height={300}
                style={{ objectFit: "cover", cursor: "pointer" }}
                priority={true}
                quality={85}
                onClick={() => openModal("/image/saleshit.jpg")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Наши хиты продаж</h2>
          <div className="products-grid">
            {/* Apple Products */}
            <div className="product-card">
              <h3 className="product-title">Apple AirPods Max</h3>
              <p className="product-description">
                Премиальные наушники с шумоподавлением и качеством звука от Apple.
              </p>
              <div className="image-placeholder product-placeholder">
                <Image
                  src="/image/airpodsmax.jpg"
                  alt="Apple AirPods Max"
                  width={300}
                  height={150}
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  priority={true}
                  loading="eager"
                  onClick={() => openModal("/image/airpodsmax.jpg")}
                />
              </div>
            </div>
            <div className="product-card">
              <h3 className="product-title">Наушники Apple</h3>
              <p className="product-description">
                Lightning или 3.5 мм — надежные и стильные наушники.
              </p>
              <div className="image-placeholder product-placeholder">
                <Image
                  src="/image/airpods.jpeg"
                  alt="Наушники Apple"
                  width={300}
                  height={150}
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  priority={true}
                  loading="eager"
                  onClick={() => openModal("/image/airpods.jpeg")}
                />
              </div>
            </div>
            <div className="product-card">
              <h3 className="product-title">Адаптеры Apple</h3>
              <p className="product-description">
                Зарядные адаптеры 5W, 20W, 30W для любых устройств Apple.
              </p>
              <div className="image-placeholder product-placeholder">
                <Image
                  src="/image/iphone-11-charger.jpg"
                  alt="Адаптеры Apple"
                  width={300}
                  height={150}
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  priority={true}
                  loading="eager"
                  onClick={() => openModal("/image/iphone-11-charger.jpg")}
                />
              </div>
            </div>
            <div className="product-card">
              <h3 className="product-title">Кабели Apple</h3>
              <p className="product-description">
                USB-C ↔ Lightning и USB-C ↔ USB-C для зарядки и передачи данных.
              </p>
              <div className="image-placeholder product-placeholder">
                <Image
                  src="/image/kabelapple.jpg"
                  alt="Кабели Apple"
                  width={200}
                  height={150}
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  priority={true}
                  loading="eager"
                  onClick={() => openModal("/image/kabelapple.jpg")}
                />
              </div>
            </div>
            {/* Samsung Products */}
            <div className="product-card">
              <h3 className="product-title">Зарядные устройства Samsung</h3>
              <p className="product-description">
                Оригинальные зарядки для всех моделей Samsung.
              </p>
              <div className="image-placeholder product-placeholder">
                <Image
                  src="/image/samsungadapter.jpg"
                  alt="Зарядные устройства Samsung"
                  width={300}
                  height={150}
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  priority={true}
                  loading="eager"
                  onClick={() => openModal("/image/samsungadapter.jpg")}
                />
              </div>
            </div>
            <div className="product-card">
              <h3 className="product-title">Быстрые адаптеры Samsung</h3>
              <p className="product-description">
                Адаптеры и кабели USB-C с поддержкой быстрой зарядки.
              </p>
              <div className="image-placeholder product-placeholder">
                <Image
                  src="/image/samsungfastcharger.jpg"
                  alt="Зарядные устройства Samsung"
                  width={300}
                  height={150}
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  priority={true}
                  loading="eager"
                  onClick={() => openModal("/image/samsungfastcharger.jpg")}
                />
              </div>
            </div>
            <div className="product-card">
              <h3 className="product-title">Аксессуары Samsung</h3>
              <p className="product-description">
                Поддержка быстрой зарядки и передачи данных для ваших устройств.
              </p>
              <div className="image-placeholder product-placeholder">
                <Image
                  src="/image/samsung.jpg"
                  alt="Зарядные устройства Samsung"
                  width={300}
                  height={100}

                  priority={true}
                  loading="eager"
                  onClick={() => openModal("/image/samsungadapter.jpg")}
                />
              </div>
            </div>
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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Оригинальные аксессуары ждут вас!</h2>
            <p className="cta-description">
              TOTU гарантирует подлинность товаров и лучшие цены. Сделайте заказ прямо сейчас!
            </p>
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

        /* Image Placeholders */
        .image-placeholder {
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
          border: 2px dashed #ccc;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .image-placeholder:hover {
          border-color: #00C4B4;
          color: #00C4B4;
        }

        .hero-placeholder {
          position: relative;
          width: 550px;
          height: 300px;
          border-radius: 10px;
          overflow: hidden;
        }

        .product-placeholder {
          position: relative;
          width: 100%;
          height: 150px;
          margin-top: 12px;
          border-radius: 10px;
          overflow: hidden;
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

          .products-grid {
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

          .modal-content {
            width: 95%;
            height: 80vh;
          }
        }

        @media (max-width: 480px) {
          .hero-section,
          .products-section,
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
            height: 120px;
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
        }
      `}</style>
    </>
  );
}