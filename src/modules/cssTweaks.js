'use strict';

import {SETTING_TYPES} from '../core/settings';

const MODULE_ID = 'cssTweaks';

const SETTING_IDS = {
	ENABLED: 'enabled',
	UNFIX_IMAGE_HEIGHT: 'UNFIX_IMAGE_HEIGHT',
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
		this._styleElement.innerHTML = css;
	}

}