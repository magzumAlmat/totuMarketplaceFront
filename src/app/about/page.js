"use client";

import "/src/app/globals.css";
import Header from "@/components/header";
import Link from "next/link";

export default function aboutPage() {
  return (
    <>


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
              <span>Изображение аксессуаров</span>
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
            <div className="product-card">
              <div className="product-icon">📱</div>
              <h3 className="product-title">Чехлы и защита</h3>
              <p className="product-description">
                Прочные чехлы и защитные стекла для любых моделей смартфонов
              </p>
              <div className="image-placeholder product-placeholder">
                <span>Фото чехлов</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-icon">🚗</div>
              <h3 className="product-title">Автоаксессуары</h3>
              <p className="product-description">
                Удобные держатели и зарядные устройства для авто
              </p>
              <div className="image-placeholder product-placeholder">
                <span>Фото автоаксессуаров</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-icon">🎧</div>
              <h3 className="product-title">Аудио</h3>
              <p className="product-description">
                Беспроводные наушники и аудиоаксессуары
              </p>
              <div className="image-placeholder product-placeholder">
                <span>Фото наушников</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-icon">💨</div>
              <h3 className="product-title">Охлаждение</h3>
              <p className="product-description">
                Вентиляторы для охлаждения смартфонов и планшетов
              </p>
              <div className="image-placeholder product-placeholder">
                <span>Фото вентиляторов</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-icon">💡</div>
              <h3 className="product-title">Освещение</h3>
              <p className="product-description">
                Портативные лампы для фото и видео
              </p>
              <div className="image-placeholder product-placeholder">
                <span>Фото освещения</span>
              </div>
            </div>
            <div className="product-card">
              <div className="product-icon">🎤</div>
              <h3 className="product-title">Микрофоны</h3>
              <p className="product-description">
                Петличные и студийные микрофоны для контента
              </p>
              <div className="image-placeholder product-placeholder">
                <span>Фото микрофонов</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Почему выбирают TOTU</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-title">Официальный дистрибьютор</h3>
              <p className="feature-description">
                Прямые поставки от бренда TOTU
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3 className="feature-title">Широкий выбор</h3>
              <p className="feature-description">
                Аксессуары для всех популярных устройств
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Доступные цены</h3>
              <p className="feature-description">
                Конкурентные цены на весь ассортимент
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3 className="feature-title">Быстрая доставка</h3>
              <p className="feature-description">
                Доставка по всему Казахстану
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Готовы выбрать аксессуары?</h2>
            <p className="cta-description">
              Свяжитесь с нами или посетите каталог для заказа
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

        .product-placeholder {
          width: 100%;
          height: 180px;
          margin-top: 12px;
        }

        /* Sections */
        .about-section, .products-section, .features-section, .cta-section {
          padding: 60px 20px;
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

        /* About Section */
        .about-section {
          background: #f9f9f9;
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

        .product-icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
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

        /* Features Section */
        .features-section {
          background: #f9f9f9;
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

          .products-grid, .features-grid {
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
          .hero-section, .about-section, .products-section, .features-section, .cta-section {
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