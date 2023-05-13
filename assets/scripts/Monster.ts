import { _decorator, Component, math, Node, UITransform, Vec2, Vec3 } from 'cc';
import { constant } from './framework/constant';
const { ccclass, property } = _decorator;

const randomSigh = [-1, 1];
const ROADDIS = 30;

@ccclass('Monster')
export class Monster extends Component {
    _originPos = new Vec3();
    // 位置初始走向
    _originSign = 1;
    // 路径方向
    _roadDirection = constant.ROAD_DIRECTION.HORIZONTAL;
    _delta = new Vec2();
    _onLeft = false;

    init(pos: Vec3, direction: number, left: boolean){
        this._onLeft = left;
        this.changeAnchor(left);
        this._originPos.set(pos);
        this._roadDirection = direction;
        this.node.setPosition(pos);
    }

    start(){

        const rangeNum = math.randomRangeInt(0, 1);
        this._originSign = randomSigh[rangeNum];

        // 测试，实际需要删除
        this.init(new Vec3(-50, 1100, 0), constant.ROAD_DIRECTION.VERTICAL, true);
    }



    update(deltaTime: number) {
        const pos = this.node.position;
        this._delta.set(pos.x, pos.y);
        let oDelta = 0;
        if (this._roadDirection === constant.ROAD_DIRECTION.HORIZONTAL) {
            this._delta.x += this._originSign * constant.MonsterMoveSpeed;
            // 超出巡查范围，往反方向走
            if (Math.abs(this._delta.x - this._originPos.x) > constant.MonsterMoveRange) {
                this._originSign = -Math.sign(this._originSign);
                this._delta.x += 2 * this._originSign * constant.MonsterMoveSpeed;
            }

        } else {
            this._delta.y += this._originSign * constant.MonsterMoveSpeed;
            oDelta = this._originPos.y;
            if (Math.abs(this._delta.y - this._originPos.y) > constant.MonsterMoveRange) {
                this._originSign = -Math.sign(this._originSign);
                this._delta.y += 2 * this._originSign * constant.MonsterMoveSpeed;
                // 是否换边
                const changeSide = Math.random();
                if(changeSide >= 0.5){
                    if(this._onLeft){
                        this._delta.x += ROADDIS;
                    }else{
                        this._delta.x -= ROADDIS;
                    }

                    this._onLeft = !this._onLeft;
                    this.changeAnchor(this._onLeft);
                }
            }
        }

        this.node.setPosition(this._delta.x, this._delta.y);
    }

    changeAnchor(isLeft: boolean){
        const uiTrans = this.getComponent(UITransform);
        if(isLeft){
            uiTrans.setAnchorPoint(new Vec2(1, 0.5));
        }else{
            uiTrans.setAnchorPoint(new Vec2(0, 0.5));
        }
    }
}


