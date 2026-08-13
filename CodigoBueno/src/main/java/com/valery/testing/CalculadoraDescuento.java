package com.valery.testing;

public class CalculadoraDescuento {

    // Calcula el descuento según el tipo de cliente
    public double calcularDescuento(double subtotal, String tipoCliente) {

        // Si es VIP, tiene 20% de descuento
        if (tipoCliente.equals("VIP")) {
            return subtotal * 0.20;
        }

        // Si es REGULAR, tiene 10% de descuento
        if (tipoCliente.equals("REGULAR")) {
            return subtotal * 0.10;
        }

        // Si no tiene un tipo válido, no hay descuento
        return 0;
    }
}