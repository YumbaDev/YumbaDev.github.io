class VisitBankAndDepositGold extends State {
    // Singleton
    static m_pInstance = new VisitBankAndDepositGold();
    
    static Instance(){
        return VisitBankAndDepositGold.m_pInstance;
    }

    Enter(dwarf){
        console.log("Goin' to the bank, yes siree");
        ConsoleLog(dwarf, "Goin' to the bank, yes siree");
    }

    Execute(dwarf){
        dwarf.DepositGoldInBank();

        console.log("Depositin' mah gold. Total savings now: " + dwarf.GetTotalSavings());
        ConsoleLog(dwarf, "Depositin' mah gold. Total savings now: " + dwarf.GetTotalSavings());

        if(dwarf.IsExhausted()){
            dwarf.m_pStateMachine.ChangeState(GoHomeAndSleepUntilRested.Instance());
        } else {
            dwarf.m_pStateMachine.ChangeState(EnterMineAndDigForNugget.Instance());
        }
    }

    Exit(dwarf){
        console.log("Woohoo! Rich enuff' fo' now, leavin' tha bank");
        ConsoleLog(dwarf, "Woohoo! Rich enuff' fo' now, leavin' tha bank");
    }
}