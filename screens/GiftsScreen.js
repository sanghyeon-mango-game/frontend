import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native';

function GiftsScreen() {
    const [selectedTab, setSelectedTab] = useState('받은 선물');

    const gifts = Array(10).fill({
        sender: '김태영',
        mangoType: '망상망고',
        date: '2024.11.26',
        amount: '999,999',
        image: require('../assets/images/Mango.png')
    });

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.title}>선물</Text>

                <View style={styles.tabWrapper}>
                    <View style={styles.contentBackground}>
                        <View style={styles.tabContainer}>
                            <View style={[
                                styles.selectedTabIndicator,
                                {
                                    transform: [{
                                        translateX: selectedTab === '받은 선물' ? 0 : '100%'
                                    }]
                                }
                            ]} />
                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    selectedTab === '받은 선물' && styles.selectedTab
                                ]}
                                onPress={() => setSelectedTab('받은 선물')}
                            >
                                <Text style={[
                                    styles.tabText,
                                    selectedTab === '받은 선물' && styles.selectedTabText
                                ]}>받은 선물</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    selectedTab === '보낸 선물' && styles.selectedTab
                                ]}
                                onPress={() => setSelectedTab('보낸 선물')}
                            >
                                <Text style={[
                                    styles.tabText,
                                    selectedTab === '보낸 선물' && styles.selectedTabText
                                ]}>보낸 선물</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView
                    style={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {gifts.map((gift, index) => (
                        <View key={index} style={styles.giftItem}>
                            <View style={styles.leftContent}>
                                <Image source={gift.image} style={styles.mangoIcon} />
                                <View style={styles.giftInfo}>
                                    <Text style={styles.senderText}>{gift.sender}</Text>
                                    <Text style={styles.dateText}>{gift.date}</Text>
                                </View>
                            </View>
                            <View style={styles.rightContent}>
                                <Text style={styles.mangoType}>{gift.mangoType}</Text>
                                <Text style={styles.amount}>{gift.amount}개</Text>
                            </View>
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
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
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
    giftItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 8,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    mangoIcon: {
        width: 50,
        height: 50,
    },
    giftInfo: {
        gap: 4,
    },
    senderText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    dateText: {
        fontSize: 14,
        color: '#747474',
    },
    rightContent: {
        alignItems: 'flex-end',
        gap: 4,
    },
    mangoType: {
        fontSize: 14,
        fontWeight: '500',
        color: '#747474',
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFD700',
    },
});

export default GiftsScreen;