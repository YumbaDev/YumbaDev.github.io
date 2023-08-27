class World {
    constructor(){
        this.CurrentTime = 0;
        this.DayCount = 0;
        this.TimeOfDay = 'Night';
        this.WeatherIcon = '🌕';

        this.Colors = ["#2C3E50", "#87CEEB", "#FF8C66", "#6B5B95"];
        this.ColorIndex = 0;

        document.getElementById("CurrentTime").textContent = this.CurrentTime;
        document.getElementById("DayCount").textContent = this.DayCount;
        document.getElementById("TimeOfDay").textContent = this.TimeOfDay;
        document.getElementById("WeatherIcon").textContent = this.WeatherIcon;
    }

    ChangeBackgroundColor(){
        document.getElementById("WorldPropertyTable").style.backgroundColor = this.Colors[this.ColorIndex];
    }

    Update(){
        this.WorldTick();

        this.UpdateTimeOfDay();

        document.getElementById("CurrentTime").textContent = this.CurrentTime;
        document.getElementById("DayCount").textContent = this.DayCount;
        document.getElementById("TimeOfDay").textContent = this.TimeOfDay;
        document.getElementById("WeatherIcon").textContent = this.WeatherIcon;
    }

    UpdateTimeOfDay(){
        if (this.CurrentTime >= 0 && this.CurrentTime < 16){
            this.TimeOfDay = 'Night';
            this.WeatherIcon = '🌕';
            this.ColorIndex = 0;
        } else if (this.CurrentTime >= 16 && this.CurrentTime < 32){
            this.TimeOfDay = 'Morning';
            this.WeatherIcon = '⛅️';
            this.ColorIndex = 1;
        } else if (this.CurrentTime >= 32 && this.CurrentTime < 48){
            this.TimeOfDay = 'Afternoon';
            this.WeatherIcon = '☀️';
            this.ColorIndex = 2;
        } else {
            this.TimeOfDay = 'Evening';
            this.WeatherIcon = '🌇';
            this.ColorIndex = 3;
        }

        this.ChangeBackgroundColor();
    }

    WorldTick(){
        if(this.CurrentTime++ >= 64){
            this.DayCount++;
            this.CurrentTime = 0;

            document.getElementById("DayCount").textContent = this.DayCount;
        }
    }

    static IsDayTime(){
        return this.CurrentTime <= 32;
    }

    static IsNightTime(){
        return this.CurrentTime > 32;
    }
}