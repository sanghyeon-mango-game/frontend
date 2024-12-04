import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Settings, BarChart2, Eye } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import { MANGO_TYPES } from '../data/MangoData';
import { TREE_TYPES } from '../data/TreeData';
import TreeDetailModal from '../components/TreeDetailModal';

function ProfileScreen() {
    const navigation = useNavigation();
    const [selectedTree, setSelectedTree] = useState(null);
    const [treeModalVisible, setTreeModalVisible] = useState(false);
    
    const profile = {
        username: '세퀘찬',
        clickCount: 0,
        treeCount: 0,
        treeId: '나무 ID',
        totalFriends: 0,
        balance: 269,
        winRate: '0%',
        winLoss: '0 / 0',
    };

    const mangos = Object.values(MANGO_TYPES).map(mango => ({
        id: mango.id,
        image: mango.image,
        name: mango.name,
        count: 1,
        rarity: mango.rarity
    }));

    const trees = Object.values(TREE_TYPES).map(tree => ({
        id: tree.id,
        image: tree.image,
        name: tree.name,
        count: 1,
        rarity: tree.rarity,
        description: tree.description
    }));

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
            >
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
                            <Text style={styles.statLabel}>나무</Text>
                            <Text style={styles.statValue}>{profile.treeCount}개</Text>
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
                            <Text style={styles.infoLabel}>나무 ID</Text>
                            <View style={styles.infoValue}>
                                <Text>{profile.treeId}</Text>
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
                    <Text style={styles.sectionTitle}>보유중인 나무</Text>

                    <View style={styles.treeGrid}>
                        {trees.map(tree => (
                            <TouchableOpacity
                                key={tree.id}
                                style={[
                                    styles.treeItem,
                                    styles[`${tree.rarity}Background`]
                                ]}
                                onPress={() => {
                                    setSelectedTree(tree);
                                    setTreeModalVisible(true);
                                }}
                            >
                                <Image source={tree.image} style={styles.treeImage} />
                                <Text style={styles.treeName}>{tree.name}</Text>
                                <Text style={styles.treeDescription}>{tree.description}</Text>
                                <Text style={styles.treeCount}>{tree.count}개</Text>
                                <View style={[styles.rarityBadge, styles[`${tree.rarity}Badge`]]}>
                                    <Text style={styles.rarityText}>{tree.rarity}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[styles.sectionTitle, { marginTop: 32 }]}>보유중인 망고</Text>
                    <Text style={styles.collectionSubtitle}>길게 눌러서 스킨 적용</Text>

                    <View style={styles.mangoGrid}>
                        {mangos.map(mango => (
                            <View
                                key={mango.id}
                                style={[
                                    styles.mangoItem,
                                    styles[`${mango.rarity}Background`]
                                ]}
                            >
                                <Image source={mango.image} style={styles.mangoImage} />
                                <Text style={styles.mangoName}>{mango.name}</Text>
                                <Text style={styles.mangoCount}>{mango.count}개</Text>
                                <View style={[styles.rarityBadge, styles[`${mango.rarity}Badge`]]}>
                                    <Text style={styles.rarityText}>{mango.rarity}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <TreeDetailModal
                visible={treeModalVisible}
                onClose={() => setTreeModalVisible(false)}
                treeData={selectedTree}
            />
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
    scrollContent: {
        paddingBottom: 100,
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
    collectionSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    treeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    treeItem: {
        width: '45%',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        position: 'relative',
    },
    treeImage: {
        width: 60,
        height: 60,
        marginBottom: 8,
    },
    treeName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    treeDescription: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        opacity: 0.7,
        marginBottom: 8,
    },
    treeCount: {
        color: '#FFD84D',
        fontSize: 14,
    },
    mangoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    mangoItem: {
        width: '45%',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        position: 'relative',
    },
    mangoImage: {
        width: 60,
        height: 60,
        marginBottom: 8,
    },
    mangoName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    mangoCount: {
        color: '#FFD84D',
        fontSize: 14,
    },
    '전설Background': {
        backgroundColor: '#2C2C2C',
    },
    '희귀Background': {
        backgroundColor: '#3C3C3C',
    },
    '일반Background': {
        backgroundColor: '#4C4C4C',
    },
    rarityBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    '전설Badge': {
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
    },
    '희귀Badge': {
        backgroundColor: 'rgba(192, 192, 192, 0.2)',
    },
    '일반Badge': {
        backgroundColor: 'rgba(205, 127, 50, 0.2)',
    },
    rarityText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default ProfileScreen;