import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert
} from 'react-native';
import { useItems } from '../context/ItemContext';

const SHOP_ITEMS = [
    {
        id: 1,
        name: '골든망고',
        description: '2배 더 빠른 망고 생성',
        price: 1000,
        duration: 300,
        icon: '⭐'
    },
    {
        id: 2,
        name: '럭키망고',
        description: '망고 드랍률 2배 증가',
        price: 2000,
        duration: 180,
        icon: '🍀'
    },
    {
        id: 3,
        name: '레인보우망고',
        description: '희귀 망고 확률 증가',
        price: 3000,
        duration: 120,
        icon: '🌈'
    }
];

function ItemShopScreen() {
    const { addActiveItem } = useItems();

    const handlePurchase = (item) => {
        // 구매 확인 알림
        Alert.alert(
            '아이템 구매',
            `${item.name}을(를) 구매하시겠습니까?\n가격: $${item.price}`,
            [
                {
                    text: '취소',
                    style: 'cancel'
                },
                {
                    text: '구매',
                    onPress: () => {
                        const newActiveItem = {
                            ...item,
                            activatedAt: new Date(),
                            expiresAt: new Date(Date.now() + item.duration * 1000)
                        };
                        addActiveItem(newActiveItem);
                        Alert.alert('구매 완료', `${item.name}이(가) 적용되었습니다!`);
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.title}>아이템 샵</Text>
                <ScrollView style={styles.scrollView}>
                    {SHOP_ITEMS.map(item => (
                        <View key={item.id} style={styles.itemCard}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemIcon}>{item.icon}</Text>
                                <Text style={styles.itemName}>{item.name}</Text>
                            </View>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemDescription}>{item.description}</Text>
                                <Text style={styles.itemDuration}>지속시간: {Math.floor(item.duration / 60)}분 {item.duration % 60}초</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.purchaseButton}
                                onPress={() => handlePurchase(item)}
                            >
                                <Text style={styles.purchaseButtonText}>구매하기</Text>
                                <Text style={styles.itemPrice}>${item.price.toLocaleString()}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    scrollView: {
        flex: 1,
    },
    itemCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemInfo: {
        marginBottom: 15,
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    itemDuration: {
        fontSize: 12,
        color: '#888',
    },
    purchaseButton: {
        backgroundColor: '#FFD84D',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    purchaseButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemPrice: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ItemShopScreen;