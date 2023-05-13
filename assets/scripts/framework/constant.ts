// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { Node } from "cc";

export interface ICarInfo {
    ID: number;
    model: string;
    type: number;
    num: number;
}

export class constant {

    public static player: Node = null!;

    public static AUDIO_SOUND = {
        // BACKGROUND: 'background',       //背景音乐

        // CRASH: "crash",             //撞车
        // GET_MONEY: "getMoney",      //赚钱
        // IN_CAR: "inCar",            //上车
        // NEW_ORDER: "newOrder",      //新订单
        // CAR_START: "carStart",      //车辆启动
        // WIN: "win",                 //胜利
        // STOP: "stop",               //刹车
        // TOOTING1: "tooting1",        //鸣笛声1
        // TOOTING2: "tooting2",         //鸣笛声2
    }

    // 路径朝向
    public static ROAD_DIRECTION = {
        HORIZONTAL: 0,
        VERTICAL: 1,
    }

    // 怪物移动范围
    public static MonsterMoveRange = 20;
    // 每帧移动距离
    public static MonsterMoveSpeed = 0.1;


}
