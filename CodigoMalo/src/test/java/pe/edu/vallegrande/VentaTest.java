package pe.edu.vallegrande;

import com.valery.testing.Venta;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class VentaTest {

    @Test
    void debeCalcularVentaVIP() {

        // Arrange: preparamos los datos
        Venta venta = new Venta();

        double precio = 100;
        int cantidad = 10;
        String tipoCliente = "VIP";

        // Act: ejecutamos todo el proceso de venta
        double resultado =
                venta.procesarVenta(
                        precio,
                        cantidad,
                        tipoCliente
                );

        // Assert: verificamos el total esperado
        assertEquals(800, resultado);
    }
}