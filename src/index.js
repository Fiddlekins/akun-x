'use strict';

import Core from './core/index';
import AnonToggle from './modules/anonToggle';
import ChapterHTMLEditor from './modules/chapterHTMLEditor';
import ImageToggle from './modules/imageToggle';
import Linker from './modules/linker';
import LiveImages from './modules/liveImages';
import ChoiceReorder from './modules/choiceReorder';
import CssTweaks from "./modules/cssTweaks";

const core = new Core();

core.addModule(AnonToggle);
core.addModule(ChapterHTMLEditor);
core.addModule(ImageToggle);
core.addModule(Linker);
core.addModule(LiveImages);
core.addModule(ChoiceReorder);
core.addModule(CssTweaks);
