class Dwarf extends BaseGameEntity{
    constructor(id){
        super(id);

        this.Name = "Dwarf Thorin";
        this.GoldCarried = 0;
        this.PocketLimit = 10;
        this.MoneyInBank = 0;
        this.MaxHunger = 16;
        this.Hunger = this.MaxHunger;
        this.MaxThirst = 16;
        this.Thirst = this.MaxThirst;
        this.MaxEnergy = 16;
        this.Energy = this.MaxEnergy;

        this.UpdateUI();
        
        this.m_pStateMachine = new StateMachine(this);
        this.m_pStateMachine.SetCurrentState(EnterMineAndDigForNugget.Instance());
    }

    Update(){
        this.m_pStateMachine.Update();
        this.UpdateUI();
    }

    UpdateUI(){
        document.getElementById("GoldCarried").textContent = this.GoldCarried;
        document.getElementById("PocketLimit").textContent = this.PocketLimit;
        document.getElementById("MoneyInBank").textContent = this.MoneyInBank;
        document.getElementById("HungerDisplay").textContent = `${this.Hunger}/${this.MaxHunger}`;
        document.getElementById("ThirstDisplay").textContent = `${this.Thirst}/${this.MaxThirst}`;
        document.getElementById("EnergyDisplay").textContent = `${this.Energy}/${this.MaxEnergy}`;
    }

    AddToGoldCarried(amount){
        this.GoldCarried += amount;

        //document.getElementById("GoldCarried").textContent = this.GoldCarried;
    }
    
    IncreaseEnergy(){
        this.Energy++;

        //document.getElementById("Energy").textContent = this.Energy;
    }

    DecreaseEnergy(){
        this.Energy--;

        //document.getElementById("Energy").textContent = this.Energy;
    }

    DepositGoldInBank(){
        this.MoneyInBank += this.GoldCarried;
        this.GoldCarried = 0;

        //document.getElementById("MoneyInBank").textContent = this.MoneyInBank;
        //document.getElementById("GoldCarried").textContent = this.GoldCarried;
    }

    GetTotalSavings(){
        return this.MoneyInBank;
    }

    HasPocketsFull(){
        return this.GoldCarried >= this.PocketLimit;
    }

    IsExhausted(){
        return this.Energy <= 0;
    }

    IsFullyRested(){
        return this.Energy >= this.MaxEnergy;
    }

    GetName(){
        return this.Name;
    }

}