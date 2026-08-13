package com.valery.testing;

public class VentaService {

    // Creamos el objeto que calcula descuentos
    private CalculadoraDescuento calculadoraDescuento;

    // Constructor
    public VentaService() {
        calculadoraDescuento = new CalculadoraDescuento();
    }

    // Calcula el total de la venta
    public double calcularTotal(
            double precio,
            int cantidad,
            String tipoCliente) {

        // Calculamos el subtotal
        double subtotal = precio * cantidad;

        // Pedimos a otra clase que calcule el descuento
        double descuento =
                calculadoraDescuento.calcularDescuento(
                        subtotal,
                        tipoCliente
                );

        // Restamos el descuento al subtotal
        double total = subtotal - descuento;

        // Devolvemos el total
        return total;
    }
}

