package pe.edu.vallegrande;
public class DescuentoService {

    public double calcularPrecio(double precio, boolean tieneDescuento) {

        if (tieneDescuento) {
            return precio * 0.90;
        }

        return precio;
    }
}