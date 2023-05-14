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

    @property({
        type: Node
    })
    pushPos: Node[] = [];

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
        // 如果有设置固定摆放位置就用固定摆放位置
        let x = this.fixPos.x;
        let y = this.fixPos.y;
        const dis = Math.sqrt(x * x + y * y);
        if (dis > 0) {
            this._objPos.set(this.fixPos);
            return;
        }

        // 没有固定摆放位置就随机位置
        // 横向随机位置为左右两边随机
        // 纵向随机位置为左右、上下四边随机，怪物始终朝下
        // 每个板快 init 之后随机一次位置，不会更改
        const pos = this.node.position;
        let uiTransSize = this.getComponent(UITransform).contentSize;
        // 横向位置随机
        const randomH = Math.random() >= 0.5 ? 1 : -1;
        if (this.direction === ROAD_DIRECTION.HORIZONTAL) {
            // 所有的怪物父节点都是板
            x = uiTransSize.x / 2 * randomH + (-randomH) * constant.MonsterMoveRange;
            this._objPos.set(x, 0, pos.z);
        } else {
            this._isLeft = randomH > 0 ? false : true;
            // if(this.onlyOneWay){
            //     x = this.left ? pos.x - uiTransSize.x / 2 : pos.x + uiTransSize.x;
            // }else{
                x = uiTransSize.x / 2 * randomH;
            // }
            const randomV = Math.random() >= 0.5 ? 1 : -1;
            y = uiTransSize.y / 2 * randomV + (-randomV) * constant.MonsterMoveRange;
            this._objPos.set(x, y, pos.z);
        }
    }

    // start() {

    // }

    // update(deltaTime: number) {

    // }
}

