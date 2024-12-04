import { atom } from 'recoil';
import { TREE_TYPES } from '../data/TreeData';

export const selectedTreeState = atom({
    key: 'selectedTreeState',
    default: TREE_TYPES.BASIC // 기본 나무로 초기화
});