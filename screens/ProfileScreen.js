import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Settings, BarChart2, Eye } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

function ProfileScreen() {
    const navigation = useNavigation();
    const profile = {
        username: '세케찬',
        clickCount: 0,
        avocadoCount: 0,
        avocadoId: '아보카도 ID',
        totalFriends: 0,
        balance: 269,
        winRate: '0%',
        winLoss: '0 / 0',
        selectedAvocado: require('../assets/images/Mango.png'),
        collectedAvocados: [
            {
                id: 1,
                image: require('../assets/images/hwang.png'),
                name: '???',
                count: 1,
            },
            {
                id: 2,
                image: require('../assets/images/son.png'),
                name: '구워진 아보카도',
                count: 1,
            }
        ]
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>프로필</Text>
                    <View style={styles.placeholder} />
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.profileHeader}>
                        <Text style={styles.username}>{profile.username}</Text>
                        <TouchableOpacity>
                            <Text style={styles.addFriend}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>클릭수</Text>
                            <Text style={styles.statValue}>{profile.clickCount}</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>슈퍼 아보카도</Text>
                            <Text style={styles.statValue}>{profile.avocadoCount}개</Text>
                        </View>
                    </View>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton}>
                            <BarChart2 color="#000" size={20} />
                            <Text style={styles.actionButtonText}>통계</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Settings color="#000" size={20} />
                            <Text style={styles.actionButtonText}>설정</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>아보카도 ID</Text>
                            <View style={styles.infoValue}>
                                <Text>{profile.avocadoId}</Text>
                                <Eye color="#000" size={16} />
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>친구 초대</Text>
                            <Text style={styles.infoValue}>{profile.totalFriends}명</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>총 자산</Text>
                            <Text style={styles.infoValue}>${profile.balance}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>수확 퀴즈</Text>
                            <Text style={styles.infoValue}>{profile.winRate} {profile.winLoss}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.collectionSection}>
                    <Text style={styles.sectionTitle}>선택한 아보카도</Text>
                    <Image source={profile.selectedAvocado} style={styles.selectedAvocado} />

                    <Text style={styles.sectionTitle}>전체 슈퍼 아보카도</Text>
                    <Text style={styles.collectionSubtitle}>길게 눌러서 스킨 적용</Text>

                    <View style={styles.avocadoGrid}>
                        {profile.collectedAvocados.map(avocado => (
                            <View key={avocado.id} style={styles.avocadoItem}>
                                <Image source={avocado.image} style={styles.avocadoImage} />
                                <Text style={styles.avocadoName}>{avocado.name}</Text>
                                <Text style={styles.avocadoCount}>{avocado.count}개</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 10,
    },
    backButton: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    placeholder: {
        width: 24,
    },
    profileSection: {
        padding: 24,
    },
    profileHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    addFriend: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD84D',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 20,
    },
    stat: {
        flex: 1,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '600',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        elevation: 2,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        gap: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoLabel: {
        color: '#666',
    },
    infoValue: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    collectionSection: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    selectedAvocado: {
        width: 80,
        height: 80,
        marginBottom: 24,
    },
    collectionSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    avocadoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    avocadoItem: {
        width: '45%',
        backgroundColor: '#000',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    avocadoImage: {
        width: 60,
        height: 60,
        marginBottom: 8,
    },
    avocadoName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    avocadoCount: {
        color: '#FFD84D',
        fontSize: 14,
    },
});

export default ProfileScreen;