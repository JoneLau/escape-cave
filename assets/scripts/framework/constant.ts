// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { Enum, Node } from "cc";

// export interface ICarInfo {
//     ID: number;
//     model: string;
//     type: number;
//     num: number;
// }

// 怪物类型
export enum MONSTERTYPE {
    ONE = 0,
    TWO = 1,
}

Enum(MONSTERTYPE);

// 陷进类型
export enum TRAPTYPE {
    ONE = 0,
    TWO = 1,
}

Enum(TRAPTYPE);

// 路径朝向
export enum ROAD_DIRECTION {
    HORIZONTAL = 0,
    VERTICAL = 1,
}

Enum(ROAD_DIRECTION);

// 路径朝向
export enum COLLIDERTYPE {
    DEFAULT = 0,
    MONSTER = 1,
    PLAYER = 2,
    BULLET = 3,
    ROAD = 4,
}

export enum GAMESTATE {
    NORMAL = 'normal',
    START = 'game-start',
    GAMING = 'gaming',
    END = 'gameEnd',
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

    public static PLAYER_ANIM = {
        IDLE: 'idle',
        HURT: 'hurt',
        CLIMB: 'climb',
        RUN: 'run',
        JUMPFROMWALL: 'jumpFromWall',
        JUMPFROMGROUND: 'jumpFromGround',
        FALLFROMGROUND: 'fallFromGround',
        FALLFROMWALL: 'fallFromWall'
    }

    public static MONSTER_ANIM = {
        IDLE: 'idle',
        CRAWL: 'crawl',
    }

    public static gameState = GAMESTATE.NORMAL;

    // 怪物移动范围
    public static MonsterMoveRange = 20;
    // 每帧移动距离
    public static MonsterMoveSpeed = 0.1;
    // 攻击距离
    public static attackDis = 0;
    // 攻击距离
    public static noticeDis = 0;
    // 子弹移动速度
    public static bulletMoveSpeed = 5;

    public static openTest = false;
    public static moveStep = 0;



}
