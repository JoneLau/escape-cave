import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    _moveDelta: number = 0;
    start() {

    }

    update(deltaTime: number) {
        this.node.position = new Vec3(
            this.node.position.x + this._moveDelta,
            this.node.position.y,
            this.node.position.z,
        );
    }

    moveLeft(delta: number) {
        this._moveDelta = -delta / 100;
        this.node.scale = new Vec3(-1, 1, 1);
    }

    moveRight(delta: number) {
        this._moveDelta = delta / 100;
        this.node.scale = new Vec3(1, 1, 1);
    }

    _jumping: boolean = false;
    moveUp(delta: number) {
        if (delta < 40 || this._jumping) {
            return;
        }

        // animComp.play('xx');
    }

    moveDown(delta: number) {

    }

    stop() {
        this._moveDelta = 0;
    }
}

