import { _decorator, Component, Vec3 } from 'cc';
import { MONSTERTYPE } from './framework/constant';
const { ccclass, property, type } = _decorator;

@ccclass('MonsterInfo')
class MonsterInfo {
    @property
    pos: Vec3 = new Vec3();
    @type(MONSTERTYPE)
    type = MONSTERTYPE.ONE;
}

@ccclass('TrapInfo')
class TrapInfo {
    @property
    pos: Vec3 = new Vec3();
}

@ccclass('Config')
export class Config extends Component {
    // 关卡配置

    @property({
        type: [MonsterInfo]
    })
    public monsterConfig: MonsterInfo[] = [];

    @property({
        type: [TrapInfo]
    })
    public trapConfig: TrapInfo[] = [];
}

