import { Coach } from './coach';

export class GolfCoach implements Coach{

    getDailyWorkout(): string {
        return "Allenati";
    }



}