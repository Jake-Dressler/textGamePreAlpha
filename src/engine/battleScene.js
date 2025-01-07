import { getPlayer } from "./gameState.js";

export class battleScene{

    //player = getPlayer();

    battleOver;
    playerWin;
    player;
    enemy;

    constructor(enemy){
        this.player = getPlayer();
        this.enemy = enemy;
        this.battleOver = false;
        this.playerWin = true;  // currently assuming that a win when intialized will lead to better result if bugged
    }

    playTurn(action){
        // get player action and then check if player wins
        // effectively gives user the first turn
        this.playerAction(action);
        if(enemyDies()){
            this.playerWin = true;
            this.isOver = true;
            return;
        }
        // get enemy action and then check if player loses
        // effectively turn two 
        this.getEnemyAction();
        if(playerDies()){
            this.playerWin = false;
            this.isOver = true;
        }
        return;
    }

    isOver() {
        return battleOver;
    }

    playerAction(action){
        switch(action){
            case "attack":
                this.player.attackEnemy(this.enemy);
                break;
            case "defend":
                player.defending = true;
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
        this.enemy.attackEnemy(this.player);
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
}
