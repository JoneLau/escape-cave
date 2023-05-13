import { _decorator, Component, Node, UITransform, Vec2, Vec3 } from 'cc';
import { constant, ROAD_DIRECTION } from './framework/constant';
const { ccclass, property } = _decorator;

// 方向、物品放置位置、垂直位置朝向

@ccclass('Road')
export class Road extends Component {
    @property({
        type: ROAD_DIRECTION
    })
    direction: ROAD_DIRECTION = ROAD_DIRECTION.HORIZONTAL;

    @property
    onlyOneWay = false;

    @property({
        visible: function(){
            return this.onlyOneWay
        }
    })
    left = true;

    @property
    fixPos = new Vec3();

    private _objPos= new Vec3();
    private _isLeft = false;

    getObjPos(){
        return this._objPos;
    }

    getObjDir(){
        return this._isLeft;
    }

    // 随机当前摆放位置
    init() {
        let x = this.fixPos.x;
        let y = this.fixPos.y;
        const dis = Math.sqrt(x * x + y * y);
        if (dis >= 0) {
            this._objPos.set(this.fixPos);
            return;
        }

        const pos = this.node.position;
        let uiTransSize = this.getComponent(UITransform).contentSize;
        const randomDir = Math.random() >= 0.5 ? 1 : -1;
        // x = pos.x + uiTransSize.x / 2 * randomDir;
        // y = pos.y +
        // if (this.direction === ROAD_DIRECTION.HORIZONTAL) {
        //     x = pos.x + uiTransSize.x / 2 * randomDir + (-randomDir) * constant.MonsterMoveRange;
        //     this._objPos.set(x, pos.y + uiTransSize.y / 2, pos.z);
        // } else {
        //     this._isLeft = randomDir > 0 ? false : true;
        //     if(this.onlyOneWay){
        //         x = this.left ? pos.x - uiTransSize.x / 2 : pos.x + uiTransSize.x;
        //     }else{
        //         x = pos.x + uiTransSize.x / 2 * randomDir;
        //     }
        //     const randomPos = Math.random() >= 0.5 ? 1 : -1;
        //     y = pos.y + uiTransSize.y / 2 * randomPos + (-randomPos) * constant.MonsterMoveRange;
        //     this._objPos.set(x, y, pos.z);
        // }
    }
    start() {

    }

    update(deltaTime: number) {

    }
}

