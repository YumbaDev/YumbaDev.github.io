class Dwarf extends BaseGameEntity{
    constructor(id){
        super(id);

        this.GoldCarried = 0;
        this.PocketLimit = 10;
        this.MoneyInBank = 0;
        this.Thirst = 0;
        this.Fatigue = 0;
        this.FatigueLimit = 16;

        document.getElementById("GoldCarried").textContent = this.GoldCarried;
        document.getElementById("PocketLimit").textContent = this.PocketLimit;
        document.getElementById("MoneyInBank").textContent = this.MoneyInBank;
        document.getElementById("Thirst").textContent = this.Thirst;
        document.getElementById("Fatigue").textContent = this.Fatigue;
        document.getElementById("FatigueLimit").textContent = this.FatigueLimit;
        
        this.m_pStateMachine = new StateMachine(this);
        this.m_pStateMachine.SetCurrentState(EnterMineAndDigForNugget.Instance());
    }

    Update(){
        this.m_pStateMachine.Update();
    }

    AddToGoldCarried(amount){
        this.GoldCarried += amount;

        document.getElementById("GoldCarried").textContent = this.GoldCarried;
    }
    
    IncreaseFatigue(){
        this.Fatigue++;

        document.getElementById("Fatigue").textContent = this.Fatigue;
    }

    DecreaseFatigue(){
        this.Fatigue--;

        document.getElementById("Fatigue").textContent = this.Fatigue;
    }

    DepositGoldInBank(){
        this.MoneyInBank += this.GoldCarried;
        this.GoldCarried = 0;

        document.getElementById("MoneyInBank").textContent = this.MoneyInBank;
        document.getElementById("GoldCarried").textContent = this.GoldCarried;
    }

    GetTotalSavings(){
        return this.MoneyInBank;
    }

    HasPocketsFull(){
        return this.GoldCarried >= this.PocketLimit;
    }

    IsExhausted(){
        return this.Fatigue >= this.FatigueLimit;
    }

    IsFullyRested(){
        return this.Fatigue <= 0;
    }

}