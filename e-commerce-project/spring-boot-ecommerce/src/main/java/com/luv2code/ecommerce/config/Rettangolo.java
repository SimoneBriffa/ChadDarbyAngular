package com.luv2code.ecommerce.config;

import java.util.Scanner;

public class Rettangolo {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Inserisci lunghezza: ");
        int lunghezza = scanner.nextInt();
        System.out.print("Inserisci altezza: ");
        int altezza = scanner.nextInt();

        for(int i = 0; i < altezza; i++) {
            //--------------------
            if (i == 0 || i == altezza - 1) {
                for (int j = 0; j < lunghezza; j++) {
                    System.out.print("=");
                    if (j == lunghezza - 1)
                        System.out.print("\n");
                }
            }
            //--------------------
            else {
                //---------------
                for (int j = 0; j < lunghezza; j++)
                    if (j == 0)
                        System.out.print("=");
                        else if (j == lunghezza - 1)
                            System.out.println("=");
                    else
                        System.out.print(" ");
            }


        }
    }
}
