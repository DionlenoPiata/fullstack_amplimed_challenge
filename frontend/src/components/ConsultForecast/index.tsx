import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { useFormik } from "formik";
import * as yup from "yup";
import InputMask from "react-input-mask";
import { WeatherData } from "../../types";
// retirar
import { responsePiata } from "./constants";

interface Props {
  onDataReceived: (data: WeatherData) => void;
}

const validationSchema = yup.object({
  cep: yup
    .string()
    .required("CEP é obrigatório")
    .matches(/^\d{5}-\d{3}$/, "CEP inválido. Formato esperado: 12345-678"),
  cidade: yup.string().required("Cidade é obrigatória"),
});

function ConsultForecast({ onDataReceived }: Props) {
  const [cep, setCep] = useState("");
  const [loadingSearchCity, setLoadingSearchCity] = useState(false);

  const formik = useFormik({
    initialValues: {
      cep: "",
      cidade: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onDataReceived(responsePiata);
    },
  });

  useEffect(() => {
    async function fetchData() {
      setLoadingSearchCity(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        console.log("response:", response);
        if (!response.ok) {
          throw new Error("Erro ao obter os dados");
        }
        const data = await response.json();

        setTimeout(() => {
          setLoadingSearchCity(false);
        }, 500);

        if (data.localidade) {
          formik.setFieldValue("cidade", data.localidade);
        } else {
          formik.setFieldValue("cidade", "");
          alert("Cidade não encontrada, verifique o CEP!");
        }

        return data;
      } catch (error) {
        console.error("Erro:", error);
        setLoadingSearchCity(false);
      }
    }

    if (!cep.includes("_") && cep.length > 0) {
      console.log("Busca cidade pelo cep:", cep);
      fetchData();
    }
  }, [cep]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid xs={12}>
          <Paper sx={{ padding: 2 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={4}>
                  <InputMask
                    mask="99999-999"
                    value={formik.values.cep}
                    onBlur={formik.handleBlur}
                    onChange={(event) => {
                      formik.setFieldValue("cep", event.target.value);
                      setCep(event.target.value);
                    }}
                  >
                    {
                      ((inputProps: any) => {
                        return (
                          <TextField
                            {...inputProps}
                            fullWidth
                            id="cep"
                            name="cep"
                            label="CEP"
                            value={inputProps.value}
                            error={
                              formik.touched.cep && Boolean(formik.errors.cep)
                            }
                            helperText={formik.touched.cep && formik.errors.cep}
                            onBlur={inputProps.onBlur}
                            onChange={inputProps.onChange}
                          />
                        );
                      }) as any
                    }
                  </InputMask>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    id="cidade"
                    name="cidade"
                    label="Cidade"
                    value={formik.values.cidade}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.cidade && Boolean(formik.errors.cidade)
                    }
                    helperText={formik.touched.cidade && formik.errors.cidade}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                  <Button variant="outlined" type="submit">
                    CONSULTAR
                  </Button>
                </Grid>
                {loadingSearchCity && (
                  <Grid xs={12}>
                    <LinearProgress />
                  </Grid>
                )}
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ConsultForecast;
