export const TREE_TYPES = {
    GOLDEN: {
        id: 'golden',
        name: '황금 나무',
        image: require('../assets/images/chan.png'),
        rarity: '전설',
        probability: 0.1, // 10% 확률
        description: '황금빛 망고를 맺는 신비로운 나무',
        baseProduction: 100, // 기본 망고 생산량
        growthTime: 48, // 성장 시간 (시간)
    },
    CRYSTAL: {
        id: 'crystal',
        name: '크리스탈 나무',
        image: require('../assets/images/tree.png'),
        rarity: '희귀',
        probability: 0.2, // 20% 확률
        description: '투명한 크리스탈 같은 망고를 맺는 나무',
        baseProduction: 75,
        growthTime: 36,
    },
    RAINBOW: {
        id: 'rainbow',
        name: '무지개 나무',
        image: require('../assets/images/tree.png'),
        rarity: '희귀',
        probability: 0.2, // 20% 확률
        description: '다채로운 색의 망고를 맺는 나무',
        baseProduction: 75,
        growthTime: 36,
    },
    BASIC: {
        id: 'basic',
        name: '기본 나무',
        image: require('../assets/images/tree.png'),
        rarity: '일반',
        probability: 0.25, // 25% 확률
        description: '기본적인 망고 나무',
        baseProduction: 50,
        growthTime: 24,
    },
    WILD: {
        id: 'wild',
        name: '야생 나무',
        image: require('../assets/images/tree.png'),
        rarity: '일반',
        probability: 0.25, // 25% 확률
        description: '자연 상태의 망고 나무',
        baseProduction: 50,
        growthTime: 24,
    }
};

export const RARITY_COLORS = {
    전설: '#FFD700', // 골드
    희귀: '#C0C0C0', // 실버
    일반: '#CD7F32', // 브론즈
};

// 나무 획득 확률 체크 함수
export const checkTreeDropAndGet = () => {
    const TREE_DROP_RATE = 0.03; // 3% 나무 획득 확률
    const shouldDropTree = Math.random() < TREE_DROP_RATE;

    if (!shouldDropTree) return null;

    const rand = Math.random();
    let probabilitySum = 0;

    for (const tree of Object.values(TREE_TYPES)) {
        probabilitySum += tree.probability;
        if (rand <= probabilitySum) {
            return tree;
        }
    }
};