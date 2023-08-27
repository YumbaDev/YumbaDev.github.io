class Game {
    constructor() {

        this.InstanceList = []

        this.World = new World(0);
        this.Dwarf = new Dwarf(1);

        this.InstanceList.push(this.World);
        this.InstanceList.push(this.Dwarf);
    }

    Update(){ 
        for(const Instance of this.InstanceList){
            Instance.Update();
        }
    }

    Start() {
        const stepInterval = 1250; // ms
        this.gameLoop = setInterval(this.Update.bind(this), stepInterval);
    }
}