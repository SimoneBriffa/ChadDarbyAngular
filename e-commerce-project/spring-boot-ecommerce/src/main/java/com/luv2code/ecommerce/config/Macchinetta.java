package com.luv2code.ecommerce.config;

import java.util.Scanner;

public class Macchinetta {

    public static final int DUE_EURO = 2;
    public static final int UN_EURO = 1;
    public static final double CINQUANTA_CENT = 0.50;
    public static final double VENTI_CENT = 0.20;
    public static final double DIECI_CENT = 0.10;
    public static final double CINQUE_CENT = 0.05;
    public static final double DUE_CENT = 0.02;
    public static final double UN_CENT = 0.01;

    public static int disp_2euro = 10;
    public static int disp_1euro = 0;
    public static int disp_50cent = 0;
    public static int disp_20cent = 0;
    public static int disp_10cent = 10;
    public static int disp_5cent = 10;
    public static int disp_2cent = 10;
    public static int disp_1cent = 10;



    public static double decimale(double x){
        return x - (int) x;
    }

    public static void resto(double myResto){

        int due_euro_usati = 0;
        int un_euro_usati = 0;
        int cin_cent_euro_usati = 0;
        int venti_cent_euro_usati = 0;
        int dieci_cent_euro_usati = 0;
        int cinque_cent_euro_usati = 0;
        int due_cent_euro_usati = 0;
        int un_cent_euro_usati = 0;

        int parte_intera = (int) myResto;
        String composizioneDelResto = "Resto: ";

        if(parte_intera / DUE_EURO <= disp_2euro){
            due_euro_usati = parte_intera / DUE_EURO;
            composizioneDelResto += due_euro_usati + " monete da 2€";
            disp_2euro -= parte_intera / DUE_EURO;
            if(disp_1euro > 0){
                un_euro_usati++;
                composizioneDelResto += ", " + un_euro_usati + " monete da 1€";
                disp_1euro--;
            } else if(disp_50cent >= 2){
                cin_cent_euro_usati += 2;
                composizioneDelResto += ", " + cin_cent_euro_usati + " monete da 0,50€";
                disp_50cent -= 2;
            } else if(disp_20cent >= 5){
                venti_cent_euro_usati += 5;
                composizioneDelResto += ", " + venti_cent_euro_usati + " monete da 0,20€";
                disp_50cent -= 5;
            } else if(disp_10cent >= 10){
               dieci_cent_euro_usati += 10;
               composizioneDelResto += ", " + dieci_cent_euro_usati + " monete da 0,10€";
               disp_10cent -= 10;
            } else
                System.out.println("Resto non erogabile");

        }

        System.out.println(composizioneDelResto + "\nRimangono "
                + "\n" + disp_2euro + " monete da 2€"
                + "\n" + disp_1euro + " monete da 1€"
                + "\n" + disp_50cent + " monete da 0,50€");
    }
    
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("Inserisci resto: ");
        double x = scanner.nextDouble();

        resto(x);

        
    }

    
    


}
