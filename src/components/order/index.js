"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import ContactForm from "@/components/contacts";
import {
  Box,
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
}));

const StyledTable = styled(Table)(({ theme }) => ({
  borderRadius: "15px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  backgroundColor: "#FFFFFF",
  "& .MuiTableCell-head": {
    backgroundColor: "#ADD8E6",
    color: "#333333",
    fontWeight: "700",
  },
}));

const MobileOrderCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: "15px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
}));

export default function Order() {
  const data = useSelector((state) => state.usercart.userCart);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  let total = 0;
  data.forEach((item) => {
    total += item.count * item.price;
  });

  useEffect(() => {
    if (searchParams.get("status") === "success") {
      alert("Всё готово! Ваш заказ успешно оплачен.");
      router.push("/confirmation");
    } else if (searchParams.get("status") === "fail") {
      alert("Оплата не удалась. Пожалуйста, попробуйте снова.");
    }
  }, [searchParams, router]);

  return (
    <StyledContainer>
      <Typography
        variant="h4"
        fontWeight="700"
        color="#333333"
        sx={{ textTransform: "uppercase", mb: 4, fontSize: { xs: "1.8rem", sm: "2.5rem" } }}
      >
        Оформление заказа
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell align="center">Количество</TableCell>
                  <TableCell>Сумма</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type || "Не указан"}</TableCell>
                    <TableCell>
                      {parseFloat(item.price).toLocaleString()} ₸
                    </TableCell>
                    <TableCell align="center">{item.count}</TableCell>
                    <TableCell>
                      {(item.price * item.count).toLocaleString()} ₸
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          </Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            {data.map((item) => (
              <MobileOrderCard key={item.id}>
                <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ my: 1 }}>
                  Тип: {item.type || "Не указан"}
                </Typography>
                <Typography variant="body2" sx={{ my: 1 }}>
                  Цена: {parseFloat(item.price).toLocaleString()} ₸
                </Typography>
                <Typography variant="body2" sx={{ my: 1 }}>
                  Количество: {item.count}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Сумма: {(item.price * item.count).toLocaleString()} ₸
                </Typography>
              </MobileOrderCard>
            ))}
          </Box>
          <Box sx={{ mt: 3, fontWeight: "bold", textAlign: "right" }}>
            Итог: {total.toLocaleString()} ₸
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <ContactForm total={total} />
        </Grid>
      </Grid>
    </StyledContainer>
  );
}