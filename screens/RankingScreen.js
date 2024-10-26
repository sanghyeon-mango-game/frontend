import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, requireNativeComponent } from 'react-native';

function RankingScreen() {
  const topUsers = [
    { id: 2, rank: '#2', name: '사용자이름', score: '999,999,999', profile: require('../assets/images/profile2.png') },
    { id: 1, rank: '#1', name: '사용자이름', score: '999,999,999', profile:require('../assets/images/profile2.png') },
    { id: 3, rank: '#3', name: '사용자이름', score: '999,999,999', profile: require('../assets/images/profile2.png') },
  ];

  const otherUsers = Array(7).fill({
    rank: '#4',
    name: '사용자이름',
    score: '999,999,999',
    profile:require('../assets/images/profile.png')
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>랭킹</Text>
      </View>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRanksWrapper}>
          <View style={styles.topRanksContainer}>
            {topUsers.map((user) => (
              <View
                key={user.id}
                style={[
                  styles.topRankContainer,
                  user.rank === '#1' && styles.firstRank,
                  user.rank === '#2' && styles.secondRank,
                  user.rank === '#3' && styles.thirdRank,
                ]}
              >
                <Text style={[
                  styles.rankText,
                  user.rank === '#1' && styles.firstRankText,
                  user.rank === '#2' && styles.secondRankText,
                  user.rank === '#3' && styles.thirdRankText,
                ]}>
                  {user.rank}
                </Text>
                <Image source={user.profile} style={styles.topProfileCircle} />
                <Text style={styles.topRankNameText}>{user.name}</Text>
                <Text style={styles.scoreText}>{user.score}원</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.rankDivider} />
        <View style={styles.regularRanksContainer}>
          {otherUsers.map((user, index) => (
            <View key={index} style={styles.regularRankContainer}>
              <Text style={styles.rankText}>{user.rank}</Text>
              <View style={styles.regularRankInfo}>
                <View style={styles.profileInfoContainer}>
                  <Image source={user.profile} style={styles.profileCircle} />
                  <Text style={styles.regularNameText}>{user.name}</Text>
                </View>
                <Text style={styles.scoreText}>{user.score}원</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    marginTop: 70,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    marginTop: -40,
  },
  scrollViewContent: {
  },
  topRanksWrapper: {
  },
  topRanksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:30,
    marginBottom: 40,
    paddingTop: 30,
    paddingHorizontal: 24,
  },
  topRankContainer: {
    height: 170,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  firstRank: {
    marginTop: -30,
  },
  secondRank: {
    height: 170,
  },
  thirdRank: {
    height: 170,
  },
  rankDivider: {
    width: 300,
    height: 1,
    backgroundColor: '#EEEEEE',
    alignSelf: 'center',
    marginTop:10,
    marginBottom:35,
  },
  regularRankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    gap: 20,
  },
  regularRankInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  topProfileCircle: {
    width: 50,
    height: 50,
    borderRadius: 1000,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 1000,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B5B5B',
  },
  firstRankText: {
    color: '#FFAE00',
    fontSize: 18,
  },
  secondRankText: {
    color:'#5B5B5B',
    fontSize:18,
  },
  thirdRankText: {
    color: '#C98459',
    fontSize:18,
  },
  topRankNameText: {
    fontSize: 20,
    fontWeight: '600',
    color:'#000'
  },
  regularNameText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Wanted Sans',
  },
  scoreText: {
    fontSize: 14,
    color: '#FFD000',
    fontWeight: '500',
  },
});

export default RankingScreen;