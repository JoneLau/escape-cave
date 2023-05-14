import { _decorator, Component, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("StartMenuController")
export class StartMenuController extends Component {

    @property(Button)
    button: Button | null = null;

    onLoad () {
        this.button.node.on(Button.EventType.CLICK, this.callback, this);
    }

    callback (button: Button) {
        // TODO: 告知主流程游戏开始
    }
}