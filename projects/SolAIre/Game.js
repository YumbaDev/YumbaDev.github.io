class Game {
    constructor() {

        this.InstanceList = []

        this.World = new World();
        this.Dwarf = new Dwarf(1);
        this.InstanceList.push(this.Dwarf);
    }

    Update(){ 
        this.World.Update();
        for(const Instance of this.InstanceList){
            Instance.Update();
        }
    }

    start() {
        const stepInterval = 100; // ms
        this.gameLoop = setInterval(this.Update.bind(this), stepInterval);
    }
}
