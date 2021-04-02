package com.luv2code.ecommerce.config;

import java.util.Scanner;

public class Random {

    public static void main(String[] args) {

        int numero = (int) (Math.random() * 100 + 1);
        Scanner scanner = new Scanner(System.in);
        int conta = 0;

        int x = 0;

        do {
            System.out.print("Inserisci un numero: ");
            x = scanner.nextInt();
            if (x == numero) {
                System.out.println("Numero corretto! Tentativi effettuati -> " + conta);
            } else if (x < numero) {
                System.out.println("Il numero è superiore: ritenta");
                conta++;
            } else if (x > numero) {
                System.out.println("Il numero è inferiore: ritenta");
                conta++;
            }
        } while (x != numero);


    }


}
