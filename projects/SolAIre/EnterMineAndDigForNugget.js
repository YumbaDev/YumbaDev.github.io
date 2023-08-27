class EnterMineAndDigForNugget extends State{
    // Singleton
    static m_pInstance = new EnterMineAndDigForNugget();
    
    static Instance(){
        return EnterMineAndDigForNugget.m_pInstance;
    }

    Enter(dwarf){
        console.log("im'a dwarf, gonna head to the mine to dig'");
        ConsoleLog(dwarf, "im'a dwarf, gonna head to the mine to dig'");
    }

    Execute(dwarf){
        dwarf.AddToGoldCarried(1);
        dwarf.DecreaseEnergy();

        console.log("Strikin' my pick n' pickin' up a nugget");
        ConsoleLog(dwarf, "Strikin' my pick n' pickin' up a nugget");

        if(dwarf.HasPocketsFull()){
            dwarf.m_pStateMachine.ChangeState(VisitBankAndDepositGold.Instance());
        }

        if(dwarf.IsExhausted()){
            dwarf.m_pStateMachine.ChangeState(GoHomeAndSleepUntilRested.Instance());
        }
    }

    Exit(dwarf){
        console.log("Ah'm leavin' the mine with mah pockets ful o' sweet gold");
        ConsoleLog(dwarf, "Ah'm leavin' the mine with mah pockets ful o' sweet gold");
    }

}