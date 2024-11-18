import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image, 
  Animated, 
  Easing 
} from 'react-native';

function RankingScreen() {
  const [topUsers] = React.useState([
    { id: 2, rank: '#2', name: '한유찬', score: '999,999,999', profile: require('../assets/images/chan.png') },
    { id: 1, rank: '#1', name: '신이현', score: '999,999,999', profile: require('../assets/images/jw.png') },
    { id: 3, rank: '#3', name: '김태영', score: '999,999,999', profile: require('../assets/images/hwang.png') },
  ]);

  const [otherUsers] = React.useState(
    Array(20).fill().map((_, index) => ({
      rank: `#${index + 4}`,
      name: '손도현',
      score: '999,999,999',
      profile: require('../assets/images/son.png')
    }))
  );

  const firstAnimation = {
    scale: new Animated.Value(0.3),
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(50)
  };
  const secondAnimation = {
    scale: new Animated.Value(0.3),
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(50)
  };
  const thirdAnimation = {
    scale: new Animated.Value(0.3),
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(50)
  };
  
  const otherAnimations = Array(20).fill(0).map(() => ({
    translateY: new Animated.Value(50),
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.8)
  }));

  useEffect(() => {
    const commonConfig = {
      duration: 300, 
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    };

    const getScaleAnimation = (scaleValue) => {
      return Animated.timing(scaleValue, {
        toValue: 1,
        duration: 400, 
        easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        useNativeDriver: true,
      });
    };

    Animated.sequence([
      Animated.parallel([
        getScaleAnimation(thirdAnimation.scale),
        Animated.timing(thirdAnimation.opacity, {
          toValue: 1,
          duration: 250,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
        Animated.timing(thirdAnimation.translateY, {
          toValue: 0,
          ...commonConfig,
        })
      ]),
      Animated.parallel([
        getScaleAnimation(secondAnimation.scale),
        Animated.timing(secondAnimation.opacity, {
          toValue: 1,
          duration: 250,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
        Animated.timing(secondAnimation.translateY, {
          toValue: 0,
          ...commonConfig,
        })
      ]),
      Animated.parallel([
        getScaleAnimation(firstAnimation.scale),
        Animated.timing(firstAnimation.opacity, {
          toValue: 1,
          duration: 250,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
        Animated.timing(firstAnimation.translateY, {
          toValue: 0,
          ...commonConfig,
        })
      ]),
      Animated.stagger(80,
        otherAnimations.map((anim) =>
          Animated.parallel([
            Animated.timing(anim.translateY, {
              toValue: 0,
              duration: 600, 
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 400, 
              easing: Easing.bezier(0.4, 0, 0.2, 1),
              useNativeDriver: true,
            }),
            Animated.timing(anim.scale, {
              toValue: 1,
              duration: 600, 
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
              useNativeDriver: true,
            })
          ])
        )
      )
    ]).start();
  }, []);

  const getAnimationStyle = (rank) => {
    switch (rank) {
      case '#1':
        return {
          opacity: firstAnimation.opacity,
          transform: [
            { scale: firstAnimation.scale },
            { translateY: firstAnimation.translateY }
          ]
        };
      case '#2':
        return {
          opacity: secondAnimation.opacity,
          transform: [
            { scale: secondAnimation.scale },
            { translateY: secondAnimation.translateY }
          ]
        };
      case '#3':
        return {
          opacity: thirdAnimation.opacity,
          transform: [
            { scale: thirdAnimation.scale },
            { translateY: thirdAnimation.translateY }
          ]
        };
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>랭킹</Text>
      </View>
      <ScrollView 
        bounces={true}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.content}>
          <View style={styles.topRanksWrapper}>
            <View style={styles.topRanksContainer}>
              {topUsers.map((user) => (
                <Animated.View
                  key={user.id}
                  style={[
                    styles.topRankContainer,
                    user.rank === '#1' && styles.firstRank,
                    user.rank === '#2' && styles.secondRank,
                    user.rank === '#3' && styles.thirdRank,
                    getAnimationStyle(user.rank)
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
                </Animated.View>
              ))}
            </View>
          </View>
          <View style={styles.rankDivider} />
          <View style={styles.regularRanksContainer}>
            {otherUsers.map((user, index) => (
              <Animated.View 
                key={index} 
                style={[
                  styles.regularRankContainer,
                  {
                    opacity: otherAnimations[index].opacity,
                    transform: [
                      { translateY: otherAnimations[index].translateY },
                      { scale: otherAnimations[index].scale }
                    ]
                  }
                ]}
              >
                <Text style={styles.rankText}>#{index + 4}</Text>
                <View style={styles.regularRankInfo}>
                  <View style={styles.profileInfoContainer}>
                    <Image source={user.profile} style={styles.profileCircle} />
                    <Text style={styles.regularNameText}>{user.name}</Text>
                  </View>
                  <Text style={styles.scoreText}>{user.score}원</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    paddingBottom: 100,
  },
  titleContainer: {
    paddingTop: 70,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  topRanksWrapper: {
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
  },
  topRanksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
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
    height: 2,
    backgroundColor: '#e4e4e4',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 35,
  },
  regularRanksContainer: {
    paddingHorizontal: 24,
  },
  regularRankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
    color: '#5B5B5B',
    fontSize: 18,
  },
  thirdRankText: {
    color: '#C98459',
    fontSize: 18,
  },
  topRankNameText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000'
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