import { _decorator, Animation, animation, Component, math, Node, Prefab, resources, UITransform, Vec2, Vec3 } from 'cc';
import { constant, GAMESTATE, ROAD_DIRECTION } from './framework/constant';
import { resourceUtil } from './framework/resourceUtil';
import { poolManager } from './framework/poolManager';
const { ccclass, property } = _decorator;

const randomSigh = [-1, 1];
const ROADDIS = 30;
const deltaPos = new Vec3();

enum STATE{
    NORMAL = 0,
    NOTICE = 1,
    STRONG = 2,
    ATTACK = 3,
}

@ccclass('Monster')
export class Monster extends Component {
    @property(Node)
    shotPos: Node = null!;
    _originPos = new Vec3();
    // 位置初始走向
    _originSign = 1;
    // 路径方向
    _roadDirection = ROAD_DIRECTION.HORIZONTAL;
    _delta = new Vec2();
    _onLeft = false;
    _state = STATE.NORMAL;

    _bulletPrefab: Prefab = null;
    _anim: Animation = null!;
    _inCrawl = false;

    _deltaTime = 0;

    // 摆放位置、是否需要翻转、当前翻转方向
    // 自身：固定巡逻范围、移动速度
    init(pos: Vec3, direction: number, left: boolean){
        this._roadDirection = direction;
        this._onLeft = left;

        // if(this._roadDirection === ROAD_DIRECTION.VERTICAL){
        //     this.changeAnchor(left);
        // }else{
        //     const uiTrans = this.getComponent(UITransform);
        //     uiTrans.setAnchorPoint(new Vec2(0.5, 0));
        // }

        this._originPos.set(pos);
        this.node.setPosition(pos);
        this._state = STATE.NORMAL;
        if(this._roadDirection === ROAD_DIRECTION.VERTICAL){
            if(this._onLeft){
                this.node.setRotationFromEuler(0, 0, 90);
            }else{
                this.node.setRotationFromEuler(90, 90, 90);
            }
        }
    }

    start(){

        const rangeNum = math.randomRangeInt(0, 1);
        this._originSign = randomSigh[rangeNum];
        this._anim = this.getComponent(Animation);
        const _This = this;
        resourceUtil.loadRes('prefab/bullet/bulletA', Prefab, (err: any, asset: Prefab)=>{
            if (err) {
                console.log(err);
                return;
            }

            _This._bulletPrefab = asset;
        });
    }

    update(deltaTime: number) {
        if(constant.gameState !== GAMESTATE.GAMING){
            return;
        }
        // const pos = this.node.position;
        // 处于咆哮状态，暂停运动
        // if(this._inCrawl){
        //     return;
        // }

        // this._delta.set(pos.x, pos.y);
        // let oDelta = 0;
        // if (this._roadDirection === ROAD_DIRECTION.HORIZONTAL) {
            // this._delta.x += this._originSign * constant.MonsterMoveSpeed;
            const playerPos = constant.player.worldPosition;
            // 根据怪物和主角的位置判断
            // const dis = Vec3.distance(this.node.worldPosition, playerPos);
            this._deltaTime += deltaTime;
            const dis = Math.abs(this.node.worldPosition.y - playerPos.y);
            if(dis <= 400 && this._deltaTime >= 3){
                this._anim.play('crawl');
                this._anim.on(Animation.EventType.FINISHED, this.animFinished, this);
                this._deltaTime = 0;
            }
            // if(dis > constant.noticeDis && dis <= constant.noticeDis + 5){

            //     if(this._state !== STATE.NOTICE){
            //         // 播放心跳音频
            //         this._state = STATE.NOTICE;
            //     }
            // } else if (dis <= constant.noticeDis && dis > constant.attackDis) {

            //     if(this._state !== STATE.STRONG){
            //         // 加大心跳音频
            //         this._state = STATE.STRONG;
            //     }
            // } else if (dis <= constant.attackDis) {

            //     if(this._state !== STATE.ATTACK){
            //         // 播放攻击动画
            //         this._anim.play('crawl');
            //         this._inCrawl = true;
            //         this._anim.on(Animation.EventType.FINISHED, this.animFinished, this);
            //         this._state = STATE.ATTACK;
            //     }
            // }
            // 超出巡查范围，往反方向走
            // if (Math.abs(this._delta.x - this._originPos.x) > constant.MonsterMoveRange) {
            //     this._originSign = -Math.sign(this._originSign);
            //     this._delta.x += 2 * this._originSign * constant.MonsterMoveSpeed;
            // }

        // } else {
            // this._delta.y += this._originSign * constant.MonsterMoveSpeed;
            // oDelta = this._originPos.y;
            // if (Math.abs(this._delta.y - this._originPos.y) > constant.MonsterMoveRange) {
            //     this._originSign = -Math.sign(this._originSign);
            //     this._delta.y += 2 * this._originSign * constant.MonsterMoveSpeed;
                // 是否换边
                // const changeSide = Math.random();
                // if(changeSide >= 0.5){
                //     if(this._onLeft){
                //         this._delta.x += ROADDIS;
                //     }else{
                //         this._delta.x -= ROADDIS;
                //     }

                //     this._onLeft = !this._onLeft;
                //     this.changeAnchor(this._onLeft);
                // }
            // }
        // }

        // this.node.setPosition(this._delta.x, this._delta.y);
    }

    // changeAnchor(isLeft: boolean){
    //     const uiTrans = this.getComponent(UITransform);
    //     if(isLeft){
    //         uiTrans.setAnchorPoint(new Vec2(1, 0.5));
    //     }else{
    //         uiTrans.setAnchorPoint(new Vec2(0, 0.5));
    //     }
    // }

    // 咆哮动画结束回到待机
    animFinished(){
        this._anim.play('idle');
        this.node.off(Animation.EventType.FINISHED, this.animFinished, this);
        // this._state = STATE.NORMAL;
        // this.scheduleOnce(()=>{
        //     this._inCrawl = false;
        // }, 0.5);
    }

    // 怪物咆哮开始发射子弹
    shot(){
        if(this._bulletPrefab){
            this.schedule(()=>{
                const bullet = poolManager.instance.getNode(this._bulletPrefab, this.node);
                bullet.setPosition(this.shotPos.position);
            },0.3, 2);
        }
    }
}


