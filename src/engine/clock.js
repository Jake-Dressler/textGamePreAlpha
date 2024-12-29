// src/Clock.js

export class Clock {
    constructor() {
        this.minutes = 0; // Current minute of the hour
        this.hours = 0; // Current hour of the day
        this.day = 1; // Current day in the season
        this.seasonIndex = 0; // Index of the current season
        this.seasons = ["Spring", "Summer", "Autumn", "Winter"]; // List of seasons
        this.daysPerSeason = 90; // Number of days in each season
        this.year = 1; // Current year
    }

    // Advances time by a specified number of minutes
    advanceTime(minutes) {
        this.minutes += minutes;

        // Handle overflow of minutes into hours
        while (this.minutes >= 60) {
            this.minutes -= 60;
            this.hours += 1;
        }

        // Handle overflow of hours into days
        while (this.hours >= 24) {
            this.hours -= 24;
            this.day += 1;
        }

        // Handle overflow of days into seasons
        while (this.day > this.daysPerSeason) {
            this.day -= this.daysPerSeason;
            this.seasonIndex = (this.seasonIndex + 1) % this.seasons.length;

            // Increment year if we loop back to Spring
            if (this.seasonIndex === 0) {
                this.year++;
            }
        }

        this.displayTime();
    }

    // Displays current time in a readable format
    displayTime() {
        const currentSeason = this.seasons[this.seasonIndex];
        console.log(
            `Current Time: Year ${this.year}, ${currentSeason}, Day ${this.day}, ${this.hours} hour(s), ${this.minutes} minute(s)`
        );
    }

    // Getters for time values
    getCurrentTime() {
        return {
            year: this.year,
            season: this.seasons[this.seasonIndex],
            day: this.day,
            hours: this.hours,
            minutes: this.minutes,
        };
    }
}
