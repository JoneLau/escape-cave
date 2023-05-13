
import { _decorator, Component, AudioSource, assert, find, randomRangeInt, Node, instantiate, Prefab, Vec3 } from 'cc';
// import { setting } from '../ui/main/setting';
import { audioManager } from './audioManager';
import { MONSTERTYPE, ROAD_DIRECTION, TRAPTYPE, constant } from './constant';
import { Monster } from '../Monster';
import { Road } from '../Road';
import { Trap } from '../Trap';
const { ccclass, property } = _decorator;


@ccclass('GameRoot')
export class GameRoot extends Component {

    @property(AudioSource)
    private _audioSource: AudioSource = null!;

    @property({
        tooltip: '怪物移动范围'
    })
    monsterMoveRange = 10;
    @property({
        tooltip: '怪物攻击距离'
    })
    monsterAttackDis = 6;
    @property({
        tooltip: '怪物警觉范围'
    })
    monsterNoticeRange = 10;
    @property({
        tooltip: '每帧移动距离'
    })
    monsterMoveSpeed = 0.1;

    @property({
        tooltip: '探灯半径'
    })
    lightDis = 5;
    @property({
        type: [MONSTERTYPE]
    })
    monsterList: MONSTERTYPE[] = [];
    @property({
        type: [Prefab]
    })
    monsterPrefabList: Prefab[] = [];
    @property({
        type: [TRAPTYPE]
    })
    trapList: TRAPTYPE[] = [];
    @property({
        type: [Prefab]
    })
    trapPrefabList: Prefab[] = [];
    @property(Node)
    roadRoot: Node = null!;
    @property(Node)
    trapRoot: Node = null!;
    @property(Node)
    monsterRoot: Node = null!;

    @property
    openTest = false;


    onLoad () {
        // const audioSource = this.getComponent(AudioSource)!;
        // assert(audioSource);
        // this._audioSource = audioSource;
        // game.addPersistRootNode(this.node);

        // // init AudioManager
        // audioManager.instance.init(this._audioSource);
        constant.player = find('Canvas/player');
        constant.MonsterMoveRange = this.monsterMoveRange;
        constant.MonsterMoveSpeed = this.monsterMoveSpeed;
        constant.attackDis = this.monsterAttackDis;
        constant.noticeDis = this.monsterNoticeRange;
        constant.openTest = this.openTest;

        if(this.openTest){
            // const monsterNode1 = instantiate(this.monsterPrefabList[0]);
            // monsterNode1.setParent(this.monsterRoot);
            // const monster1 = monsterNode1.getComponent(Monster);
            // monster1.init(new Vec3(-220, 85, 0), ROAD_DIRECTION.HORIZONTAL, true);
            // const monsterNode2 = instantiate(this.monsterPrefabList[0]);
            // monsterNode2.setParent(this.monsterRoot);
            // const monster2 = monsterNode2.getComponent(Monster);
            // monster2.init(new Vec3(426, 180, 0), ROAD_DIRECTION.VERTICAL, false);
           return;
        }
        // 根据配置初始化数据生成怪物和陷阱
        const roadList: Node[] = [];
        const childs = this.roadRoot.children;
        let i = 0
        for (; i < childs.length; i++) {
            roadList.push(childs[i]);
        }
        i = 0;
        for (; i < this.monsterList.length; i++) {
            const num = randomRangeInt(0, roadList.length);
            const roadNode = roadList[num];
            const road = roadNode.getComponent(Road);
            const monsterNode = instantiate(this.monsterPrefabList[this.monsterList[i]]);
            monsterNode.setParent(this.monsterRoot);
            const monster = monsterNode.getComponent(Monster);
            monster.init(road.getObjPos(), road.direction, road.getObjDir());
            roadList.splice(num, 1);
        }
        i = 0;
        for (; i < this.trapList.length; i++) {
            const num = randomRangeInt(0, roadList.length);
            const roadNode = roadList[num];
            const road = roadNode.getComponent(Road);
            const trapNode = instantiate(this.trapPrefabList[this.trapList[i]]);
            trapNode.setParent(this.trapRoot);
            const trap = trapNode.getComponent(Trap);
            trap.init(road.getObjPos(), road.direction, road.getObjDir());
            roadList.splice(num, 1);
        }
    }

    onEnable () {
        // NOTE: 常驻节点在切场景时会暂停音乐，需要在 onEnable 继续播放
        // 之后需要在引擎侧解决这个问题
        // audioManager.instance.playMusic(true);
        // setting.checkState();
    }

    start(){

    }
}