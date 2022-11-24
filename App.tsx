import React, { useCallback, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import heartImage from './src/assets/heart/heart-like.png';

interface IconProps {
  isLiked?: boolean;
}

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;

  background: #151417;
`;

const PostImageContainer = styled(View)`
  width: 100%;
  height: 300px;
`;

export const PostImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const HeartLikeImage = styled(Image)`
  width: 96px;
  height: 96px;
`;

export const Icon = styled(Feather) <IconProps>`
  color: #FFFFFF;
  font-size: 24px;

  ${({ isLiked }) => isLiked && css`
    color: #e74c3c;
  `}
`;

export const InteractionContainer = styled(View)`
  width: 100%;
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
`;

 
export default function App() {

  const [isLiked, setIsLiked] = useState(false);

  const iconLikeOpacity = useSharedValue(0);
  const iconLikeScale = useSharedValue(1);

  const iconLikeStyle = useAnimatedStyle(() => {
    return {
      opacity: iconLikeOpacity.value,
      transform: [{ scale: iconLikeScale.value }],
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      position: 'absolute',
    }
  });


  const likePost = useCallback(() => {
    setIsLiked(prev => !prev);
  }, [])


  const handleShowLikeIndicator = useCallback(() => {
    iconLikeOpacity.value = withTiming(
      1,
      {
        duration: 200,
        easing: Easing.ease
      }, () => {
        'worklet'
        runOnJS(likePost)();
        iconLikeScale.value = withTiming(
          1.25,
          {
            duration: 200,
            easing: Easing.ease
          }, () => {
            iconLikeScale.value = withTiming(
              1,
              {
                duration: 200,
                easing: Easing.ease
              },
              () => {
                iconLikeOpacity.value = withTiming(
                  0,
                  {
                    duration: 300,
                    easing: Easing.ease
                  }
                )
              }
            )
          }
        )
      }
    )
  }, []);

  return (
    <Container>
      <TapGestureHandler numberOfTaps={2} onActivated={handleShowLikeIndicator}>
        <PostImageContainer>
          <PostImage source={{ uri: 'https://images.pexels.com/photos/8388229/pexels-photo-8388229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} />
          <Animated.View style={iconLikeStyle}>
            <HeartLikeImage source={heartImage} />
          </Animated.View>
        </PostImageContainer>
      </TapGestureHandler>

      <InteractionContainer>
        <TouchableOpacity onPress={handleShowLikeIndicator}>
          <Icon isLiked={isLiked} name='heart' />
        </TouchableOpacity>
      </InteractionContainer>
    </Container>
  );
}


