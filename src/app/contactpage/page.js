
"use client";

import "/src/app/globals.css";
import Header from "@/components/header";
import Link from "next/link";
import { Phone, WhatsApp, Instagram } from "@mui/icons-material";

export default function ContactPage() {
  return (
    <>


      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Свяжитесь с <span className="accent-text">TOTU</span>
            </h1>
            <p className="hero-description">
              Мы всегда на связи! Напишите или позвоните нам, чтобы узнать больше о наших товарах или оформить заказ.
            </p>
            <Link href="https://wa.me/77080880188">
              <button className="cta-button">Написать в WhatsApp</button>
            </Link>
          </div>
          <div className="hero-image">
            <div className="image-placeholder hero-placeholder">
              <span>Изображение службы поддержки</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Наши контакты</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <Phone sx={{ fontSize: 40, color: "#00C4B4" }} />
              </div>
              <h3 className="contact-title">Мобильный телефон</h3>
              <p className="contact-description">
                Звоните нам для консультации или заказа.
              </p>
              <Link href="tel:+77080880188">
                <span className="contact-link">+7 (708) 088-01-88</span>
              </Link>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <WhatsApp sx={{ fontSize: 40, color: "#00C4B4" }} />
              </div>
              <h3 className="contact-title">WhatsApp</h3>
              <p className="contact-description">
                Напишите нам в WhatsApp для быстрого ответа.
              </p>
              <Link href="https://wa.me/77080880188">
                <span className="contact-link">Написать в WhatsApp</span>
              </Link>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <Instagram sx={{ fontSize: 40, color: "#00C4B4" }} />
              </div>
              <h3 className="contact-title">Instagram</h3>
              <p className="contact-description">
                Следите за новинками и акциями в нашем Instagram.
              </p>
              <Link href="https://www.instagram.com/totu_shop?igsh=M25iODNiN3g3cHlr">
                <span className="contact-link">@totu_shop</span>
              </Link>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <span style={{ fontSize: 40, color: "#00C4B4" }}>🎵</span>
              </div>
              <h3 className="contact-title">TikTok</h3>
              <p className="contact-description">
                Смотрите наши видео и обзоры в TikTok.
              </p>
              <Link href="https://www.tiktok.com/@totu_shop?_t=ZM-8yRFaNSVxyf&_r=1">
                <span className="contact-link">@totu_shop</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Готовы сделать заказ?</h2>
            <p className="cta-description">
              Свяжитесь с нами через любой удобный канал или посетите наш каталог!
            </p>
            <div className="cta-buttons">
              <Link href="https://wa.me/77080880188">
                <button className="cta-button primary">Написать в WhatsApp</button>
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
          width: 350px;
          height: 250px;
          font-size: 1rem;
        }

        /* Contact Section */
        .contact-section {
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

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .contact-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          text-align: center;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out;
        }

        .contact-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .contact-icon {
          margin-bottom: 12px;
        }

        .contact-title {
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 10px;
          color: #1a1a1a;
        }

        .contact-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #6c757d;
          margin-bottom: 12px;
        }

        .contact-link {
          font-size: 1rem;
          font-weight: 500;
          color: #00C4B4;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-link:hover {
          color: #00A69A;
          text-decoration: underline;
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

          .contact-grid {
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
        }

        @media (max-width: 480px) {
          .hero-section, .contact-section, .cta-section {
            padding: 50px 16px;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .hero-placeholder {
            width: 250px;
            height: 160px;
          }
        }
      `}</style>
    </>
  );
}
