import { useReducer } from "react";
import { CarritoContext } from "./CarritoContext";

const initialState = [];

const comprasReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "[CARRITO] Agregar Compra":
      return [...state, action.payload];

    case "[CARRITO] Aumentar Compra":
      return state.map((item) => {
        const cant = item.cantidad + 1;
        if (item.id === action.payload) return { ...item, cantidad: cant };
        return item;
      });

    case "[CARRITO] Disminur Compra":
      return state.map((item) => {
        const cant = item.cantidad - 1;
        if (item.id === action.payload && item.cantidad > 1)
          return { ...item, cantidad: cant };
        return item;
      });

    case "[CARRITO] Eliminar Compra":
      return state.filter((compra) => compra.id !== action.payload);

    default:
      return state;
  }
};

export const CarritoProvider = ({ children }) => {
  const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);

  const agregarCompra = (compra) => {
    compra.cantidad = 1;
    const action = {
      type: "[CARRITO] Agregar Compra",
      payload: compra,
    };
    dispatch(action);
  };

  const aumentarCompra = (id) => {
    const action = {
      type: "[CARRITO] Aumentar Compra",
      payload: id,
    };
    dispatch(action);
  };
  const disminuirCompra = (id) => {
    const action = {
      type: "[CARRITO] Disminur Compra",
      payload: id,
    };
    dispatch(action);
  };

  const eliminarCompra = (id) => {
    const action = {
      type: "[CARRITO] Eliminar Compra",
      payload: id,
    };
    dispatch(action);
  };

  return (
    <CarritoContext.Provider
      value={{
        listaCompras,
        agregarCompra,
        aumentarCompra,
        disminuirCompra,
        eliminarCompra,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
