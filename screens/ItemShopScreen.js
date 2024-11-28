import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Alert
} from 'react-native';

const ItemShopScreen = () => {
    const [selectedTab, setSelectedTab] = useState('나무');
    const [userMoney] = useState(999999); // 실제로는 글로벌 상태나 컨텍스트에서 관리해야 함

    const treeItems = [
        {
            id: 1,
            name: '영양제',
            description: '30분 동안 망고 수확량 2배',
            price: 1000,
            image: require('../assets/images/Mango.png'),
            duration: '30분',
        },
        {
            id: 2,
            name: '비료',
            description: '1시간 동안 망고 수확량 3배',
            price: 2500,
            image: require('../assets/images/Mango.png'),
            duration: '1시간',
        },
        {
            id: 3,
            name: '황금 비료',
            description: '2시간 동안 망고 수확량 5배',
            price: 5000,
            image: require('../assets/images/Mango.png'),
            duration: '2시간',
        }
    ];

    const clickItems = [
        {
            id: 4,
            name: '자동 클릭',
            description: '30분 동안 초당 1회 자동 클릭',
            price: 3000,
            image: require('../assets/images/Mango.png'),
            duration: '30분',
        },
        {
            id: 5,
            name: '더블 클릭',
            description: '1시간 동안 클릭당 2배의 망고',
            price: 4500,
            image: require('../assets/images/Mango.png'),
            duration: '1시간',
        },
        {
            id: 6,
            name: '골드 클릭',
            description: '2시간 동안 클릭당 3배의 망고',
            price: 7500,
            image: require('../assets/images/Mango.png'),
            duration: '2시간',
        }
    ];

    const handlePurchase = (item) => {
        if (userMoney >= item.price) {
            Alert.alert(
                "구매 확인",
                `${item.name}을(를) 구매하시겠습니까?`,
                [
                    {
                        text: "취소",
                        style: "cancel"
                    },
                    {
                        text: "구매",
                        onPress: () => {
                            // 실제 구매 로직 구현 필요
                            Alert.alert("구매 완료", `${item.name}을(를) 구매했습니다.`);
                        }
                    }
                ]
            );
        } else {
            Alert.alert("잔액 부족", "망고가 부족합니다.");
        }
    };

    const renderItem = (item) => (
        <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemContent}>
                <View style={styles.leftContent}>
                    <Image source={item.image} style={styles.itemImage} />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <View style={styles.durationBadge}>
                            <Text style={styles.durationText}>지속시간: {item.duration}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.priceText}>{item.price.toLocaleString()}망고</Text>
                    <TouchableOpacity
                        style={styles.buyButton}
                        onPress={() => handlePurchase(item)}
                    >
                        <Text style={styles.buyButtonText}>구매</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>아이템샵</Text>
                    <View style={styles.balanceContainer}>
                        <Image
                            source={require('../assets/images/Mango.png')}
                            style={styles.mangoIcon}
                        />
                        <Text style={styles.balanceText}>{userMoney.toLocaleString()}</Text>
                    </View>
                </View>

                <View style={styles.tabWrapper}>
                    <View style={styles.contentBackground}>
                        <View style={styles.tabContainer}>
                            <View style={[
                                styles.selectedTabIndicator,
                                {
                                    transform: [{
                                        translateX: selectedTab === '나무' ? 0 : '100%'
                                    }]
                                }
                            ]} />
                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    selectedTab === '나무' && styles.selectedTab
                                ]}
                                onPress={() => setSelectedTab('나무')}
                            >
                                <Text style={[
                                    styles.tabText,
                                    selectedTab === '나무' && styles.selectedTabText
                                ]}>나무 아이템</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    selectedTab === '클릭' && styles.selectedTab
                                ]}
                                onPress={() => setSelectedTab('클릭')}
                            >
                                <Text style={[
                                    styles.tabText,
                                    selectedTab === '클릭' && styles.selectedTabText
                                ]}>클릭 아이템</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView
                    style={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {selectedTab === '나무' ?
                        treeItems.map(renderItem) :
                        clickItems.map(renderItem)
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    mangoIcon: {
        width: 24,
        height: 24,
    },
    balanceText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFD700',
    },
    tabWrapper: {
        width: '100%',
        marginBottom: 20,
    },
    contentBackground: {
        display: 'flex',
        height: 55,
        padding: 5,
        alignItems: 'flex-start',
        gap: 5,
        flexShrink: 0,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    tabContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    selectedTabIndicator: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        backgroundColor: '#FFD84D',
        borderRadius: 10,
    },
    tab: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    selectedTab: {
        backgroundColor: 'transparent',
    },
    tabText: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.70)',
        fontWeight: '600',
    },
    selectedTabText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    itemCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    itemImage: {
        width: 50,
        height: 50,
    },
    itemInfo: {
        gap: 4,
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    durationBadge: {
        backgroundColor: '#FFF3D1',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    durationText: {
        fontSize: 12,
        color: '#FFD700',
        fontWeight: '500',
    },
    rightContent: {
        alignItems: 'flex-end',
        gap: 8,
    },
    priceText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFD700',
    },
    buyButton: {
        backgroundColor: '#FFD84D',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 15,
    },
    buyButtonText: {

        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default ItemShopScreen;