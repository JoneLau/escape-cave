import { _decorator, Component, Button, find, Camera, Node } from 'cc';
const { ccclass, property } = _decorator;
import { clientEvent } from './framework/clientEvent';
import { GAMESTATE } from './framework/constant';

@ccclass("StartMenuController")
export class StartMenuController extends Component {

    @property(Node)
    UICanvas: Node | null = null;
    @property(Button)
    startButton: Button | null = null;
    @property(Button)
    gameSettingsButton: Button | null = null;
    @property(Button)
    signUpButton: Button | null = null;
    @property(Button)
    settingMenuButton: Button | null = null;
    @property(Button)
    gameSettingsCloseButton: Button | null = null;
    @property(Button)
    gameMenuCloseButton: Button | null = null;


    private _menuNodes = {
        startMenuNode: null,
        gameSettingsMenuNode: null,
        gameMenuNode: null,
        overMenuNode: null,
    }


    onLoad () {
        this.startButton.node.on(Button.EventType.CLICK, this.callback, this);
        this.gameSettingsButton.node.on(Button.EventType.CLICK, this.callback, this);
        this.signUpButton.node.on(Button.EventType.CLICK, this.callback, this);
        this.settingMenuButton.node.on(Button.EventType.CLICK, this.callback, this);
        this.gameSettingsCloseButton.node.on(Button.EventType.CLICK, this.callback, this);
        this.gameMenuCloseButton.node.on(Button.EventType.CLICK, this.callback, this);

        this._menuNodes.startMenuNode = this.UICanvas.getChildByName('start-menu');
        this._menuNodes.gameSettingsMenuNode = this.UICanvas.getChildByName('game-settings');
        this._menuNodes.gameMenuNode = this.UICanvas.getChildByName('game-menu');

        // 监听切换菜单
        clientEvent.on('open-menu', this.openMenu, '');
    }

    callback (button: Button) {
        const btnName = button.node.parent.name;
        switch (btnName) {
            case 'start-btn':
                // 告知主流程游戏开始，隐藏菜单
                this.closeAllMenu();
                // unstart processing pause over
                clientEvent.dispatchEvent('game-state', GAMESTATE.START);
                break;
            case 'game-settings-btn':
                this.openMenu('game-settings');
                break;
            case 'sign-up-btn':
                break;
            case 'settings-icon':
                this.openMenu('game-menu');
                break;
            case 'game-settings-close':
            case 'game-menu-close':
                this.openMenu('start-menu');
                break;
            default:
                break;
        }
    }

    // TODO: 开启某个菜单，隐藏其他菜单
    // startMenu、gameSetting、gameMenu gameOver
    openMenu(menu: 'start-menu' | 'game-settings' | 'game-menu' | 'game-over') {
        if (!menu) {
            return;
        }
        let openNode = null;
        for (const key in this._menuNodes) {
            const menuNode = this._menuNodes[key];
            if (menuNode) {
                if (menuNode.name === menu) {
                    openNode = menuNode;
                }
                menuNode.active = false;
            }
        }
        openNode && (openNode.active = true);
    }

    // 关闭所有菜单
    closeAllMenu() {
        for (const key in this._menuNodes) {
            const menuNode = this._menuNodes[key];
            if (menuNode) {
                menuNode.active = false;
            }
        }
    }
}