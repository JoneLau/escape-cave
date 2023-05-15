
import { _decorator, Component, AudioSource, assert, find, randomRangeInt, Node, instantiate, Prefab, Vec3, UITransform, Animation } from 'cc';
// import { setting } from '../ui/main/setting';
import { audioManager } from './audioManager';
import { GAMESTATE, MONSTERTYPE, ROAD_DIRECTION, TRAPTYPE, constant } from './constant';
import { Monster } from '../Monster';
import { Road } from '../Road';
import { Trap } from '../Trap';
import { CameraController } from '../CameraController';
import { Fly } from '../Fly';
import { clientEvent } from './clientEvent';
const { ccclass, property } = _decorator;


@ccclass('GameRoot')
export class GameRoot extends Component {

    // @property(AudioSource)
    // private _audioSource: AudioSource = null!;

    @property(Node)
    player: Node = null;

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
        tooltip: '子弹移动速度'
    })
    bulletMoveSpeed = 2;

    @property
    moveStep = 5;
    @property({
        type: [MONSTERTYPE]
    })
    monsterList: MONSTERTYPE[] = [];
    @property({
        type: Prefab
    })
    monsterPrefab: Prefab = null;
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
    @property(Node)
    flyRoot: Node = null;
    @property(Prefab)
    flyPrefab: Prefab = null;
    @property(Vec3)
    cameraEndPos = new Vec3();
    @property(AudioSource)
    audioManager: AudioSource = null;
    @property(Animation)
    startAnim: Animation = null;
    @property(Node)
    endingPos: Node = null;

    @property
    openTest = false;
    @property
    maxBlood = 6;

    private _blood: number = 0;


    onLoad () {
        // const audioSource = this.getComponent(AudioSource)!;
        // assert(audioSource);
        // this._audioSource = audioSource;
        // game.addPersistRootNode(this.node);

        // // init AudioManager
        // audioManager.instance.init(this._audioSource);
        constant.player = this.player;
        constant.MonsterMoveRange = this.monsterMoveRange;
        constant.MonsterMoveSpeed = this.monsterMoveSpeed;
        constant.attackDis = this.monsterAttackDis;
        constant.noticeDis = this.monsterNoticeRange;
        constant.moveStep = this.moveStep;
        constant.openTest = this.openTest;

        const camera = find('Canvas/Camera').getComponent(CameraController);
        camera.init(this.cameraEndPos, this.endingPos.position);;

        // TODO: 监听游戏状态
        clientEvent.on('game-state', (state: GAMESTATE.NORMAL | GAMESTATE.START | GAMESTATE.GAMING | GAMESTATE.END ) => {
            switch (state) {
                case GAMESTATE.START:
                    this._blood = this.maxBlood;
                    constant.gameState = GAMESTATE.START;
                    this.startAnim.play();
                    this.scheduleOnce(()=>{
                        clientEvent.dispatchEvent(GAMESTATE.GAMING);
                        constant.gameState = GAMESTATE.GAMING;
                    }, 1);
                    // clientEvent.dispatchEvent(GAMESTATE.GAMING);
                    // constant.gameState = GAMESTATE.GAMING;
                    break;
                default:
                    break;
            }
        }, this);
        // TODO: 监听伤害
        clientEvent.on('blood', this.handleBlood, this);
        // 流程初始开始菜单
        // clientEvent.dispatchEvent('open-menu', 'start-menu');
        clientEvent.on(GAMESTATE.GAMING, this.gameStart, this);

        audioManager.instance.init(this.audioManager);
        audioManager.instance.changeBG('success');

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
        let childs = this.roadRoot.children;
        let i = 0
        for (; i < childs.length; i++) {
            roadList.push(childs[i]);
        }
        i = 0;
        // this.monsterList.length
        for (; i < this.monsterList.length; i++) {
            const num = randomRangeInt(0, roadList.length);
            const roadNode = roadList[num];
            const road = roadNode.getComponent(Road);
            road.init();
            const monsterNode = instantiate(this.monsterPrefab);
            monsterNode.setParent(roadNode);
            const monster = monsterNode.getComponent(Monster);
            monster.init(road.getObjPos(), road.direction, road.getObjDir());
            roadList.splice(num, 1);
        }
        // i = 0;
        // for (; i < this.trapList.length; i++) {
        //     const num = randomRangeInt(0, roadList.length);
        //     const roadNode = roadList[num];
        //     const road = roadNode.getComponent(Road);
        //     const trapNode = instantiate(this.trapPrefabList[this.trapList[i]]);
        //     trapNode.setParent(roadNode);
        //     const trap = trapNode.getComponent(Trap);
        //     trap.init(road.getObjPos(), road.direction, road.getObjDir());
        //     roadList.splice(num, 1);
        // }

        // 飞行物
        childs = this.flyRoot.children;
        for (; i < childs.length; i++) {
            const roadNode = childs[i];
            const roadSize = roadNode.getComponent(UITransform).contentSize;
            const maxSize = Math.max(roadSize.width, roadSize.height);
            const isHorizontal = roadSize.width - roadSize.height > 0 ? ROAD_DIRECTION.HORIZONTAL : ROAD_DIRECTION.VERTICAL;
            const trapNode = instantiate(this.flyPrefab);
            trapNode.setParent(roadNode);
            const trap = trapNode.getComponent(Fly);
            trap.init(maxSize, isHorizontal);
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

    // TODO: 监听伤害，降低血量
    handleBlood() {
        this._blood--;
        if (this._blood <= 0) {
            // startMenu、gameSetting、gameMenu gameOver
            clientEvent.dispatchEvent('open-menu', 'start-menu');
        }
    }

    gameStart(){
        audioManager.instance.changeBG('background');
    }
}