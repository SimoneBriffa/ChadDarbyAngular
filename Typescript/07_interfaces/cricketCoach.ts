import { Coach } from './coach';

export class CricketCoach implements Coach{


    getDailyWorkout(): string {
        return "Practice your spin bowling";
    }

}