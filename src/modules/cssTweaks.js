'use strict';

import {SETTING_TYPES} from '../core/settings';

const MODULE_ID = 'cssTweaks';

const SETTING_IDS = {
	ENABLED: 'enabled',
	UNFIX_IMAGE_HEIGHT: 'UNFIX_IMAGE_HEIGHT',
	HIDE_LEFT_SIDEBAR_BUTTON: 'HIDE_LEFT_SIDEBAR_BUTTON',
	NORMALIZE_CHAT_FONT: 'NORMALIZE_CHAT_FONT',
	HIDE_POST_YOUR_THOUGHTS: 'HIDE_POST_YOUR_THOUGHTS',
	MAKE_CHAT_LONG_AGAIN: 'MAKE_CHAT_LONG_AGAIN',
};

const DEFAULT_SETTINGS = {
	name: 'CSS tweaks',
	id: MODULE_ID,
	settings: {
		[SETTING_IDS.ENABLED]: {
			name: 'Enabled',
			description: 'Turn the CSS Tweaks module on or off.',
			type: SETTING_TYPES.BOOLEAN,
			value: false
		},
		[SETTING_IDS.UNFIX_IMAGE_HEIGHT]: {
			name: 'Un-fix image height',
			description: 'Override the thing that makes small images have big empty spaces around them. Can break "resume reading" autoscroll feature.',
			type: SETTING_TYPES.BOOLEAN,
			value: false
		},
		[SETTING_IDS.HIDE_LEFT_SIDEBAR_BUTTON]: {
			name: 'Hide the "< Show" button',
			description: 'Make the little floating thing disappear',
			type: SETTING_TYPES.BOOLEAN,
			value: false
		},
		[SETTING_IDS.NORMALIZE_CHAT_FONT]: {
			name: 'Normalize chat font',
			description: "Make the font in premium accounts' chat messages the same size as others",
			type: SETTING_TYPES.BOOLEAN,
			value: true
		},
		[SETTING_IDS.HIDE_POST_YOUR_THOUGHTS]: {
			name: 'Hide the "Post your thoughts" prompt',
			description: "Remove the \"What's happening/Post your thoughts\" form in the top-right dropdown menu",
			type: SETTING_TYPES.BOOLEAN,
			value: true
		},
		[SETTING_IDS.MAKE_CHAT_LONG_AGAIN]: {
			name: 'Disable shortening of chat messages',
			description: "Disable the feature that cuts chat messages off after 8 lines",
			type: SETTING_TYPES.BOOLEAN,
			value: true
		},
	}
};

export default class CssTweaks {
	constructor(core) {
		this._core = core;
		this._settings = this._core.settings.addModule(DEFAULT_SETTINGS, this._onSettingsChanged.bind(this));
		this._styleElement = document.createElement('style');
		this._styleElement.id = 'akun-x-css-tweaks';
		document.head.appendChild(this._styleElement);
		if (this._settings[SETTING_IDS.ENABLED].value) {
			this._enable();
		}
	}

	static get id() {
		return MODULE_ID;
	}

	_onSettingsChanged(settingId) {
		switch (settingId) {
			case SETTING_IDS.ENABLED:
				if (this._settings[SETTING_IDS.ENABLED].value) {
					this._enable();
				} else {
					this._disable();
				}
				break;
			default:
				if (this._settings[SETTING_IDS.ENABLED].value) {
					this._regenerateCurrentStyling();
				}
		}
	}

	_enable() {
		this._regenerateCurrentStyling();
	}

	_disable() {
		this._styleElement.innerHTML = '';
	}

	_regenerateCurrentStyling() {
		let css = '';
		if (this._settings[SETTING_IDS.UNFIX_IMAGE_HEIGHT].value) {
			css += '.content .page-body .chapter .imgContainer { height: auto !important; }';
		}
		if (this._settings[SETTING_IDS.HIDE_LEFT_SIDEBAR_BUTTON].value) {
			css += '.hideLeftSideBar { display: none !important; }';
		}
		if (this._settings[SETTING_IDS.NORMALIZE_CHAT_FONT].value) {
			css += '.chatMsg[plan="1"] .message .fieldBody { font-size: inherit !important; }';
		}
		if (this._settings[SETTING_IDS.HIDE_POST_YOUR_THOUGHTS].value) {
			css += '*[ng-controller="newsFeedPost"] { display: none !important; }';
		}
		if (this._settings[SETTING_IDS.MAKE_CHAT_LONG_AGAIN].value) {
			css += '#mainChat .chatLog .message .fieldBody { display: inherit !important; }';
		}
		this._styleElement.innerHTML = css;
	}

}