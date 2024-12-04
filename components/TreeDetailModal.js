import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { X } from 'react-native-feather';

export const TreeDetailModal = ({ visible, onClose, onApply, treeData }) => {
    if (!treeData) return null;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <X stroke="#000" width={24} height={24} />
                    </TouchableOpacity>

                    <View style={styles.content}>
                        <View style={[
                            styles.treeCard,
                            styles[`${treeData.rarity}Background`]
                        ]}>
                            <View style={[styles.rarityBadge, styles[`${treeData.rarity}Badge`]]}>
                                <Text style={styles.rarityText}>{treeData.rarity}</Text>
                            </View>
                            <Image source={treeData.image} style={styles.treeImage} />
                            <Text style={styles.treeName}>{treeData.name}</Text>
                            <Text style={styles.treeDescription}>{treeData.description}</Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>기본 생산량</Text>
                                <Text style={styles.statValue}>{treeData.baseProduction}/시간</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>성장 시간</Text>
                                <Text style={styles.statValue}>{treeData.growthTime}시간</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => {
                                onApply(treeData);
                                onClose();
                            }}
                        >
                            <Text style={styles.applyButtonText}>적용하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#F5F5F5',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        minHeight: '60%',
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 1,
    },
    content: {
        marginTop: 40,
        alignItems: 'center',
    },
    treeCard: {
        width: '100%',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    treeImage: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    treeName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    treeDescription: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        opacity: 0.8,
        lineHeight: 20,
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
        top: 12,
        right: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
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
        fontSize: 14,
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 24,
        gap: 16,
    },
    statItem: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    applyButton: {
        width: '100%',
        backgroundColor: '#FFD84D',
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 24,
    },
    applyButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default TreeDetailModal;