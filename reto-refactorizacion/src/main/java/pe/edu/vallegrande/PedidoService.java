package pe.edu.vallegrande;

public class PedidoService {

    public double calcularTotal(double precio, int cantidad, boolean clienteFrecuente) {

        double x = 0;

        if (cantidad > 0) {
            x = precio * cantidad;
        }

        if (clienteFrecuente) {
            x = x * 0.90;
        }

        if (cantidad >= 10) {
            x = x * 0.95;
        }

        return x;
    }

    public String obtenerEstado(double total) {

        if (total <= 0) {
            return "ERROR";
        } else if (total < 100) {
            return "PEQUEÑO";
        } else if (total < 500) {
            return "MEDIANO";
        } else {
            return "GRANDE";
        }
    }

    public boolean validarPedido(String producto, int cantidad) {

        if (producto == null) {
            return false;
        }

        if (producto.equals("")) {
            return false;
        }

        if (cantidad <= 0) {
            return false;
        }

        return true;
    }
}