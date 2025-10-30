import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextField, Stack, Alert, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import END_POINT from "@/components/config";
// Стилизованные компоненты
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#fff",
    fontFamily: "'Mulish', sans-serif",
    "& fieldset": {
      borderColor: "#D1D5DB",
    },
    "&:hover fieldset": {
      borderColor: "#A7F3D0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FECDD3",
    },
    "&.Mui-error fieldset": {
      borderColor: "#EF4444",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Mulish', sans-serif",
    color: "#6B7280",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "'Mulish', sans-serif",
    color: "#EF4444",
  },
}));

const PayButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "12px 32px",
  background: "linear-gradient(90deg, #FF8C00 0%, #FFA500 100%)",
  color: "#FFFFFF",
  textTransform: "none",
  fontWeight: 600,
  fontFamily: "'Mulish', sans-serif",
  fontSize: "1.1rem",
  width: "100%",
  "&:hover": {
    background: "linear-gradient(90deg, #FF7B00 0%, #FF9500 100%)",
    transform: "scale(1.02)",
  },
  "&:disabled": {
    background: "#E5E7EB",
    color: "#9CA3AF",
  },
  transition: "all 0.3s ease",
}));

const SuccessMessage = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: "linear-gradient(90deg, #A7F3D0 0%, #FECDD3 100%)",
  borderRadius: "12px",
  textAlign: "center",
  fontFamily: "'Mulish', sans-serif",
  color: "#1F2937",
  fontWeight: 600,
}));

export default function ContactForm({ total, onPay, sdkLoaded }) {
  const [isDataSent, setIsDataSent] = useState(false);
  const [error, setError] = useState("");
  const userCart = useSelector((state) => state.usercart.userCart);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    phone: "",
    address: "",
  });

  const products = userCart.map((item) => ({ id: item.id, count: item.count }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };

  // Валидация формы
  const validateForm = () => {
    const newErrors = { username: "", phone: "", address: "" };
    let isValid = true;

    // Имя
    if (!username.trim()) {
      newErrors.username = "Имя обязательно";
      isValid = false;
    } else if (username.trim().length < 2) {
      newErrors.username = "Имя должно содержать минимум 2 символа";
      isValid = false;
    }

    // Телефон
    const phoneRegex = /^(?:\+7|8)\d{10}$/;
    if (!phone.trim()) {
      newErrors.phone = "Телефон обязателен";
      isValid = false;
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = "Введите корректный номер (например, +77001234567)";
      isValid = false;
    }

    // Адрес
    if (!address.trim()) {
      newErrors.address = "Адрес обязателен";
      isValid = false;
    } else if (address.trim().length < 5) {
      newErrors.address = "Адрес должен содержать минимум 5 символов";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const Submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const orderData = {
        username,
        phone,
        address,
        status: "создан",
        totalPrice: total,
        products,
      };

      const response = await fetch(`${END_POINT}/api/store/createorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при создании заказа");
      }

      setIsDataSent(true);
      setError("");

      // После успешной отправки вызываем оплату
      // if (onPay) {
      //   onPay();
      // }
    } catch (err) {
      setError(err.message);
      setIsDataSent(false);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      {isDataSent ? (
        <SuccessMessage
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ваш заказ оформлен.В ближайшее время с вами свяжется менеджер.
        </SuccessMessage>
      ) : (
        <>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="#1F2937"
            mb={2}
            fontFamily="'Mulish', sans-serif"
          >
            Оставьте свои контактные данные
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={Submit}>
            <Stack spacing={2} sx={{ mb: 3 }}>
              <StyledTextField
                label="Имя"
                name="username"
                value={username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                fullWidth
                variant="outlined"
                component={motion.div}
                whileFocus={{ scale: 1.02 }}
                aria-label="Введите ваше имя"
              />
              <StyledTextField
                label="Телефон"
                name="phone"
                value={phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                fullWidth
                variant="outlined"
                component={motion.div}
                whileFocus={{ scale: 1.02 }}
                aria-label="Введите ваш номер телефона"
              />
              <StyledTextField
                label="Адрес"
                name="address"
                value={address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                fullWidth
                variant="outlined"
                component={motion.div}
                whileFocus={{ scale: 1.02 }}
                aria-label="Введите ваш адрес доставки"
              />
            </Stack>
            <PayButton
              type="submit"
              // disabled={!sdkLoaded}
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Оплатить заказ"
            >
              Заказать
            </PayButton>
          </form>
        </>
      )}
    </Box>
  );
}