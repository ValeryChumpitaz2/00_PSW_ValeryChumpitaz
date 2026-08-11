import com.valery.testing.Producto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ProductoTest {

    @Test
    void debeCalcularTotalCorrectamente() {

        // Arrange - Preparamos el producto
        Producto producto = new Producto("Laptop", 50);

        // Act - Ejecutamos calcularTotal(3)
        double resultado = producto.calcularTotal(3);

        // Assert - Ejecutamos calcularTotal(3)
        assertEquals(150, resultado);
    }
}