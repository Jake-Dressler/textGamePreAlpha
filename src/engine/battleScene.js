import { getPlayer } from "./gameState.js";

export class battleScene{

    //player = getPlayer();

    battleOver;
    playerWin;
    player;
    enemy;
    turnCount;
    playerTook;
    enemyTook;
    expGain;

    constructor(enemy){
        this.player = getPlayer();
        this.enemy = enemy;
        this.battleOver = false;
        this.playerWin = true;  // currently assuming that a win when intialized will lead to better result if bugged
        this.turnCount = 0;
        this.expGain = 0;
    }

    playTurn(action){
        // get player action and then check if player wins
        // effectively gives user the first turn
        this.playerAction(action);
        this.turnCount += 1;
        if(this.enemyDies()){
            this.playerWin = true;
            this.battleOver = true;
            this.postBattleUpdates();
            return;
        }

        // get enemy action and then check if player loses
        // effectively turn two 
        this.getEnemyAction();
        if(this.playerDies()){
            this.playerWin = false;
            this.battleOver = true;
            this.postBattleUpdates();
        }
        return;
    }

    isOver() {
        return this.battleOver;
    }

    playerAction(action){
        switch(action){
            case "attack":
                let damage = this.player.attackEnemy(this.enemy);
                this.enemyTook = damage;
                // return damage;
                break;
            case "defend":
                this.player.defending = true;
                break;
            case "item":
                alert("item not implemented yet");
                break;
            case "flee":
                alert("flee not implemented yet");
                //return;
                break;
            default:
                console.log("Invalid battle action");
                break;
        }
    }
    getEnemyAction(){
        let damage = this.enemy.attackEnemy(this.player);
        this.playerTook = damage;
        return "attack";
    }

    playerDies(){
        if (this.player.health <= 0){
            this.battleOver = true;
            return true;
        }
        return false;
    }
    enemyDies(){
        if (this.enemy.health <= 0){
            this.battleOver = true;
            return true;
        }
        return false;
    }
    postBattleUpdates(){
        if(!this.isOver){
            console.log("ERROR: post battle updates called before battle is over");
            return;
        }
        if(this.playerWin){
            let gain = this.getExpGain();
            this.expGain = gain;
            this.player.gainExperience(gain);
        }
    }
    getExpGain(){
        return this.enemy.level;
    }
}
