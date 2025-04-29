import { getCurrentLocation } from "../engine/gameState.js";
import { buyFromShop, sellToShop } from "../utils/shopUtils.js";
import { drawLocationBaseMenu } from "./locationMenus.js";
import { getPlayer } from "../engine/gameState.js";
import { drawPlayerBaseMenu } from "./playerMenus.js";
import { innRest, rentRoom } from "../utils/innUtils.js";

export function drawBuildingBaseMenu(Building){

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
        case("INN"):
            drawInnMenu(Building);
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

function drawInnMenu(inn){

    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    let exit = document.createElement("a");
    exit.href = "#";
    exit.textContent = "Exit the inn";
    exit.addEventListener("click", () => drawLocationBaseMenu(getCurrentLocation()));
    centerDiv.appendChild(exit);

    let innName = document.createElement("p");
    innName.textContent = inn.name;
    centerDiv.appendChild(innName);

    if(inn.isRented){
        let room = document.createElement("a");
        room.href = "#";
        room.textContent = "Enter rented room";
        room.addEventListener("click", () => drawRoomMenu(inn));
        centerDiv.appendChild(room);
    }
    else{
        let rent = document.createElement("a");
        rent.href = "#";
        rent.textContent = `Rent a room (${inn.roomPrice}g)`
        rent.addEventListener("click", () => {
            rentRoom(inn);
            drawInnMenu(inn);
            drawPlayerBaseMenu(getPlayer());
        })
        centerDiv.appendChild(rent);
    }

}

function drawBuyMenu(shop){

    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    let back = document.createElement("a");
    back.href = "#";
    back.textContent = "Back";
    back.addEventListener("click", () => drawShopMenu(shop));
    centerDiv.appendChild(back);
    centerDiv.appendChild(document.createElement("br"));

    shop.items.forEach((item, index) => {
        let i = document.createElement("a");
            i.href = "#";
            i.textContent = `${item.name} (${item.price}g)`;
            i.addEventListener("click", () => {
                buyFromShop(shop, index);
                drawBuyMenu(shop);
                drawPlayerBaseMenu(getPlayer());
            })
            centerDiv.appendChild(i);
            centerDiv.appendChild(document.createElement("br"));
    });

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
            i.textContent = `${item.name} (${item.price}g)`;
            i.addEventListener("click", () => {
                sellToShop(shop, index);
                drawSellMenu(shop);
                drawPlayerBaseMenu(getPlayer());
            })
            centerDiv.appendChild(i);
            centerDiv.appendChild(document.createElement("br"));
        });

}

function drawRoomMenu(inn){

    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    let back = document.createElement("a");
    back.href = "#";
    back.textContent = "Back";
    back.addEventListener("click", () => drawInnMenu(inn));
    centerDiv.appendChild(back);
    centerDiv.appendChild(document.createElement("br"));

    for(let i = 1; i < 9; i++){
        let rest = document.createElement("a");
        rest.href = "#";
        rest.textContent = `Sleep ${i}:00`;
        rest.addEventListener("click", () => innRest(inn, i));
        centerDiv.appendChild(rest);
        centerDiv.appendChild(document.createElement("br"));
    }

}
