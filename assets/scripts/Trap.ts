import { _decorator, Component, Node, Vec3 } from 'cc';
import { constant, ROAD_DIRECTION } from './framework/constant';
const { ccclass, property } = _decorator;

let pos = new Vec3();

@ccclass('Trap')
export class Trap extends Component {

    // 位置、朝向
    // 可能存在错误的方向
    init (pos: Vec3, direction: ROAD_DIRECTION, left: boolean){
        this.node.setPosition(pos);
        if(direction === ROAD_DIRECTION.VERTICAL){
            pos.set(this.node.eulerAngles);
            pos.z = left ? -90 : 90;
            this.node.eulerAngles = pos;
        }
    }

    update(deltaTime: number) {

    }
}


