package pe.edu.vallegrande;

import com.valery.testing.CalculadoraDescuento;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculadoraDescuentoTest {

    @Test
    void debeCalcularDescuentoVIP() {

        // Arrange: preparamos lo necesario
        CalculadoraDescuento calculadora =
                new CalculadoraDescuento();

        double subtotal = 1000;

        // Act: ejecutamos el método
        double resultado =
                calculadora.calcularDescuento(
                        subtotal,
                        "VIP"
                );

        // Assert: verificamos el resultado
        assertEquals(200, resultado);
    }

    @Test
    void debeCalcularDescuentoRegular() {

        // Arrange: preparamos lo necesario
        CalculadoraDescuento calculadora =
                new CalculadoraDescuento();

        double subtotal = 1000;

        // Act: ejecutamos el método
        double resultado =
                calculadora.calcularDescuento(
                        subtotal,
                        "REGULAR"
                );

        // Assert: verificamos el resultado
        assertEquals(100, resultado);
    }

    @Test
    void clienteSinDescuento() {

        // Arrange: preparamos lo necesario
        CalculadoraDescuento calculadora =
                new CalculadoraDescuento();

        double subtotal = 1000;

        // Act: ejecutamos el método
        double resultado =
                calculadora.calcularDescuento(
                        subtotal,
                        "NINGUNO"
                );

        // Assert: verificamos el resultado
        assertEquals(0, resultado);
    }
}

