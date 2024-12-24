import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductoGrid from "../components/ProductoGrid";
import { getFavoritos } from "../redux/slices/favoritoSlice";
import Layout from '../components/layout';

const MisFavoritos = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { favoritos, error } = useSelector((state) => state.favoritos);

  const cargarFavoritos = async () => {
    try {
      setIsLoading(true);
      await dispatch(getFavoritos()).unwrap();
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarFavoritos();
  }, [dispatch]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <p>Cargando productos...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Mis Favoritos</h1>
        {favoritos?.length > 0 ? (
          <ProductoGrid productos={favoritos} />
        ) : (
          <p>No tienes productos favoritos</p>
        )}
      </div>
    </Layout>
  );
};

export default MisFavoritos;