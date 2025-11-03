"use client";

import { useState } from "react";
import "/src/app/globals.css";
import Header from "@/components/header";
import Link from "next/link";
import Image from "next/image";

export default function TipsPage() {
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
              Поймал — <span className="accent-text">твой!</span>
            </h1>
            <p className="hero-description">
              Это не просто распродажа — это охота за аксессуарами по ценам ниже себестоимости. Успей, пока товар в наличии!
            </p>
            <Link href="/katalog-tovarov">
              <button className="cta-button">Лови свои скидки</button>
            </Link>
          </div>
          <div className="hero-image">
            <div className="image-placeholder hero-placeholder">
              <Image
                src="/image/sale.jpg"
                alt="Товары на распродаже"
                width={580}
                height={300}
                style={{ objectFit: "cover", cursor: "pointer" }}
                priority={true}
                quality={85}
                onClick={() => openModal("/image/sale.jpg")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sale Section */}
      <section className="sale-section">
        <div className="container">
          <h2 className="section-title">Охота за скидками</h2>
          <div className="sale-grid">
            <div className="sale-card">
              {/* <div className="sale-icon">🔹</div> */}
              <h3 className="sale-title">Оригинальные товары</h3>
              <p className="sale-description">
                Только подлинные аксессуары от проверенных брендов.
              </p>
            </div>
            <div className="sale-card">
              {/* <div className="sale-icon">🔹</div> */}
              <h3 className="sale-title">Новые, в упаковке</h3>
              <p className="sale-description">
                Товары в заводской упаковке, готовые к использованию.
              </p>
            </div>
            <div className="sale-card">
              {/* <div className="sale-icon">🔹</div> */}
              <h3 className="sale-title">Цены ниже оптовых</h3>
              <p className="sale-description">
                Скидки, которых нет даже у оптовиков — лови момент!
              </p>
            </div>
          </div>
          <div className="how-it-works">
            <h3 className="how-it-works-title">Как работает</h3>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <p className="step-description">Увидел? Бери.</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <p className="step-description">Не думаешь — покупаешь.</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <p className="step-description">Потом благодаришь.</p>
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
            <h2 className="cta-title">Не упусти свой шанс!</h2>
            <p className="cta-description">
              Каждый товар — это 🔥. Успей забрать свой по невероятной цене!
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
        
          overflow: hidden;
        }

        /* Sale Section */
        .sale-section {
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

        .sale-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .sale-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          text-align: center;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out;
        }

        .sale-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .sale-icon {
          font-size: 2rem;
          margin-bottom: 12px;
        }

        .sale-title {
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 10px;
          color: #1a1a1a;
        }

        .sale-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #6c757d;
        }

        .how-it-works {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .how-it-works-title {
          font-size: 1.4rem;
          font-weight: 500;
          margin-bottom: 20px;
          color: #00C4B4;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
        }

        .step-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          text-align: center;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out;
        }

        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .step-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #00C4B4;
          margin-bottom: 10px;
        }

        .step-description {
          font-size: 1rem;
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
            // gap: 30px;
            text-align: center;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .hero-placeholder {
            width: auto;
            // height: 200px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .sale-grid,
          .steps-grid {
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
          .sale-section,
          .cta-section {
            padding: 50px 16px;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .hero-placeholder {
            width: auto;
            // height: 160px;
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