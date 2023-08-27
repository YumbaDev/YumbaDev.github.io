class GoHomeAndSleepUntilRested extends State {
    // Singleton
    static m_pInstance = new GoHomeAndSleepUntilRested();
    
    static Instance(){
        return GoHomeAndSleepUntilRested.m_pInstance;
    }

    Enter(dwarf){
        console.log("These bones be achin', time to head back to mah nest to rest");
    }

    Execute(dwarf){
        dwarf.DecreaseFatigue();

        console.log("zzzZZzzZz...");

        if(dwarf.IsFullyRested()){
            dwarf.m_pStateMachine.ChangeState(EnterMineAndDigForNugget.Instance());
        }
    }

    Exit(dwarf){
        console.log("What a god-darn spankin' nap! Leavin mah home");
    }

}