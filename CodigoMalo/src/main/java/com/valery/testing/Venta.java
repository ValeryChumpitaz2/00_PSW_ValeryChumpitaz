package com.valery.testing;

public class Venta {

    // Este método hace TODO el proceso de la venta
    public double procesarVenta(
            double precio,
            int cantidad,
            String tipoCliente) {

        // 1. Calculamos el subtotal
        double subtotal = precio * cantidad;

        // 2. Inicialmente no hay descuento
        double descuento = 0;

        // 3. Revisamos qué tipo de cliente es
        if (tipoCliente.equals("VIP")) {

            // Cliente VIP: 20% de descuento
            descuento = subtotal * 0.20;

        } else if (tipoCliente.equals("REGULAR")) {

            // Cliente regular: 10% de descuento
            descuento = subtotal * 0.10;
        }

        // 4. Restamos el descuento al subtotal
        double total = subtotal - descuento;

        // 5. Mostramos los datos de la venta
        System.out.println("Precio: " + precio);
        System.out.println("Cantidad: " + cantidad);
        System.out.println("Subtotal: " + subtotal);
        System.out.println("Descuento: " + descuento);
        System.out.println("Total: " + total);

        // 6. Devolvemos el total
        return total;
    }
}

