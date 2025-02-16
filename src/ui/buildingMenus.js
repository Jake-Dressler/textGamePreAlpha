import { getCurrentLocation } from "../engine/gameState.js";
import { sellToShop } from "../utils/shopUtils.js";
import { drawLocationBaseMenu } from "./locationMenus.js";
import { getPlayer } from "../engine/gameState.js";
import { drawPlayerBaseMenu } from "./playerMenus.js";

export function drawBuildingBaseMenu(Building){

    console.log(Building);

    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    // this is redundant and should never come into play
    // but it seems kinda safe to leave it in case of invalid building type
    let exit = document.createElement("a");
    exit.href = "#";
    exit.textContent = "Return to town";
    exit.addEventListener("click", () => drawLocationBaseMenu(getCurrentLocation()));
    centerDiv.appendChild(exit); 

    let buildingName = document.createElement("p");
    buildingName.textContent = Building.name;
    centerDiv.appendChild(buildingName);

    switch(Building.type){
        case("SHOP"):
            drawShopMenu(Building)
            break;
        default:
            console.log("invalid building type");
            break;
    }


}

function drawShopMenu(shop){
    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    let exit = document.createElement("a");
    exit.href = "#";
    exit.textContent = "Exit the shop";
    exit.addEventListener("click", () => drawLocationBaseMenu(getCurrentLocation()));
    centerDiv.appendChild(exit);

    let shopName = document.createElement("p");
    shopName.textContent = shop.name;
    centerDiv.appendChild(shopName);

    let buy = document.createElement("a");
    buy.href = "#";
    buy.textContent = "Buy";
    buy.addEventListener("click", () => drawBuyMenu(shop));
    centerDiv.appendChild(buy);

    const lineBreak = document.createElement("br");
    centerDiv.appendChild(lineBreak);

    let sell = document.createElement("a");
    sell.href = "#";
    sell.textContent = "Sell";
    sell.addEventListener("click", () => drawSellMenu(shop));
    centerDiv.appendChild(sell);


}

function drawBuyMenu(shop){

    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";
    
    let back = document.createElement("a");
    back.href = "#";
    back.textContent = "Back";
    back.addEventListener("click", () => drawShopMenu(shop));
    centerDiv.appendChild(back);

}

function drawSellMenu(shop){

    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";
    
    let back = document.createElement("a");
    back.href = "#";
    back.textContent = "Back";
    back.addEventListener("click", () => drawShopMenu(shop));
    centerDiv.appendChild(back);
    centerDiv.appendChild(document.createElement("br"));

    getPlayer().inventory.forEach((item, index) => {
            let i = document.createElement("a");
            i.href = "#";
            i.textContent = item.name;
            i.addEventListener("click", () => {
                sellToShop(shop, index);
                drawSellMenu(shop);
                drawPlayerBaseMenu(getPlayer());
            })
            centerDiv.appendChild(i);
            centerDiv.appendChild(document.createElement("br"));
        });

}