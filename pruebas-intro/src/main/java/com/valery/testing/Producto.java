package com.valery.testing;

public class Producto {

    private String nombre;
    private double precio;

    public Producto(String nombre, double precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    public double calcularTotal(int cantidad) {
        return precio * cantidad;
    }
}