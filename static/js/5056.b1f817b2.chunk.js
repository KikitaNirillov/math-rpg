"use strict";(self.webpackChunkrpg=self.webpackChunkrpg||[]).push([[5056],{7995:function(n,t,o){o.d(t,{k:function(){return _}});var i=o.p+"static/media/healingPotionImg.3bb578210e0dfd174945.png",e=o.p+"static/media/freezingPotionImg.4c7b55aeff1f2b03aa64.png",s=o.p+"static/media/poisonPotionImg.1896201a6f74d92b9112.png",a=o(4136),_={"Healing potion":{img:i,description:"Restore ".concat(a.Z.addedHealthPointsByHealthPotion," health points"),cost:2},"Freezing potion":{img:e,description:"Freeze the enemy for ".concat(a.Z.durationOfFreezing," him moves"),cost:4},"Poison potion":{img:s,description:"Add ".concat(a.Z.additionalDamageByPoison," damage for ").concat(a.Z.durationOfPoison," your moves"),cost:5}}},7401:function(n,t,o){o.r(t),o.d(t,{default:function(){return I}});var i=o(8687),e=o(885),s=o(8218),a=o(2791),_=o(5987),c=o(4136),r={inn:"inn_inn__mD0FL",inn__healthInfo:"inn_inn__healthInfo__WhdCW",inn__healthInfo_bar:"inn_inn__healthInfo_bar__2pYVZ",inn__healthInfo_bar_stripe:"inn_inn__healthInfo_bar_stripe__zDhW9",inn__healthInfo_bar_points:"inn_inn__healthInfo_bar_points__A1aNz",inn__title:"inn_inn__title__o39vB",inn__title_img:"inn_inn__title_img__mz7vU",inn__buttonList:"inn_inn__buttonList__0WG53",inn__buttonList_button:"inn_inn__buttonList_button__NSUr5"},l=o(184),u=["buyFullHeal","closeLocationMapWindow"],m=function(n){var t=n.buyFullHeal,o=n.closeLocationMapWindow,i=(0,_.Z)(n,u),e=i.coins<c.Z.pricePerInn||100===i.playerHealthPoints;return(0,l.jsxs)("div",{className:"".concat(r.inn," locationMapWindow"),children:[(0,l.jsxs)("div",{className:r.inn__healthInfo,children:[(0,l.jsx)("p",{className:r.inn__healthInfo_title,children:"Your health:"}),(0,l.jsxs)("div",{className:r.inn__healthInfo_bar,children:[(0,l.jsx)("div",{className:r.inn__healthInfo_bar_stripe,style:{width:"".concat(i.playerHealthPoints,"%"),transition:"all ".concat(c.Z.changingHealthPointsTransition,"ms")}}),(0,l.jsx)("p",{className:r.inn__healthInfo_bar_points,children:i.playerHealthPoints})]})]}),(0,l.jsxs)("div",{className:r.inn__title,children:[(0,l.jsx)("p",{className:r.inn__title_text,children:"Do you want restore your healt by 3"}),(0,l.jsx)("img",{src:i.currencyImg||"",alt:"currency",className:r.inn__title_img}),(0,l.jsx)("p",{className:r.inn__title_text,children:"?"})]}),(0,l.jsxs)("div",{className:r.inn__buttonList,children:[(0,l.jsx)("button",{className:r.inn__buttonList_button,onClick:function(){return t()},disabled:e,children:"Yes"}),(0,l.jsx)("button",{className:r.inn__buttonList_button,onClick:function(){return o()},children:"No"})]})]})},p=o(1033),d=(0,i.$j)((function(n,t){return{playerHealthPoints:n.player.healthPoints,currencyImg:n.location.currencyImg,coins:n.player.coins,closeLocationMapWindow:t.closeLocationMapWindow}}),{buyFullHeal:p.Bo})(m),h={locationMapScreen:"locationMap_locationMapScreen__PXsJn",coins:"locationMap_coins__C7xm9",coins_img:"locationMap_coins_img__9bWiR",nowItsBackground:"locationMap_nowItsBackground__yq9JE",locationMap:"locationMap_locationMap__zypAZ",locationMap__backgroundImg:"locationMap_locationMap__backgroundImg__nk11y",locationMap__onFocusInfo:"locationMap_locationMap__onFocusInfo__L0FHS",locationMap__buttonList:"locationMap_locationMap__buttonList__caFXY",locationMap__buttonList_innBtn:"locationMap_locationMap__buttonList_innBtn__WRs9W",locationMap__buttonList_innBtn_icon:"locationMap_locationMap__buttonList_innBtn_icon__4AUKl",location3:"locationMap_location3__fRYzp",locationMap__buttonList_storeBtn:"locationMap_locationMap__buttonList_storeBtn__sS-O7",locationMap__buttonList_storeBtn_icon:"locationMap_locationMap__buttonList_storeBtn_icon__nxgCs",locationMap__buttonList_bossBtn:"locationMap_locationMap__buttonList_bossBtn__8aUlE",locationMap__buttonList_bossBtn_icon:"locationMap_locationMap__buttonList_bossBtn_icon__sRcwp",locationMap__buttonList_lairBtn:"locationMap_locationMap__buttonList_lairBtn__o+-vH",locationMap__buttonList_lairBtn_icon:"locationMap_locationMap__buttonList_lairBtn_icon__JimZ7",location1:"locationMap_location1__BuIOd"},b=o(7995),g={store:"store_store__5Xnkg",store__purchase:"store_store__purchase__NiqQI",store__purchase_itemsList:"store_store__purchase_itemsList__eqAUx",store__purchase_itemsList_btn:"store_store__purchase_itemsList_btn__50pwE",store__purchase_itemsList_btn_img:"store_store__purchase_itemsList_btn_img__DkST9",store__purchase_itemsList_btn_cost:"store_store__purchase_itemsList_btn_cost__djLIL",store__purchase_itemsList_btn_cost_count:"store_store__purchase_itemsList_btn_cost_count__o4YXH",store__purchase_itemsList_btn_cost_currency:"store_store__purchase_itemsList_btn_cost_currency__LMbby",store__inventory:"store_store__inventory__8ogWE",store__inventory_itemsList:"store_store__inventory_itemsList__QfKc2",store__inventory_itemsList_item:"store_store__inventory_itemsList_item__w-evJ",store__inventory_itemsList_item_img:"store_store__inventory_itemsList_item_img__jJjyC",store__inventory_itemsList_item_count:"store_store__inventory_itemsList_item_count__pwnWq",store__leaveBtn:"store_store__leaveBtn__72Ei4"},M=["closeLocationMapWindow","buyInventoryItem"],y=function(n){var t=n.closeLocationMapWindow,o=n.buyInventoryItem,i=(0,_.Z)(n,M),s=(0,a.useState)(null),c=(0,e.Z)(s,2),r=c[0],u=c[1];return(0,l.jsxs)("div",{className:"".concat(g.store," locationMapWindow"),children:[(0,l.jsx)("p",{children:"Store:"}),(0,l.jsxs)("div",{className:g.store__purchase,children:[(0,l.jsx)("div",{className:g.store__purchase_itemsList,children:Object.keys(b.k).map((function(n){return(0,l.jsxs)("button",{className:g.store__purchase_itemsList_btn,onMouseOver:function(){return u(n)},onMouseLeave:function(){return u(null)},onClick:function(){i.coins<b.k[n].cost?u("noMoneyForBuy"):o(n,b.k[n].cost)},children:[(0,l.jsx)("img",{className:g.store__purchase_itemsList_btn_img,alt:n,src:b.k[n].img}),(0,l.jsxs)("div",{className:g.store__purchase_itemsList_btn_cost,children:[(0,l.jsx)("p",{className:g.store__purchase_itemsList_btn_cost_count,children:b.k[n].cost}),(0,l.jsx)("img",{src:i.currencyImg,className:g.store__purchase_itemsList_btn_cost_currency,alt:"currency on this location"})," "]})]},n)}))}),(0,l.jsx)("p",{className:g.store__purchase_text,children:r?"noMoneyForBuy"!==r?""===b.k[r].description?(0,l.jsx)("br",{}):b.k[r].description:"No coins...":"\u21e1 Click to buy \u21e1"})]}),(0,l.jsxs)("div",{className:g.store__inventory,children:[(0,l.jsx)("p",{className:g.store__inventory_title,children:"Your inventory:"}),(0,l.jsx)("div",{className:g.store__inventory_itemsList,children:0===i.inventory.length?(0,l.jsx)("p",{children:"It's empty here..."}):i.inventory.map((function(n){return(0,l.jsxs)("div",{className:g.store__inventory_itemsList_item,children:[(0,l.jsx)("img",{className:g.store__inventory_itemsList_item_img,alt:n.name,src:b.k[n.name].img}),(0,l.jsx)("p",{className:g.store__inventory_itemsList_item_count,children:n.count})]},n.name)}))})]}),(0,l.jsx)("button",{className:g.store__leaveBtn,onClick:function(){return t()},children:"Leave store"})]})},L=(0,i.$j)((function(n,t){return{currencyImg:n.location.currencyImg,inventory:n.player.inventory,coins:n.player.coins,closeLocationMapWindow:t.closeLocationMapWindow}}),{buyInventoryItem:p.if})(y),v=function(n){(0,a.useEffect)((function(){0!==n.unloadedImagesQuantity||n.currentSceneDidMount||setTimeout((function(){n.setCurrentSceneDidMount(!0)}),0)}),[n.unloadedImagesQuantity,n.currentSceneDidMount]);var t=(0,a.useState)(null),o=(0,e.Z)(t,2),i=o[0],_=o[1],c=(0,a.useState)(null),r=(0,e.Z)(c,2),u=r[0],m=r[1],p=function(){return m(null)};return(0,l.jsxs)("div",{className:"".concat(h.locationMapScreen),children:[(0,l.jsxs)("div",{className:"".concat(h.locationMap," ").concat(u?h.nowItsBackground:null),children:[(0,l.jsx)(s.Z,{src:n.mapBackgroundImg,alt:"background",className:h.locationMap__backgroundImg}),(0,l.jsx)("div",{className:h.locationMap__onFocusInfo,children:(0,l.jsx)("p",{children:null===i?"Where am I going?":"lair"===i&&0===n.livingMonsterNames.length?"The lair is completely cleared":"Go to the "+i})}),(0,l.jsxs)("div",{className:h.locationMap__buttonList,children:[(0,l.jsx)("button",{className:"".concat(h.locationMap__buttonList_innBtn," ").concat(n.locationName&&h[n.locationName]),onMouseOver:function(){return _("inn")},onMouseLeave:function(){return null===u&&_(null)},onClick:function(){return m("Inn")},children:(0,l.jsx)(s.Z,{src:n.innIcon,alt:"Inn",className:h.locationMap__buttonList_innBtn_icon})}),(0,l.jsx)("button",{className:h.locationMap__buttonList_storeBtn,onMouseOver:function(){return _("store")},onMouseLeave:function(){return null===u&&_(null)},onClick:function(){return m("Store")},children:(0,l.jsx)(s.Z,{src:n.storeIcon,alt:"Store",className:h.locationMap__buttonList_storeBtn_icon})}),(0,l.jsx)("button",{className:h.locationMap__buttonList_bossBtn,onMouseOver:function(){return _("boss")},onMouseLeave:function(){return 1===n.sceneOpacity&&_(null)},onClick:function(){n.mainBossName?(n.changeDownloadQuantity("PLUS_ONE"),n.setNewEnemy(n.mainBossName),n.setSceneWithTransition("Arena")):console.warn("no bossName found")},children:(0,l.jsx)(s.Z,{src:n.toBossIcon,alt:"to boss",className:h.locationMap__buttonList_bossBtn_icon})}),(0,l.jsx)("button",{className:"".concat(h.locationMap__buttonList_lairBtn," ").concat(n.locationName&&h[n.locationName]),onMouseOver:function(){return _("lair")},onMouseLeave:function(){return 1===n.sceneOpacity&&_(null)},onClick:function(){0!==n.livingMonsterNames.length?(n.changeDownloadQuantity("PLUS_ONE"),n.setNewEnemy(n.livingMonsterNames[0]),n.setSceneWithTransition("Arena")):console.warn("no monsterNames found")},children:(0,l.jsx)(s.Z,{src:n.lairIcon,alt:"Lair",className:h.locationMap__buttonList_lairBtn_icon})})]})]}),"Inn"===u?(0,l.jsx)(d,{closeLocationMapWindow:p}):"Store"===u?(0,l.jsx)(L,{closeLocationMapWindow:p}):null,null!==u?(0,l.jsxs)("div",{className:h.coins,children:[(0,l.jsxs)("p",{className:h.coins_text,children:["Coins: ",n.coins]}),(0,l.jsx)("img",{src:n.currencyImg,className:h.coins_img,alt:"'currency on this location'"})]}):null]})},N=o(7429),f=o(8090),I=(0,i.$j)((function(n){return{locationName:n.location.locationName,mapBackgroundImg:n.location.mapBackgroundImg,fightBackgroundImg:n.location.fightBackgroundImg,lairIcon:n.location.locationEnvironment.lairIcon,innIcon:n.location.locationEnvironment.innIcon,storeIcon:n.location.locationEnvironment.storeIcon,toBossIcon:n.location.locationEnvironment.toBossIcon,livingMonsterNames:n.location.livingMonsterNames,mainBossName:n.location.mainBossName,coins:n.player.coins,currencyImg:n.location.currencyImg,unloadedImagesQuantity:n.scene.unloadedImagesQuantity,currentSceneDidMount:n.scene.currentSceneDidMount,sceneOpacity:n.scene.opacity}}),{setSceneWithTransition:N.Yv,setNewEnemy:f.b0,changeDownloadQuantity:N.Kh,setCurrentSceneDidMount:N.vZ})(v)},8218:function(n,t,o){var i=o(8687),e=o(7429),s=o(2791),a=o(184);t.Z=(0,i.$j)((function(n,t){return{src:t.src,alt:t.alt,className:t.className}}),{changeUnloadedImagesQuantity:e.YS})((function(n){var t=n.src,o=n.alt,i=void 0===o?"img":o,e=n.className,_=void 0===e?void 0:e,c=n.changeUnloadedImagesQuantity;return(0,s.useEffect)((function(){c("PLUS_ONE")}),[]),(0,a.jsx)("img",{src:t,alt:i,className:_,onLoad:function(){return c("MINUS_ONE")}})}))}}]);
//# sourceMappingURL=5056.b1f817b2.chunk.js.map